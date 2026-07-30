import { describe, it } from "@effect/vitest";
import { assertTrue, strictEqual } from "@effect/vitest/utils";
import * as S from "effect/Schema";
import * as Util from "../../TestUtils.js";

describe("DateFromNumber", () => {
  it("decoding", async () => {
    await Util.assertions.decoding.succeed(S.DateFromNumber, 0, new Date(0));
    assertTrue(S.decodeSync(S.DateFromNumber)(Number.NaN) instanceof Date);
    assertTrue(
      S.decodeSync(S.DateFromNumber)(Number.POSITIVE_INFINITY) instanceof Date
    );
    assertTrue(
      S.decodeSync(S.DateFromNumber)(Number.NEGATIVE_INFINITY) instanceof Date
    );

    await Util.assertions.decoding.fail(
      S.DateFromNumber,
      null,
      `DateFromNumber
└─ Encoded side transformation failure
   └─ Expected number, actual null`
    );
  });

  it("encoding", async () => {
    await Util.assertions.encoding.succeed(S.DateFromNumber, new Date(0), 0);
    strictEqual(
      S.encodeSync(S.DateFromNumber)(new Date("invalid")),
      Number.NaN
    );
    strictEqual(
      S.encodeSync(S.DateFromNumber)(new Date(Number.NaN)),
      Number.NaN
    );
    strictEqual(
      S.encodeSync(S.DateFromNumber)(new Date(Number.POSITIVE_INFINITY)),
      Number.NaN
    );
    strictEqual(
      S.encodeSync(S.DateFromNumber)(new Date(Number.NEGATIVE_INFINITY)),
      Number.NaN
    );
  });
});
