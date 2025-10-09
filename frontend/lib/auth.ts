import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  jwt: {
    maxAge: 60 * 60, // 1 hour
  },
})