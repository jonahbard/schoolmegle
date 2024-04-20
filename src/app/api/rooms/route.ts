// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { type NextRequest, NextResponse } from 'next/server'

import dbConnect from "@/lib/db/dbConnect";
import { RtcTokenBuilder, RtcRole } from "agora-access-token";
import { RtmTokenBuilder, RtmRole } from "agora-access-token";
import Room from "@/lib/db/models/Room";

type Room = {
  status: String;
};

type ResponseData = Room[] | string;

function getRtmToken(userId: string) {
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  const appCertificate = process.env.AGORA_APP_CERT!;
  const account = userId;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
  const token = RtmTokenBuilder.buildToken(
    appID,
    appCertificate,
    account,
    RtmRole.Rtm_User,
    privilegeExpiredTs
  );
  return token;
}

function getRtcToken(roomId: string, userId: string) {
  const appID = process.env.NEXT_PUBLIC_AGORA_APP_ID!;
  const appCertificate = process.env.AGORA_APP_CERT!;
  const channelName = roomId;
  const account = userId;
  const role = RtcRole.PUBLISHER;
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  const token = RtcTokenBuilder.buildTokenWithAccount(
    appID,
    appCertificate,
    channelName,
    account,
    role,
    privilegeExpiredTs
  );

  return token;
}

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')!

  await dbConnect();

  try {
    const rooms = await Room.aggregate([
      { $match: { status: "waiting" } },
      { $sample: { size: 1 } },
    ]);
    if (rooms.length > 0) {
      const roomId = rooms[0]._id.toString();
      await Room.findByIdAndUpdate(roomId, {
        status: "chatting",
      });

      return Response.json({
        rooms,
        rtcToken: getRtcToken(roomId, userId),
        rtmToken: getRtmToken(userId),
      }, {status: 200})
    } else {
      return Response.json({ rooms: [], token: null }, {status: 200})
    }
  } catch (error) {
    return Response.json((error as any).message, {status: 400})
  }
}


export async function POST(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')!

  await dbConnect();

  const room = await Room.create({
    status: "waiting",
  });

  return Response.json({
    room,
    rtcToken: getRtcToken(room._id.toString(), userId),
    rtmToken: getRtmToken(userId),
  }, {status: 200});
}

