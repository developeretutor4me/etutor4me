// verify.ts
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { connectMongoDB } from '../../connection/connection';
import UserModel from '../../models/User';
import { getToken } from "next-auth/jwt";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');

        if (!token) {
            console.error('No token provided');
            return NextResponse.json({ message: 'No token provided' }, { status: 400 });
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            console.error('JWT secret is not defined');
            return NextResponse.json({ message: 'JWT secret is not defined' }, { status: 500 });
        }

        const decoded = jwt.verify(token, secret) as { userId: string };

        await connectMongoDB();

        const user = await UserModel.findById(decoded.userId);
        if (!user) {
            console.error('User not found');
            return NextResponse.json({ message: 'User not found' }, { status: 404 });
        }

        // Update user to set email as verified (add a verified field in your User schema)
        user.verified = true;
        await user.save();

        return NextResponse.json({ message: 'Account verified successfully' }, { status: 200 });
    } catch (error:any) {
        console.error('Error verifying account:', error);
        return NextResponse.json({ message: 'Invalid token or internal error', error: error.message }, { status: 500 });
    }
}
