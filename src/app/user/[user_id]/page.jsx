import { db } from "@/utils/db";
import { currentUser, auth } from "@clerk/nextjs/server";

export default async function UserPage() {
  const user = await currentUser();
  console.log("user =", user);

  const { userId } = await auth();

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
  console.log("these are the posts: ", posts);

  //Check if user is user has username in database
  const responseUser = await db.query(
    `SELECT * FROM users WHERE clerk_id = '${userId}'`
  );
  console.log("Response from user: ", responseUser);
  return (
    <>
      <h2>
        Logged in: {user?.firstName} {user?.lastName}
      </h2>

      <div>Username: {user?.username}</div>
      <div>Email: {user?.emailAddresses[0].emailAddress}</div>
      <div>Bio: {responseUser?.rows[0].bio}</div>
    </>
  );
}
