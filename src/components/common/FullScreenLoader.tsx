type Props = {
  open: boolean
}

const FullScreen = ({open}: Props) => {
  return (
    (open && <div>Custom Loader</div>)
  )
}

export default FullScreen