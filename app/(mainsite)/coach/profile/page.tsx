// app/(mainsite)/onboarding/coach/page.tsx
import { prisma } from "@/lib/prisma";
import { ensureAccountFromClerk } from "@/lib/auth/account";
import { CoachForm } from "@/components/admin/CoachForm";

export default async function CoachProfilePage() {
  // Instead of useParams + /api/admin/...,
  // we use the *current* account.
  const account = await ensureAccountFromClerk("COACH");

  let coach = await prisma.coach.findFirst({
    where: { accountId: account.id },
  });

  if (!coach) {
    coach = await prisma.coach.create({
      data: {
        accountId: account.id,
        subdomain: "",
        firstName: account.firstName || "",
        lastName: account.lastName || "",
        businessName:
          account.firstName && account.lastName
            ? `${account.firstName} ${account.lastName} Coaching`
            : "My Coaching Business",
        sport: "Pickleball",
        paletteId: "default",
        heroBusinessNameFontClass: "font-sans",
        heroTagline: "Let’s get better together.",
        heroMediaType: "image",
        heroMediaUrl: "/images/paddles1.jpg",
        heroPrimaryButtonLabel: "View offerings",
        heroPrimaryButtonSubtext: null,
        heroPrimaryButtonTarget: "offerings",
        heroPrimaryButtonHref: null,
        offeringsSectionTitle: "Offerings",
        testimonialsTitle: "Testimonials",
        eventsTitle: "Events",
        aboutPhotoUrl: "/images/coaches/derek/profile.jpeg",
        aboutLocation: "",
        aboutBio: "",
        aboutPhilosophy: null,
        aboutCertifications: null,
        status: "PENDING",
      },
    });
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Set up your coach profile
        </h1>
        <p className="text-sm text-gray-500">
          We’ve pulled in a few defaults. Create your profile we'll get started on your site.
        </p>
      </div>

      <CoachForm mode="self" coach={coach} />
    </div>
  );
}
