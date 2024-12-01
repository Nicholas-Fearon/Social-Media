import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import * as Form from "@radix-ui/react-form";
import { revalidatePath } from "next/cache";

import React from "react";

export default async function PostsForm() {
  const { userId } = await auth();
  
  async function handleSubmit(formData) {
    "use server";
    const content = formData.get("content");

    db.query(`INSERT INTO posts (content, clerk_id) VALUES ($1, $2)`, [
      content,
      userId,
    ]);
    revalidatePath("/posts");
  }

  return (
    <>
     
     <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
  <h2 className="text-lg font-semibold text-gray-800 mb-4">Create a Post</h2>
  <Form.Root 
    action={handleSubmit} 
    className="space-y-4"
  >
    {/* Field for Content */}
    <Form.Field className="grid" name="content">
      <Form.Label className="text-sm font-medium text-gray-700 mb-2">
        Write your post below
      </Form.Label>
      <Form.Control asChild>
        <textarea
          className="resize-none h-24 w-full rounded-md border border-gray-300 p-3 text-sm text-gray-800 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:outline-none"
          type="textarea"
          placeholder="Write your post here..."
          required
        />
      </Form.Control>
      <Form.Message
        className="text-xs text-red-500 mt-1"
        match="valueMissing"
      >
        This field is required.
      </Form.Message>
    </Form.Field>

    {/* Submit Button */}
    <Form.Submit asChild>
      <button className="w-full bg-blue-500 text-white text-sm font-medium py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
        Submit Post
      </button>
    </Form.Submit>
  </Form.Root>
</div>
      
    </>
  );
}
