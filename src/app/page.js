import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto text-center p-6 bg-white shadow-lg rounded-lg">
        {/* Hero Section */}
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to <span className="text-blue-500">SocialConnect</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          A platform to connect, share, and engage with the people who matter most. Join the community today!
        </p>

        {/* Call-to-Actions */}
        <div className="space-y-4 sm:space-y-0 sm:flex sm:justify-center sm:space-x-4">
          <Link
            href="/sign-up"
            className="px-6 py-3 bg-blue-500 text-white font-medium text-lg rounded-lg shadow hover:bg-blue-600"
          >
            Get Started
          </Link>
          <Link
            href="/learn-more"
            className="px-6 py-3 bg-gray-100 text-gray-700 font-medium text-lg rounded-lg shadow hover:bg-gray-200"
          >
            Learn More
          </Link>
        </div>
      </div>
    </div>
  );
}