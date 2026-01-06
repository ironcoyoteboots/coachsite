'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { CoachOffering, OfferingType } from '@prisma/client';

export default function CoachOfferingForm({
  coachId,
  type,
  offering,
}: {
  coachId: string;
  type: OfferingType;
  offering: CoachOffering | null;
}) {
  const router = useRouter();

  const existingId = offering?.id ?? null;

  const [enabled, setEnabled] = useState(offering?.enabled ?? true);
  const [title, setTitle] = useState(offering?.title ?? '');
  const [subtitle, setSubtitle] = useState(offering?.subtitle ?? '');
  const [description, setDescription] = useState(offering?.description ?? '');
  const [priceDisplay, setPriceDisplay] = useState(
    offering?.priceDisplay ?? '',
  );
  const [imageUrl, setImageUrl] = useState(offering?.imageUrl ?? '');

  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  const createdDate = offering?.createdDate ?? null;
  const modifiedDate = offering?.modifiedDate ?? null;

  async function handleSave(e: React.FormEvent) {
  e.preventDefault();
  setSaving(true);

  try {
    const res = await fetch(`/api/admin/coaches/${coachId}/offerings/${type}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        enabled,
        title,
        subtitle,
        description,
        priceDisplay,
        imageUrl,
      }),
    });

    if (!res.ok) {
      console.error('Failed to save offering', res.status, res.statusText);
      // optional: surface a message in UI if you add error state
      return;
    }

    // If you want the latest modifiedDate, you *can* read it:
    // const updated = await res.json();

    // Match CoachForm behavior: stay on page, mark clean
    setDirty(false);
  } finally {
    setSaving(false);
  }
}



  async function handleDelete() {
    if (!existingId) return;
    if (!confirm('Delete this offering?')) return;

    await fetch('/api/admin/offering/delete', {
      method: 'POST',
      body: JSON.stringify({ coachId, type }),
    });

    router.push(`/admin/coaches/coach/${coachId}/offerings`);
  }

  return (
    <form
      onSubmit={handleSave}
      className="space-y-6 text-md coach-form text-slate-500"
    >


      {/* Basic fields */}
      <section className="space-y-4">
        <h3 className="font-semibold">Basic Info</h3>

        <div className="grid gap-4 md:grid-cols-2 mt-6">
          <div>
            <label>Title</label>
            <input
              className="w-full"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setDirty(true);
              }}
            />
          </div>

          <div>
            <label>Subtitle</label>
            <input
              className="w-full"
              value={subtitle}
              onChange={(e) => {
                setSubtitle(e.target.value);
                setDirty(true);
              }}
            />
          </div>

          <div className="md:col-span-2">
            <label>Description</label>
            <textarea
              className="w-full h-28"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setDirty(true);
              }}
            />
          </div>

          <div>
            <label>Price Display</label>
            <input
              className="w-full"
              value={priceDisplay}
              onChange={(e) => {
                setPriceDisplay(e.target.value);
                setDirty(true);
              }}
              placeholder="e.g. From $75 / hour"
            />
          </div>

          <div>
            <label>Image URL</label>
            <input
              className="w-full"
              value={imageUrl}
              onChange={(e) => {
                setImageUrl(e.target.value);
                setDirty(true);
              }}
            />
          </div>
        </div>
      </section>

      {/* Meta: created / modified */}
      {existingId && (
        <section className="mt-8 space-y-2 text-sm">
          <h3 className="font-medium">Admin</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Created
              </div>
              <div className="">
                {createdDate
                  ? new Date(createdDate).toLocaleString()
                  : '—'}
              </div>
            </div>

            <div>
              <div className="text-xs uppercase tracking-wide text-slate-500">
                Last Modified
              </div>
              <div className="">
                {modifiedDate
                  ? new Date(modifiedDate).toLocaleString()
                  : '—'}
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
              <label className="font-normal items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => {
                    setEnabled(e.target.checked);
                    setDirty(true);
                  }}
                />
                Enable this offering
              </label>
            </div>
          </div>

        </section>
      )}

      {/* Footer buttons */}
      <div className="flex items-center justify-between mt-10">
        {existingId && (
          <button
            type="button"
            onClick={handleDelete}
            className="rounded-lg border border-red-600 text-red-400 px-3 py-2 text-sm hover:bg-red-600 hover:text-white"
          >
            Delete Offering
          </button>
        )}

        <button
          type="submit"
          disabled={!dirty || saving}
          className={`rounded-lg px-4 py-2 text-sm text-white ${dirty
            ? 'bg-sky-600 hover:bg-sky-700'
            : 'bg-slate-300 cursor-not-allowed'
            }`}
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
      </div>
    </form>
  );
}
