export class STDEventsDispatcher {

  constructor (event, component) {
    this.event = event;
    this.component = component;
  }

  static setEvent(event){
    return new STDEventsDispatcher(event, undefined);
  }

  on = (component) => {
    return new STDEventsDispatcher(this.event, component);
  }

  listen = (eventFunction) => {
    this.component.addEventListener(this.event, eventFunction);
  }

  unlisten = (eventFunction) => {
    this.component.removeEventListener(this.event, eventFunction);
  }
}