export interface GCDStep {
  divisor: number;
  dividend: number;
  quotient: number;
  product: number;
  remainder: number;
}

export default function calculateGCD(nums: [number, number]) {
  let [divisor, dividend] = nums;

  if (divisor > dividend) {
    [divisor, dividend] = [dividend, divisor];
  }

  const MAX_STEP = 20;
  const steps: GCDStep[] = [];

  for(let step = 0; step < MAX_STEP; step++) {
    const quotient = Math.floor(dividend / divisor)
    const product = quotient * divisor
    const remainder = dividend - product

    steps.push({
      divisor,
      dividend,
      quotient,
      product,
      remainder
    });

    if (remainder === 0) {
      return { gcd: divisor, steps };
    }

    dividend = divisor;
    divisor = remainder;
  }

  return { gcd: divisor, steps };
}
