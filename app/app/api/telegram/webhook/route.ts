import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const update = await req.json();

    const message = update.message;

    const text = message?.text || "";
    const user = message?.from?.first_name || "Usuario";
    const chatId = message?.chat?.id;

    console.log("Mensaje recibido:", {
      user,
      chatId,
      text,
    });

    return NextResponse.json({
      ok: true,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json({
      ok: false,
    });
  }
}