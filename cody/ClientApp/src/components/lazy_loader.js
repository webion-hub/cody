import { lazy, Suspense } from "react"

export const lazyLoader = (importPath) => {
  const Component = lazy(importPath);

  return props => (
    <Suspense fallback={
      <div id="ringContainer" className="center dynamic-background">
        <div className="loader"></div>
      </div>
    }>
      <Component {...props}/>
    </Suspense>
  )
}