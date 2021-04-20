import EventEmitter from 'events';

export class EventsDispatcher {
  /**
   * @param {UIEvent} event 
   */
  constructor (event) {
    this.event = event;
  }
  
  /**
   * @param {UIEvent} event 
   */
  static setEvent(event){
    return new EventsDispatcher(event);
  }

  update = (...args) => {
    EventsDispatcher._emitter.emit(this.event, args);
  }

  listen = (eventFunction) => {
    EventsDispatcher._emitter.on(this.event, eventFunction);
  }

  unlisten = (eventFunction) => {
    EventsDispatcher._emitter.off(this.event, eventFunction);
  }
}


EventsDispatcher._emitter = new EventEmitter();


/**
 * @typedef {(
 *  'updateOrganizationMember' | 
 *  'updateBookmarkedOrganizations' |
 *  'openLoginDialog'
 * )} UIEvent
 */