import React from 'react';
import ReactHtmlParser, { processNodes } from 'react-html-parser';


export const SvgHtmlParser = (svg) => {
  return ReactHtmlParser(svg, {
    transform: transformSvgNode,
  });
}


const transformSvgNode = (node) => {
  if (!node.name)
    return;
  
  maybeReplaceAttributes(node);

  return <node.name {...node.attribs}>
    {processNodes(node.children, transformSvgNode)}
  </node.name>;
}


const maybeReplaceAttributes = (node) => {
  if (!node.attribs)
    return;

  const replaceAttribute = (oldName, newName) => {
    if (!(oldName in node.attribs))
      return;

    node.attribs[newName] = node.attribs[oldName];
    delete node.attribs[oldName];    
  }

  replaceAttribute('viewbox', 'viewBox');
  replaceAttribute('classname', 'className');
}