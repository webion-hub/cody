export const getDrawerContent = (sideBarItems, identifier) => {
  const findedElement = sideBarItems.find(element => {
    const drawerContentIdentifier = identifier;
    return element.identifier === drawerContentIdentifier
  });

  if(findedElement === undefined)
    return null;
  
  return findedElement.drawerContent;
}