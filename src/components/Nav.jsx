import Link from "next/link";

export default function Nav() {
  return (
    <>
      
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6 w-full mb-10">
          <div className="flex items-center text-white mr-6">
            <Link
              className="text-white no-underline hover:text-white hover:no-underline"
              href="/"
            >
              <span className="text-2xl pl-2">
                <i className="em em-grinning"></i> Social Media
              </span>
            </Link>
          </div>

        
          <div className="ml-auto">
            <ul className="flex space-x-4">
              <li>
                <Link
                  className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:underline py-2 px-4"
                  href="/"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:underline py-2 px-4"
                  href="/posts"
                >
                  Posts
                </Link>
              </li>
              <li>
                <Link
                  className="inline-block text-gray-400 no-underline hover:text-gray-200 hover:underline py-2 px-4"
                  href="/user"
                >
                  User
                </Link>
              </li>
            </ul>
          </div>
        </nav>
    </>
  );
}