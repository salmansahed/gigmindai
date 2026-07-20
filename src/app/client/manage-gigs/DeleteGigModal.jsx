"use client";

import { getClientJWTToken } from "@/lib/getClientJWTToken";
import { AlertDialog, Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";

const DeleteGigModal = ({ job }) => {
  const queryClient = useQueryClient();

  const { mutate: deleteGig, isPending } = useMutation({
    mutationFn: async () => {
      const token = await getClientJWTToken();
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/delete-jobs/${job._id}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      );
      return res.json();
    },
    onSuccess: (data) => {
      if (data.success) {
        toast.success("Gig deleted successfully");
        queryClient.invalidateQueries({ queryKey: ["my-gigs"] });
      } else {
        toast.error(data.message || "Failed to delete gig. Please try again.");
      }
    },
  });

  return (
    <div>
      <AlertDialog>
        <Button variant="danger" className="rounded-full w-9 h-9 p-0">
          <MdOutlineDeleteOutline />
        </Button>
        <AlertDialog.Backdrop>
          <AlertDialog.Container>
            <AlertDialog.Dialog className="sm:max-w-100 bg-neutral-700 border border-neutral-600">
              <AlertDialog.CloseTrigger />
              <AlertDialog.Header>
                <AlertDialog.Icon className="bg-danger text-black" />
                <AlertDialog.Heading className="text-white">
                  Delete gig permanently?
                </AlertDialog.Heading>
              </AlertDialog.Header>
              <AlertDialog.Body>
                <p className="text-sm text-neutral-300">
                  This will permanently delete this gig and all of its data.
                  This action cannot be undone.
                </p>
              </AlertDialog.Body>
              <AlertDialog.Footer>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <Button
                  slot="close"
                  variant="danger"
                  isDisabled={isPending}
                  onClick={() => deleteGig()}
                >
                  Delete Gig
                </Button>
              </AlertDialog.Footer>
            </AlertDialog.Dialog>
          </AlertDialog.Container>
        </AlertDialog.Backdrop>
      </AlertDialog>
    </div>
  );
};

export default DeleteGigModal;
