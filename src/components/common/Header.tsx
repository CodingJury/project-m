import { useNavigate } from "react-router-dom"

type Props = {
  name: string
}

const Header = ({name}: Props) => {
  const navigate = useNavigate()
  return (
    <div className="bg-blue-500">
      <div className="container">
        <div className="flex justify-between items-center h-[var(--header-height)]">
          <div className="text-2xl cursor-pointer" onClick={()=>navigate("/")}>
            {name}
          </div>
          <div>
            Github
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header