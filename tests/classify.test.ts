import { test } from "node:test";
import assert from "node:assert/strict";
import { classifyEmail } from "../src/lib/admin/classify.ts";

test("classifies", () => {
  assert.equal(classifyEmail("x@atomicmail.io"), "throwaway");
  assert.equal(classifyEmail("a@demo.greenpert.local"), "test");
  assert.equal(classifyEmail("bot@commitr.demo"), "test");
  assert.equal(classifyEmail("me+test@gmail.com"), "test");
  assert.equal(classifyEmail("anna@gmail.com"), "real");
  assert.equal(classifyEmail("anna@gmail.com", { isDemo: true }), "test");
  assert.equal(classifyEmail("Boss@X.com", { owners: ["boss@x.com"] }), "owner");
  assert.equal(classifyEmail(""), "test");
  assert.equal(classifyEmail("contest@gmail.com"), "real");
});
