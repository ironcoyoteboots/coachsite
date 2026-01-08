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

  // 1. Try to find existing account by authUserId
  const existing = await prisma.account.findUnique({
    where: { authUserId },
  });

  if (existing) {
    return existing;
  }

  // 2. Derive basic fields from Clerk user
  const primaryEmail =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress ??
    '';

  if (!primaryEmail) {
    throw new Error('Authenticated user has no email address');
  }

  const firstName =
    user.firstName || primaryEmail.split('@')[0] || 'User';
  const lastName = user.lastName || '';

  // 3. Create new Account
  const created = await prisma.account.create({
    data: {
      authUserId,
      email: primaryEmail,
      firstName,
      lastName,
      role: AccountRole.STUDENT, // default role for new signups
    },
  });

  return created;
}
