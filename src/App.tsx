import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, MoreHorizontal, Search } from "lucide-react";
import { FloorTabs } from "./components/FloorTabs";
import { MapView } from "./components/MapView";
import { ResultCard } from "./components/ResultCard";
import { SearchPanel } from "./components/SearchPanel";
import { CABINETS, type Cabinet, type Floor } from "./data/cabinets";
import { parsePickupCode, type ParsedPickupCode } from "./utils/parsePickupCode";

export function App() {
  const [activeFloor, setActiveFloor] = useState<Floor>(1);
  const [query, setQuery] = useState("");
  const [parseResult, setParseResult] = useState<ParsedPickupCode | null>(null);
  const [selectedCabinet, setSelectedCabinet] = useState<Cabinet | null>(null);

  const cabinetsById = useMemo(() => {
    return new Map(CABINETS.map((cabinet) => [cabinet.id, cabinet]));
  }, []);

  useEffect(() => {
    const initialQuery = new URLSearchParams(window.location.search).get("q");

    if (!initialQuery) {
      return;
    }

    const parsed = parsePickupCode(initialQuery);
    const cabinet = parsed.cabinetId ? cabinetsById.get(parsed.cabinetId) : null;

    setQuery(initialQuery);
    setParseResult(parsed);
    setSelectedCabinet(cabinet ?? null);

    if (cabinet) {
      setActiveFloor(cabinet.floor);
    }
  }, [cabinetsById]);

  const handleLocate = (nextQuery = query) => {
    const parsed = parsePickupCode(nextQuery);
    setParseResult(parsed);

    if (!parsed.cabinetId || parsed.errors.length > 0) {
      setSelectedCabinet(null);
      return;
    }

    const cabinet = cabinetsById.get(parsed.cabinetId);
    setSelectedCabinet(cabinet ?? null);

    if (cabinet) {
      setActiveFloor(cabinet.floor);
    }
  };

  const handleCabinetSelect = (cabinet: Cabinet) => {
    setSelectedCabinet(cabinet);
    setActiveFloor(cabinet.floor);
    setParseResult({
      raw: `${cabinet.id}`,
      normalized: `${cabinet.id}`,
      cabinetId: cabinet.id,
      shelfLevel: null,
      sequence: null,
      isCompletePickupCode: false,
      errors: [],
    });
    setQuery(`${cabinet.id}`);
  };

  return (
    <main className="app-shell">
      <section className="mini-program">
        <header className="top-bar">
          <button aria-label="返回" className="icon-button ghost">
            <ArrowLeft size={22} />
          </button>
          <div>
            <p className="top-title">实景找包裹</p>
            <p className="top-subtitle">货柜定位</p>
          </div>
          <div className="top-actions">
            <button aria-label="更多" className="icon-button">
              <MoreHorizontal size={22} />
            </button>
            <button aria-label="搜索" className="icon-button">
              <Search size={20} />
            </button>
          </div>
        </header>

        <SearchPanel
          query={query}
          onQueryChange={setQuery}
          onLocate={() => handleLocate()}
        />

        <FloorTabs activeFloor={activeFloor} onChange={setActiveFloor} />

        <MapView
          activeFloor={activeFloor}
          cabinets={CABINETS}
          selectedCabinetId={selectedCabinet?.id ?? null}
          onCabinetSelect={handleCabinetSelect}
        />

        <ResultCard
          activeFloor={activeFloor}
          selectedCabinet={selectedCabinet}
          parseResult={parseResult}
        />
      </section>
    </main>
  );
}
