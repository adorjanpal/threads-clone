import { fetchUser, fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";
import Image from "next/image";
import DeleteThread from "../forms/DeleteThread";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let result: any;
  const userInfo = await fetchUser(currentUserId);
  if (accountType === "Community") {
    result = await fetchCommunityPosts(accountId);
  } else {
    result = await fetchUserPosts(accountId);
  }

  if (!result) redirect("/");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.threads.map((thread: any) => {
        return (
          <div className="relative">
            <ThreadCard
              key={thread.id}
              id={thread._id}
              currentUserId={currentUserId || ""}
              parentId={thread.parentId}
              content={thread.text}
              author={
                accountType === "User"
                  ? { name: result.name, image: result.image, id: result.id }
                  : {
                      name: thread.author.name,
                      image: thread.author.image,
                      id: thread.author.id,
                    }
              }
              community={thread.community}
              createdAt={thread.createdAt}
              comments={thread.children}
              likedByUser={thread.liked.includes(userInfo._id) ? true : false}
              numberOfLikes={thread.liked.length}
            />
            {accountId === currentUserId && (
              <DeleteThread threadId={thread._id} />
            )}
          </div>
        );
      })}
    </section>
  );
};

export default ThreadsTab;
