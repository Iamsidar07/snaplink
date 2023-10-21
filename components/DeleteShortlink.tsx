"use client";
import toast from "react-hot-toast";
import { TiUserDelete } from "react-icons/ti";

const DeleteShortlink = ({ id }: { id: string }) => {
  const deleteShortlink = async () => {
    try {
      await fetch(`/api/shorturl/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <TiUserDelete
      size={28}
      className="text-white cursor-pointer"
      onClick={() =>
        toast.promise(deleteShortlink(), {
          loading: "Removing...",
          error: "Failed",
          success: "Success",
        })
      }
    />
  );
};

export default DeleteShortlink;
