import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next(); // Abaikan middleware untuk rute ini
  }

  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.substring(7);

  if (token !== process.env.SECRET_BEARER_TOKEN) {
    console.log(authHeader)
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"], // Terapkan middleware hanya pada rute API
};
