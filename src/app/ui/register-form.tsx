"use client";

import axios from "axios";
import {useRouter} from 'next/navigation'
import React, { useState } from "react";
import Image from 'next/image'
// @refresh reset 
export default function RegisterForm() {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [profilePic , setProfilePic] = useState<string>("")
  const [isSeller, setIsSeller] = useState<boolean>(false)
  const [businessName, setBusinessName] = useState<string>("")
  const [sellerCategory, setSellerCategory] = useState<string>("")
  const [sellerDescription, setSellerDescription] = useState<string>("")
  const [username, setUsername] = useState<string>("");
  const [profileDescription, setProfileDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  
  
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const sellerDetails = isSeller ? {businessName, sellerCategory, sellerDescription} : null;
    e.preventDefault();
    setErrorMessage(null);
    setIsLoading(true);
    try {
      const res = await axios.post("/api/register", {username, email, password , profilePic, profileDescription, sellerDetails});
      
      if (res.data.success) {                
        await router.push('/login');
        localStorage.setItem("username", res.data.username);
      }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
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
            setUsername(newUsername);
            // try {
            //   const res = await axios.post("/api/check-username", { username: newUsername });
            //   if (!res.data.available) {
            //     setErrorMessage("Username is already taken.");
            //   } else {
            //     setErrorMessage(null);
            //   }
            // } catch (err) {
            //   setErrorMessage("Error checking username availability.");
            // }
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
          <label htmlFor="profilePic" className="block text-sm font-medium leading-6 text-gray-900 text-left">Profile Picture</label>
            <div className="mt-2 flex items-center">
              {profilePic && (
                <Image src={profilePic} alt="Profile Preview" className="ml-4 h-10 w-10 rounded-full object-cover"/>
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
                      setProfilePic(URL.createObjectURL(file));
                    } else {
                      setProfilePic("");
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
              value={profileDescription}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setProfileDescription(e.target.value)} 
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"
              />
            </div>
            </div>
        <div>
          <label htmlFor="isSeller" className="block text-sm font-medium leading-6 text-gray-900 text-left">Are you a seller?</label>
            <label htmlFor="isSeller" className="text-sm text-gray-900 pl-2"> Yes 
            <input  id="isSeller" name="isSeller" type="checkbox" checked={isSeller}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsSeller(e.target.checked)} 
            className="h-4 w-4 text-cyan-900 border-gray-300 rounded focus:ring-cyan-900"/></label>
        </div>

        {isSeller && (
          <>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium leading-6 text-gray-900 text-left">Business Name</label>
              <div className="mt-2">
            <input id="businessName" name="businessName" type="text" value={businessName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBusinessName(e.target.value)} 
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <label htmlFor="sellerCategory" className="block text-sm font-medium leading-6 text-gray-900 text-left">Seller Category</label>
              <div className="mt-2">
            <input id="sellerCategory" name="sellerCategory" type="text" value={sellerCategory}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSellerCategory(e.target.value)} 
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
              </div>
            </div>

            <div>
              <label htmlFor="sellerDescription" className="block text-sm font-medium leading-6 text-gray-900 text-left">Seller Description</label>
              <div className="mt-2">
            <textarea id="sellerDescription" name="sellerDescription" value={sellerDescription}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setSellerDescription(e.target.value)} 
            className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-cyan-900 sm:text-sm sm:leading-6"/>
              </div>
            </div>
          </>
        )}

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
        {errorMessage && (
        <p className="text-red-500 text-sm text-center">{errorMessage}</p>
      )}
        <div>
          <button type="submit"  disabled={isLoading} className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{isLoading ? 'Loading...' : 'Sign Up'}</button>
        </div>
      </form>
    );
  }

