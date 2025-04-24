

import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';
import { connectMongoDB } from '@/app/api/connection/connection';
import UserModel from '@/app/api/models/User';
import jwt from 'jsonwebtoken';
import { sendVerificationEmail } from '@/app/api/utils/sendEmail';
import GoogleProvider from 'next-auth/providers/google';
import { Router } from 'lucide-react';



const authOptions: NextAuthOptions = {
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      }),
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'text', placeholder: 'your-email@example.com' },
          password: { label: 'Password', type: 'password' },
          role: { label: 'Role', type: 'select', options: ['parent', 'teacher', 'student'] }
        },
        //@ts-ignore
        async authorize(credentials: Credentials | any, req) {
          await connectMongoDB();
  
          if (!credentials) {
            throw new Error('No credentials provided');
          }

          // for admin check----------------------------------------------------------------
          if (credentials.email === 'admin@gmail.com' && credentials.password === '12345678') {
            return {
              email: 'admin@gmail.com',
              role: 'admin',
              id: 'admin',
              isAdmin: true,
              
              accessToken: jwt.sign(
                { userId: 'admin', email: 'admin@gmail.com', role: 'admin' },
                process.env.JWT_SECRET!,
                { expiresIn: '1h' }
              )
            };
          }
  
          const user = await UserModel.findOne({ email: credentials.email });
  
          if (!user || typeof user.role !== 'string') {
            throw new Error('User not found');
          }
  
          if (user.role !== credentials.role) {
            throw new Error(`You are trying to log in as a ${credentials.role}, but your account is for a ${user.role}.`);
          }
  
          if (!user.verified) {
            const secret = process.env.JWT_SECRET;
            if (!secret) {
              console.error('JWT secret is not defined');
              throw new Error('Internal server error');
            }
            
            const token = jwt.sign(
              { userId: user._id, email: user.email },
              secret,
              { expiresIn: '1h' }
            );
  
            await sendVerificationEmail(user.email, token).catch(error => {
              console.error('Error sending verification email:', error);
              throw new Error('Error sending verification email. Please try again later.');
            });
  
            throw new Error('Email not verified. A verification email has been sent to your email address. Please verify your email before logging in.');
          }
  
          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Invalid password');
          }
  
          // Generate an access token here if needed (e.g., for APIs)
          const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
          
          return {
            email: user.email,
            role: user.role,
            id: user._id.toString(),
            isAdmin:false,
            isParent:false,
            accessToken, // Add the access token to the returned user object
          };



        },
      }),
    ],
    callbacks: {

      async signIn({ user, account, profile }) {
        if (account?.provider === 'google') {
          await connectMongoDB();
          let existingUser = await UserModel.findOne({ email: profile?.email });
  
          if (!existingUser) {
            // Create new user
            
            existingUser = await UserModel.create({
              email: profile?.email,
              name: profile?.name,
              role: 'student', // Default role
              verified: true, // Assume verified for Google
            });
          }
  
          user.id = existingUser._id.toString(); // Assign DB user ID to the user object
          user.role = existingUser.role;
        }
        return true;
      },
      async redirect({ url, baseUrl }) {
        // Handle relative URLs
        if (url.startsWith('/')) {
          return `${baseUrl}${url}`
        }
        // Handle URLs from the same origin
        if (new URL(url).origin === baseUrl) {
          return url
        }
        // Default to the base URL
        return baseUrl
      },
      async jwt({ token, user,session,trigger }:any) {

        if(trigger === "update" && (session?.user?.role && session?.user?.id && session?.user?.email) || (session?.user?.isAdmin || session?.user?.isParent)){

          token.role = session.user.role
          token.id = session.user.id
          token.email = session.user.email
          token.isAdmin = session?.user?.isAdmin === false ? false : true;
          token.isParent = session?.user?.isParent === false ? false : true;
          
         

        }

        if (user) {
          token.role = user.role;
          token.id = user.id; 
          token.isAdmin = user.isAdmin,
          token.isParent = user.isParent,
          token.accessToken = user.accessToken; // Store access token in JWT token
        }
        return token; 
      },
      async session({ session, token }:any) {
        if (session.user) {
          session.user.role = token.role;
          session.user.id = token.id; 
          session.user.isAdmin = token.isAdmin; 
          session.user.isParent = token.isParent; 
          session.accessToken = token.accessToken; // Add access token to session
        } else {
          session.user = { role: token.role, id: token.id }; 
          session.accessToken = token.accessToken; // Add access token to session
        }
        return session;
      },
    },
    session: {
      strategy: 'jwt',
      maxAge: 60 * 60 * 24 * 30,
    },
    secret: process.env.NEXTAUTH_SECRET, 

  };

  export  {authOptions};