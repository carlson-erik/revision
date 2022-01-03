import { ElementType, ListElement, TextLeaf } from '../types';

const isList = (elementType: ElementType) => {
  return elementType === 'ordered-list' || elementType === 'unordered-list';
}

const collectAllTextLeaves = (listElement: ListElement): TextLeaf[] => {
  return [
    { text: 'some text 1' },
    { text: 'some text 2' },
  ]
}

export {
  isList,
  collectAllTextLeaves
}