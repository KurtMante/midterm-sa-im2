import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ user: null }, { status: 200 });
  }

  try {
    const decoded: any = jwt.verify(token, "secret-key");
    return NextResponse.json({ user: decoded.user }, { status: 200 });
  } catch (err) {
    console.error("JWT verification failed:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}
