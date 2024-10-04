import LoginForm from '@/app/ui/login-form';
import Image from 'next/image';
import { Metadata } from 'next';
 
export const metadata: Metadata = {
  title: 'Login',
};


export default function LoginPage() {
    return (

        <main className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div className="sm:mx-auto sm:w-full sm:max-w-sm">
  <Image
  className="mx-auto h-16 w-auto"
  src="/logo_handcraftedhaven.png" 
  alt="Handcrafted Haven logo"
  width={300} 
  height={300} 
/>

    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-red-950">Sign in to your account</h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <LoginForm />

    <p className="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="#" className="font-semibold leading-6"> Create your account</a>
    </p>
  </div>

      </main>
    );
  }