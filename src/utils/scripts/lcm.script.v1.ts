function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
function lcm(a: number, b: number): number { return (a * b) / gcd(a, b); }

export default function calculateLCM(numbers: number[]) {
  let result = numbers[0];
  let steps = [];
  let divisors = [];

  // Find the LCM and record steps
  for (let i = 1; i < numbers.length; i++) {
    result = lcm(result, numbers[i]);
  }

  // Find common divisors
  let tempNumbers = [...numbers];
  let divisor = 2;

  while (tempNumbers.some(num => num > 1)) {
    if (tempNumbers.some(num => num % divisor === 0)) {
      divisors.push(divisor);
      steps.push([divisor, ...tempNumbers]);

      tempNumbers = tempNumbers.map(num => (num % divisor === 0 ? num / divisor : num));
    } else {
      divisor++;
    }
  }

  if(tempNumbers.every(num => num == 1)) {
    steps.push([null, ...tempNumbers]);
  }

  return { steps, divisors, result }
}