import { currentUser } from '@clerk/nextjs/server';

export default async function UserPage() {
    const user = await currentUser();
    
    console.log("current user:", user)
    return (<>
    
    <h2>{user?.firstName} {user?.lastName}</h2>
    
  

 <div>Username: {user?.username}</div>
    </>)
}