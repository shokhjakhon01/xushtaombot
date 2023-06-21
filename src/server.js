import dotenv from "dotenv";
dotenv.config();
import TelegramBot from "node-telegram-bot-api";
import {
  foodKeyboards,
  locationKeyboards,
  mainKeyboards,
  quyuqOvqatKeyboards,
  quyuqSingleKetboards,
  suyuqOvqatKeyboards,
  waterKeyboards,
} from "./utils/utils.js";

const bot = new TelegramBot(process.env.TOKEN, {
  polling: true,
});

let currentMenuLevel = "main";

bot.onText(/\/start/, (msg) => {
  const user = `Assalomu Alaykum ${msg.chat.first_name} ${msg.chat.last_name} botimizga xush kelibsiz `;
  const userId = msg.chat.id;

  currentMenuLevel = "main";
  bot.sendMessage(userId, user, mainKeyboards);
});

bot.onText(/🥙 Ovqatlar/, async (msg) => {
  currentMenuLevel = "ovqatlar";
  await bot.sendMessage(
    msg.chat.id,
    "Bizning kafeda 20dan ortiq taom turlari bor",
    foodKeyboards
  );
});

bot.onText(/🥂 Ichimliklar/, (msg) => {
  currentMenuLevel = "ichimliklar";
  bot.sendMessage(
    msg.chat.id,
    "Xushtaom kafesidan 30 dan ortiq xildagi yahna ichimlikarni va issiq choylar mavjud.",
    waterKeyboards
  );
});

bot.onText(/✅ Buyurtma Berish/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    "Buyurtma berish uchun +998 94 696 29 83 raqamiga bog'laning yoki @xushadmin ga murojaat qiling😊"
  );
});

bot.onText(/Buyurtma berish/, async (msg) => {
  await bot.sendMessage(
    msg.chat.id,
    "Buyurtma berish uchun +998 94 696 29 83 raqamiga bog'laning yoki @xushadmin ga murojaat qiling😊"
  );
});

bot.onText(/📍 Manzilimiz/, async (msg) => {
  currentMenuLevel = "manzil";
  await bot.sendMessage(
    msg.chat.id,
    "Xushtaom kafesi shahrimizning 1 ta qismida xizmat ko'rsatadi.",
    locationKeyboards
  );
});

bot.onText(/Go back/, (msg) => {
  const chatId = msg.chat.id;

  switch (currentMenuLevel) {
    case "ovqatlar":
      currentMenuLevel = "main";
      bot.sendMessage(chatId, "Returning to Main Menu.", mainKeyboards);
      break;
    case "ichimliklar":
      currentMenuLevel = "main";
      bot.sendMessage(chatId, "Returning to Main Menu.", mainKeyboards);
      break;
    case "buyurtma":
      currentMenuLevel = "main";
      bot.sendMessage(chatId, "Returning to Main Menu.", mainKeyboards);
      break;
    case "manzil":
      currentMenuLevel = "main";
      bot.sendMessage(chatId, "Returning to Main Menu.", mainKeyboards);
      break;
    case "quyuq":
      currentMenuLevel = "ovqatlar";
      bot.sendMessage(chatId, "Returning to Main Ovqatlar", foodKeyboards);
      break;
    case "suyuq":
      currentMenuLevel = "ovqatlar";
      bot.sendMessage(chatId, "Returning to Main Ovqatlar", foodKeyboards);
      break;
    case "osh":
      currentMenuLevel = "quyuq";
      bot.sendMessage(chatId, "Returning to quyuq", quyuqOvqatKeyboards);
      break;
    case "norin":
      currentMenuLevel = "quyuq";
      bot.sendMessage(chatId, "Returning to quyuq", quyuqOvqatKeyboards);
      break;
    case "shurva":
      currentMenuLevel = "suyuq";
      bot.sendMessage(chatId, "Returning to suyuq", suyuqOvqatKeyboards);
      break;
    case "mastava":
      currentMenuLevel = "suyuq";
      bot.sendMessage(chatId, "Returning to suyuq", suyuqOvqatKeyboards);
      break;
    case "cola":
      currentMenuLevel = "ichimliklar";
      bot.sendMessage(chatId, "Returning to Ichimliklar", waterKeyboards);
      break;
    case "fanta":
      currentMenuLevel = "ichimliklar";
      bot.sendMessage(chatId, "Returning to Ichimliklar", waterKeyboards);
      break;
    case "pepsi":
      currentMenuLevel = "ichimliklar";
      bot.sendMessage(chatId, "Returning to Ichimliklar", waterKeyboards);
      break;
    default:
      bot.sendMessage(chatId, "Returning to main menu...", mainKeyboards);
      bot.emit("/start", msg);
      break;
  }
});

bot.on("message", async (msg) => {
  if (msg.text === "Quyuq ovqatlar" && currentMenuLevel === "ovqatlar") {
    currentMenuLevel = "quyuq";
    await bot.sendMessage(
      msg.chat.id,
      "10 dan ortiq quyuq ovqatlarimizdan tanlashingiz mumkin.",
      quyuqOvqatKeyboards
    );
  }

  if (msg.text === "Suyuq Ovqatlar" && currentMenuLevel === "ovqatlar") {
    currentMenuLevel = "suyuq";
    await bot.sendMessage(
      msg.chat.id,
      "10 dan ortiq suyuq ovqatlarimizdan tanlashingiz mumkin.",
      suyuqOvqatKeyboards
    );
  }

  if (msg.text === "Osh Palov" && currentMenuLevel === "quyuq") {
    currentMenuLevel = "osh";
    await bot.sendMessage(msg.chat.id, "Narxi: 25000", quyuqSingleKetboards);
    await bot.sendPhoto(
      msg.chat.id,
      `https://img-global.cpcdn.com/recipes/5bd496cc72932dfc/680x482cq70/plov-recipe-main-photo.webp`
    );
  }

  if (msg.text === "Norin" && currentMenuLevel === "quyuq") {
    currentMenuLevel = "norin";
    await bot.sendMessage(msg.chat.id, "Narxi: 40000", quyuqSingleKetboards);
    await bot.sendPhoto(
      msg.chat.id,
      `https://www.centralasia-travel.com/upload/text/naryn-02.jpg`
    );
  }

  if (msg.text === "Shurva" && currentMenuLevel === "suyuq") {
    currentMenuLevel = "shurva";
    await bot.sendMessage(msg.chat.id, "Narxi: 27000", quyuqSingleKetboards);
    await bot.sendPhoto(
      msg.chat.id,
      `https://abasayyoh.com/uploaded_images/pages/1/338.jpg`
    );
  }

  if (msg.text === "Mastava" && currentMenuLevel === "suyuq") {
    currentMenuLevel = "mastava";
    await bot.sendMessage(msg.chat.id, "Narxi: 20000", quyuqSingleKetboards);
    await bot.sendPhoto(
      msg.chat.id,
      `https://st.depositphotos.com/11514368/53872/i/450/depositphotos_538727988-stock-photo-mastava-soup-uzbek-rice-soup.jpg`
    );
  }

  if (msg.text === "Coca-cola" && currentMenuLevel === "ichimliklar") {
    currentMenuLevel = "cola";
    await bot.sendMessage(
      msg.chat.id,
      "Narxi: \n 1L - 12000 \n 1.5L - 14000",
      quyuqSingleKetboards
    );
    await bot.sendPhoto(
      msg.chat.id,
      `https://images.heb.com/is/image/HEBGrocery/000145352-1?jpegSize=150&hei=1400&fit=constrain&qlt=75`
    );
  }

  if (msg.text === "Fanta" && currentMenuLevel === "ichimliklar") {
    currentMenuLevel = "fanta";
    await bot.sendMessage(
      msg.chat.id,
      "Narxi: \n 1L - 12000 \n 1.5L - 14000",
      quyuqSingleKetboards
    );
    await bot.sendPhoto(
      msg.chat.id,
      `https://www.biltongstmarcus.co.uk/wp-content/uploads/2019/03/940px-x-659px-WEB-PRODUCT-2023-06-06T151216.446-660x463.png`
    );
  }

  if (msg.text === "Pepsi" && currentMenuLevel === "ichimliklar") {
    currentMenuLevel = "pepsi";
    await bot.sendMessage(
      msg.chat.id,
      "Narxi: \n 1L - 12000 \n 1.5L - 14000",
      quyuqSingleKetboards
    );
    await bot.sendPhoto(
      msg.chat.id,
      `https://target.scene7.com/is/image/Target/GUEST_1361a461-e2b2-4de2-98aa-4007e6d8b5c2?wid=740&hei=740&qlt=80&fmt=webp`
    );
  }

  if (msg.text === "Selxoz filialimiz") {
    const chatId = msg.chat.id;
    const latitude = 40.7128;
    const longitude = -74.006;

    await bot.sendLocation(chatId, latitude, longitude);
  }
});
