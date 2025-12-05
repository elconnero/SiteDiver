// Page_2.jsx
export default function Page_2() {
  return (
    <section
      id="page_2"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-950"
    >
      <div className="max-w-xl w-full text-center bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">
        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-3">
          Page 2 – Under Construction
        </h1>
        <p className="text-sm sm:text-base text-slate-200 mb-4">
          This area is reserved for future features. For now, head back to the
          main generator and pull some new loadouts.
        </p>
        <a
          href="#hero"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-yellow-500 text-black text-sm font-medium hover:bg-yellow-400 transition-colors"
        >
          Back to Generator
        </a>
      </div>
    </section>
  );
}
