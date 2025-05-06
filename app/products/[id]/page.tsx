// app/products/[id]/page.tsx
import Stripe from "stripe";
import Image from "next/image";
import { Metadata } from "next";

// 定義頁面參數類型
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// 獲取產品數據的函數
async function getProduct(id: string) {
  try {
    // 確保環境變數存在
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable");
    }

    // 初始化 Stripe
    const stripe = new Stripe(stripeKey, {
      apiVersion: "2023-10-16", // 使用適當的 API 版本
    });

    // 從 Stripe 獲取產品數據
    const product = await stripe.products.retrieve(id, {
      expand: ["default_price"], // 展開價格信息
    });

    return product;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

// 生成元數據
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProduct(params.id);
  
  return {
    title: product ? `${product.name} | 我的商店` : '產品未找到',
    description: product?.description || '產品詳情頁面',
  };
}

export default async function ProductPage({ params }: Props) {
  // 從 params 中獲取產品 ID
  const id = params.id;

  // 獲取產品數據
  const product = await getProduct(id);

  // 如果產品不存在，顯示錯誤信息
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">產品未找到</h1>
        <p className="mb-8">抱歉，我們找不到您要查看的產品。</p>
      </div>
    );
  }

  // 獲取產品價格
  const price = product.default_price as Stripe.Price;
  const amount = price?.unit_amount ? price.unit_amount / 100 : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* 產品圖片 */}
        <div className="mb-8">
          {product.images && product.images[0] ? (
            <div className="relative aspect-square w-full max-w-md mx-auto">
              <Image
                src={product.images[0]} // Stripe 提供的圖片 URL
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain"
              />
            </div>
          ) : (
            <div className="w-full h-64 flex items-center justify-center bg-gray-100">
              <span className="text-gray-400">無圖片</span>
            </div>
          )}
        </div>

        {/* 產品名稱 */}
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

        {/* 產品描述 */}
        <p className="text-gray-600 mb-6">{product.description}</p>

        {/* 產品價格 */}
        <div className="text-2xl font-bold mb-6">${amount.toFixed(2)}</div>

        {/* 加入購物車按鈕 */}
        <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
          加入購物車
        </button>
      </div>
    </div>
  );
}