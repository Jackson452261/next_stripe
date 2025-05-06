"use client";

import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md py-4 px-6 relative">
            <div className="container mx-auto">
                {/* 桌面版 */}
                <div className="hidden md:block">
                    {/* Logo / 商店名稱 - 在最左邊 */}
                    <div className="absolute left-6 top-1/2 transform -translate-y-1/2">
                        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
                            E-commerce Shop
                        </Link>
                    </div>
                    
                    {/* 導航連結 - 在中間 */}
                    <div className="flex justify-center items-center space-x-8">
                        <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            首頁
                        </Link>
                        <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            產品頁面
                        </Link>
                        <Link href="/checkout" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                            結帳頁面
                        </Link>
                    </div>
                </div>
                
                {/* 手機版頂部 */}
                <div className="md:hidden flex items-center justify-between">
                    {/* Logo / 商店名稱 */}
                    <div>
                        <Link href="/" className="text-xl font-bold text-blue-600 hover:text-blue-800 transition-colors">
                            E-commerce Shop
                        </Link>
                    </div>
                    
                    {/* 手機版菜單按鈕 */}
                    <div>
                        <button 
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* 手機版下拉菜單 */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 space-y-4 pb-3">
                        <Link 
                            href="/" 
                            className="block text-center py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            首頁
                        </Link>
                        <Link 
                            href="/products" 
                            className="block text-center py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            產品頁面
                        </Link>
                        <Link 
                            href="/checkout" 
                            className="block text-center py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                            onClick={() => setIsMenuOpen(false)}>
                            結帳頁面
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}