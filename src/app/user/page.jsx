import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
export default async function UserPage() {
  const user = await currentUser();

  console.log("current user:", user);
  return (
    <>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6 text-center">
  {!user ? (
    <div className="text-gray-800 text-lg">
      <Link 
        href="/sign-in" 
        className="text-blue-500 font-medium hover:underline"
      >
        Please sign in
      </Link>
    </div>
  ) : (
    <div className="space-y-4">
      {/* User's Name */}
      <h2 className="text-xl font-semibold text-gray-800">
        {user?.firstName} {user?.lastName}
      </h2>

      {/* Link to User Info */}
      <Link 
        href={`/user/${user.id}`} 
        className="text-blue-500 text-sm font-medium hover:underline"
      >
        Click for User Info
      </Link>
    </div>
  )}
</div>
    </>
  );
}
