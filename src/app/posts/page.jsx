import { db } from "@/utils/db";

export default function PostsPage() {
  async function handleSubmit(formData) {
    "use server";
    const content = formData.get("content");

   await db.query(`INSERT INTO posts (content) VALUES ($1)`, [content]);
  }

  return (
    <>
      <h2>Posts page</h2>
      <form action={handleSubmit}>
        <textarea
          name="content"
          placeholder="Write your post here..."
        ></textarea>
        <button>Submit</button>
      </form>
    </>
  );
}
