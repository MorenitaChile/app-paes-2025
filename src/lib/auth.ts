import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JsonDb } from "@/lib/db";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "estudiante@ejemplo.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // For this demo, we'll allow any login with a valid email format
                // In a real app, you would verify the password hash here
                if (credentials?.email && credentials?.email.includes("@")) {
                    // Ensure user exists in our DB
                    let user = await JsonDb.getUserByEmail(credentials.email);

                    if (!user) {
                        // Create new user if first time
                        user = await JsonDb.createUser({
                            name: credentials.email.split("@")[0],
                            email: credentials.email,
                            streak: 0,
                            lastStudyDate: new Date().toISOString()
                        });
                    }

                    return {
                        id: user.id || "unknown",
                        name: user.name,
                        email: user.email,
                    };
                }
                return null;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async session({ session, token }) {
            if (session.user && token.sub) {
                // Add user ID to session
                (session.user as any).id = token.sub;
            }
            return session;
        }
    }
};
