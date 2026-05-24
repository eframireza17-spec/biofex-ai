require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const { createClient } = require("@supabase/supabase-js");

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, {
  polling: true,
});

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    "🌱 Hola, soy tu bot Agro."
  );
});

bot.on("message", async (msg) => {

  if (msg.text?.startsWith("/start")) return;

  const { error } = await supabase
    .from("agro_reportes")
    .insert({
      telegram_user_id: msg.from.id,
      nombre: msg.from.first_name,
      mensaje: msg.text,
    });

  if (error) {
    console.log(error);

    bot.sendMessage(
      msg.chat.id,
      "❌ Error guardando mensaje."
    );

    return;
  }

  bot.sendMessage(
    msg.chat.id,
    "✅ Mensaje guardado."
  );
  
});