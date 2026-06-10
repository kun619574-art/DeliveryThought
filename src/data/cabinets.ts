export type Floor = 1 | 2;
export type CabinetSource = "confirmed" | "inferred";

export type Cabinet = {
  id: number;
  floor: Floor;
  x: number;
  y: number;
  width: number;
  height: number;
  source: CabinetSource;
  area: string;
  orientation: "horizontal" | "vertical";
};

export type FloorBounds = {
  width: number;
  height: number;
  outlinePath: string;
};

export const FLOOR_BOUNDS: Record<Floor, FloorBounds> = {
  1: {
    width: 900,
    height: 760,
    outlinePath:
      "M88 690 L88 244 L210 244 L210 130 L545 130 L545 42 L760 42 L760 388 L828 388 L828 690 Z",
  },
  2: {
    width: 900,
    height: 760,
    outlinePath:
      "M88 690 L88 72 L742 72 L742 405 L826 405 L826 690 Z",
  },
};

const confirmedCabinets: Cabinet[] = [
  c(1, 1, 506, 455, 86, 28, "confirmed", "一层中部取件台前方"),
  c(2, 1, 397, 455, 86, 28, "confirmed", "一层中部取件台前方"),
  c(3, 1, 288, 455, 86, 28, "confirmed", "一层中部取件台前方"),
  c(4, 1, 728, 310, 40, 54, "confirmed", "一层右侧通道"),
  c(5, 1, 728, 248, 40, 54, "confirmed", "一层右侧通道"),
  c(6, 1, 728, 186, 40, 54, "confirmed", "一层右侧通道"),
  c(7, 1, 728, 124, 40, 54, "confirmed", "一层右侧通道"),
  c(8, 1, 728, 62, 40, 54, "confirmed", "一层右侧通道"),
  c(9, 1, 383, 318, 90, 28, "confirmed", "一层中部偏上"),
  c(10, 1, 485, 318, 90, 28, "confirmed", "一层中部偏上"),
  c(16, 1, 202, 617, 42, 58, "confirmed", "一层左下入口旁"),
  c(17, 1, 202, 554, 42, 58, "confirmed", "一层左下入口旁"),
  c(18, 1, 202, 491, 42, 58, "confirmed", "一层左下入口旁"),
  c(19, 1, 268, 506, 42, 58, "confirmed", "一层左侧中下"),
  c(20, 1, 397, 382, 90, 28, "confirmed", "一层中央货架区"),
  c(21, 1, 495, 382, 90, 28, "confirmed", "一层中央货架区"),
  c(22, 1, 495, 348, 90, 28, "confirmed", "一层中央货架区"),
  c(23, 1, 397, 348, 90, 28, "confirmed", "一层中央货架区"),

  c(101, 2, 218, 580, 42, 54, "confirmed", "二层左下楼梯旁"),
  c(102, 2, 218, 638, 42, 54, "confirmed", "二层左下楼梯旁"),
  c(109, 2, 360, 638, 42, 54, "confirmed", "二层下方中左"),
  c(110, 2, 360, 580, 42, 54, "confirmed", "二层下方中左"),
  c(111, 2, 410, 580, 42, 54, "confirmed", "二层下方中左"),
  c(112, 2, 410, 638, 42, 54, "confirmed", "二层下方中左"),
  c(114, 2, 560, 580, 42, 54, "confirmed", "二层下方中右"),
  c(115, 2, 560, 638, 42, 54, "confirmed", "二层下方中右"),
  c(117, 2, 610, 580, 42, 54, "confirmed", "二层下方中右"),
  c(118, 2, 610, 638, 42, 54, "confirmed", "二层下方中右"),
  c(120, 2, 715, 580, 42, 54, "confirmed", "二层右下楼梯旁"),
  c(121, 2, 715, 638, 42, 54, "confirmed", "二层右下楼梯旁"),
  c(127, 2, 114, 502, 92, 28, "confirmed", "二层左侧货架区"),
  c(128, 2, 114, 458, 92, 28, "confirmed", "二层左侧货架区"),
  c(129, 2, 114, 414, 92, 28, "confirmed", "二层左侧货架区"),
  c(130, 2, 114, 338, 42, 58, "confirmed", "二层左侧货架区"),
  c(131, 2, 132, 268, 92, 28, "confirmed", "二层左上过道"),
  c(132, 2, 360, 408, 42, 54, "confirmed", "二层中央货架区"),
  c(133, 2, 360, 346, 42, 54, "confirmed", "二层中央货架区"),
  c(134, 2, 360, 284, 42, 54, "confirmed", "二层中央货架区"),
  c(135, 2, 410, 284, 42, 54, "confirmed", "二层中央货架区"),
  c(136, 2, 410, 346, 42, 54, "confirmed", "二层中央货架区"),
  c(137, 2, 410, 408, 42, 54, "confirmed", "二层中央货架区"),
  c(138, 2, 560, 284, 42, 54, "confirmed", "二层中右货架区"),
  c(139, 2, 560, 346, 42, 54, "confirmed", "二层中右货架区"),
  c(140, 2, 610, 284, 42, 54, "confirmed", "二层中右货架区"),
  c(141, 2, 610, 346, 42, 54, "confirmed", "二层中右货架区"),
  c(142, 2, 558, 228, 108, 28, "confirmed", "二层右上过道"),
  c(143, 2, 114, 126, 42, 54, "confirmed", "二层左上角"),
  c(144, 2, 114, 66, 42, 54, "confirmed", "二层左上角"),
  c(146, 2, 294, 126, 42, 54, "confirmed", "二层上方货架区"),
  c(147, 2, 294, 66, 42, 54, "confirmed", "二层上方货架区"),
  c(148, 2, 344, 126, 42, 54, "confirmed", "二层上方货架区"),
  c(149, 2, 344, 66, 42, 54, "confirmed", "二层上方货架区"),
  c(150, 2, 462, 66, 42, 54, "confirmed", "二层上方货架区"),
  c(151, 2, 462, 126, 42, 54, "confirmed", "二层上方货架区"),
  c(152, 2, 512, 66, 42, 54, "confirmed", "二层上方货架区"),
  c(153, 2, 512, 126, 42, 54, "confirmed", "二层上方货架区"),
  c(154, 2, 620, 126, 42, 54, "confirmed", "二层上方货架区"),
  c(155, 2, 620, 66, 42, 54, "confirmed", "二层上方货架区"),
  c(156, 2, 670, 66, 42, 54, "confirmed", "二层上方货架区"),
  c(157, 2, 670, 126, 42, 54, "confirmed", "二层上方货架区"),
  c(158, 2, 558, 180, 108, 28, "confirmed", "二层右上过道"),
  c(162, 2, 768, 66, 42, 54, "confirmed", "二层右侧货架区"),
  c(163, 2, 768, 126, 42, 54, "confirmed", "二层右侧货架区"),
  c(164, 2, 768, 186, 42, 54, "confirmed", "二层右侧货架区"),
  c(165, 2, 768, 246, 42, 54, "confirmed", "二层右侧货架区"),
  c(166, 2, 768, 306, 42, 54, "confirmed", "二层右侧货架区"),
];

const inferredFloorOneIds = range(1, 100).filter(
  (id) => !confirmedCabinets.some((cabinet) => cabinet.id === id),
);

const inferredFloorTwoIds = range(101, 169).filter(
  (id) => !confirmedCabinets.some((cabinet) => cabinet.id === id),
);

const inferredCabinets: Cabinet[] = [
  ...assignIdsToSlots(
    seededShuffle(inferredFloorOneIds, 1409),
    [
      ...gridSlots(1, 252, 168, 6, 6, 48, 23, 23, 17, "一层上方补齐货架区"),
      ...gridSlots(1, 122, 328, 2, 7, 52, 23, 22, 16, "一层左侧补齐货架区"),
      ...gridSlots(1, 604, 410, 3, 6, 52, 23, 22, 17, "一层右侧补齐货架区"),
      ...gridSlots(1, 326, 574, 6, 4, 48, 23, 19, 15, "一层下方补齐货架区"),
    ],
    confirmedCabinets,
    3301,
  ),
  ...assignIdsToSlots(
    seededShuffle(inferredFloorTwoIds, 2207),
    [
      ...gridSlots(2, 268, 556, 3, 2, 48, 23, 22, 17, "二层下方补齐货架区"),
      ...gridSlots(2, 500, 556, 1, 3, 48, 23, 18, 16, "二层下方补齐货架区"),
      ...gridSlots(2, 686, 430, 3, 4, 42, 24, 17, 17, "二层右侧补齐货架区"),
      ...gridSlots(2, 210, 190, 3, 3, 48, 23, 20, 18, "二层左上补齐货架区"),
      ...gridSlots(2, 690, 188, 2, 3, 42, 24, 15, 17, "二层右上补齐货架区"),
    ],
    confirmedCabinets,
    4401,
  ),
];

export const CABINETS = [...confirmedCabinets, ...inferredCabinets].sort(
  (a, b) => a.id - b.id,
);

function c(
  id: number,
  floor: Floor,
  x: number,
  y: number,
  width: number,
  height: number,
  source: CabinetSource,
  area: string,
): Cabinet {
  return {
    id,
    floor,
    x,
    y,
    width,
    height,
    source,
    area,
    orientation: width >= height ? "horizontal" : "vertical",
  };
}

function range(start: number, end: number) {
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

type Slot = Omit<Cabinet, "id" | "source">;

function gridSlots(
  floor: Floor,
  startX: number,
  startY: number,
  columns: number,
  rows: number,
  width: number,
  height: number,
  gapX: number,
  gapY: number,
  area: string,
): Slot[] {
  const slots: Slot[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const seed = floor * 10000 + row * 137 + column * 53;
      slots.push({
        floor,
        x: startX + column * (width + gapX) + jitter(seed, 5),
        y: startY + row * (height + gapY) + jitter(seed + 17, 4),
        width,
        height,
        area,
        orientation: width >= height ? "horizontal" : "vertical",
      });
    }
  }

  return slots;
}

function assignIdsToSlots(
  ids: number[],
  slots: Slot[],
  reserved: Cabinet[],
  seed: number,
): Cabinet[] {
  const floor = slots[0]?.floor;
  const occupied: Rect[] = [...reserved.filter((cabinet) => cabinet.floor === floor)];
  const availableSlots: Slot[] = [];

  for (const slot of seededShuffle(slots, seed)) {
    if (isRectClear(slot, occupied, 10)) {
      availableSlots.push(slot);
      occupied.push(slot);
    }
  }

  for (const slot of fallbackSlots(floor, seed + 97)) {
    if (availableSlots.length >= ids.length) {
      break;
    }

    if (isRectClear(slot, occupied, 10)) {
      availableSlots.push(slot);
      occupied.push(slot);
    }
  }

  if (availableSlots.length < ids.length) {
    throw new Error(`Not enough cabinet slots for floor ${floor}`);
  }

  return ids.map((id, index) => ({
    id,
    ...availableSlots[index],
    source: "inferred",
  }));
}

type Rect = Pick<Cabinet, "floor" | "x" | "y" | "width" | "height">;

function isRectClear(rect: Rect, occupied: Rect[], margin: number) {
  return !occupied.some((other) => rectsOverlap(rect, other, margin));
}

function rectsOverlap(a: Rect, b: Rect, margin: number) {
  return (
    a.floor === b.floor &&
    a.x < b.x + b.width + margin &&
    a.x + a.width + margin > b.x &&
    a.y < b.y + b.height + margin &&
    a.y + a.height + margin > b.y
  );
}

function fallbackSlots(floor: Floor, seed: number): Slot[] {
  const areas =
    floor === 1
      ? [
          areaSlots(1, 112, 268, 240, 176, 48, 22, 22, 16, "一层左侧补齐货架区"),
          areaSlots(1, 250, 158, 416, 154, 48, 22, 22, 16, "一层上方补齐货架区"),
          areaSlots(1, 590, 388, 156, 236, 48, 22, 22, 16, "一层右侧补齐货架区"),
          areaSlots(1, 294, 500, 350, 150, 48, 22, 20, 16, "一层下方补齐货架区"),
        ]
      : [
          areaSlots(2, 166, 204, 162, 158, 44, 24, 18, 16, "二层左上补齐货架区"),
          areaSlots(2, 454, 218, 282, 270, 44, 24, 18, 16, "二层右侧补齐货架区"),
          areaSlots(2, 260, 520, 438, 152, 44, 24, 18, 16, "二层下方补齐货架区"),
          areaSlots(2, 690, 408, 104, 160, 42, 24, 16, 16, "二层右侧补齐货架区"),
        ];

  return seededShuffle(areas.flat(), seed);
}

function areaSlots(
  floor: Floor,
  x: number,
  y: number,
  width: number,
  height: number,
  slotWidth: number,
  slotHeight: number,
  gapX: number,
  gapY: number,
  area: string,
) {
  const columns = Math.max(1, Math.floor((width + gapX) / (slotWidth + gapX)));
  const rows = Math.max(1, Math.floor((height + gapY) / (slotHeight + gapY)));

  return gridSlots(floor, x, y, columns, rows, slotWidth, slotHeight, gapX, gapY, area);
}

function seededShuffle<T>(items: T[], seed: number): T[] {
  const output = [...items];
  let state = seed;

  for (let index = output.length - 1; index > 0; index -= 1) {
    state = (state * 1664525 + 1013904223) % 4294967296;
    const swapIndex = state % (index + 1);
    [output[index], output[swapIndex]] = [output[swapIndex], output[index]];
  }

  return output;
}

function jitter(seed: number, amount: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return (value - Math.floor(value) - 0.5) * amount * 2;
}
