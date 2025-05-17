import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import TutorDocument from "../models/TutorDocument";
import { connectMongoDB } from "../connection/connection";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/auth";

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY!,
    secretAccessKey: process.env.AWS_SECRET_KEY!,
  },
});

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();

    // Parse the incoming form data
    const formData = await req.formData();
    const files = formData.getAll("files");

    if (
      !files ||
      files.length === 0 ||
      !files.every((file) => file instanceof File)
    ) {
      return NextResponse.json(
        { success: false, error: "No valid files provided" },
        { status: 400 }
      );
    }

    const uploadedFiles = [];
    const timestamp = Date.now();

    for (const file of files) {
      const buffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${timestamp}-${file.name}`;

      const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        Body: buffer,
        ContentType: file.type,
      };

      // Create the command to upload the file
      const command = new PutObjectCommand(uploadParams);

      // Upload to S3
      await s3.send(command);

      // Generate file URL
      const fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
      uploadedFiles.push({ fileName: file.name, fileUrl });
    }

    const { userid, teacher, subject, purpose } = Object.fromEntries(
      formData.entries()
    );

    // Save document details to MongoDB
    const newDocument = await TutorDocument.create({
      user: userid || session.user.id,
      teacher,
      subject,
      purpose,
      files: uploadedFiles,
    });

    return NextResponse.json({
      success: true,
      document: newDocument,
      uploadedFiles,
    });
  } catch (error) {
    console.error("File upload error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload files" },
      { status: 500 }
    );
  }
}
