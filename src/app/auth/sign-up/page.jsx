export const metadata = {
  title: "Sign Up",
};

import SignUpForm from "@/components/auth/SignUpForm";

const page = () => {
  return (
    <div className="bg-[#0a0f1d]  pt-30 pb-20 px-4 flex items-center justify-center">
      <SignUpForm />
    </div>
  );
};

export default page;
