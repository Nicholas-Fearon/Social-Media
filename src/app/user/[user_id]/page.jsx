import { db } from "@/utils/db";
import { currentUser, auth } from "@clerk/nextjs/server";

export default async function UserPage() {
  const user = await currentUser();
  console.log("user =", user);

  const { userId } = await auth();

  // Get the current user's details from the database
  const responseUser = await db.query(`
    SELECT * 
    FROM users 
    WHERE clerk_id = '${userId}'
  `);

  const currentUserData = responseUser?.rows[0];
  console.log("Current user details: ", currentUserData);

  // Ensure user exists in the database
  if (!currentUserData) {
    return <div>User not found in the database.</div>;
  }

  // Fetch posts for the current user
  const responsePosts = await db.query(`
    SELECT 
      posts.id,
      posts.content,
      users.username,
      users.id as user_id
    FROM posts 
    JOIN users ON posts.clerk_id = users.clerk_id
    WHERE posts.clerk_id = '${userId}'
  `);

  const userPosts = responsePosts.rows;
  console.log("Posts for the current user: ", userPosts);

  return (
    <>
      <h2>
        Logged in: {user?.firstName} {user?.lastName}
      </h2>

      <div>Username: {currentUserData?.username}</div>
      <div>Email: {user?.emailAddresses[0].emailAddress}</div>
      <div>Bio: {currentUserData?.bio}</div>

      <h3>Your Posts</h3>
      <ul>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <li key={post.id}>
              <strong>{post.username}</strong>: {post.content}
            </li>
          ))
        ) : (
          <div>No posts found.</div>
        )}
      </ul>
    </>
  );
}