/** @internal */
export const hashOptimize = (n: number): number =>
  (n & 0xbf_ff_ff_ff) | ((n >>> 1) & 0x40_00_00_00);

/** @internal */
export const hashString = (str: string) => {
  let h = 5381,
    i = str.length;
  while (i) {
    h = (h * 33) ^ str.charCodeAt(--i);
  }
  return hashOptimize(h);
};
