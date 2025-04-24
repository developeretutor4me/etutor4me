import { NextRequest, NextResponse } from "next/server";
import Message from "@/app/api/models/TicketMessage";
import {connectMongoDB} from "@/app/api/connection/connection";
import { authOptions } from "@/app/auth/auth";
import { getServerSession } from "next-auth";

export async function GET(req:NextRequest, { params }:any) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    await connectMongoDB();
    const { ticketId } = params;

    const messages = await Message.find({ ticketId }).sort({ createdAt: 1 });

    return NextResponse.json({ success: true, messages }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
