// lib/auth/account.ts
import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import type { Account, AccountRole } from "@prisma/client";

export async function ensureAccountFromClerk(
  roleHint?: AccountRole, // "COACH" | "STUDENT" | "ADMIN" (we'll usually pass COACH/STUDENT)
): Promise<Account> {
  const user = await currentUser();
  if (!user) {
    throw new Error("No current user");
  }

  const email =
    user.primaryEmailAddress?.emailAddress ??
    user.emailAddresses[0]?.emailAddress;
  if (!email) {
    throw new Error("User has no email");
  }

  const firstName = user.firstName ?? "";
  const lastName = user.lastName ?? "";

  let account = await prisma.account.findUnique({
    where: { authUserId: user.id },
  });

  if (!account) {
    // default role is STUDENT unless we have a hint
    const role: AccountRole = roleHint ?? "STUDENT";

    account = await prisma.account.create({
      data: {
        authUserId: user.id,
        email,
        firstName,
        lastName,
        role,
      },
    });

    return account;
  }

  // If account exists, keep ADMIN as-is, otherwise allow upgrading role based on hint
  const nextRole: AccountRole =
    account.role === "ADMIN"
      ? "ADMIN"
      : roleHint && roleHint !== account.role
      ? roleHint
      : account.role;

  account = await prisma.account.update({
    where: { id: account.id },
    data: {
      email,
      firstName,
      lastName,
      role: nextRole,
    },
  });

  return account;
}
