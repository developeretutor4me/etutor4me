export const dynamic = 'force-dynamic';


import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth"; // Adjust path as per your auth setup
import ParentModel from "@/app/api/models/Parent"; // Adjust path based on your project structure
import StudentModel from "@/app/api/models/Student"; // Adjust path based on your project structure
import {connectMongoDB} from "@/app/api/connection/connection"; // Ensure this function connects to your DB

export async function GET() {
  try {
    
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectMongoDB();
    

    const { role, id } = session.user;

    let userData;

    if (role === "parent") {
      userData = await ParentModel.findOne({ user: id }).select("firstName");
    } else if (role === "student") {
      userData = await StudentModel.findOne({ user: id }).select("firstName");
    } else {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    if (!userData) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ firstName: userData.firstName });
  } catch (error) {
    console.error("Error fetching first name:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
