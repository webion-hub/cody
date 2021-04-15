import { useEffect } from "react"

export const useListener = ({eventFunction, controller, firstExecutionDelay}, dependencies) => {
  
  useEffect(() => {
		controller.listen(eventFunction)

    const delay = firstExecutionDelay ? firstExecutionDelay : 0
		setTimeout(() => eventFunction(), delay);

		return _ => controller.unListen(eventFunction)
  }, dependencies)

}