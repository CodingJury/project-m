import { useEffect, useRef } from "react"
import { GCDStep } from "../../../utils/scripts/gcd.script"
import "./GcdTable.styles.css"

type Props = {
  steps: GCDStep[]
}

const insertBlankCells = (n: number, row: HTMLTableRowElement) => {
  for(let i = 0; i < n; i++) {
    row.insertCell(i).innerHTML = '';
  }
}

const GcdTable = ({steps}: Props) => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const table = tableRef.current;
    if(table) {
      const tbody = table.querySelector('tbody')
      if(tbody) {
        tbody.innerHTML = ""; //clear previous rows
        
        let row = tbody.insertRow(-1)
        const initialDivisorCell = row.insertCell(0)
        initialDivisorCell.innerHTML = (steps[0].divisor).toString()
        initialDivisorCell.classList.add("divisor")

        steps.forEach(({dividend, quotient, product, remainder}, index) => {
          const dividentCell = row.insertCell(index+1)
          dividentCell.innerHTML = dividend.toString()
          dividentCell.classList.add("dividend")

          const quotientCell = row.insertCell(index+2)
          quotientCell.innerHTML = quotient.toString()
          quotientCell.classList.add("quotient")

          row = tbody.insertRow(-1);
          insertBlankCells(index+1, row)
          const productCell = row.insertCell(index+1)
          productCell.innerHTML = (-product).toString();

          row = tbody.insertRow(-1);
          insertBlankCells(index+1, row)
          const remainderCell = row.insertCell(index+1)
          remainderCell.innerHTML = remainder.toString()
          remainderCell.classList.add("remainder")
        })
      }
    }
  }, [steps])

  return (
    <table id="gcd_table" ref={tableRef}>
      <tbody>
        {/* {Table rows will be added dynamically} */}
      </tbody>
    </table>
  )
}

export default GcdTable