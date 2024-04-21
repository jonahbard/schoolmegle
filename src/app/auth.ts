import NexrtAuth from "next-auth"
//import { db } from "@/app/db"
import GoogleProvider from "next-auth/providers/google"

 
export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }: { account: any, profile: any }) { // `account` is the user object from the database, `profile` is the user object from the provider (According to copilot)
      if (account.provider === "google") {
        return profile.email_verified && profile.email.endsWith("@dartmouth.edu")
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
  }
}