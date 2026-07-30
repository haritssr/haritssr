/**
 * @since 2.0.0
 */
import { pipe } from "./Function.js";
import { globalValue } from "./GlobalValue.js";
import { hasProperty } from "./Predicate.js";
import { structuralRegionState } from "./Utils.js";

/** @internal */
const randomHashCache = globalValue(
  Symbol.for("effect/Hash/randomHashCache"),
  () => new WeakMap<object, number>()
);

/**
 * @since 2.0.0
 * @category symbols
 */
export const symbol: unique symbol = Symbol.for("effect/Hash");

/**
 * @since 2.0.0
 * @category models
 */
export interface Hash {
  [symbol](): number;
}

/**
 * @since 2.0.0
 * @category hashing
 */
export const hash: <A>(self: A) => number = <A>(self: A) => {
  if (structuralRegionState.enabled === true) {
    return 0;
  }

  switch (typeof self) {
    case "number":
      return number(self);
    case "bigint":
      return string(self.toString(10));
    case "boolean":
      return string(String(self));
    case "symbol":
      return string(String(self));
    case "string":
      return string(self);
    case "undefined":
      return string("undefined");
    case "function":
    case "object": {
      if (self === null) {
        return string("null");
      }
      if (self instanceof Date) {
        if (Number.isNaN(self.getTime())) {
          return string("Invalid Date");
        }
        return hash(self.toISOString());
      }
      if (self instanceof URL) {
        return hash(self.href);
      }
      if (isHash(self)) {
        return self[symbol]();
      }
      return random(self);
    }
    default:
      throw new Error(
        `BUG: unhandled typeof ${typeof self} - please report an issue at https://github.com/Effect-TS/effect/issues`
      );
  }
};

/**
 * @since 2.0.0
 * @category hashing
 */
export const random: <A extends object>(self: A) => number = (self) => {
  if (!randomHashCache.has(self)) {
    randomHashCache.set(
      self,
      number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
    );
  }
  return randomHashCache.get(self)!;
};

/**
 * @since 2.0.0
 * @category hashing
 */
export const combine: (b: number) => (self: number) => number = (b) => (self) =>
  (self * 53) ^ b;

/**
 * @since 2.0.0
 * @category hashing
 */
export const optimize = (n: number): number =>
  (n & 0xbf_ff_ff_ff) | ((n >>> 1) & 0x40_00_00_00);

/**
 * @since 2.0.0
 * @category guards
 */
export const isHash = (u: unknown): u is Hash => hasProperty(u, symbol);

/**
 * @since 2.0.0
 * @category hashing
 */
export const number = (n: number) => {
  if (n !== n || n === Number.POSITIVE_INFINITY) {
    return 0;
  }
  let h = n | 0;
  if (h !== n) {
    h ^= n * 0xff_ff_ff_ff;
  }
  while (n > 0xff_ff_ff_ff) {
    h ^= n /= 0xff_ff_ff_ff;
  }
  return optimize(h);
};

/**
 * @since 2.0.0
 * @category hashing
 */
export const string = (str: string) => {
  let h = 5381,
    i = str.length;
  while (i) {
    h = (h * 33) ^ str.charCodeAt(--i);
  }
  return optimize(h);
};

/**
 * @since 2.0.0
 * @category hashing
 */
export const structureKeys = <A extends object>(
  o: A,
  keys: ReadonlyArray<keyof A>
) => {
  let h = 12_289;
  for (let i = 0; i < keys.length; i++) {
    h ^= pipe(string(keys[i]! as string), combine(hash((o as any)[keys[i]!])));
  }
  return optimize(h);
};

/**
 * @since 2.0.0
 * @category hashing
 */
export const structure = <A extends object>(o: A) =>
  structureKeys(o, Object.keys(o) as unknown as ReadonlyArray<keyof A>);

/**
 * @since 2.0.0
 * @category hashing
 */
export const array = <A>(arr: ReadonlyArray<A>) => {
  let h = 6151;
  for (let i = 0; i < arr.length; i++) {
    h = pipe(h, combine(hash(arr[i])));
  }
  return optimize(h);
};

/**
 * @since 2.0.0
 * @category hashing
 */
export const cached: {
  (self: object): (hash: number) => number;
  (self: object, hash: number): number;
} = () => {
  if (arguments.length === 1) {
    const self = arguments[0] as object;
    return ((hash: number) => {
      Object.defineProperty(self, symbol, {
        value() {
          return hash;
        },
        enumerable: false,
      });
      return hash;
    }) as any;
  }
  const self = arguments[0] as object;
  const hash = arguments[1] as number;
  Object.defineProperty(self, symbol, {
    value() {
      return hash;
    },
    enumerable: false,
  });

  return hash;
};
