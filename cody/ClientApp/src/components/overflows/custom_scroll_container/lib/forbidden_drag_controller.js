export class ForbiddenDragController{
	constructor(ref){
		this.ref = ref;
	}

	static setController = (ref) => {
		return new ForbiddenDragController(ref);
	}

	getElements = () => {
		const elements = this.ref.current?.querySelectorAll('.noScroll')
		return elements ?? [];
	}

	areZeroElements = (elements) => {
		return elements.length === 0
	}

	listen = (eventFunction) => {
		const elements = this.getElements()
		if(this.areZeroElements(elements))
			return;

		elements.forEach.call(elements, (element) => {
			element.addEventListener('mousedown', eventFunction)
		})
	}

	unlisten = (eventFunction) => {
		const elements = this.getElements()
		if(this.areZeroElements(elements))
			return;

		elements.forEach.call(elements, (element) => {
			element.removeEventListener('mousedown', eventFunction)
		})
	}
}