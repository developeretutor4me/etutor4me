import { hash } from 'bcryptjs';
import { connectMongoDB } from '../../connection/connection';
import UserModel from '../../models/User';
import StudentModel from '../../models/Student';
import { NextRequest, NextResponse } from 'next/server';
import { sendVerificationEmail } from '../../utils/sendEmail';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password, student,referId } = await req.json();

    if (!email || !password || !student || !student.grade || !student.levelOfStudy) {
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
      // Award the etokis to the referring user
      if (referredBy !=null) {
        await UserModel.findByIdAndUpdate(referredBy, { $inc: { etokis: 5 } });
       
    }








    const hashedPassword = await hash(password, 12);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      referredBy,
      role: 'student',
    });
    const savedUser = await newUser.save();
    const newStudent = new StudentModel({
      user: savedUser._id,
      levelOfStudy: student.levelOfStudy,
      grade: student.grade,
      subjects: student.subjects,
      personalInformation: {
        country: student.personalInformation.country,
        city: student.personalInformation.city,
        streetName: student.personalInformation.streetName,
        zipcode: student.personalInformation.zipcode,
        institution: student.personalInformation.institution,
        age: student.personalInformation.age,
      },
      additionalInformation: student.additionalInformation,
      availability: student.availability,
      firstName: student.firstName,
      lastName: student.lastName,
      phoneNumber: student.phoneNumber,
  
    });
    await newStudent.save();
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


    await sendVerificationEmail(savedUser.email, token).catch(error => {
      console.error('Error sending verification email:', error);
    });
    return NextResponse.json({ message: 'Student created. Please check your email to verify your account.' }, { status: 201 });
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
