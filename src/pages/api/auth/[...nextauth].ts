import { User } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import api from "@/libs/api";
import { AuthUser } from "@/types/AuthUser";

//arquivo de rota padrao NEXTAUTH_URL
export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_URL,
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),

        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string
        }),

        CredentialsProvider({
            id: 'credentials',
            credentials: {
                email: { label: 'E-mail', type: 'text' },
                password: { label: 'Senha', type: 'password' }
            },
            authorize: async (credentials, req) => {

                if (!credentials) {
                    return null;
                }

                if (!credentials.email && !credentials.password) {
                    return null
                }


                const user = await api.getUserFromEmail(credentials.email);

                if (user) {
                    return {
                        id: (user.id).toString(),
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }
                }
                return null;
            }

        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            if (user) {
                token.user = user;
            }
            return token;
        },

        session: async ({ session, token }) => {

            if (token) {
                session.user = token.user as AuthUser;
            }
            return session;
        }
    },
    pages: {
        //signIn: '/login'
    }
}


export default NextAuth(authOptions);