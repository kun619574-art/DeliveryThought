import { AlertCircle, CheckCircle2, MapPin } from "lucide-react";
import { CABINETS, type Cabinet, type Floor } from "../data/cabinets";
import type { ParsedPickupCode } from "../utils/parsePickupCode";
import { describeCabinetPosition } from "../utils/locateCabinet";

type ResultCardProps = {
  activeFloor: Floor;
  selectedCabinet: Cabinet | null;
  parseResult: ParsedPickupCode | null;
};

export function ResultCard({
  activeFloor,
  selectedCabinet,
  parseResult,
}: ResultCardProps) {
  const hasError = parseResult !== null && parseResult.errors.length > 0;
  const floorCabinetCount = CABINETS.filter((cabinet) => cabinet.floor === activeFloor).length;
  const locationText =
    selectedCabinet?.source === "inferred"
      ? `${describeCabinetPosition(selectedCabinet)} · ${selectedCabinet.area}`
      : selectedCabinet?.area;

  if (hasError) {
    return (
      <section className="result-card error">
        <AlertCircle size={22} />
        <div>
          <h2>无法定位</h2>
          <p>{parseResult.errors[0]}</p>
        </div>
      </section>
    );
  }

  if (!selectedCabinet) {
    return (
      <section className="result-card idle">
        <MapPin size={22} />
        <div>
          <h2>{activeFloor}层地图</h2>
          <p>当前楼层 {floorCabinetCount} 个货柜，共 {CABINETS.length} 个货柜。</p>
        </div>
      </section>
    );
  }

  return (
    <section className="result-card">
      <CheckCircle2 size={22} />
      <div className="result-content">
        <div className="result-heading">
          <div>
            <h2>{selectedCabinet.id}号柜</h2>
            <p>{locationText}</p>
          </div>
          <span className={`source-badge ${selectedCabinet.source}`}>
            {selectedCabinet.source === "confirmed" ? "实图编号" : "推测补齐"}
          </span>
        </div>

        {parseResult?.shelfLevel || parseResult?.sequence ? (
          <dl className="code-detail">
            {parseResult.shelfLevel ? (
              <>
                <dt>货柜架</dt>
                <dd>第 {parseResult.shelfLevel} 层</dd>
              </>
            ) : null}
            {parseResult.sequence ? (
              <>
                <dt>顺序号</dt>
                <dd>{parseResult.sequence}</dd>
              </>
            ) : null}
          </dl>
        ) : null}
      </div>
    </section>
  );
}
