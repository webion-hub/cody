export function LoadingDisplayComponent(props){
  const showChildren = props.loading ? "none" : "block"

  return (
    <div
      style={{
        display: showChildren
      }}
    >
      {props.children}
    </div>
  )
}