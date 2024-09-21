export interface Step {
  divisor: number;
  dividend: number;
  result: number;
}

export default function calculateSQRT(number: number, decimalPlaces: number = 3) {
  const steps:Step[] = [];
  
  let tempNum = Math.floor(number);
  let result = 0;
  let divisor = 0;
  
  // Extract pairs of digits starting from the left
  let pairs = [];
  while (tempNum > 0) {
      pairs.unshift(tempNum % 100);
      tempNum = Math.floor(tempNum / 100);
  }

  // Add decimal pairs
  let fractionalPart = number - Math.floor(number);
  for (let i = 0; i < decimalPlaces; i++) {
      fractionalPart *= 100;
      pairs.push(Math.floor(fractionalPart));
      fractionalPart -= Math.floor(fractionalPart);
  }

  // Initialize variables for long division
  let dividend = 0;
  let currentResult = 0;

  pairs.forEach((pair) => {
      dividend = dividend * 100 + pair;

      // Find the maximum digit to add to the result that still produces a square <= dividend
      for (let digit = 9; digit >= 0; digit--) {
          const tempDivisor = (currentResult * 20 + digit) * digit;
          if (tempDivisor <= dividend) {
              divisor = digit;
              currentResult = currentResult * 10 + divisor;
              result = tempDivisor;
              break;
          }
      }

      // Adding data to step for visualization
      steps.push({divisor, dividend, result})

      // Subtract the current divisor square from the dividend
      dividend -= result;
  });

  // Format the final result to the specified decimal places
  // const finalResult = currentResult / Math.pow(10, decimalPlaces);
  // document.getElementById('result').innerText = `Square Root (approx): ${finalResult.toFixed(decimalPlaces)}`;

  //PRE PROCESSING FOR VISUALIZATION
  pairs = pairs.map(p => p?p.toString():'00')
  const decimalIndex = pairs.length - decimalPlaces;
  if(decimalIndex >= 0 && decimalIndex < pairs.length) {
      pairs[decimalIndex] = "."+pairs[decimalIndex]
  }

  return {pairs, steps}
}
