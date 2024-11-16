// components/FormSignUp.tsx
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RegisterFormSchema } from "@/lib/definitions";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const FormSignUp = ({ onToggleMode }: { onToggleMode: () => void }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
      alert("Registration successful");
      router.push("login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Error during registration:", error);
      alert(error.message);
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
        <a onClick={onToggleMode} className="toggle">
          Sign In
        </a>
      </div>

      <div className="actual-form">
        <div className="input-wrap">
          <input
            {...register("name")}
            placeholder="Name"
            className="input-field"
          />
        </div>
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {errors.name.message as string}
          </p>
        )}

        <div className="input-wrap">
          <input
            {...register("email")}
            placeholder="Email"
            className="input-field"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {errors.email.message as string}
          </p>
        )}

        <div className="input-wrap">
          <input
            type="password"
            {...register("password")}
            placeholder="Password"
            className="input-field"
          />
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message as string}
          </p>
        )}

        <div className="input-wrap">
          <input
            type="password"
            {...register("confirmPassword")}
            placeholder="Confirm Password"
            className="input-field"
          />
        </div>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword.message as string}</p>
        )}

        <button type="submit" className="sign-btn">
          Sign Up
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
