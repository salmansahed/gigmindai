export const metadata = {
  title: "Login",
};

import LoginForm from "@/components/auth/LoginForm";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#0a0f1d]  pt-30 pb-20 px-4 flex items-center justify-center">
      <LoginForm />
    </div>
  );
};

export default page;
