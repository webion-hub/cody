import { lazy, Suspense } from "react"

export const lazyLoader = (importPath) => {
  const Component = lazy(importPath);

  return ({suspenseHeight, ...props}) => (
    <Suspense fallback={
      <Loading height={suspenseHeight}/>
    }>
      <Component {...props}/>
    </Suspense>
  )
}

function Loading(props) {
  const loadingRing = 
    <div
      id="ringContainer" 
      className="center"
    >
      <div className="loader"></div>
    </div>

  if(!props.height)
    return loadingRing

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        display: "block",
        height: props.height
      }}
    >
      {loadingRing}
    </div>
  )
}