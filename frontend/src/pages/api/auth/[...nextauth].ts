import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { LoginRequest, LoginResponse } from '@/types/api';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log('NextAuth: Missing credentials');
          return null;
        }

        try {
          const loginData: LoginRequest = {
            email: credentials.email,
            password: credentials.password,
          };

          console.log(
            'NextAuth: Attempting login to:',
            `${API_BASE_URL}/auth/login`
          );
          console.log('NextAuth: Login data:', { email: loginData.email });

          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });

          console.log('NextAuth: Backend response status:', response.status);

          if (!response.ok) {
            const errorText = await response.text();
            console.log('NextAuth: Backend error:', errorText);
            return null;
          }

          const data: LoginResponse = await response.json();

          const userResponse = await fetch(`${API_BASE_URL}/users/userinfo`, {
            headers: {
              Authorization: `Bearer ${data.access_token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!userResponse.ok) {
            return null;
          }

          const userInfo = await userResponse.json();

          const displayName = userInfo.firstName
            ? `${userInfo.firstName}${userInfo.lastName ? ' ' + userInfo.lastName : ''}`
            : userInfo.email.split('@')[0];

          return {
            id: userInfo.slug || userInfo.email,
            email: userInfo.email,
            name: displayName,
            accessToken: data.access_token,
          };
        } catch (error) {
          console.error('NextAuth authorize error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
