import FacebookProvider from "next-auth/providers/facebook";
import NextAuth from "next-auth/next";

const handler = NextAuth({
    providers: [
        FacebookProvider({
            clientId: process.env.FACEBOOK_APP_ID!,
            clientSecret: process.env.FACEBOOK_APP_SECRET!
        })
    ],
    secret: process.env.NEXTAUTH_SECRET!,
    pages:{
        signIn: "/auth/signin"
    }
} )

export { handler as GET, handler as POST };