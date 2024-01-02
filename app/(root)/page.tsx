import ThreadCard from "@/components/cards/ThreadCard";
import { fetchPosts } from "@/lib/actions/thread.actions";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function Home() {
  const result = await fetchPosts(1, 30);
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);
  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="mt-9 flex flex-col gap-10">
      {result.posts.length === 0 ? (
        <p className="no-result">No threads found</p>
      ) : (
        <>
          {result.posts.map((post) => {
            return (
              <ThreadCard
                key={post.id}
                id={post._id}
                currentUserId={user?.id || ""}
                parentId={post.parentId}
                content={post.text}
                author={post.author}
                community={post.community}
                createdAt={post.createdAt}
                comments={post.children}
                likedByUser={post.liked.length > 0 ? true : false}
                numberOfLikes={post.liked.length}
              />
            );
          })}
        </>
      )}
    </section>
  );
}
