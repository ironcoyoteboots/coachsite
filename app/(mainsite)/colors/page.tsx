export default function ColorsPage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-semibold mb-6">CoachSite Color Preview</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">

        {/* Lime */}
        <div className="p-6 rounded-xl bg-lime-400 text-slate-800 font-medium">lime-400</div>
        <div className="p-6 rounded-xl bg-lime-500 text-slate-800 font-medium">lime-500</div>
        <div className="p-6 rounded-xl bg-lime-600 text-white font-medium">lime-600</div>

        {/* Green */}
        <div className="p-6 rounded-xl bg-green-400 text-slate-800 font-medium">green-400</div>
        <div className="p-6 rounded-xl bg-green-500 text-white font-medium">green-500</div>
        <div className="p-6 rounded-xl bg-green-600 text-white font-medium">green-600</div>

        {/* Orange */}
        <div className="p-6 rounded-xl bg-orange-400 text-slate-800 font-medium">orange-400</div>
        <div className="p-6 rounded-xl bg-orange-500 text-white font-medium">orange-500</div>
        <div className="p-6 rounded-xl bg-orange-600 text-white font-medium">orange-600</div>

        {/* Slate Neutrals */}
        <div className="p-6 rounded-xl bg-slate-50 text-slate-800 font-medium border border-slate-200">slate-50</div>
        <div className="p-6 rounded-xl bg-slate-100 text-slate-800 font-medium border border-slate-200">slate-100</div>
        <div className="p-6 rounded-xl bg-slate-200 text-slate-800 font-medium border border-slate-300">slate-200</div>
        <div className="p-6 rounded-xl bg-slate-400 text-white font-medium">slate-400</div>
        <div className="p-6 rounded-xl bg-slate-600 text-white font-medium">slate-600</div>
        <div className="p-6 rounded-xl bg-slate-800 text-white font-medium">slate-800</div>

        {/* Overlays */}
        <div className="p-6 rounded-xl bg-black/20 text-white font-medium">black/20</div>
        <div className="p-6 rounded-xl bg-black/40 text-white font-medium">black/40</div>
        <div className="p-6 rounded-xl bg-black/55 text-white font-medium">black/55</div>

      </div>
    </main>
  );
}
