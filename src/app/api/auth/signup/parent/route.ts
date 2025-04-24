// signup.ts
import { hash } from 'bcryptjs';
import { connectMongoDB } from '../../../connection/connection';
import UserModel from '../../../models/User';
import ParentModel from '../../../models/Parent';
import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '../../../utils/sendEmail';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
    try {
        const { email, password, parent,referId } = await req.json();
       

        // Validate required fields
        const requiredFields = ['firstName', 'lastName', 'levelOfStudy', 'grade', 'availability', 'phoneNumber'];
        for (const field of requiredFields) {
            if (!parent[field]) {
                console.error(`Validation failed: Missing field ${field}`);
                return NextResponse.json({ message: `Missing field: ${field}` }, { status: 422 });
            }
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
            role: 'parent',
        });

        const savedUser = await newUser.save();
        // Award the etokis to the referring user
        if (referredBy) {
            await UserModel.findByIdAndUpdate(referredBy, { $inc: { etokis: 5 } });
           
        }
        const newParent = new ParentModel({
            user: savedUser._id,
            gradeLevel: parent.gradeLevel,
            grade: parent.grade,
            Institution:parent.Institution,
            levelOfStudy: parent.levelOfStudy,
            age:parent.age,
            subjectChildNeeds: parent.subjectChildNeeds,
            additionalInformation: parent.additionalInformation,
            availability: parent.availability,
            childInformation: parent.childInformation, // Add this if required
            parentPersonalInformation: parent.parentPersonalInformation, // Add this if required
            firstName: parent.firstName,
            lastName: parent.lastName,
            phoneNumber: parent.phoneNumber,
        });

      

        await newParent.save();

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
       
        
        // Send the generated token to the sendVerificationEmail function
        await sendVerificationEmail(savedUser.email, token).catch(error => {
            console.error('Error sending verification email:', error);
        });

        return NextResponse.json({ message: 'Parent created. Please check your email to verify your account.' }, { status: 201 });
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
