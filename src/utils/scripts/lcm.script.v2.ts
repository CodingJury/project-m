function gcd(a: number, b: number): number {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

function lcm(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}

function getPrimesUpTo(n: number): number[] {
  if (n < 2) return []; // If n is less than 2, return an empty array since no primes exist.
  const sieve = Array(Math.floor(n) + 1).fill(true);
  sieve[0] = sieve[1] = false; // 0 and 1 are not primes
  for (let i = 2; i * i <= n; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= n; j += i) {
        sieve[j] = false;
      }
    }
  }
  return sieve.reduce((primes, isPrime, index) => {
    if (isPrime) primes.push(index);
    return primes;
  }, [] as number[]);
}

export default function calculateLCM(numbers: number[]) {
  if (numbers.length === 0) {
    return { steps: [], divisors: [], result: 0 }; // Handle empty input array case.
  }

  const calculateLcmForArray = (nums: number[]): number => {
    if (nums.length === 1) return nums[0];
    if (nums.length === 2) return lcm(nums[0], nums[1]);

    const mid = Math.floor(nums.length / 2);
    const leftLcm = calculateLcmForArray(nums.slice(0, mid));
    const rightLcm = calculateLcmForArray(nums.slice(mid));
    return lcm(leftLcm, rightLcm);
  };

  const result = calculateLcmForArray(numbers);

  // Find common divisors using primes up to the square root of the max number
  let tempNumbers = [...numbers];
  const maxNumber = Math.max(...numbers);
  const primes = getPrimesUpTo(Math.sqrt(maxNumber) || 0); // Safely get primes up to the sqrt of maxNumber.
  let divisors = [];
  let steps = [];
  let divisorIndex = 0;

  while (tempNumbers.some(num => num > 1) && divisorIndex < primes.length) {
    const divisor = primes[divisorIndex];
    if (tempNumbers.some(num => num % divisor === 0)) {
      divisors.push(divisor);
      steps.push([divisor, ...tempNumbers]);

      tempNumbers = tempNumbers.map(num => (num % divisor === 0 ? num / divisor : num));
    } else {
      divisorIndex++;
    }
  }

  // Capture remaining division if all numbers are reduced to 1
  if (tempNumbers.every(num => num === 1)) {
    steps.push([null, ...tempNumbers]);
  }

  return { steps, divisors, result };
}
