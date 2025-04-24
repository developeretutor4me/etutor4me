// app/api/book-session/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import BookingModel from '../models/Booking'; // Adjust path as necessary
import { connectMongoDB } from '../connection/connection';
import {authOptions} from '@/app/auth/auth'; // Adjust path to your NextAuth options

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { teacherId, subjects, level, date, time,studentnote,IsTrialSession } = await req.json();


  if (!teacherId || !subjects || !level || !date || !time) {
    return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
  }

  try {
    await connectMongoDB(); // Ensure database connection

    const newBooking = new BookingModel({
      student: session.user.id, // Assuming `session.user.id` contains the student's ID
      teacher: teacherId,
      subjects,
      level,
      date,
      time,
      status: 'pending',
      meetingCompleted:false,
      startLink:"",
      joinLink:"",
      StudentNote:studentnote,
      IsTrialSession
    });

    await newBooking.save();

    return NextResponse.json({ message: 'Booking request sent successfully', booking: newBooking }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error creating booking:', error.message, error.stack);
      return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
    } else {
      console.error('An unknown error occurred');
      return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
