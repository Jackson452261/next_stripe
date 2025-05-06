import Stripe from "stripe";

// 檢查環境變數
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  console.error("Missing STRIPE_SECRET_KEY environment variable");
  // 提供一個空字符串作為後備，這樣代碼不會在導入時崩潰
  // 但在實際使用時會拋出更明確的錯誤
  throw new Error("Stripe API key is missing");
}

// 初始化 Stripe
export const stripe = new Stripe(stripeKey, {
  apiVersion: "2023-10-16", // 使用適當的 API 版本
});