// app/page.tsx
import { stripe } from "@/lib/stripe";
import ProductSearch from "@/app/components/ProductsSearch";

export default async function Home() {
  const { data: products } = await stripe.products.list({
    expand: ["data.default_price"],
    limit: 9, // 只獲取9個產品
    active: true,
  });

  // 將產品數據轉換為可序列化的格式
  const serializedProducts = products.map(product => {
    const price = product.default_price as { unit_amount: number; currency: string };
    const amount = price?.unit_amount ? price.unit_amount / 100 : 0;
    
    return {
      id: product.id,
      name: product.name,
      description: product.description,
      images: product.images,
      price: amount,
      currency: price?.currency || 'usd'
    };
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 頁面標題 */}
      <h1 className="text-3xl font-bold text-center mb-6">All Products</h1>
      
      {/* 搜索組件 */}
      <ProductSearch products={serializedProducts} />
    </div>
  );
}