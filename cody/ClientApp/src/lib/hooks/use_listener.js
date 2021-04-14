import { useEffect } from "react"

export const useListener = ({eventFunction, controller, firstExecutionDelay}, dependencies) => {
  
  useEffect(() => {
		controller.addListener(eventFunction)

    const delay = firstExecutionDelay ? firstExecutionDelay : 0
		setTimeout(() => eventFunction(), delay);

		return _ => controller.removeListener(eventFunction)
  }, dependencies)

}