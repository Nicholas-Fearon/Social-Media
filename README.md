Social Media Application

This is a full-stack social media application built using Next.js. The app enables users to sign up, log in, manage profiles, and create posts. It uses Clerk for secure authentication and Radix UI Primitives for a modern, intuitive user experience.

🌟 Features

User Stories

	1.	Secure Authentication with Clerk
Users can securely sign up and log in to the application using Clerk. This allows them to interact with the app, create posts, and edit their profiles.
	2.	Error Page for Invalid Profiles
Users are informed with a custom error page if they try to visit a user profile that doesn’t exist, ensuring a seamless user experience.
	3.	Modern User Experience
The app uses Radix UI Primitives (or a similar library) to deliver enhanced and intuitive UI components.
	4.	Profile Management
Users can create and manage their profiles, including adding personal information such as a biography, for a personalised experience.
	5.	Post Creation and Management
Users can create posts that are displayed on their profile pages, allowing them to share and manage content easily.

🎯 Implementation Details

Key Requirements

	1.	Secure Sign-Up and Login
	•	Technology Used: Clerk for authentication.
	•	Users can sign up and log in securely to access their profiles and interact with the application.
	•	User data is stored in a PostgreSQL database and associated with the unique Clerk userId.
	2.	Custom Error Page
	•	A not-found.jsx component displays a custom error page when a user tries to access an invalid profile URL (e.g., /user/[nonexistent]).
	3.	Enhanced UI with Radix UI Primitives
	•	Radix UI Primitives were used for implementing key components like modals, forms, and navigation menus.
	•	The modern design enhances usability and aesthetics.
	4.	User Profiles
	•	Users can input personal information (e.g., biography) through a form.
	•	Profiles are managed at the route /user/[userId], allowing personalised data to be stored and retrieved efficiently.
	•	Profiles are tied to the Clerk userId for secure data association.
	•	Profile data is stored in a PostgreSQL database.
	5.	Post Creation and Display
	•	Users can create posts via a form.
	•	Posts are stored in the database and displayed on the user’s profile page.
	•	Posts are tied to the Clerk userId, ensuring proper ownership and association.

    🛠️ Technologies Used

	•	Next.js: React-based framework for server-side rendering and routing.
	•	Clerk: Secure user authentication and profile management.
	•	Radix UI Primitives: Modern, accessible UI components.
	•	Tailwind CSS: Utility-first CSS framework for responsive styling.
	•	Supabase: Backend service for database operations.
	•	PostgreSQL: Relational database for securely storing user and post data.
	•	SQL: Used for managing and querying data in the PostgreSQL database.
	•	Vercel: Deployment platform for hosting the application.

    🌟 Reflection

I really enjoyed this project. I felt stretched at times but confident that I had the fundamental knowledge to implement everything I wanted. This was the biggest project I have worked on to date, and I found myself getting lost or going down code rabbit holes occasionally. To overcome this, I took time out to plan my approach and created a checklist, which helped me stay focused and productive.

Future Improvements

	•	Comments and Likes: Add functionality for users to comment on and like posts.
	•	Real-Time Updates: Implement real-time post updates using WebSocket or a similar solution.
	•	Accessibility and Performance: Enhance the app’s accessibility and optimise performance for broader usability.
	•	Pagination and Search: Add pagination and search functionality for posts and profiles to improve navigation.

Key Tools and Frameworks Used

	•	Supabase: Used for managing database operations and storing user and post data.
	•	PostgreSQL: Relational database for securely storing structured data.
	•	SQL: Employed for efficient querying and database management.
	•	Next.js: Leveraged as the front-end framework to build a seamless, responsive UI.
	•	Vercel: Used for deploying the app and making it accessible online.