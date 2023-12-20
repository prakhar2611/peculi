import { getCookie, setCookie } from "cookies-next";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
// const serverurl = process.env.NEXTAUTH_URL
import { cookies } from 'next/headers';
import { env } from "../../../../../next.config";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          // 'redirect_uri': serverurl+'api/auth/callback/google',
                scope: 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/userinfo.email',

                
        }
      }
    }),
  ],
  secret : process.env.NEXT_PUBLIC_SECRET,
  session: {
    strategy: "jwt" ,
    maxAge: 3 * 24 * 60 * 60,
  },
  callbacks: {

    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token
        token.id = profile.id
        token.expires_at = account.expires_at
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken
      session.user.id = token.id
      setCookie("token" , session.accessToken, {cookies})

      session.expires = token.expires_at


      // console.log("cookies - ",getCookie("at"))
      
      return session
    }
  }
});

export { handler as GET, handler as POST };