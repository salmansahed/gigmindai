"use client";

import { useState } from "react";
import {
  Input,
  TextArea,
  Button,
  Form,
  TextField,
  FieldError,
  Label,
} from "@heroui/react";
import { FiMail, FiMapPin, FiPhoneCall, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import Link from "next/link";

export default function ContactSupport() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulated API call delay
    setTimeout(() => {
      toast.success("🎉 Message sent! Our support team will contact you soon.");
      setLoading(false);

      // Reset form fields
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1d] text-white pt-28 pb-16 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background glow effect */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#00e599]/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10 w-full">
        {/* Header Section */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4 text-white">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#00e599] to-cyan-400">
              Support
            </span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 max-w-2xl mx-auto">
            Have questions about your gigs, payments, or need technical help?
            Send us a message and our GigMind AI support team will get back to
            you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
          {/* Contact Information Card */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-md flex flex-col gap-8 h-full">
              <h3 className="text-2xl font-bold text-white mb-2">
                Get in Touch
              </h3>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                  <FiMail className="w-5 h-5" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                    Email Support
                  </span>
                  <Link
                    href="mailto:support@gigmind.ai"
                    className="text-base font-semibold text-slate-200 hover:text-[#00e599] transition-colors"
                  >
                    support@gigmind.ai
                  </Link>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                  <FiPhoneCall className="w-5 h-5" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                    Phone
                  </span>
                  <span className="text-base font-semibold text-slate-200">
                    +880 1XXX-XXXXXX
                  </span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
                  <FiMapPin className="w-5 h-5" />
                </div>
                <div className="flex flex-col mt-1">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider mb-1">
                    Office Location
                  </span>
                  <span className="text-base font-semibold text-slate-200">
                    Bhaluka, Mymensingh
                    <br />
                    Bangladesh
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Support Form */}
          <div className="lg:col-span-3">
            <Form
              onSubmit={handleSubmit}
              className="bg-[#0a0f1d]/60 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-2xl flex flex-col gap-6 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                {/* Name Field */}
                <TextField isRequired className="w-full">
                  <Label className="text-white font-medium text-sm mb-2 block">
                    Full Name
                  </Label>
                  <Input
                    className="w-full bg-gray-800/50 border border-gray-600 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g., Salman Sahed"
                  />
                  <FieldError />
                </TextField>

                {/* Email Field */}
                <TextField isRequired className="w-full">
                  <Label className="text-white font-medium text-sm mb-2 block">
                    Email Address
                  </Label>
                  <Input
                    className="w-full bg-gray-800/50 border border-gray-600 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                  />
                  <FieldError />
                </TextField>
              </div>

              {/* Subject Field */}
              <TextField isRequired className="w-full">
                <Label className="text-white font-medium text-sm mb-2 block">
                  Subject
                </Label>
                <Input
                  className="w-full bg-gray-800/50 border border-gray-600 placeholder:text-slate-400 text-white rounded-xl h-12 px-4 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                />
                <FieldError />
              </TextField>

              {/* Message Field */}
              <TextField isRequired className="w-full">
                <Label className="text-white font-medium text-sm mb-2 block">
                  Your Message
                </Label>
                <TextArea
                  className="w-full bg-gray-800/50 border border-gray-600 placeholder:text-slate-400 text-white rounded-xl h-32 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00e599] focus:border-transparent resize-none"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Describe your issue or inquiry in detail..."
                />
                <FieldError />
              </TextField>

              {/* Submit Button */}
              <div className="pt-2 w-full mt-2">
                <Button
                  isLoading={loading}
                  type="submit"
                  variant="secondary"
                  className="w-full bg-[#00e599] text-[#0a0f1d] font-black tracking-wide h-12 text-sm md:text-base rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-[#00c985] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    "Sending Message..."
                  ) : (
                    <>
                      Send Message <FiSend className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
