import { ElementType, ListElement, ListElementType, TextLeaf } from '../types';

const isList = (elementType: ElementType): elementType is ListElementType => {
  return elementType === 'ordered-list' || elementType === 'unordered-list';
}

const collectAllTextLeaves = (listElement: ListElement): TextLeaf[] => {
  const listOfLeaves: TextLeaf[] = [];
  const { children } = listElement;

  for (let index = 0; index < children.length; index++) {
    const element = children[index];
    if(element.type === 'ordered-list' || element.type === 'unordered-list') {
      listOfLeaves.push(...collectAllTextLeaves(element))
    } else {
      // list-item things
      listOfLeaves.push(...element.children as TextLeaf[]);
    }
  };
  
  return listOfLeaves;
}

export {
  isList,
  collectAllTextLeaves
}