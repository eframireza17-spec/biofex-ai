import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Telegram endpoint activo",
  });
}

export async function POST(req: Request) {
  try {
    const update = await req.json();

    console.log("UPDATE TELEGRAM:", JSON.stringify(update, null, 2));

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("ERROR TELEGRAM:", error);
    return NextResponse.json({ ok: false });
  }
}