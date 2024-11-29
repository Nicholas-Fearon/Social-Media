import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';
export default async function UserPage() {
    const user = await currentUser();
    
    console.log("current user:", user)
    return (<>
    
    <h2>{user?.firstName} {user?.lastName}</h2>
    <Link href={`/user/${user.id}`} >Click for User Info</Link>
  

 

    </>)
}