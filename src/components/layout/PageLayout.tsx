import Footer from "../common/Footer"
import Header from "../common/Header"

type Props = {
  headerName: string
  children: React.ReactNode
}

const PageLayout = ({headerName, children}: Props) => {
  return (
    <>
      <Header name={headerName}/>
      <div className="min-h-[var(--main-height)]">
        <div className="container">
          {children}
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default PageLayout