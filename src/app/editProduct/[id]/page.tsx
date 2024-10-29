"use client";

import axios from "axios";
import { usePathname, useRouter } from 'next/navigation';
import React, { useState, useEffect } from "react";
import Image from 'next/image';

// @refresh reset 

export default function EditProductForm() {
    const [product_name, setProductName] = useState<string>("");
    const [product_price, setProductPrice] = useState<number>(0);
    const [seller_ID, setSellerID] = useState<string>("");
    const [product_image, setProductImage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const searchParams = usePathname();
    const productId = searchParams.split("/")[2];
    console.log(productId);

    async function fetchUser() {
        const userId = localStorage.getItem("_id");
        if (!userId) {
            console.error("User ID not found in localStorage");
            return;
        }

        try {
            const response = await fetch(`/api/getUserByID?id=${userId}`);
            const data = await response.json();

            if (!data) {
                console.error("No data received");
                return;
            }

            setSellerID(data._id);
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    }
    
   


    useEffect(() => {
        // Fetch product details to edit
        const fetchProduct = async () => {
            try {
                const res = await axios.get(`/api/products/${productId}`);
                const product = res.data;
                setProductName(product.product_name);
                setProductPrice(product.product_price);
                setProductImage(product.product_image);
                setSellerID(product.seller_ID);
            } catch (err) {
                console.log(err);
                setErrorMessage("Failed to fetch product details. Please try again.");
            }
        };

        fetchProduct();
    }, [productId]);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        try {
            const res = await axios.put(`/api/products/${productId}`, { product_name, product_price, product_image, seller_ID });

            if (res.data.success) {
                await router.push('/products');
            }
        } catch (err) {
            console.log(err);
            setErrorMessage("Failed to update product. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    function convertToBase64(e: React.ChangeEvent<HTMLInputElement>) {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setProductImage(reader.result as string);
            };
            reader.onerror = () => {
                console.log("Error");
            };
        }
    }

    return (
        <div className="flex justify-center items-center flex-col" style={{margin: '0 auto'}} > 
        <h1 className="text-2xl font-semibold text-center">Edit Product</h1>
        <form className="space-y-6 outline-1 shadow-md px-10 py-10 bg-white mx-auto my-0"style={{maxWidth: '50%', margin: '0 auto'}} onSubmit={onSubmit}>
            <div>
                <label htmlFor="product_name" className="block text-sm font-medium leading-6 text-gray-900 text-left">Product Name</label>
                <div className="mt-2">
                    <input
                        id="product_name"
                        name="product_name"
                        type="text"
                        value={product_name}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductName(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="product_price" className="block text-sm font-medium leading-6 text-gray-900 text-left">Product Price</label>
                <div className="mt-2">
                    <input
                        id="product_price"
                        name="product_price"
                        type="number"
                        value={product_price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProductPrice(parseFloat(e.target.value))}
                        required
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="product_image" className="block text-sm font-medium leading-6 text-gray-900 text-left">Product Image</label>
                <div className="mt-2 flex items-center">
                    {product_image && (
                        <Image src={product_image} alt="Product Preview" className="ml-4 h-10 w-10 rounded-full object-cover" />
                    )}
                    <input
                        id="product_image"
                        name="product_image"
                        type="file"
                        onChange={convertToBase64}
                        className="block w-full text-gray-900"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="seller_ID" className="block text-sm font-medium leading-6 text-gray-900 text-left">Seller ID</label>
                <div className="mt-2">
                    <input
                        id="seller_ID"
                        name="seller_ID"
                        type="text"
                        value={seller_ID}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSellerID(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            {errorMessage && (
                <p className="text-red-500 text-sm text-center">{errorMessage}</p>
            )}

            <div>
                <button type="submit" disabled={isLoading} className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    {isLoading ? 'Loading...' : 'Update Product'}
                </button>
            </div>
        </form>
        </div>
    );
}