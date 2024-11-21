import { NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const { password, token } = await request.json();
  const hashedPassword = await bcrypt.hash(password, 10);
  const verifyResetToken = (token: string): string | jwt.JwtPayload | null => {
    try {
      const secretKey = process.env.NEXTAUTH_SECRET as string;
      const decoded = jwt.verify(token, secretKey); // Ini akan throw error jika token sudah expired
      return decoded
    } catch (error) {
      // Token kadaluwarsa atau tidak valid
      console.error(error);
      return null;  
    }
  };

  const result = verifyResetToken(token)
  if (result && typeof result !== 'string') {
    const { email } = result as JwtPayload; // Pastikan result adalah objek dengan menggunakan type assertion
  
    await prisma.user.update({
      where: { email: email as string }, // Pastikan email adalah string
      data: { password: hashedPassword },
    });
  } else {
    // Handle case jika token tidak valid atau tidak ada email
    console.error('Token is invalid or does not contain an email');
  }


  
  return NextResponse.json({ message: 'Password reset successful!' }, { status: 200 });
}
