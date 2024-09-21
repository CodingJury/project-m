import { useEffect, useRef } from "react";
import { Step } from "../../../utils/scripts/sqrt.script"
import "./SqrtTable.styles.css"

interface SqrtTableProps {
  pairs: string[],
  steps: Step[]
}

const SqrtTable = ({pairs, steps}: SqrtTableProps) => {
  console.log(steps)

  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    if (tableRef.current) {
      const table = tableRef.current;

      // Clear existing table content before appending new rows
      table.innerHTML = '';

      // Create the first row with border
      const row1 = table.insertRow(-1);
      row1.className = 'borderB';
      row1.insertCell(-1).innerHTML = ''; // Blank cell

      // Create the second row with initial data
      const row2 = table.insertRow(-1);
      row2.insertCell(0).innerHTML = steps[0] ? (steps[0].result / steps[0].divisor).toString() : '';
      pairs.forEach((pair) => {
        const cell = row2.insertCell(-1);
        cell.innerHTML = pair;
        cell.className = 'overline';
      });

      // Iterate over each step to create the rows
      steps.forEach((row, step) => {
        // Insert the divisor cells in the first row
        row1.insertCell(-1).innerHTML = `${pairs[step].startsWith('.') ? '.' : ''}${row.divisor}`;

        // Create the third row with result data
        const row3 = table.insertRow(-1);
        row3.className = `borderB`;
        row3.insertCell(-1).innerHTML = ''; // Blank cell

        // Calculate pairs of numbers from the result
        let someNumber = row.result;
        const newPair: number[] = [];
        while (someNumber > 0) {
          newPair.unshift(someNumber % 100);
          someNumber = Math.floor(someNumber / 100);
        }

        pairs.forEach((_, index) => {
          if (index < step + 1 - newPair.length) {
            row3.insertCell(-1).innerHTML = '';
          } else if (index < step + 1) {
            row3.insertCell(-1).innerHTML = newPair[index - step - 1 + newPair.length].toString();
          } else {
            const cell = row3.insertCell(-1);
            cell.className = 'dotline';
          }
        });

        // Create the fourth row with dividends minus results
        const row4 = table.insertRow(-1);
        row4.insertCell(-1).innerHTML =
          step + 1 < steps.length ? (steps[step + 1].divisor ? (steps[step + 1].result / steps[step + 1].divisor) : "").toString() : '';

        let someNumber2 = row.dividend - row.result;
        const newPair2: number[] = [];
        while (someNumber2 > 0) {
          newPair2.unshift(someNumber2 % 100);
          someNumber2 = Math.floor(someNumber2 / 100);
        }

        pairs.forEach((_, index) => {
          if (index < step + 1 - newPair2.length) {
            row4.insertCell(-1).innerHTML = '';
          } else if (index < step + 1) {
            row4.insertCell(-1).innerHTML = newPair2[index - step - 1 + newPair2.length].toString();
          } else if (index === step + 1) {
            row4.insertCell(-1).innerHTML = pairs[step + 1].replace('.', '');
          } else {
            const cell = row4.insertCell(-1);
            cell.className = 'dotline';
          }
        });
      });
    }
  }, [pairs, steps]);

  return <table ref={tableRef} id="sqrt_table"></table>;
}

export default SqrtTable