// components/FormLogin.tsx

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginFormSchema } from "@/lib/definitions";

const FormLogin = ({ onToggleMode }: { onToggleMode: () => void }) => {

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginFormSchema),
  });

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: any) {
    try {
      const response = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: `${window.location.origin}/dashboard`,
      });

      console.log(response);

      if (response?.error) {
        // Tangkap dan set error jika ada
        alert("Login gagal");
      } else {
        // Redirect ke halaman lain atau lakukan sesuatu saat login sukses
        alert("Login berhasil");
        router.push("/dashboard");
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error during registration:", error);
      alert(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
      <div className="logo">
        <img src="./img/image.png" alt="InSite Logo" />
        <h4>InSite</h4>
      </div>

      <div className="heading">
        <h2>Welcome Back</h2>
        <h6>Not registered yet?</h6>
        <a onClick={onToggleMode} className='toggle'>SignUp</a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
         <input {...register("email")} placeholder="Email" className='input-field' />
         {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="input-wrap">
        <input
              type="password"
              {...register("password")}
              placeholder="Password"
              className='input-field'
            />
            {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message as string}
            </p>
          )}
        </div>

        <button type="submit" className="sign-btn">
          Sign In
        </button>

        <div className="social-media">
          <p className="social-text">Or Sign in with</p>
          <a className="social-icon" onClick={()=>{signIn('google',{ callbackUrl: '/dashboard' })}}>
            <FontAwesomeIcon icon={faGoogle} />
          </a>
        </div>
      </div>
    </form>
  );
};

export default FormLogin;
