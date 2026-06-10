import { useEffect, useMemo, useRef, useState } from "react";
import { LocateFixed, Minus, Plus } from "lucide-react";
import { CABINETS, FLOOR_BOUNDS, type Cabinet, type Floor } from "../data/cabinets";

type MapViewProps = {
  activeFloor: Floor;
  cabinets: Cabinet[];
  selectedCabinetId: number | null;
  onCabinetSelect: (cabinet: Cabinet) => void;
};

type Transform = {
  scale: number;
  x: number;
  y: number;
};

const MIN_SCALE = 0.86;
const MAX_SCALE = 2.8;

export function MapView({
  activeFloor,
  cabinets,
  selectedCabinetId,
  onCabinetSelect,
}: MapViewProps) {
  const bounds = FLOOR_BOUNDS[activeFloor];
  const svgRef = useRef<SVGSVGElement | null>(null);
  const dragRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 });

  const visibleCabinets = useMemo(
    () => cabinets.filter((cabinet) => cabinet.floor === activeFloor),
    [activeFloor, cabinets],
  );

  const orderedCabinets = useMemo(() => {
    return [...visibleCabinets].sort((a, b) => {
      if (a.id === selectedCabinetId) {
        return 1;
      }

      if (b.id === selectedCabinetId) {
        return -1;
      }

      if (a.source !== b.source) {
        return a.source === "inferred" ? -1 : 1;
      }

      return a.id - b.id;
    });
  }, [selectedCabinetId, visibleCabinets]);

  const backgroundCabinets = orderedCabinets.filter(
    (cabinet) => cabinet.source === "inferred" && cabinet.id !== selectedCabinetId,
  );

  const foregroundCabinets = orderedCabinets.filter(
    (cabinet) => cabinet.source === "confirmed" || cabinet.id === selectedCabinetId,
  );

  const selectedCabinet = useMemo(
    () => CABINETS.find((cabinet) => cabinet.id === selectedCabinetId) ?? null,
    [selectedCabinetId],
  );

  useEffect(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
  }, [activeFloor]);

  useEffect(() => {
    if (!selectedCabinet || selectedCabinet.floor !== activeFloor) {
      return;
    }

    const nextScale = Math.max(1.45, transform.scale);
    const centerX = selectedCabinet.x + selectedCabinet.width / 2;
    const centerY = selectedCabinet.y + selectedCabinet.height / 2;

    setTransform({
      scale: nextScale,
      x: bounds.width / 2 - centerX * nextScale,
      y: bounds.height / 2 - centerY * nextScale,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCabinetId, activeFloor]);

  const zoom = (direction: 1 | -1) => {
    setTransform((current) => {
      const nextScale = clamp(current.scale + direction * 0.22, MIN_SCALE, MAX_SCALE);
      const ratio = nextScale / current.scale;
      return {
        scale: nextScale,
        x: bounds.width / 2 - (bounds.width / 2 - current.x) * ratio,
        y: bounds.height / 2 - (bounds.height / 2 - current.y) * ratio,
      };
    });
  };

  const reset = () => {
    if (selectedCabinet && selectedCabinet.floor === activeFloor) {
      const nextScale = 1.55;
      const centerX = selectedCabinet.x + selectedCabinet.width / 2;
      const centerY = selectedCabinet.y + selectedCabinet.height / 2;
      setTransform({
        scale: nextScale,
        x: bounds.width / 2 - centerX * nextScale,
        y: bounds.height / 2 - centerY * nextScale,
      });
      return;
    }

    setTransform({ scale: 1, x: 0, y: 0 });
  };

  const clientDeltaToSvg = (deltaX: number, deltaY: number) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) {
      return { x: deltaX, y: deltaY };
    }

    return {
      x: (deltaX * bounds.width) / rect.width,
      y: (deltaY * bounds.height) / rect.height,
    };
  };

  const renderCabinet = (cabinet: Cabinet) => {
    const isSelected = cabinet.id === selectedCabinetId;

    return (
      <g
        key={cabinet.id}
        data-cabinet-id={cabinet.id}
        className={`cabinet ${cabinet.source} ${isSelected ? "selected" : ""}`}
        tabIndex={0}
        role="button"
        aria-label={`${cabinet.id}号柜`}
        onClick={() => onCabinetSelect(cabinet)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            onCabinetSelect(cabinet);
          }
        }}
      >
        <rect
          x={cabinet.x}
          y={cabinet.y}
          width={cabinet.width}
          height={cabinet.height}
          rx="4"
        />
        <text
          x={cabinet.x + cabinet.width / 2}
          y={cabinet.y + cabinet.height / 2}
          dominantBaseline="middle"
          textAnchor="middle"
        >
          {cabinet.id}
        </text>
      </g>
    );
  };

  return (
    <section className="map-section" aria-label={`${activeFloor}层地图`}>
      <svg
        ref={svgRef}
        className="station-map"
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        role="img"
        aria-label={`${activeFloor}层快递柜平面图`}
        onWheel={(event) => {
          event.preventDefault();
          zoom(event.deltaY > 0 ? -1 : 1);
        }}
        onPointerDown={(event) => {
          if ((event.target as SVGElement).closest("[data-cabinet-id]")) {
            return;
          }

          event.currentTarget.setPointerCapture(event.pointerId);
          dragRef.current = {
            pointerId: event.pointerId,
            startClientX: event.clientX,
            startClientY: event.clientY,
            startX: transform.x,
            startY: transform.y,
          };
        }}
        onPointerMove={(event) => {
          if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) {
            return;
          }

          const delta = clientDeltaToSvg(
            event.clientX - dragRef.current.startClientX,
            event.clientY - dragRef.current.startClientY,
          );

          setTransform((current) => ({
            ...current,
            x: dragRef.current!.startX + delta.x,
            y: dragRef.current!.startY + delta.y,
          }));
        }}
        onPointerUp={(event) => {
          if (dragRef.current?.pointerId === event.pointerId) {
            dragRef.current = null;
          }
        }}
      >
        <defs>
          <pattern id="map-grid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#e3e9f0" strokeWidth="1" />
          </pattern>
          <pattern id="inferred-pattern" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#f4f9fd" />
          </pattern>
        </defs>

        <rect width={bounds.width} height={bounds.height} fill="url(#map-grid)" />

        <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.scale})`}>
          <FloorShell floor={activeFloor} />
          {backgroundCabinets.map(renderCabinet)}
          <MapFixtures floor={activeFloor} />
          {foregroundCabinets.map(renderCabinet)}
        </g>
      </svg>

      <div className="zoom-controls" aria-label="地图缩放">
        <button type="button" aria-label="放大" onClick={() => zoom(1)}>
          <Plus size={19} />
        </button>
        <button type="button" aria-label="定位到结果" onClick={reset}>
          <LocateFixed size={18} />
        </button>
        <button type="button" aria-label="缩小" onClick={() => zoom(-1)}>
          <Minus size={19} />
        </button>
      </div>
    </section>
  );
}

function FloorShell({ floor }: { floor: Floor }) {
  const bounds = FLOOR_BOUNDS[floor];

  return (
    <g className="floor-shell">
      <path d={bounds.outlinePath} />
      <text x="112" y="112" className="floor-watermark">
        {floor}F
      </text>
    </g>
  );
}

function MapFixtures({ floor }: { floor: Floor }) {
  if (floor === 1) {
    return (
      <g className="fixtures">
        <Stairs x={112} y={535} />
        <Stairs x={720} y={535} />
        <rect className="service-desk" x="395" y="535" width="190" height="58" rx="4" />
        <circle className="camera" cx="492" cy="516" r="12" />
        <path className="camera" d="M492 516 L468 505 L468 527 Z" />
        <Door x={170} y={690} />
        <Door x={440} y={690} />
        <Sensor x={338} y={676} />
        <Sensor x={595} y={676} />
        <Sensor x={785} y={396} />
      </g>
    );
  }

  return (
    <g className="fixtures">
      <Stairs x={118} y={585} />
      <Stairs x={720} y={585} />
      <Sensor x={760} y={425} />
      <Sensor x={808} y={425} />
      <Sensor x={810} y={480} />
      <rect className="open-zone" x="240" y="518" width="110" height="34" rx="4" />
      <rect className="open-zone" x="512" y="518" width="110" height="34" rx="4" />
    </g>
  );
}

function Stairs({ x, y }: { x: number; y: number }) {
  return (
    <g className="stairs" transform={`translate(${x} ${y})`}>
      <rect width="72" height="92" rx="3" />
      {[18, 32, 46, 60, 74].map((lineY) => (
        <line key={lineY} x1="0" y1={lineY} x2="72" y2={lineY} />
      ))}
    </g>
  );
}

function Sensor({ x, y }: { x: number; y: number }) {
  return (
    <g className="sensor" transform={`translate(${x} ${y})`}>
      <rect x="-11" y="-11" width="22" height="22" rx="3" />
      <rect x="-5" y="-5" width="10" height="10" rx="2" />
    </g>
  );
}

function Door({ x, y }: { x: number; y: number }) {
  return (
    <g className="door" transform={`translate(${x} ${y})`}>
      <line x1="-44" y1="0" x2="44" y2="0" />
      <path d="M-16 0 L0 -18 L16 0" />
    </g>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
