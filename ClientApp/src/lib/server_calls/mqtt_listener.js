import mqtt from 'mqtt';
import EventEmitter from 'events';

export default class MqttListener {
  /**
   * @returns {Promise<MqttListener>} 
   */
  static getInstance = async () => {
    this.instance ??= new MqttListener;
    return this.instance.connect();
  }

  /**
   * @private
   */
  constructor() {
    this.client = mqtt.connect('mqtt://livechanges.iscody.com');
    this.eventEmitter = new EventEmitter();
    this.client.on('packetreceive', this.onPacketReceived);
  }

  /**
   * @returns {Promise<MqttListener>} 
   */
  connect = async () => {
    if (this.client.connected)
      return Promise.resolve(this);

    return new Promise(res => {
      this.client.on('connect', _ => res(this));
    });
  }

  /**
   * @param {string} topic
   * @returns {Promise<MqttListener>} 
   */
  subscribe = async (topic) => {
    return new Promise(res => {
      this.client.subscribe(topic, {
        qos: 2,
      }, _ => res(this));
    });
  }

  /**
   * @param {string} topic 
   * @returns {Promise<MqttListener>} 
   */
  unsubscribe = async (topic) => {
    return new Promise(res => {
      this.client.unsubscribe(topic, undefined, _ => res(this));
    });
  }

  /**
   * @param {string} topic 
   * @param {MqttListenerCallback} listener 
   * @returns {Promise<MqttListener>}
   */
  on = (topic, listener) => {
    this.eventEmitter.on(topic, listener);
    return Promise.resolve(this);
  }

  /**
   * @param {string} topic 
   * @param {MqttListenerCallback} listener 
   * @returns {Promise<MqttListener>}
   */
  off = (topic, listener) => {
    this.eventEmitter.off(topic, listener);
    return Promise.resolve(this);
  }

  /**
   * @private
   * @param {mqtt.Packet} packet 
   */
  onPacketReceived = (packet) => {
    const entry = JSON.parse(packet.payload);
    this.eventEmitter.emit(packet.topic, entry);
  }
}

/**@private */
MqttListener.instance = null;

/**
 * @callback MqttListenerCallback
 * @param {object} entry
 */