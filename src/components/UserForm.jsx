import { db } from "@/utils/db";
import { auth } from "@clerk/nextjs/server";
import { Form } from "@radix-ui/react-form";
import { revalidatePath } from "next/cache";

export default async function UserForm() {
  const { userId } = await auth();

  async function handleSubmit(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");

    db.query(
      `INSERT INTO users (username, bio, clerk_id) VALUES ($1, $2, $3)`,
      [username, bio, userId]
    );

    revalidatePath("/posts");
  }
  return (
    <>
      <form action={handleSubmit}>
        <input name="username" placeholder="Username"></input>
        <textarea name="bio" placeholder="Bio"></textarea>
        <button>Submit</button>
      </form>

      <div className="bg-blue-500 w-auto px-5 py-5">
        <Form.Root action={handleSubmit} className="w-[260px]">
          <Form.Field className="mb-2.5 grid" name="username">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                Username
              </Form.Label>
              <Form.Message
                className="text-[13px] text-black opacity-80"
                match="valueMissing"
              >
                Write your username here...
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className="box-border inline-flex h-[60px] w-full p-1 appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-black hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                type="textarea"
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field className="mb-2.5 grid" name="bio">
            <div className="flex items-baseline justify-between">
              <Form.Label className="text-[15px] font-medium leading-[35px] text-white">
                Bio
              </Form.Label>
              <Form.Message
                className="text-[13px] text-black opacity-80"
                match="valueMissing"
              >
                Write your Bio here...
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea
                className="box-border inline-flex h-[60px] w-full p-1 appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-black hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                type="textarea"
                required
              />
            </Form.Control>
          </Form.Field>

          <Form.Submit asChild>
            <button className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
              Submit Details
            </button>
          </Form.Submit>
        </Form.Root>
      </div>
    </>
  );
}
