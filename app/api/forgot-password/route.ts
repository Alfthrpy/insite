import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import { prisma } from '@/lib/prisma';


const generateResetToken = (email: string): string => {
  const secretKey = process.env.NEXTAUTH_SECRET as string; // Pastikan untuk menyimpan secret key di environment variable
  const token = jwt.sign({ email }, secretKey, {
    expiresIn: '1h', // Token berlaku selama 1 jam
  });
  return token;
};

export async function POST(request: Request) {
  const { email } = await request.json();

  const response = await prisma.user.findUnique({
    where:{email}
  })

  if(!response){
    return NextResponse.json({message: "User not found"},{status : 500})
  }

  // Generate a secure reset token
  const resetToken = generateResetToken(email)
  const resetLink = `${process.env.NEXTAUTH_URL}/reset-password?token=${resetToken}`;

  // Setup Nodemailer transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ADMIN_EMAIL,
    to: email,
    subject: 'Reset Passsword',
    text: `Link Reset Password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Reset link sent!' }, { status: 200 });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    console.log(error)
    return NextResponse.json({ message: 'Failed to send reset link',error  }, { status: 500 });
  }
}
