// Features.jsx
export default function Features() {
  return (
    <section
      id="features"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-950"
    >
      <div className="max-w-4xl w-full bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl">

        <h1 className="text-2xl sm:text-3xl font-semibold text-white mb-4">
          How the AI Diver Loadout Generator Works
        </h1>

        <p className="text-sm sm:text-base text-slate-200 mb-4">
          This project falls under{" "}
          <span className="font-semibold text-yellow-400">
            Category 2 – Applied AI Project
          </span>{" "}
          from the CPSC 481 guidelines. The core of this system is a custom-built
          AI algorithm that performs search, heuristic evaluation, and optimization
          to generate effective Helldivers 2 loadouts. The intelligence comes from
          code we wrote ourselves not an external AI model.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">
          Why This Project Fits Category 2
        </h2>
        <p className="text-sm sm:text-base text-slate-200 mb-3">
          According to the course requirements, an Applied AI Project must include
          original AI logic such as search, heuristics, or reasoning. Our system
          meets this by implementing:
        </p>

        <ul className="list-disc list-inside text-sm sm:text-base text-slate-200 space-y-1 mb-4">
          <li>A guided search over the full loadout space</li>
          <li>A weighted heuristic scoring function defined by the user</li>
          <li>
            A genetic algorithm that evolves better loadouts over generations
          </li>
          <li>Mutation, selection, and fitness evaluation coded from scratch</li>
        </ul>


        <h2 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">
          Strategy Modes
        </h2>

        <p className="text-sm sm:text-base text-slate-200 mb-3">
          The AI supports two main modes of loadout generation:
        </p>

        <ul className="list-disc list-inside text-sm sm:text-base text-slate-200 space-y-1 mb-6">
          <li>
            <span className="font-mono bg-slate-900/60 px-1.5 py-0.5 rounded">
              random
            </span>{" "}
            — generates a valid loadout using lightweight heuristics.
          </li>
          <li>
            <span className="font-mono bg-slate-900/60 px-1.5 py-0.5 rounded">
              genetic
            </span>{" "}
            — uses a genetic algorithm (selection, mutation, population evolution)
            to converge toward optimized loadouts according to user-defined
            weights.
          </li>
        </ul>

        <h2 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">
          Weight-Based Heuristic Evaluation
        </h2>
        <p className="text-sm sm:text-base text-slate-200 mb-3">
          Users can specify stat weights to tell the AI what matters most. Higher
          weights shift the genetic algorithm toward loadouts with those desirable
          properties. Example:
        </p>

        <pre className="text-xs sm:text-sm bg-slate-900/70 border border-slate-700/70 rounded-md p-3 text-slate-100 overflow-auto mb-4">
weapon_stats_dps:3.0, weapon_stats_fire_rate_rpm:2.0
        </pre>

        <p className="text-sm sm:text-base text-slate-200 mb-4">
          These weights form the heuristic that drives the algorithm. Strong
          heuristics produce faster convergence and better loadouts.
        </p>

        <h2 className="text-lg sm:text-xl font-semibold text-white mt-4 mb-2">
          What You See on the Main Screen
        </h2>
        <ul className="list-disc list-inside text-sm sm:text-base text-slate-200 space-y-1 mb-6">
          <li>Optimized primary and secondary weapons</li>
          <li>Armor passive and booster chosen for your playstyle</li>
          <li>Throwable selection based on your weighted heuristic</li>
          <li>Full stratagem loadout with icons and metadata</li>
          <li>Optional raw output for debugging or inspection</li>
        </ul>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="#hero"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-yellow-500 text-black text-sm font-medium hover:bg-yellow-400 transition-colors"
          >
            Back to Generator
          </a>
          <span className="text-xs sm:text-sm text-slate-300">
            Use the navigation bar or this button to return to the main generator.
          </span>
        </div>
      </div>
    </section>
  );
}
