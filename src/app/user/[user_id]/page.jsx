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
     <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
  {/* User Information */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold text-gray-800 mb-2">
      Logged in: {user?.firstName} {user?.lastName}
    </h2>
    <div className="text-sm text-gray-700 mb-1">
      <span className="font-medium">Username:</span> {currentUserData?.username}
    </div>
    <div className="text-sm text-gray-700 mb-1">
      <span className="font-medium">Email:</span> {user?.emailAddresses[0].emailAddress}
    </div>
    <div className="text-sm text-gray-700">
      <span className="font-medium">Bio:</span> {currentUserData?.bio || "No bio available."}
    </div>
  </div>

  {/* User Posts */}
  <div>
    <h3 className="text-md font-semibold text-gray-800 mb-3">Your Posts</h3>
    {userPosts.length > 0 ? (
      <ul className="space-y-4">
        {userPosts.map((post) => (
          <li 
            key={post.id} 
            className="bg-gray-100 p-4 rounded-md shadow-sm border border-gray-200"
          >
            <strong className="text-blue-600">{post.username}</strong>: {post.content}
          </li>
        ))}
      </ul>
    ) : (
      <div className="text-gray-500">No posts found.</div>
    )}
  </div>
</div>
    </>
  );
}