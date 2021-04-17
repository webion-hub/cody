import { useEffect } from "react"

export const useListener = ({eventFunction, controller, firstExecutionDelay, removeFirstExecution}, dependencies) => {
  
  useEffect(() => {
		controller.listen(eventFunction)

    const delay = firstExecutionDelay ? firstExecutionDelay : 0

    if(!removeFirstExecution)
		  setTimeout(() => eventFunction(), delay);

		return _ => controller.unListen(eventFunction)
  }, dependencies)

}