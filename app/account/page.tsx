import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';
//import { getOrCreateAccountForUser } from '@/lib/auth/account';

export default async function AccountRouterPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect('/sign-in');
  }

  //const account = await getOrCreateAccountForUser();

  //switch (account.role) {
  //  case 'ADMIN':
  //    redirect('/admin/dashboard');
  //  case 'COACH':
  //    redirect('/coach/dashboard');
   // case 'STUDENT':
   //   redirect('/student/dashboard');
   // default:
   //   redirect('/');
 // }
}