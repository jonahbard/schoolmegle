"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sessionAtom } from "@/app/session"
import { Button } from "@/components/ui/button";
import { useAtom } from "jotai";
import { signIn, signOut, useSession } from "next-auth/react";

export function Navigation() {
  const [session] = useAtom(sessionAtom);

  return (
    <div className="w-full">
      <div className="flex ml-auto mr-0">
        {session ? (
          <>
            <Button
              variant="default"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Log Out
            </Button>
            <Avatar className="ml-2">
              <AvatarImage
                src={session.user.pfp ? session.user.pfp : undefined}
                referrerPolicy="no-referrer"
                alt={session.user.name}
              />
              <AvatarFallback>ACA</AvatarFallback>
            </Avatar>
          </>
        ) : (
          <Button
            variant="default"
            onClick={() =>
              signIn("google", {
                callbackUrl:
                  window.location.pathname === "/404"
                    ? "/"
                    : window.location.pathname,
              })
            }
          >
            Login {"->"}
          </Button>
        )}
      </div>
    </div>
  );
}
