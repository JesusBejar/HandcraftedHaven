"use client";

import axios from "axios";
import {useRouter} from 'next/navigation'
import React, { useState } from "react";
import Image from 'next/image'
// @refresh reset 
export default function RegisterForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [profile_pic, set_profile_pic] = useState<string>("")
  const [is_seller, set_is_seller] = useState<boolean>(false)
  const [business_name, set_business_name] = useState<string>("")
  const [seller_category, set_seller_category] = useState<string>("")
  const [seller_description, set_seller_description] = useState<string>("")
  const [username, set_username] = useState<string>("");
  const [profile_description, set_profile_description] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
   
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true); 
    const category = seller_category;
    const bus_description = business_name;
    const seller_details = is_seller ? {business_name, bus_description, category} : null;
    const profile_img = profile_pic;
    try {
      console.log({username, email, password , profile_img, profile_description, seller_details});
      
      const res = await axios.post("/api/addNewUser", {username, email, password , profile_img, profile_description, seller_details});
      
      if (res.data.success) {                
        await router.push('/login');
        localStorage.setItem("username", res.data.username);
      }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log(err);
      setErrorMessage("Registration failed. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
    
  }  
    return (
    
        <form className="space-y-6 outline-1 shadow-md px-10 py-10 bg-white" onSubmit={onSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900 text-left">Username</label>
            <div className="mt-2">
              <input 
                id="username" 
                name="username" 
                type="text" 
                value={username}
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const newUsername = e.target.value;
                  set_username(newUsername);
                }}
                required 
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
         
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} 
            required className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
          </div>
        </div> 
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" 
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
            required className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
          </div>
        </div>
        <div>
          <label htmlFor="profilePic" className="block text-sm font-medium leading-6 text-gray-900 text-left">Profile Picture</label>
            <div className="mt-2 flex items-center">
              {profile_pic && (
                <Image src={profile_pic} alt="Profile Preview" className="ml-4 h-10 w-10 rounded-full object-cover"/>
              )}
              <input 
                id="profilePic" 
                name="profilePic" 
                type="file" 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  try {
                    if (e.target.files?.[0]) {
                      const file = e.target.files[0];
                      const validExtensions = [".png", ".jpeg", ".jpg"];
                      const fileExtension = file.name.slice(file.name.lastIndexOf(".")).toLowerCase();
                      if (!validExtensions.includes(fileExtension)) {
                        throw new Error("Please upload a valid image file (png, jpeg, jpg, gif).");
                      }
                      set_profile_pic(URL.createObjectURL(file));
                    } else {
                      set_profile_pic("");
                    }
                  } catch (error) {
                    setErrorMessage((error as Error).message);
                  }
                }} 
                className="block w-full text-gray-900"
              />
            </div>
        </div>
        <div>
            <label htmlFor="profileDescription" className="block text-sm font-medium leading-6 text-gray-900 text-left">Profile Description</label>
            <div className="mt-2">
              <textarea 
              id="profileDescription" 
              name="profileDescription" 
              value={profile_description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set_profile_description(e.target.value)} 
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
              />
            </div>
            </div>
        <div>
          <p className="block text-sm font-medium leading-6 text-gray-900 text-left">Are you a seller?</p>
            <label htmlFor="isSeller" className="text-sm text-gray-900 pl-2"> Yes </label>
            <input  id="isSeller" name="isSeller" type="checkbox" checked={is_seller}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_is_seller(e.target.checked)} 
            className="h-4 w-4 text-cyan-900 border-gray-300 rounded focus:ring-cyan-900"/>
        </div>

        {is_seller && (
          <>
            <div>
              <label htmlFor="business_name" className="block text-sm font-medium leading-6 text-gray-900 text-left">Business Name</label>
              <div className="mt-2">
            <input id="business_name" name="business_name" type="text" value={business_name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_business_name(e.target.value)} 
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <label htmlFor="sellerCategory" className="block text-sm font-medium leading-6 text-gray-900 text-left">Seller Category</label>
              <div className="mt-2">
            <input id="sellerCategory" name="sellerCategory" type="text" value={seller_category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => set_seller_category(e.target.value)} 
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <label htmlFor="sellerDescription" className="block text-sm font-medium leading-6 text-gray-900 text-left">Seller Description</label>
              <div className="mt-2">
            <textarea id="sellerDescription" name="sellerDescription" value={seller_description}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => set_seller_description(e.target.value)} 
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
              </div>
            </div>
          </>
        )}

        
        {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
        <div>
          <button type="submit"  disabled={isLoading} className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoading ? 'Loading...' : 'Sign Up'}</button>
        </div>
      </form>
    );
  }

