import { Box } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';


export default class IllustrationLoader {
  /**
   * @param {IllustrationProps} props 
   * @returns {IllustrationLoader}
   */
  static create = (props) => {
    return new IllustrationLoader(props);
  }
  
  /**
   * @private
   * @param {IllustrationProps} props 
   */
  constructor (props) {
    this.path = props.path;
    this.boxProps = props.boxProps;
    this.svgProps = props.svgProps;
  }


  /**
   * @returns {Promise<Box>}
   */
  load = async () => {
    return IllustrationLoader.cache.has(this.path)
      ? this.fetchFromCache()
      : this.fetchFromServer();
  }

  /**
   * @private
   * @param {string} path 
   * @param {IllustrationProps} props 
   * @returns {Promise<Box>}
   */
  fetchFromServer = async () => {
    return fetch(this.path)
      .then(resp => resp.text())
      .then(rawSvg => this.replaceProps(rawSvg))
      .then(svg => this.createSvgElement(svg))
      .then(svg => this.storeInCache(svg));
  }

  /**
   * @private
   * @param {string} rawSvg 
   * @returns {string}
   */
  replaceProps = (rawSvg) => {
    return Object
      .entries(this.svgProps)
      .reduce(this.replaceProp, rawSvg);
  }

  /**
   * @private
   * @param {string} curr 
   * @returns {string}
   */
  replaceProp = (curr, [prop, value]) => {
    const pattern = new RegExp(`{${prop}}`, 'g');
    return curr.replace(pattern, value);
  };


  /**
   * @private
   * @param {string} path
   * @returns {Box} 
   */
  createSvgElement = (svg) => {
    return (
      <Box {...this.boxProps}>
        {ReactHtmlParser(svg)}
      </Box>
    );
  }


  /**
   * @private
   * @returns {Promise<Box>} 
   */
  fetchFromCache = async () => {
    const elem = IllustrationLoader.cache.get(this.path);
    return Promise.resolve(elem);
  }

  /**
   * @private 
   * @param {Box} element 
   * @returns {Box}
   */
  storeInCache = (element) => {
    IllustrationLoader.cache.set(this.path, element);
    return element;
  }
}

/**
 * @private
 * @type {Map<string, Box>}
 */
IllustrationLoader.cache = new Map();


/**
 * @typedef {object} IllustrationProps
 * @property {string} path
 * @property {*} boxProps
 * @property {*} svgProps
 */