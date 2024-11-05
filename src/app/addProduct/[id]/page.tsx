"use client";

import axios from "axios";
import { useRouter , usePathname} from 'next/navigation';
import React, { use, useState } from "react";
import Image from 'next/image';


// @refresh reset 
export default function AddProductForm() {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [imageUrl, setImageUrl] = useState<string>("");
    const [price, setPrice] = useState<number>(0);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const path = usePathname();
    const idSeller = path.split("/")[2];
    console.log("Seller Id: ", idSeller);

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage(null);
        setIsLoading(true);

        try {
            const res = await axios.post("/api/addProduct", { title, price, imageUrl, idSeller, description});

            if (res.data.success) {
                // clear the form
                setTitle("");
                setPrice(0);
                setImageUrl("");
                setDescription("");

            }
        } catch (err) {
            console.log(err);
            setErrorMessage("Failed to add product. Please try again.");
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
                setImageUrl(reader.result as string);
            };
            reader.onerror = () => {
                console.log("Error");
            };
        }
    }

    return (
        <div className="flex justify-center items-center flex-col" style={{margin:'0 auto'}} > 
        <h1 className="text-2xl font-semibold text-center">Add Product</h1>

        <form className="space-y-6 outline-1 shadow-md px-10 py-10 bg-white" style={{maxWidth: '50%', margin: '0 auto'}} onSubmit={onSubmit}>
            <div>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900 text-left">Product Name</label>
                <div className="mt-2">
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={title}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
                        required
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900 text-left">Product Price</label>
                <div className="mt-2">
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={price}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPrice(parseFloat(e.target.value))}
                        required
                        className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium leading-6 text-gray-900 text-left">Product Image</label>
                <div className="mt-2 flex items-center">
                    {imageUrl && (
                        <Image src={imageUrl} alt="Product Preview" className="ml-4 h-10 w-10 rounded-full object-cover" />
                    )}
                    <input
                        id="imageUrl"
                        name="imageUrl"
                        type="file"
                        onChange={convertToBase64}
                        className="block w-full text-gray-900"
                    />
                </div>
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900 text-left">Product Description</label>
                <div className="mt-2">
                    <textarea
                        id="description"
                        name="description"
                        value={description}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value)}
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
                    {isLoading ? 'Loading...' : 'Add Product'}
                </button>
            </div>
        </form>
        </div>
    );
}