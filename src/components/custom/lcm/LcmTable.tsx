import "./LcmTable.styles.css"

type Props = {
  steps: (number | null)[][];
}

const LcmTable = ({steps}: Props) => {
  return (
    <table id="lcm_table">
        <tbody>
          {steps.map((step, rowIndex) => (
            <tr key={rowIndex}>
              {step.map((value, cellIndex) => (
                <td
                  key={cellIndex}
                >
                  {value !== null ? value : ''}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
  )
}

export default LcmTable