"use client";
import { toggleLike } from "@/lib/actions/thread.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

interface Props {
  userId: string;
  likedByUser: boolean;
  threadId: string;
}

const LikeThread = ({ userId, likedByUser, threadId }: Props) => {
  const pathname = usePathname();
  return (
    <div>
      <Image
        src={`/assets/heart-${likedByUser ? "filled" : "gray"}.svg`}
        alt="heart"
        width={24}
        height={24}
        className="cursor-pointer object-contain"
        onClick={() => toggleLike(threadId, userId, likedByUser, pathname)}
      />
    </div>
  );
};

export default LikeThread;
