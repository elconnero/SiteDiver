import { useEffect, useState } from "react";

const API_BASE_URL = "https://aidivers-production.up.railway.app";
const LOADOUT_ENDPOINT = "/get/random_loadout";

export default function Hero() {
  // Visual glow follows the mouse
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Left-side control panel state
  const [strategy, setStrategy] = useState("random");
  const [weights, setWeights] = useState(
    "weapon_stats_dps:3.0,weapon_stats_fire_rate_rpm:2.0"
  );
  const [population, setPopulation] = useState(40);
  const [generations, setGenerations] = useState(25);
  const [mutationRate, setMutationRate] = useState(0.3);

  // Data returned from the API and request status
  const [loadout, setLoadout] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    function handleMouseMove(e) {
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Takes the control state, calls the backend, and stores the JSON loadout
  async function handleGenerateLoadout() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      params.append("strategy", strategy);
      if (weights.trim()) params.append("weights", weights.trim());

      const url = `${API_BASE_URL}${LOADOUT_ENDPOINT}?${params.toString()}`;
      console.log("Requesting:", url);

      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`Request failed: ${resp.status}`);

      const data = await resp.json();
      console.log("Loadout response:", data);

      setLoadout(data);
      setMetadata(data.metadata ?? null);
    } catch (err) {
      console.error("loadout fetch error:", err);
      setError(err.message || "Failed to fetch");
    } finally {
      setLoading(false);
    }
  }

  // Stratagems: align ids, names, and image URLs by index
  const stratagemEntries =
    loadout?.stratagem_ids?.map((id, idx) => ({
      id,
      name: loadout?.stratagem_names?.[idx] || id,
      imageUrl: loadout?.stratagem_image_urls?.[idx] || "",
    })) || [];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(100, 91, 6, 0.15), transparent 60%)`,
        }}
      />

      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="relative order-2 w-full">
        {/* Outer card controls the whole hero block */}
        <div className="relative bg-white/5 backdrop-blur-xl rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-2xl border border-white/10 h-[360px] sm:h-[420px] lg:h-[480px]">
          {/* Inner card is split into: header, left controls, right results */}
          <div className="bg-gradient-to-br from-gray-900/20 to-gray-800/20 backdrop-blur-sm rounded-lg overflow-hidden w-full h-full border-white/5 flex flex-col">
            {/* Header row: title and Generate button */}
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 sm:py-3 bg-white/5 backdrop-blur-sm border-b border-white/10">
              <div>
                <h2 className="text-sm sm:text-base font-semibold text-white">
                  Helldivers Loadout Generator
                </h2>
                <p className="text-xs text-slate-300/80">
                  Adjust weights and pull a loadout from the API.
                </p>
              </div>
              <button
                onClick={handleGenerateLoadout}
                disabled={loading}
                className="px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-yellow-500/90 hover:bg-yellow-400 text-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Generating..." : "Generate Loadout"}
              </button>
            </div>

            {/* Main content: controls on the left, results on the right */}
            <div className="flex-1 flex flex-col sm:flex-row">
              {/* Left: strategy, weights, sliders */}
              <div className="w-full sm:w-72 border-r border-white/5 p-3 sm:p-4 space-y-3 text-xs sm:text-sm">
                <div className="space-y-1">
                  <label className="block text-slate-200 font-medium">
                    Strategy
                  </label>
                  <select
                    className="w-full bg-slate-900/60 border border-slate-600/60 rounded-md px-2 py-1 text-slate-100 text-xs sm:text-sm"
                    value={strategy}
                    onChange={(e) => setStrategy(e.target.value)}
                  >
                    <option value="random">Random</option>
                    <option value="genetic">Genetic</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="block text-slate-200 font-medium">
                    Weights
                  </label>
                  <input
                    type="text"
                    className="w-full bg-slate-900/60 border border-slate-600/60 rounded-md px-2 py-1 text-slate-100 text-xs sm:text-sm"
                    value={weights}
                    onChange={(e) => setWeights(e.target.value)}
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-200 font-medium">
                      Population
                    </label>
                    <span className="text-slate-300">{population}</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={200}
                    step={5}
                    value={population}
                    onChange={(e) => setPopulation(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-200 font-medium">
                      Generations
                    </label>
                    <span className="text-slate-300">{generations}</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={200}
                    step={5}
                    value={generations}
                    onChange={(e) => setGenerations(Number(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-slate-200 font-medium">
                      Mutation rate
                    </label>
                    <span className="text-slate-300">
                      {mutationRate.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.01}
                    value={mutationRate}
                    onChange={(e) =>
                      setMutationRate(Number(e.target.value))
                    }
                    className="w-full"
                  />
                </div>

                {error && (
                  <p className="text-[10px] text-red-400 break-words">
                    {error}
                  </p>
                )}
              </div>

              {/* Right: loadout tiles + stratagem list + metadata */}
              <div className="flex-1 p-3 sm:p-4 flex flex-col gap-3 overflow-hidden">
                {/* Top: equipment row and stratagem column */}
                <div className="flex-1 flex flex-col sm:flex-row gap-3 overflow-hidden">
                  {/* Equipment row: primary, secondary, etc. */}
                  <div className="flex-1 grid grid-cols-3 sm:grid-cols-5 gap-2 place-items-center">
                    <ItemSlot
                      label="Primary"
                      imageUrl={loadout?.primary_image_url}
                      name={loadout?.primary_name || loadout?.primary_id}
                    />
                    <ItemSlot
                      label="Secondary"
                      imageUrl={loadout?.secondary_image_url}
                      name={loadout?.secondary_name || loadout?.secondary_id}
                    />
                    <ItemSlot
                      label="Armor Passive"
                      imageUrl={loadout?.armor_passive_image_url}
                      name={
                        loadout?.armor_passive_name ||
                        loadout?.armor_passive_id
                      }
                      multiline
                    />
                    <ItemSlot
                      label="Booster"
                      imageUrl={loadout?.booster_image_url}
                      name={loadout?.booster_name || loadout?.booster_id}
                    />
                    <ItemSlot
                      label="Throwable"
                      imageUrl={loadout?.throwable_image_url}
                      name={loadout?.throwable_name || loadout?.throwable_id}
                    />
                  </div>

                  {/* Stratagem list: image + name stacked vertically */}
                  <div className="w-full sm:w-48 lg:w-60 bg-slate-900/40 border border-slate-700/60 rounded-md p-2 flex flex-col text-[11px] text-slate-200">
                    <span className="font-semibold mb-2">Stratagems</span>

                    {stratagemEntries.length ? (
                      <ul className="space-y-2 max-h-48 overflow-auto pr-1">
                        {stratagemEntries.map((s) => (
                          <li
                            key={s.id}
                            className="flex items-center gap-2 bg-slate-800/60 border border-slate-600/60 rounded-md p-1.5"
                          >
                            {s.imageUrl ? (
                              <img
                                src={s.imageUrl}
                                alt={s.name}
                                className="w-10 h-10 object-contain rounded-sm bg-slate-900/60 border border-slate-700/60"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-sm bg-slate-900/60 border border-slate-700/60 flex items-center justify-center text-[10px]">
                                ?
                              </div>
                            )}
                            <span className="text-[11px] text-slate-100 leading-tight">
                              {s.name}
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-slate-400 text-[10px]">
                        No stratagems yet. Generate a loadout.
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom: metadata pretty-printed */}
                <div className="h-20 sm:h-24 bg-slate-900/40 border border-slate-700/60 rounded-md p-2 text-[11px] text-slate-200 overflow-auto">
                  <span className="font-semibold block mb-1">Metadata</span>
                  {metadata ? (
                    <pre className="whitespace-pre-wrap text-[10px] text-slate-300">
                      {typeof metadata === "string"
                        ? metadata
                        : JSON.stringify(metadata, null, 2)}
                    </pre>
                  ) : (
                    <span className="text-slate-400 text-[10px]">
                      Metadata from the API will show here.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Single equipment tile: image + slot label + item name
function ItemSlot({ label, imageUrl, name, multiline = false }) {
  const displayName = name || "—";

  return (
    
    <div className="flex flex-col items-center text-[10px] text-slate-200 max-w-[100px] text-center">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={displayName}
          className="w-12 h-12 sm:w-16 sm:h-16 object-contain rounded-md bg-slate-900/70 border border-slate-600/60"
        />
      ) : (
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-md bg-slate-900/70 border border-slate-600/60 flex items-center justify-center">
          ?
        </div>
      )}

      <span className="mt-1 text-[9px] uppercase tracking-wide text-slate-400">
        {label}
      </span>

      <span
        className={`mt-0.5 text-[10px] text-slate-100 ${
          multiline ? "text-center" : "text-center"
        }`}
      >
        {displayName}
      </span>
    </div>
  );
}
