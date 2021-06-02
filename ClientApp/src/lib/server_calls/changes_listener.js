import MqttListener, { MqttListenerCallback } from './mqtt_listener';


export default class ChangesListener {
  /**
   * @param {string} entity 
   */
  constructor(entity) {
    this.entity = entity;
    this.mqtt = MqttListener.getInstance();
  }

  /**
   * @param {MqttListenerCallback} listener 
   */
  listen = (listener) => {
    this.mqtt
      .then(c => c.subscribe(this.entity))
      .then(c => c.on(this.entity, listener));
  }

  /**
   * @param {MqttListenerCallback} listener 
   */
  unlisten = (listener) => {
    this.mqtt
      .then(c => c.unsubscribe(this.entity))
      .then(c => c.off(this.entity, listener));
  }
}