type Props = {
  gcdString: string,
  gcd: number
}

const GcdResult = ({gcdString, gcd}: Props) => {

  return (
    <div>GCD of ({gcdString}) = {gcd}</div>
  )
}

export default GcdResult