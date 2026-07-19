"use client";

import { authClient } from "@/lib/auth-client";
import { Button, AlertDialog } from "@heroui/react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { toast } from "react-toastify";

const LogoutModal = () => {
  const router = useRouter();

  const handleLogoutBtn = async () => {
    await authClient.signOut();
    toast.success("Logged out successfully!", {
      position: "top-center",
    });
    router.refresh();
    router.push("/");
  };
  return (
    <div>
      <AlertDialog>
        <Button variant="danger" className="text-white rounded-lg">
          Logout
          <FiLogOut />
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100 bg-neutral-700 border border-neutral-600">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <RiLogoutCircleRLine className="text-4xl bg-red-200 text-red-600 p-2 rounded-full" />
                <AlertDialog.Heading className="text-white">
                  Logout?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-slate-300">
                  Are you sure you want to logout?
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="secondary" className="rounded-xl">
                  Cancel
                </Button>
                <Button
                  slot="close"
                  variant="danger"
                  onClick={handleLogoutBtn}
                  className=" rounded-xl"
                >
                  Logout
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default LogoutModal;
