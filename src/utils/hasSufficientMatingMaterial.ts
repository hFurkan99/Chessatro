export const hasSufficientMatingMaterial = (pieces: string[]): boolean => {
  const hasQueen = pieces.includes("q") || pieces.includes("Q");
  const hasRook = pieces.includes("r") || pieces.includes("R");
  const pawns = pieces.filter((p) => p.toLowerCase() === "p");
  const bishops = pieces.filter((p) => p.toLowerCase() === "b");
  const knights = pieces.filter((p) => p.toLowerCase() === "n");

  const numBishops = bishops.length;
  const numKnights = knights.length;

  if (hasQueen || hasRook || pawns.length > 0) return true;
  if (numBishops >= 2) return true;
  if (numBishops >= 1 && numKnights >= 1) return true;
  if (hasRook && (numBishops > 0 || numKnights > 0)) return true;

  return false;
};
