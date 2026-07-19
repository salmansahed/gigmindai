"use client";

import { authClient } from "@/lib/auth-client";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
} from "@heroui/react";
import { Eye, EyeSlash } from "@gravity-ui/icons";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { toast } from "react-toastify";
import { FiLogIn } from "react-icons/fi";

const LoginForm = () => {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());

    const { error } = await authClient.signIn.email({
      email: userData.email,
      password: userData.password,
      rememberMe: true,
      callbackURL: "/",
    });
    if (error) {
      toast.error("Login failed: " + error.message);
    } else {
      toast.success("Login successful! Redirecting...");
      router.push("/");
    }
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Form
      className="flex w-full max-w-lg flex-col gap-5 shadow-2xl shadow-[#06b6d4]/5 rounded-3xl border border-white/10 p-6 md:p-8 bg-white/5 backdrop-blur-xl text-white"
      onSubmit={onSubmit}
    >
      <div className="space-y-1 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Welcome Back!
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          Enter your credentials to access your GigMind AI account.
        </p>
      </div>

      {/* Email Field */}
      <TextField
        isRequired
        className="w-full flex flex-col gap-1.5"
        validate={(value) => {
          if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
            return "Please enter a valid email address";
          }
          return null;
        }}
      >
        <Label className="text-sm font-semibold text-slate-300">Email</Label>
        <Input
          name="email"
          type="email"
          placeholder="Enter your email address"
          className="h-12 text-sm rounded-xl border border-white/10 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white/5 text-white placeholder:text-slate-500 transition-all duration-200 px-4 w-full"
        />
        <FieldError className="text-xs font-medium text-rose-500 mt-0.5" />
      </TextField>

      {/* Password Field */}
      <TextField
        className="w-full flex flex-col gap-1.5"
        name="password"
        isRequired
        validate={(value) => {
          if (value.length < 8) {
            return "Password must be at least 8 characters";
          }
          if (!/[A-Z]/.test(value)) {
            return "Password must contain at least one uppercase letter";
          }
          if (!/[0-9]/.test(value)) {
            return "Password must contain at least one number";
          }
          return null;
        }}
      >
        <Label className="text-sm font-semibold text-slate-300">Password</Label>
        <InputGroup className="h-12 border rounded-xl border-white/10 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white/5 overflow-hidden transition-all duration-200">
          <InputGroup.Input
            name="password"
            className="w-full h-full text-sm pl-4 border-none bg-transparent focus:ring-0 focus:outline-hidden text-white placeholder:text-slate-500"
            type={isVisible ? "text" : "password"}
            placeholder="Enter your password"
          />
          <InputGroup.Suffix className="pr-3 flex items-center bg-transparent">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              className="hover:bg-white/10 rounded-lg text-slate-400 hover:text-white"
              onPress={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye className="size-4.5" />
              ) : (
                <EyeSlash className="size-4.5" />
              )}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>

        <Description className="text-xs text-slate-400 mt-0.5">
          Must be at least 8 characters with 1 uppercase and 1 number
        </Description>

        <FieldError className="text-xs font-medium text-rose-500 mt-0.5" />
      </TextField>

      {/* Login Button */}
      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          variant="secondary"
          className="w-full h-12 text-xs font-black uppercase tracking-widest text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-cyan-400 hover:shadow-[0_0_24px_rgba(6,182,212,0.5)] rounded-xl transition-all duration-300 active:scale-98 group cursor-pointer"
        >
          <FiLogIn className="group-hover:translate-x-2 transition-all duration-300 text-sm" />
          Login
        </Button>
      </div>

      <div className="relative flex py-1 items-center">
        <div className="grow border-t border-white/10"></div>
        <span className="shrink mx-4 text-xs font-medium text-slate-400">
          OR
        </span>
        <div className="grow border-t border-white/10"></div>
      </div>

      {/* Social Login Button */}
      <div className="flex flex-col gap-3 items-center justify-center w-full">
        <Button
          onClick={handleGoogleLogin}
          variant="outline"
          className="h-12 w-full font-medium rounded-xl text-white border border-white/10 bg-transparent hover:bg-white/10 shadow-xs transition-all duration-200 active:scale-98 cursor-pointer"
        >
          <FcGoogle className="size-5 mr-1" />
          Continue with Google
        </Button>
      </div>

      <div className="flex items-center justify-center pt-1">
        <p className="text-sm text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline hover:underline-offset-4 transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default LoginForm;
