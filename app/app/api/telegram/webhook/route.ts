import { NextResponse } from "next/server";

let reports: any[] = [];

function analizarReporte(texto: string) {
  const lower = texto.toLowerCase();

  return {
    id: Date.now(),

    fecha: new Date().toLocaleString("es-MX"),

    origen: "Telegram",

    mensajeOriginal: texto,

    parcela:
      lower.match(/parcela\s*(\d+)/)?.[1] ||
      lower.match(/lote\s*(\d+)/)?.[1] ||
      "No detectada",

    cultivo: lower.includes("tomate")
      ? "Tomate"
      : lower.includes("maíz") || lower.includes("maiz")
      ? "Maíz"
      : lower.includes("chile")
      ? "Chile"
      : lower.includes("sorgo")
      ? "Sorgo"
      : "No detectado",

    problema: lower.includes("plaga")
      ? "Posible plaga"
      : lower.includes("roya")
      ? "Roya"
      : lower.includes("humedad")
      ? "Humedad baja"
      : lower.includes("riego")
      ? "Riego"
      : "Reporte general",

    prioridad:
      lower.includes("urgente") ||
      lower.includes("alta") ||
      lower.includes("grave") ||
      lower.includes("plaga")
        ? "Alta"
        : "Media",

    recomendacion: lower.includes("plaga")
      ? "Realizar inspección técnica y aplicar control preventivo."
      : lower.includes("humedad") || lower.includes("seca")
      ? "Programar riego y revisar humedad del suelo."
      : lower.includes("roya")
      ? "Revisar severidad y considerar aplicación preventiva de fungicida."
      : "Monitorear el lote y registrar seguimiento.",

    estado: "Pendiente de revisión",
  };
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    reports,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const mensaje = body.message?.text || "";
    const chatId = body.message?.chat?.id;

    if (!mensaje) {
      return NextResponse.json({
        ok: true,
      });
    }

    const reporte = analizarReporte(mensaje);

    reports.unshift(reporte);

    if (chatId && process.env.TELEGRAM_BOT_TOKEN) {
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            chat_id: chatId,

            text:
              `Reporte recibido ✅\n\n` +
              `Parcela/Lote: ${reporte.parcela}\n` +
              `Cultivo: ${reporte.cultivo}\n` +
              `Problema: ${reporte.problema}\n` +
              `Prioridad: ${reporte.prioridad}\n\n` +
              `Recomendación: ${reporte.recomendacion}`,
          }),
        }
      );
    }

    return NextResponse.json({
      ok: true,
      reporte,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json({
      ok: false,
      error: "Error procesando reporte",
    });
  }
}