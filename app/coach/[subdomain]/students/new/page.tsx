// app/coach/[subdomain]/students/new/page.tsx
"use client";
import { useCoach } from "@/components/coach/CoachProvider";
import { StudentForm } from "@/components/admin/StudentForm";

export default function StudentProfileNewPage() {
  const coach = useCoach();

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <h1 className="mb-2 text-2xl font-semibold">
        Create student profile
      </h1>
      <p className="mb-6 text-sm text-slate-600">
        Tell us about the student you’re adding for {coach.businessName}.
      </p>

      {/* Eventually: reuse the same form for new + edit */}
      {/* <StudentForm mode="self" coachId={coach.id} initialStudent={null} /> */}

      <div className="rounded-lg border border-dashed border-slate-300 p-4 text-sm text-slate-500">
        <StudentForm mode="create" coachSubdomain={coach.subdomain} />
      </div>
    </main>
  );
}
