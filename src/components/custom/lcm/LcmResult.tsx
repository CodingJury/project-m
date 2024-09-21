type Props = {
  numbers: number[],
  divisors: number[],
  result: number
}

const LcmResult = ({numbers, divisors, result}: Props) => {
  const lcmString = numbers.join(',');
  const dividerStr = divisors.join('x');

  return (
    <div>LCM of ({lcmString}) = {dividerStr} = {result}</div>
  )
}

export default LcmResult