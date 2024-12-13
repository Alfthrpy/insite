// components/FormSignUp.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RegisterFormSchema } from "@/lib/definitions";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import toast from "react-hot-toast";

const FormSignUp = ({ onToggleMode }: { onToggleMode: () => void }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegisterFormSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function onSubmit(data: any) {
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Periksa apakah respons OK
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Terjadi kesalahan pada server.");
      }

      const result = await response.json();
      console.log("Registration successful:", result);
      toast.success('Register Berhasil, Silahkan Login!', { duration: 2000 }); // Toast akan tampil selama 3 detik
        setTimeout(() => {
          router.push('/login'); // Pindah ke halaman dashboard setelah 3 detik
        }, 3000);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error during registration:", error);
      toast.error(error.message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
      <div className="logo">
        <img src="./img/image.png" alt="InSite Logo" />
        <h4>InSite</h4>
      </div>

      <div className="heading">
        <h2>Get Started</h2>
        <h6>Already have an account?</h6>
        <a onClick={onToggleMode} className="text-purple">  Sign In
        </a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message as string}
          </p>
        )}
          <input
            {...register("name")}
            placeholder="Name"
            className="input-field"
          />
        </div>


        <div className="input-wrap">
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message as string}
            </p>
          )}
          <input
            {...register("email")}
            placeholder="Email"
            className="input-field"
          />
        </div>


        <div className="input-wrap">
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message as string}
          </p>
        )}
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input-field"
          />
        </div>


        <div className="input-wrap">
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message as string}</p>
        )}
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="input-field"
          />
        </div>


        <button type="submit" className="sign-btn">
          {isSubmitting ? (<span className="loading loading-spinner loading-xs"></span>) : ("Sign Up")}
        </button>

        <div className="social-media">
          <p className="social-text">Or Sign up with</p>
          <a href="#" className="social-icon">
            <FontAwesomeIcon icon={faGoogle} />
          </a>
        </div>
      </div>
    </form>
  );
};

export default FormSignUp;
