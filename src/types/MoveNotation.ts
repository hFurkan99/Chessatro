export interface MoveNotation {
  piece: string;
  from: string;
  to: string;
  captured?: string; // eğer taş alınmışsa (p, n, b, r, q, k)
  capturedValue?: number; // alınan taşın puanı (isteğe bağlı)
}
