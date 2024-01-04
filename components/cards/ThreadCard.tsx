import { deleteThread, fetchThreadById } from "@/lib/actions/thread.actions";
import { formatDateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import DeleteThread from "../forms/DeleteThread";
import LikeThread from "../forms/LikeThread";
import { useRouter } from "next/router";

import { fetchUserById } from "@/lib/actions/user.actions";
import LikedBy from "../forms/LikedBy";

interface Props {
  id: string;
  currentUserId: string;
  parentId: string | null;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: boolean;
  likedByUser: boolean;
  numberOfLikes: number;
}

const ThreadCard = async ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
  likedByUser,
  numberOfLikes,
}: Props) => {
  const thread = await fetchThreadById(id);
  const likers = thread.liked;

  let likerInfo = [];

  for (let index = 0; index < likers.length; index++) {
    let data = await fetchUserById(likers[index]);

    // console.log(data);

    likerInfo.push({
      name: data.name,
      username: data.username,
      image: data.image,
      id: data.id,
    });
  }

  return (
    <article
      className={`flex w-full flex-col rounded-xl relative ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      {author.id === currentUserId && <DeleteThread threadId={id} />}
      <div className="flex items-start justify-between relative">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative h-11 w-11">
              <Image
                src={author.image}
                alt="Profile Picture"
                fill
                className="cursor-pointer rounded-full object-cover"
              />
            </Link>
            <div className="thread-card_bar"></div>
          </div>

          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-base-semibold text-light-1">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className={`${isComment && "mb-10"}mt-5 flex flex-col gap-3`}>
              <div className="flex gap-3.5">
                <div className="flex gap-1 justify-center mt-0.5">
                  <LikedBy likers={likerInfo} />
                  <LikeThread
                    userId={currentUserId}
                    likedByUser={likedByUser}
                    threadId={id}
                  />
                </div>
                <div></div>
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  />
                </Link>
                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
                <Image
                  src="/assets/share.svg"
                  alt="share"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                />
              </div>
              {isComment && comments.length > 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-medium text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
      {!isComment && community && (
        <Link
          href={`/communities/${community.id}`}
          className="mt-5 flex items-center"
        >
          <p className="text-subtle-medium text-gray-1">
            {formatDateString(createdAt)} - {community.name} Community
          </p>

          <Image
            src={community.image}
            alt={community.name}
            width={14}
            height={14}
            className="ml-1 rounded-full object-cover"
          />
        </Link>
      )}
    </article>
  );
};

export default ThreadCard;
