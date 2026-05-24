import { NextResponse } from "next/server";

let telegramReports: any[] = [];

function analizarMensaje(texto: string) {
  const lower = texto.toLowerCase();

  return {
    id: Date.now(),
    origen: "Telegram",
    mensajeOriginal: texto,
    parcela: lower.match(/parcela\s*(\d+)/)?.[1] || "No detectada",
    cultivo: lower.includes("tomate")
      ? "Tomate"
      : lower.includes("maíz") || lower.includes("maiz")
      ? "Maíz"
      : lower.includes("chile")
      ? "Chile"
      : "No detectado",
    evento: lower.includes("plaga")
      ? "Posible plaga"
      : lower.includes("riego")
      ? "Riego"
      : lower.includes("humedad")
      ? "Humedad"
      : "Reporte general",
    riesgo:
      lower.includes("plaga") || lower.includes("seca") || lower.includes("baja")
        ? "Medio"
        : "Bajo",
    recomendacion: lower.includes("plaga")
      ? "Revisar cultivo y aplicar control preventivo."
      : lower.includes("humedad") || lower.includes("seca")
      ? "Programar riego y revisar humedad del suelo."
      : "Monitorear la parcela.",
    fecha: new Date().toLocaleString("es-MX"),
    estado: "Pendiente de revisión",
  };
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Telegram endpoint activo",
    reports: telegramReports,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    console.log("UPDATE TELEGRAM:", JSON.stringify(body, null, 2));

    const mensaje = body.message?.text || "";
    const chatId = body.message?.chat?.id;

    if (!mensaje) {
      return NextResponse.json({ ok: true });
    }

    const reporte = analizarMensaje(mensaje);
    telegramReports.unshift(reporte);

    if (chatId && process.env.TELEGRAM_BOT_TOKEN) {
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: `Reporte recibido ✅\nParcela: ${reporte.parcela}\nCultivo: ${reporte.cultivo}\nEvento: ${reporte.evento}\nRiesgo: ${reporte.riesgo}`,
          }),
        }
      );
    }

    return NextResponse.json({ ok: true, reporte });
  } catch (error) {
    console.error("ERROR TELEGRAM:", error);

    return NextResponse.json({
      ok: false,
      error: "Error procesando mensaje de Telegram",
    });
  }
}