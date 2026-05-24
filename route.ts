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
      : "No detectado",

    problema: lower.includes("plaga")
      ? "Posible plaga"
      : lower.includes("roya")
      ? "Roya"
      : lower.includes("humedad")
      ? "Humedad baja"
      : "Reporte general",

    prioridad:
      lower.includes("alta") ||
      lower.includes("grave") ||
      lower.includes("plaga")
        ? "Alta"
        : "Media",

    recomendacion: lower.includes("plaga")
      ? "Aplicar control preventivo."
      : "Monitorear el lote.",

    estado: "Pendiente",
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
    const update = await req.json();

    console.log("UPDATE TELEGRAM:", JSON.stringify(update, null, 2));

    const mensaje = update.message?.text || "";

    const chatId = update.message?.chat?.id;

    if (!mensaje) {
      return NextResponse.json({
        ok: true,
      });
    }

    const reporte = analizarReporte(mensaje);

    reports.unshift(reporte);

    // RESPUESTA DEL BOT

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
              `Recomendación IA: ${reporte.recomendacion}`,
          }),
        }
      );
    }

    return NextResponse.json({
      ok: true,
      reporte,
    });
  } catch (error) {
    console.error("ERROR TELEGRAM:", error);

    return NextResponse.json({
      ok: false,
    });
  }
}