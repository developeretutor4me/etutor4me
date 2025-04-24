import { hash } from 'bcryptjs';
import { connectMongoDB } from '../../../connection/connection';
import UserModel from '../../../models/User';
import TeacherModel from '../../../models/Teacher';
import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '../../../utils/sendEmail';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { email, password, contactInformation, education, experience,referId } = await req.json();
      

        if (!email || !password || !contactInformation || !contactInformation.email || !education || !experience ||
            !experience.is18OrAbove || !experience.hasTeachingExperience || !experience.generalAvailability ||
            experience.generalAvailability.length === 0) {
            console.error('Validation failed: Missing fields');
            return NextResponse.json({ message: 'Missing fields' }, { status: 422 });
        }

        await connectMongoDB();
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            console.error('User already exists:', email);
            return NextResponse.json({ message: 'User already exists' }, { status: 422 });
        }




        let referredBy = null;

   
        if (referId) {
            const referringUser = await UserModel.findById(referId);
            if (!referringUser) {
                console.error('Invalid referral ID:', referId);
                return NextResponse.json({ message: 'Invalid referral ID' }, { status: 422 });
            }
            referredBy = referringUser._id;
        }



        const hashedPassword = await hash(password, 12);
        const newUser = new UserModel({
            email,
            password: hashedPassword,
            referredBy,
            role: 'teacher',
        });
        const savedUser = await newUser.save();

        if (referredBy) {
            await UserModel.findByIdAndUpdate(referredBy, { $inc: { etokis: 5 } });
           
        }



        const newTeacher = new TeacherModel({
            user: savedUser._id,
            contactInformation,
            education,
            experience,
            totalbooking:0,
          
        });

        await newTeacher.save();
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            console.error('JWT secret is not defined');
            return NextResponse.json({ message: 'JWT secret is not defined' }, { status: 500 });
        }

        const token = jwt.sign(
            { userId: savedUser._id, email: savedUser.email },
            secret,
            { expiresIn: '1h' }
        );

        // Send verification email
        await sendVerificationEmail(savedUser.email, token).catch(error => {
            console.error('Error sending verification email:', error);
        });

        return NextResponse.json({ message: 'Teacher created. Please check your email to verify your account.' }, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error processing signup:', error.message, error.stack);
            return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
        } else {
            console.error('An unknown error occurred');
            return NextResponse.json({ message: 'An unknown error occurred' }, { status: 500 });
        }
    }
}
