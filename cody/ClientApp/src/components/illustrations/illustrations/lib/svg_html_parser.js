import ReactHtmlParser, { processNodes } from 'react-html-parser';


export const SvgHtmlParser = (svg) => {
  return ReactHtmlParser(svg, {
    transform: transformSvgNode,
  });
}


const transformSvgNode = (node, index) => {
  if (!node.name)
    return;

  if (!maybeReplaceAttributes(node))
    return;

  return <node.name {...node.attribs} key={index}>
    {processNodes(node.children, transformSvgNode)}
  </node.name>;
}


const maybeReplaceAttributes = (node) => {
  if (!node.attribs)
    return false;

  const newAttribs = [
    ['viewbox', 'viewBox'],
    ['classname', 'className'],
    ['stroke-linejoin', 'strokeLinejoin'],
    ['stroke-width', 'strokeWidth'],
    ['stroke-linecap', 'strokeLinecap'],
    ['font-weight', 'fontWeight'],
    ['font-size', 'fontSize'],
  ];

  return newAttribs
    .map(([o, n]) => tryReplaceAttribute(node, o, n))
    .some(res => res);
}


/** 
 * @param {string} oldName 
 * @param {string} newName 
 * @returns {boolean}
 */
const tryReplaceAttribute = (node, oldName, newName) => {
  if (!(oldName in node.attribs))
    return false;

  node.attribs[newName] = node.attribs[oldName];
  delete node.attribs[oldName];
  return true;
}