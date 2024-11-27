export default function PostsPage() {

    async function handleSubmit() {
        "use server"
        console.log("Test")
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
