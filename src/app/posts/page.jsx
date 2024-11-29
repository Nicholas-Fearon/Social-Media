import PostsForm from "@/components/PostsForm";
import UserForm from "@/components/UserForm";
import { db } from "@/utils/db";
import { SignedOut, SignedIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostsPage() {
  const { userId } = await auth();
  console.log(userId)
  //Get all posts
  const responsePosts = await db.query(`
    SELECT 
    posts.id,
    posts.content,
    users.username,
    users.id as user_id
    FROM posts 
    JOIN users ON posts.clerk_id = users.clerk_id`);

  const posts = responsePosts.rows;
  console.log(posts);

  //Check if user is user has username in database
  const responseUser = await db.query(
    `SELECT * FROM users WHERE clerk_id = '${userId}'`
  );
  const numUsers = responseUser.rowCount;
  console.log(responseUser.rowCount);

  //redirected to notFound page
if(!posts) {
    notFound()
}

  return (
    <div>
      <h2>Posts</h2>
      <SignedIn>{numUsers === 1 ? <PostsForm /> : <UserForm />}</SignedIn>

      <SignedOut>
        <Link href="/sign-in">Please sign in to make a post</Link>
      </SignedOut>

      {posts.map((post) => {
        return (
          <div key={post.id}>
            <h3><Link href={`/user/${post.user_id}`}>{post.username}</Link> says</h3>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
}
