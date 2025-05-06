// components/ProductSearch.tsx
'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// 定義產品類型
interface Product {
  id: string;
  name: string;
  description: string | null;
  images: string[];
  price: number;
  currency: string;
}

interface ProductSearchProps {
  products: Product[];
}

export default function ProductSearch({ products }: ProductSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  
  // 過濾產品
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* 搜索欄 */}
      <div className="mb-8 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {/* 產品列表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* 產品圖片 */}
              <div className="aspect-square relative bg-gray-100">
                {product.images[0] ? (
                <Image
                src={product.images[0]}
                alt={product.name}
                width={500}  // 添加寬度
                height={500} // 添加高度
                className="w-full h-full object-cover"
              />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">No image</span>
                  </div>
                )}
              </div>
              
              {/* 產品資訊 */}
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                  {product.description}
                </p>
                <p className="font-bold text-lg mb-4">${product.price.toFixed(2)}</p>
                
                {/* 查看詳情按鈕 */}
                <Link 
                  href={`/products/${product.id}`}
                  className="block w-full bg-blue-500 text-white text-center py-4 px-4 rounded hover:bg-red-600 transition-colors font-medium text-lg"
                >
                  產品詳細
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-10">
        <p className="text-gray-500 text-lg">No products found matching &quot;{searchTerm}&quot;</p>
          </div>
        )}
      </div>
    </>
  );
}