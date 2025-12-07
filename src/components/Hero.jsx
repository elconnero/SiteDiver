import { useEffect, useState } from "react";

// Backend endpoints
const API_BASE_URL = "https://aidivers-production.up.railway.app";
const LOADOUT_ENDPOINT = "/get/random_loadout";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Controls for strategy + GA parameters
  const [strategy, setStrategy] = useState("random");
  const [weights, setWeights] = useState(
    "weapon_stats_dps:3.0,weapon_stats_fire_rate_rpm:2.0"
  );
  const [population, setPopulation] = useState(40);
  const [generations, setGenerations] = useState(25);
  const [mutationRate, setMutationRate] = useState(0.3);

  // Loadout data from backend
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

  // Call backend with selected strategy and options, then store JSON response
  async function handleGenerateLoadout() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();
      params.append("strategy", strategy);

      if (strategy === "genetic") {
        if (weights.trim()) params.append("weights", weights.trim());
        params.append("population", String(population));
        params.append("generations", String(generations));
        params.append("mutation_rate", mutationRate.toString());
      }

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

  // Map backend JSON into UI-friendly structures
  const primary = {
    label: "Primary",
    name: loadout?.primary_name || "?",
    imageUrl: loadout?.primary_image_url || "",
  };
  const secondary = {
    label: "Secondary",
    name: loadout?.secondary_name || "?",
    imageUrl: loadout?.secondary_image_url || "",
  };
  const armorPassive = {
    label: "Armor Passive",
    name: loadout?.armor_passive_name || "?",
    imageUrl: loadout?.armor_passive_image_url || "",
  };
  const booster = {
    label: "Booster",
    name: loadout?.booster_name || "?",
    imageUrl: loadout?.booster_image_url || "",
  };
  const throwable = {
    label: "Throwable",
    name: loadout?.throwable_name || "?",
    imageUrl: loadout?.throwable_image_url || "",
  };

  const stratagemEntries =
    loadout?.stratagem_ids?.map((id, idx) => ({
      id,
      name: loadout?.stratagem_names?.[idx] || id,
      imageUrl: loadout?.stratagem_image_urls?.[idx] || "",
    })) || [];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-slate-950 text-slate-100"
    >
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(234, 179, 8, 0.18), transparent 60%)`,
        }}
      />

      <div className="absolute top-20 left-4 sm:left-10 w-40 sm:w-60 h-40 sm:h-60 bg-yellow-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-4 sm:right-10 w-40 sm:w-60 h-40 sm:h-60 bg-yellow-500/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-6xl">
        <div className="bg-slate-900/70 border border-slate-700/70 rounded-3xl shadow-2xl shadow-black/40 backdrop-blur-md p-3 sm:p-5 lg:p-6">
          <div className="flex items-center justify-between gap-4 mb-4 sm:mb-6">
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-slate-50">
                Helldivers Loadout Generator
              </h1>
              <p className="text-xs text-slate-300/80">
                Adjust weights and pull a loadout from the API.
              </p>
            </div>
            <button
              onClick={handleGenerateLoadout}
              disabled={loading}
              className="px-3 sm:px-4 py-1.5 rounded-md text-xs sm:text-sm font-semibold bg-yellow-400 text-black disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Loadout"}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            {/* Left: control panel, hides options when strategy is random */}
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

              {strategy === "genetic" && (
                <>
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
                      onChange={(e) =>
                        setPopulation(Number(e.target.value))
                      }
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
                      onChange={(e) =>
                        setGenerations(Number(e.target.value))
                      }
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
                </>
              )}

              {error && (
                <p className="text-[10px] text-red-400 break-words">
                  {error}
                </p>
              )}
            </div>

            {/* Right: results */}
            <div className="flex-1 flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 grid grid-cols-2 lg:grid-cols-5 gap-3">
                  <EquipmentSlot
                    label={primary.label}
                    name={primary.name}
                    imageUrl={primary.imageUrl}
                  />
                  <EquipmentSlot
                    label={secondary.label}
                    name={secondary.name}
                    imageUrl={secondary.imageUrl}
                  />
                  <EquipmentSlot
                    label={armorPassive.label}
                    name={armorPassive.name}
                    imageUrl={armorPassive.imageUrl}
                  />
                  <EquipmentSlot
                    label={booster.label}
                    name={booster.name}
                    imageUrl={booster.imageUrl}
                  />
                  <EquipmentSlot
                    label={throwable.label}
                    name={throwable.name}
                    imageUrl={throwable.imageUrl}
                  />
                </div>

                <div className="w-full md:w-64 border border-slate-700/70 rounded-xl bg-slate-900/60 p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-100 mb-2">
                    Stratagems
                  </h3>
                  {stratagemEntries.length === 0 ? (
                    <p className="text-[11px] text-slate-400">
                      No stratagems yet. Generate a loadout.
                    </p>
                  ) : (
                    <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                      {stratagemEntries.map((s) => (
                        <div
                          key={s.id}
                          className="flex items-center gap-2 text-[11px]"
                        >
                          {s.imageUrl ? (
                            <img
                              src={s.imageUrl}
                              alt={s.name}
                              className="w-7 h-7 rounded-md object-cover bg-slate-800"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-md bg-slate-800 flex items-center justify-center text-[10px] text-slate-400">
                              ?
                            </div>
                          )}
                          <span className="text-slate-100 truncate">
                            {s.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="border border-slate-700/70 rounded-xl bg-slate-900/60 p-3 sm:p-4">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-100 mb-1.5">
                  Metadata
                </h3>
                {metadata ? (
                  <pre className="text-[10px] sm:text-[11px] text-slate-300 whitespace-pre-wrap break-words max-h-40 overflow-y-auto">
                    {typeof metadata === "string"
                      ? metadata
                      : JSON.stringify(metadata, null, 2)}
                  </pre>
                ) : (
                  <p className="text-[11px] text-slate-400">
                    Metadata from the API will show here.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EquipmentSlot({ label, name, imageUrl }) {
  const displayName = name || "?";
  const hasImage = Boolean(imageUrl);

  return (
    <div className="flex flex-col items-center justify-start bg-slate-900/70 rounded-xl border border-slate-700/70 px-3 py-3">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden mb-1.5">
        {hasImage ? (
          <img
            src={imageUrl}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-lg text-slate-500">?</span>
        )}
      </div>
      <span className="mt-0.5 text-[9px] uppercase tracking-wide text-slate-400">
        {label}
      </span>
      <span className="mt-0.5 text-[10px] text-slate-100 text-center">
        {displayName}
      </span>
    </div>
  );
}
