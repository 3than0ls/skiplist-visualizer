import SkipList from "@/skiplist/SkipList";

test("emptySkipList", () => {
  const skipList = new SkipList<number, number>();
  expect(skipList.size()).toBe(0);
  expect(skipList.get(0)).toBeUndefined();
});

test("insertOne", () => {
  const skipList = new SkipList<number>();

  skipList.set(0, "a");
  expect(skipList.get(0)).toEqual("a");
  expect(skipList.size()).toEqual(1);
  expect(skipList.height()).toBeGreaterThan(0);

  expect(skipList.get(1)).toBeUndefined();
});

test("setTwice", () => {
  const skipList = new SkipList<number, number>();

  skipList.set(0, 0);
  skipList.set(0, skipList.get(0)! + 1);

  expect(skipList.get(0)).toEqual(1);
});

test("insertTen", () => {
  const skipList = new SkipList<number, number>();

  for (let i = 0; i < 9; i++) {
    skipList.set(i, i);
  }
  for (let j = 0; j < 9; j++) {
    expect(skipList.get(j)).toEqual(j);
  }
  expect(skipList.size() == 10);
});

test("insert1000", () => {
  const skipList = new SkipList<number, number>();
  const x = 1000;
  for (let i = 0; i < x; i++) {
    skipList.set(i, i);
    expect(skipList.size() == i + 1);
  }
  for (let j = 0; j < x; j++) {
    expect(skipList.get(j)).toEqual(j);
  }
  expect(skipList.size() == x + 1);
});

test("insertStrings", () => {
  const keys = [
    "abc",
    "bcd",
    "jad",
    "foo",
    "bar",
    "baz",
    "funky",
    "jiasjdiosajdiosajio",
    "129083",
    "0",
    "",
    "...",
    "haha",
    "bungo",
  ];
  const skipList = new SkipList<string, number>();

  keys.forEach((s) => skipList.set(s, 0));
  keys.forEach((s) => expect(skipList.get(s)).toEqual(0));
});

test("insertAndDelete", () => {
  const skipList = new SkipList<number, number>();
  const x = 100;
  for (let i = 0; i < x; i++) {
    skipList.set(i, i);
  }
  for (let j = 0; j < x; j++) {
    expect(skipList.get(j)).toEqual(j);
  }
  for (let i = 0; i < x; i++) {
    skipList.delete(i);
  }
  for (let j = 0; j < x; j++) {
    expect(skipList.get(j)).toEqual(undefined);
  }
  expect(skipList.size() == 0);
});
