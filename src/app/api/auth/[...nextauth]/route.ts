//import { handlers } from "@/app/auth" // Referring to the auth.ts we just created
import NextAuth, { AuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const dbUser = await db.employee.findFirst({
        where: {
          email: user.email as string
        }
      })
      if(dbUser) {
        if (dbUser.email.endsWith("@dartmouth.edu")) return true;
      }
      return false;
    },
    async session({ session, token, user }) {
      if (!session.user || !session.user.email) return session

      const dbUser = await db.user.findUnique({
        where: {
          email: session.user?.email as string
        }
      })

      session.user = { ...session.user, ...dbUser }

      return session
    }
  },
  secret: process.env.SECRET
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }