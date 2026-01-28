'use client';

import { FormEvent, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type {
    Student,
    StudentSkillLevel,
    StudentStatus,
} from '@prisma/client';
import { STUDENT_SKILL_LEVEL_LABELS } from '@/lib/displayNames';

type StudentFormMode = 'create' | 'edit';

interface StudentFormProps {
    mode: StudentFormMode;
    coachSubdomain: string;
    /**
     * For edit mode, pass the existing student.
     * For create mode, this can be undefined.
     */
    student?: Student;
}

export function StudentForm({ mode, coachSubdomain, student }: StudentFormProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [saved, setSaved] = useState(false);
    const [dirty, setDirty] = useState(false);

    // Helpers
    const initial = student ?? ({} as Student);

    // Identity
    const [firstName, setFirstName] = useState(initial.firstName ?? '');
    const [lastName, setLastName] = useState(initial.lastName ?? '');
    const [email, setEmail] = useState(initial.email ?? '');
    const [phone, setPhone] = useState(initial.phone ?? '');
    const [zip, setZip] = useState(initial.zip ?? '');

    // Date of birth as yyyy-mm-dd string
    const [dateOfBirth, setDateOfBirth] = useState(
        initial.dateOfBirth
            ? new Date(initial.dateOfBirth).toISOString().slice(0, 10)
            : '',
    );

    // Skill levels
    const [skillLevelStudent, setSkillLevelStudent] = useState<
        StudentSkillLevel | ''
    >(initial.skillLevelStudent ?? '');

    const [skillLevelCoach, setSkillLevelCoach] = useState<
        StudentSkillLevel | ''
    >(initial.skillLevelCoach ?? '');

    // Status (only really useful in edit/admin contexts)
    const [status, setStatus] = useState<StudentStatus>(
        initial.status ?? 'ACTIVE',
    );

    // Guardian info
    const [guardianName, setGuardianName] = useState(initial.guardianName ?? '');
    const [guardianPhone, setGuardianPhone] = useState(
        initial.guardianPhone ?? '',
    );
    const [guardianEmail, setGuardianEmail] = useState(
        initial.guardianEmail ?? '',
    );

    // Notes
    const [notes, setNotes] = useState(initial.notes ?? '');

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError(null);
        setSaved(false);

        // Normalize nullable fields
        const payload = {
            firstName,
            lastName,
            email: email.trim() === '' ? null : email.trim(),
            phone: phone.trim() === '' ? null : phone.trim(),
            zip: zip.trim() === '' ? null : zip.trim(),
            dateOfBirth: dateOfBirth.trim() === '' ? null : dateOfBirth,

            skillLevelStudent:
                skillLevelStudent === '' ? null : (skillLevelStudent as StudentSkillLevel),
            skillLevelCoach:
                skillLevelCoach === '' ? null : (skillLevelCoach as StudentSkillLevel),

            // For now, status is only really used in edit mode.
            status,

            notes: notes.trim() === '' ? null : notes.trim(),

            guardianName: guardianName.trim() === '' ? null : guardianName.trim(),
            guardianPhone:
                guardianPhone.trim() === '' ? null : guardianPhone.trim(),
            guardianEmail:
                guardianEmail.trim() === '' ? null : guardianEmail.trim(),
        };

        try {
            const isCreate = mode === "create";
            const url = isCreate
                ? `/api/coach/${coachSubdomain}/students`
                : `/api/coach/${coachSubdomain}/students/${student?.id}`;


            const method = isCreate ? 'POST' : 'PATCH';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                let details = '';
                try {
                    details = await res.text();
                } catch {
                    // ignore
                }
                // eslint-disable-next-line no-console
                console.error('Failed to save student', res.status, details);
                setError(`Failed to save changes (HTTP ${res.status}).`);
                return;
            }

            setSaved(true);
            setDirty(false);

            startTransition(() => {
                router.refresh();
            });
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error('Unexpected error saving student', err);
            setError('Unexpected error saving changes.');
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-6 text-md coach-form text-slate-500"
        >
            {/* Identity */}
            <section className="space-y-4">
                <h2 className="font-semibold">Student Info</h2>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <input
                            id="firstName"
                            value={firstName}
                            onChange={(e) => {
                                setFirstName(e.target.value);
                                setDirty(true);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input
                            id="lastName"
                            value={lastName}
                            onChange={(e) => {
                                setLastName(e.target.value);
                                setDirty(true);
                            }}
                        />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label htmlFor="email">Email (optional)</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setDirty(true);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="phone">Phone (optional)</label>
                        <input
                            id="phone"
                            value={phone}
                            onChange={(e) => {
                                setPhone(e.target.value);
                                setDirty(true);
                            }}
                        />
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label htmlFor="zip">ZIP / Postal code</label>
                        <input
                            id="zip"
                            value={zip}
                            onChange={(e) => {
                                setZip(e.target.value);
                                setDirty(true);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="dateOfBirth">Date of birth</label>
                        <input
                            id="dateOfBirth"
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) => {
                                setDateOfBirth(e.target.value);
                                setDirty(true);
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Skill & Status */}
            <section className="space-y-4">
                <h2 className="font-semibold">Skill & Status</h2>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label htmlFor="skillLevelStudent">Student skill level</label>
                        <select
                            id="skillLevelStudent"
                            value={skillLevelStudent ?? ''}
                            onChange={(e) => {
                                const val = e.target.value as StudentSkillLevel | '';
                                setSkillLevelStudent(val);
                                setDirty(true);
                            }}
                        >
                            <option value="">Select level</option>
                            {Object.entries(STUDENT_SKILL_LEVEL_LABELS).map(
                                ([value, label]) => (
                                    <option key={value} value={value}>
                                        {label}
                                    </option>
                                ),
                            )}
                        </select>
                    </div>

                    {/* Coach-assessed skill: probably only meaningful later in coach/admin flows */}
                    {mode === 'edit' && (
                        <div>
                            <label htmlFor="skillLevelCoach">Coach-assessed level</label>
                            <select
                                id="skillLevelCoach"
                                value={skillLevelCoach ?? ''}
                                onChange={(e) => {
                                    const val = e.target.value as StudentSkillLevel | '';
                                    setSkillLevelCoach(val);
                                    setDirty(true);
                                }}
                            >
                                <option value="">Not set</option>
                                {Object.entries(STUDENT_SKILL_LEVEL_LABELS).map(
                                    ([value, label]) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ),
                                )}
                            </select>
                        </div>
                    )}
                </div>

                {mode === 'edit' && (
                    <div className="mt-6 max-w-xs">
                        <label htmlFor="status">Status</label>
                        <select
                            id="status"
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value as StudentStatus);
                                setDirty(true);
                            }}
                        >
                            <option value="ACTIVE">ACTIVE</option>
                            <option value="INACTIVE">INACTIVE</option>
                            <option value="ARCHIVED">ARCHIVED</option>
                        </select>
                    </div>
                )}
            </section>

            {/* Guardian Info */}
            <section className="space-y-4">
                <h2 className="font-semibold">Parent / Guardian</h2>

                <div className="grid gap-4 md:grid-cols-2 mt-6">
                    <div>
                        <label htmlFor="guardianName">Guardian name</label>
                        <input
                            id="guardianName"
                            value={guardianName}
                            onChange={(e) => {
                                setGuardianName(e.target.value);
                                setDirty(true);
                            }}
                        />
                    </div>

                    <div>
                        <label htmlFor="guardianEmail">Guardian email</label>
                        <input
                            id="guardianEmail"
                            type="email"
                            value={guardianEmail}
                            onChange={(e) => {
                                setGuardianEmail(e.target.value);
                                setDirty(true);
                            }}
                        />
                    </div>
                </div>

                <div className="mt-6 max-w-xs">
                    <label htmlFor="guardianPhone">Guardian phone</label>
                    <input
                        id="guardianPhone"
                        value={guardianPhone}
                        onChange={(e) => {
                            setGuardianPhone(e.target.value);
                            setDirty(true);
                        }}
                    />
                </div>
            </section>

            {/* Notes */}
            <section className="space-y-4">
                <h2 className="font-semibold">Notes</h2>

                <div className="mt-6">
                    <label htmlFor="notes">Notes (internal)</label>
                    <textarea
                        id="notes"
                        className="min-h-[80px]"
                        value={notes}
                        onChange={(e) => {
                            setNotes(e.target.value);
                            setDirty(true);
                        }}
                    />
                </div>
            </section>

            {/* Meta (edit only) */}
            {mode === 'edit' && student && (
                <section className="space-y-2">
                    <h2 className="font-semibold">Dates</h2>

                    <div className="text-xs text-gray-600">
                        <div>
                            <strong>Created:</strong>{' '}
                            {student.createdDate
                                ? new Date(student.createdDate).toLocaleString()
                                : '—'}
                        </div>
                        <div>
                            <strong>Last Modified:</strong>{' '}
                            {student.modifiedDate
                                ? new Date(student.modifiedDate).toLocaleString()
                                : '—'}
                        </div>
                    </div>
                </section>
            )}

            {/* Actions */}
            <div className="sticky bottom-0 z-10 -mx-6 border-t border-slate-200 bg-white/90 px-6 py-3 backdrop-blur">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-slate-500">
                        {isPending
                            ? 'Saving student…'
                            : saved
                                ? 'All changes saved'
                                : mode === 'create'
                                    ? 'Fill out the student profile and save to continue.'
                                    : 'Save changes to update this student.'}
                        {error && (
                            <span className="ml-3 text-xs text-red-600">{error}</span>
                        )}
                    </div>

                    <div className="flex items-center justify-end gap-2">
                        <button
                            type="submit"
                            disabled={!dirty || isPending}
                            className={`rounded-lg px-3 py-2 text-sm font-medium text-white shadow-sm transition
                ${!dirty || isPending
                                    ? 'bg-slate-300 cursor-not-allowed'
                                    : 'bg-sky-600 hover:bg-sky-700'
                                }`}
                        >
                            {isPending
                                ? 'Saving…'
                                : mode === 'create'
                                    ? 'Save student profile'
                                    : 'Save changes'}
                        </button>
                    </div>
                </div>
            </div>
        </form>
    );
}
