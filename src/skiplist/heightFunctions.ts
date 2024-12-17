type HeightFunctionArgs = {
  length: number; // length of the SkipList
  key: unknown; // key value
};

// the best height functions are a function of the key and the length of the skip lsit
// length to allow optimal maximum/minimum height for searching
// key to create a "hash" ensuring a consistent non-random height on every insert

export type HeightFunction = (args: HeightFunctionArgs) => number;

export function pureCoin({}: HeightFunctionArgs) {
  let heads = 0;
  while (Math.random() > 0.5) {
    heads++;
  }

  return heads;
}

export function boundedCoin(min: number, max: number) {
  return ({}: HeightFunctionArgs) => {
    let heads = 1;
    while (Math.random() > 0.5) {
      heads++;
    }

    return Math.min(max, Math.max(min, heads));
  };
}

export function boundedLogMaxCoin(threshold: number = 16) {
  return ({ length }: HeightFunctionArgs) => {
    let heads = 1;
    while (Math.random() > 0.5) {
      heads++;
    }

    const max =
      length <= threshold ? threshold - 1 : Math.ceil(Math.log2(length));

    return Math.max(heads, max);
  };
}
