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
      <h1>Posts</h1>
      <SignedIn>{numUsers === 1 ? <PostsForm /> : <UserForm />}</SignedIn>

      <SignedOut>
        <Link href="/sign-in">Please sign in to make a post</Link>
      </SignedOut>

      <div className="max-w-3xl mx-auto py-6">
  {posts.map((post) => (
    <div 
      key={post.id} 
      className="bg-white shadow-md rounded-lg p-4 mb-6 border border-gray-200"
    >
      {/* Header: User Name */}
      <h3 className="font-semibold text-lg mb-3">
        <Link href={`/user/${post.user_id}`} className="hover:text-blue-500">
          {post.username}
        </Link> 
        <span className="text-sm text-gray-500"> says</span>
      </h3>

      {/* Post Content */}
      <p className="text-gray-800 text-base mb-4">{post.content}</p>

      {/* Like Section */}
      <div className="flex justify-end text-sm text-gray-500">
        <button className="flex items-center hover:text-blue-500">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 mr-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
          </svg>
          Like
        </button>
      </div>
    </div>
  ))}
</div>
    </div>
  );
}
