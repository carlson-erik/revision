import { ElementType, ListElement, ListElementType, TextElementType, TextLeaf } from '../types';

const isListElementType = (elementType: ElementType): elementType is ListElementType => {
  return elementType === 'ordered-list' || elementType === 'unordered-list';
}

const isTextElementType = (elementType: ElementType): elementType is TextElementType => {
  switch(elementType){
    case 'header-one':
    case 'header-two':
    case 'header-three':
    case 'header-four':
    case 'header-five':
    case 'header-six':
    case 'paragraph':
      return true;
    default:
      return false;
  }
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
  isListElementType,
  isTextElementType,
  collectAllTextLeaves
}