import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <>
    <h1>Welcome to Social Media SignIn page</h1>
    <SignIn />
    </> ;
}