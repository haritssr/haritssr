import { describe, it } from "@effect/vitest";
import * as S from "effect/Schema";
import * as Util from "../../TestUtils.js";

describe("Number", () => {
  const schema = S.Number;
  it("decoding", async () => {
    await Util.assertions.decoding.succeed(schema, 1, 1);
    await Util.assertions.decoding.succeed(schema, Number.NaN, Number.NaN);
    await Util.assertions.decoding.succeed(
      schema,
      Number.POSITIVE_INFINITY,
      Number.POSITIVE_INFINITY
    );
    await Util.assertions.decoding.succeed(
      schema,
      Number.NEGATIVE_INFINITY,
      Number.NEGATIVE_INFINITY
    );
    await Util.assertions.decoding.fail(
      schema,
      "a",
      `Expected number, actual "a"`
    );
  });

  it("encoding", async () => {
    await Util.assertions.encoding.succeed(schema, 1, 1);
  });
});
