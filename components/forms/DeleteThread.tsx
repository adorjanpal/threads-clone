"use client";
import { deleteThread } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import React from "react";

interface Props {
  threadId: string;
}

const DeleteThread = ({ threadId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <Image
      src="/assets/delete.svg"
      alt="Delete Button"
      width={20}
      height={20}
      className="cursor-pointer object-contain absolute right-4 top-4"
      onClick={async () => {
        await deleteThread(threadId, pathname);
        if (pathname === `/thread/${threadId}`) {
          router.push("/");
        }
      }}
    />
  );
};

export default DeleteThread;
