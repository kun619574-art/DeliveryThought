export type ParsedPickupCode = {
  raw: string;
  normalized: string;
  cabinetId: number | null;
  shelfLevel: number | null;
  sequence: number | null;
  isCompletePickupCode: boolean;
  errors: string[];
};

const FULL_WIDTH_ZERO = "０".charCodeAt(0);
const ASCII_ZERO = "0".charCodeAt(0);

export function parsePickupCode(input: string): ParsedPickupCode {
  const normalized = normalizeInput(input);
  const numbers = normalized.match(/\d+/g)?.map(Number) ?? [];
  const errors: string[] = [];
  const cabinetId = numbers[0] ?? null;
  const shelfLevel = numbers[1] ?? null;
  const sequence = numbers[2] ?? null;

  if (numbers.length === 0) {
    errors.push("请输入货柜号或取件码");
  }

  if (cabinetId !== null && (cabinetId < 1 || cabinetId > 169)) {
    errors.push("货柜号需要在1-169之间,例如155-2-88,我想田忌吧");
  }

  if (shelfLevel !== null && (shelfLevel < 1 || shelfLevel > 6)) {
    errors.push("货柜架需要在 1-6 之间");
  }

  if (sequence !== null && sequence < 1) {
    errors.push("顺序号码需要大于 0");
  }

  return {
    raw: input,
    normalized,
    cabinetId,
    shelfLevel,
    sequence,
    isCompletePickupCode: numbers.length >= 3,
    errors,
  };
}

function normalizeInput(input: string) {
  return input
    .trim()
    .replace(/[０-９]/g, (char) =>
      String.fromCharCode(char.charCodeAt(0) - FULL_WIDTH_ZERO + ASCII_ZERO),
    )
    .replace(/[—–－_]/g, "-")
    .replace(/号|柜|架|层|第/g, "")
    .replace(/\s+/g, "");
}
