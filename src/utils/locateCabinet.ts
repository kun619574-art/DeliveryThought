import { FLOOR_BOUNDS, type Cabinet } from "../data/cabinets";

export function describeCabinetPosition(cabinet: Cabinet) {
  const bounds = FLOOR_BOUNDS[cabinet.floor];
  const centerX = cabinet.x + cabinet.width / 2;
  const centerY = cabinet.y + cabinet.height / 2;

  const horizontal =
    centerX < bounds.width * 0.34
      ? "左侧"
      : centerX > bounds.width * 0.66
        ? "右侧"
        : "中部";

  const vertical =
    centerY < bounds.height * 0.34
      ? "偏上"
      : centerY > bounds.height * 0.66
        ? "偏下"
        : "中间";

  return `${cabinet.floor}层${horizontal}${vertical}`;
}
