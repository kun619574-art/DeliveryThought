import type { Floor } from "../data/cabinets";

type FloorTabsProps = {
  activeFloor: Floor;
  onChange: (floor: Floor) => void;
};

export function FloorTabs({ activeFloor, onChange }: FloorTabsProps) {
  return (
    <div className="floor-tabs" role="tablist" aria-label="楼层切换">
      {[1, 2].map((floor) => (
        <button
          key={floor}
          type="button"
          role="tab"
          aria-selected={activeFloor === floor}
          className={activeFloor === floor ? "active" : ""}
          onClick={() => onChange(floor as Floor)}
        >
          {floor}层
        </button>
      ))}
    </div>
  );
}
