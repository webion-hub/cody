import { Box } from "@material-ui/core";
import ReactHtmlParser from 'react-html-parser';


export default class IllustrationLoader {
  /**
   * @param {string} path 
   * @param {IllustrationProps} props
   * @returns {Promise<Box>}
   */
  static load = async (path, props) => {
    return this.cache.has(path)
      ? this.fetchFromCache(path)
      : this.fetchFromServer(path, props);
  }

  /**
   * @private
   * @param {string} path 
   * @returns {Promise<Box>} 
   */
  static fetchFromCache = async (path) => {
    const elem = this.cache.get(path);
    return Promise.resolve(elem);
  }

  /**
   * @param {string} path 
   * @param {IllustrationProps} props 
   * @returns {Promise<Box>}
   */
  static fetchFromServer = async (path, props) => {
    const {boxProps, svgProps} = props;
    return fetch(path)
      .then(resp => resp.text())
      .then(rawSvg => this.replaceProps(rawSvg, svgProps))
      .then(svg => this.createSvgElement(svg, boxProps))
      .then(svg => this.storeInCache(path, svg));
  }

  /**
   * @private
   * @param {string} rawSvg 
   * @returns {string}
   */
  static replaceProps = (rawSvg, svgProps) => {
    return Object
      .entries(svgProps)
      .reduce(this.replaceProp, rawSvg);
  }

  /**
   * @private
   * @param {string} curr 
   * @returns {string}
   */
  static replaceProp = (curr, [prop, value]) => {
    const pattern = new RegExp(`{${prop}}`, 'g');
    return curr.replace(pattern, value);
  };


  /**
   * @private
   * @param {string} path
   * @returns {Box} 
   */
  static createSvgElement = (svg, boxProps) => {
    return (
      <Box {...boxProps}>
        {ReactHtmlParser(svg)}
      </Box>
    );
  }

  /**
   * @private
   * @param {string} path 
   * @param {Box} element 
   * @returns {Box}
   */
  static storeInCache = (path, element) => {
    this.cache.set(path, element);
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