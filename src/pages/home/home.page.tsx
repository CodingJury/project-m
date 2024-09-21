import { useNavigate } from "react-router-dom"
import PageLayout from "../../components/layout/PageLayout"
import { MATH_GCD, MATH_LCM, MATH_SQTR, MATH_TRIANGLE } from "../../core/constants/route.constants"

type Props = {}

const HomePage = ({}: Props) => {
  const navigate = useNavigate()
  return (
    <PageLayout headerName="Home">
      {
        [MATH_LCM, MATH_GCD, MATH_SQTR, MATH_TRIANGLE].map((href) => {
          return <div key={href} className="cursor-pointer" onClick={()=>navigate(href)}>{href}</div>
        })
      }
    </PageLayout>
  )
}

export default HomePage