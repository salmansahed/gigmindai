"use client";

import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  TextField,
  InputGroup,
  Select,
  ListBox,
} from "@heroui/react";

import { Eye, EyeSlash } from "@gravity-ui/icons";
import Link from "next/link";
import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { IoPersonAddOutline } from "react-icons/io5";
import Image from "next/image";
import { MdDeleteForever, MdDriveFolderUpload } from "react-icons/md";
import useImageUpload from "@/hooks/useImageUpload";
import { authClient } from "@/lib/auth-client";
import { FiBriefcase, FiUser } from "react-icons/fi";

const SignUpForm = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [photoRequiredError, setPhotoRequiredError] = useState("");
  const fileInputRef = useRef(null);

  const {
    previewUrl,
    serverUrl,
    isUploading,
    error: imageError,
    handleImageChange,
    handleRemoveImage,
  } = useImageUpload();

  const handleBtnPress = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData.entries());

    if (isUploading) {
      toast.warning("Please wait, photo is still uploading...");
      return;
    }

    if (!serverUrl) {
      setPhotoRequiredError(
        "Profile photo is required. Please upload an image.",
      );
      return;
    } else {
      setPhotoRequiredError("");
    }

    const { data, error } = await authClient.signUp.email({
      name: userData.name,
      email: userData.email,
      password: userData.password,
      image: serverUrl,
      role: userData.role,
    });

    if (data) {
      toast.success("Registration successful! Redirecting to login...");

      router.push("/auth/login");
    }
    if (error) {
      toast.error("Registration failed: " + error.message);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      className="flex w-full max-w-xl flex-col gap-5 shadow-2xl shadow-[#06b6d4]/5 rounded-3xl border border-white/10 p-6 md:p-8 bg-white/5 backdrop-blur-xl text-white"
    >
      {/* Header text modified for GigMind AI */}
      <div className="space-y-1 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
          Create Your Account
        </h2>
        <p className="text-xs md:text-sm text-slate-400">
          Join GigMind AI to connect with global opportunities.
        </p>
      </div>

      {/* Name Field */}
      <TextField
        isRequired
        name="name"
        type="text"
        className="w-full flex flex-col gap-1.5"
        validate={(value) => {
          if (value.length < 2) {
            return "Name must be at least 2 characters";
          }
          return null;
        }}
      >
        <Label className="text-sm font-semibold text-slate-300">Name</Label>
        <Input
          placeholder="Enter your name"
          className="h-12 text-sm rounded-xl border border-white/10 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white/5 text-white placeholder:text-slate-500 transition-all duration-200 px-4 w-full"
        />
        <FieldError className="text-xs font-medium text-rose-500 mt-0.5" />
      </TextField>

      {/* Email Field */}
      <TextField
        isRequired
        name="email"
        type="email"
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
          placeholder="Enter your email address"
          className="h-12 text-sm rounded-xl border border-white/10 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-white/5 text-white placeholder:text-slate-500 transition-all duration-200 px-4 w-full"
        />
        <FieldError className="text-xs font-medium text-rose-500 mt-0.5" />
      </TextField>

      {/* Photo Field */}
      <TextField isRequired className="w-full flex flex-col gap-1.5">
        <Label className="text-sm font-semibold text-slate-300">Photo</Label>

        <input
          ref={fileInputRef}
          onChange={(e) => {
            handleImageChange(e);
            setPhotoRequiredError("");
          }}
          type="file"
          name="photo"
          className="hidden"
          accept="image/*"
        />

        <div className="flex flex-col gap-3 w-full">
          <Button
            variant="outline"
            type="button"
            className="w-full h-12 rounded-xl text-white border-white/20 bg-transparent hover:bg-white/10"
            onPress={handleBtnPress}
          >
            {isUploading
              ? "Uploading Image..."
              : serverUrl
                ? "Image Selected ✓"
                : "Upload Photo"}
            <MdDriveFolderUpload className="text-lg" />
          </Button>

          {/* Image Preview */}
          {previewUrl && (
            <div className="relative w-full h-45 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
              <Image
                src={previewUrl}
                alt="Preview"
                height={180}
                width={180}
                unoptimized
                className="h-full w-auto object-contain rounded-xl"
              />
              {/* Remove Image Button */}
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-rose-600 hover:bg-rose-700 text-white px-2.5 py-1 text-xs font-medium rounded-lg transition-colors shadow-lg cursor-pointer"
              >
                <MdDeleteForever className="text-xl" />
              </button>
            </div>
          )}
        </div>

        {/* Image Error Messages */}
        {imageError && (
          <p className="text-xs font-medium text-rose-500 mt-0.5">
            {imageError}
          </p>
        )}
        {photoRequiredError && (
          <p className="text-xs font-medium text-rose-500 mt-0.5">
            {photoRequiredError}
          </p>
        )}
      </TextField>
      <div className="w-full flex flex-col gap-1.5">
        <Label className="text-sm font-semibold text-slate-300">
          Join As <span className="text-red-500">*</span>
        </Label>

        <Select
          className="w-full"
          placeholder="Select one"
          isRequired
          name="role"
        >
          <Select.Trigger className="h-12 rounded-xl border border-white/10 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 bg-[#161b26]/50 text-sm text-white placeholder:text-slate-500 transition-all duration-200 px-4 w-full flex items-center justify-between cursor-pointer">
            <Select.Value className="text-white placeholder:text-slate-500 text-sm" />
            <Select.Indicator className="text-slate-400" />
          </Select.Trigger>

          <Select.Popover className="bg-[#0f1524] backdrop-blur-2xl border border-white/10 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.6)] overflow-hidden">
            <ListBox className="p-1">
              <ListBox.Item
                id="buyer"
                textValue="Client (Buyer)"
                className="flex items-start gap-3 p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5 w-full">
                  <FiUser className="text-emerald-400 text-base shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      Client (Buyer)
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">
                      I want to hire elite tech talent
                    </span>
                  </div>
                </div>
                <ListBox.ItemIndicator className="text-emerald-400" />
              </ListBox.Item>

              <ListBox.Item
                id="seller"
                textValue="Freelancer (Seller)"
                className="flex items-start gap-3 p-2.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/5 cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5 w-full">
                  <FiBriefcase className="text-cyan-400 text-base shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-white">
                      Freelancer (Seller)
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">
                      I want to explore jobs and offer services
                    </span>
                  </div>
                </div>
                <ListBox.ItemIndicator className="text-cyan-400" />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
          <FieldError />
        </Select>
      </div>

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

      {/* Create Account Button */}
      <div className="flex gap-2 pt-2">
        <Button
          type="submit"
          disabled={isUploading}
          variant="secondary"
          className="w-full h-12 text-xs font-black uppercase tracking-widest text-[#0a0f1d] bg-linear-to-r from-emerald-500 to-cyan-400 hover:shadow-[0_0_24px_rgba(6,182,212,0.5)] rounded-xl transition-all duration-300 active:scale-98 group cursor-pointer"
        >
          <IoPersonAddOutline className="group-hover:scale-125 transition-all duration-300 text-sm" />
          {isUploading ? "Uploading Photo..." : "Create Account"}
        </Button>
      </div>

      {/* OR Divider */}
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

      {/* Footer Redirect Link */}
      <div className="flex items-center justify-center pt-1">
        <p className="text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="font-semibold text-emerald-400 hover:text-emerald-300 hover:underline hover:underline-offset-4 transition-colors"
          >
            Login
          </Link>
        </p>
      </div>
    </Form>
  );
};

export default SignUpForm;
