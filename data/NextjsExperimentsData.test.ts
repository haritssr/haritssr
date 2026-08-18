import { describe, expect, test } from "bun:test";
import {
  NextjsArticlesData,
  NextjsStudentsData,
} from "./NextjsExperimentsData";

describe("Next.js experiment data", () => {
  test("uses unique IDs for articles and students", () => {
    const articleIds = NextjsArticlesData.map((article) => article.id);
    const studentIds = NextjsStudentsData.map((student) => student.id);

    expect(new Set(articleIds).size).toBe(articleIds.length);
    expect(new Set(studentIds).size).toBe(studentIds.length);
  });

  test("provides complete records for detail pages", () => {
    expect(
      NextjsArticlesData.every((article) => article.title && article.body)
    ).toBe(true);
    expect(
      NextjsStudentsData.every(
        (student) =>
          student.name &&
          student.email &&
          student.website &&
          student.address.city
      )
    ).toBe(true);
  });
});
