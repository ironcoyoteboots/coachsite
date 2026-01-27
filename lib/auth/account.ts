// lib/auth/account.ts
import { currentUser } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';
import type { Account } from '@prisma/client';
import { AccountRole } from '@prisma/client';

/**
 * Ensures there is an Account row for the current Clerk user.
 * - Throws if not authenticated.
 * - Returns the Account from your DB.
 */
export async function getOrCreateAccountForUser(): Promise<Account> {
  const user = await currentUser();
  if (!user) {
    throw new Error('Not authenticated');
  }

  const authUserId = user.id;

  const primaryEmail =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    '';

  if (!primaryEmail) {
    throw new Error('Authenticated user has no email address');
  }

  const firstName = user.firstName || primaryEmail.split('@')[0] || 'User';
  const lastName = user.lastName || '';

  const account = await prisma.account.upsert({
    where: { authUserId },
    update: {
      email: primaryEmail,
      firstName,
      lastName,
    },
    create: {
      authUserId,
      email: primaryEmail,
      firstName,
      lastName,
      role: AccountRole.STUDENT,
    },
  });

  return account;
}

