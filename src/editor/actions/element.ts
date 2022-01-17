import { Editor, Element, Transforms, Path } from 'slate';
import { Alignment, CustomEditor, CustomElement, ElementFormat, ElementType, HeaderElement, ListElement, ListElementType, ParagraphElement, TextElementType, TextLeaf } from '../types';

import { isListElementType, collectAllTextLeaves, isTextElementType } from './utils';

/* ------------------------ Element Node Actions ------------------------ */
const getElementNode = (editor: CustomEditor, customPath?: Path): CustomElement | null => {
  let path;
  if (customPath) {
    path = customPath;
  } else {
    if (!editor.selection) return null;
    path = editor.selection.anchor.path;
  }
  let children = editor.children;
  let parentNode = null;
  let foundNode = null;
  for (let index = 0; index < path.length; index++) {
    const currLevelLocation = path[index];
    const currentNode = children[currLevelLocation];
    if(currentNode){
      if (index === path.length - 1 && 'type' in currentNode) {
        /*
         * case: path leads to an 'element' node, in which case we want to return it.
        */
        foundNode = currentNode;
      } else if (index === path.length - 1 && !('type' in currentNode)) {
        /*
         * case: path leads to 'text leaf' node, in which case we want to return the parent node.
        */
        foundNode = parentNode;
      } else if ('children' in currentNode) {
        /*
         * case: iterating over nodes still, need to update parentNode and children
        */
        parentNode = { ...currentNode };
        children = currentNode.children;
      }
    }
  }
  return foundNode;
}

const getElementPath = (editor: CustomEditor): Path | null => {
  if (!editor.selection) return null;

  const path = editor.selection.anchor.path;
  let children = editor.children;
  let elementPath: Path | null = [];

  for (let index = 0; index < path.length; index++) {
    const currLevelLocation = path[index];
    const currentNode = children[currLevelLocation];
    if ('children' in currentNode) {
      children = currentNode.children;
      elementPath.push(currLevelLocation);
    }
  }

  if (elementPath.length === 0)
    return null;

  return elementPath;
}

const getParentElementNode = (editor: CustomEditor): CustomElement | null => {
  const parentPath = getParentElementPath(editor);
  if (parentPath === null) return null;
  return getElementNode(editor, parentPath);
}

const getParentElementPath = (editor: CustomEditor): Path | null => {
  const elementPath = getElementPath(editor);
  if (elementPath === null || elementPath.length === 1) {
    return null;
  }
  elementPath.pop();
  return elementPath;
}

/* ------------------------ Element Type Actions ------------------------ */
const isElementTypeActive = (editor: CustomEditor, elementType: ElementType): boolean => {
  const [match] = Editor.nodes(editor, {
    match: node => Element.isElement(node) && node.type === elementType,
  })
  return !!match
};

const setElementType = (editor: CustomEditor, elementType: ElementType): void => {
  let activeElement = getElementNode(editor);
  let useParent: boolean = false;
  if (activeElement?.type === 'list-item') {
    activeElement = getParentElementNode(editor);
    useParent = true;
  }
  const path = useParent ? getParentElementPath(editor) : getElementPath(editor);
  if (path && activeElement && activeElement.type !== elementType) {
    if (isListElementType(elementType) && !isListElementType(activeElement.type)) {
      /*
       * case: converting to list element from existing text element 
      */
      const listElement: ListElement = {
        type: elementType,
        children: [
          {
            type: 'list-item',
            children: [
              ...activeElement.children
            ] as TextLeaf[]
          }
        ]
      }
      // Remove old Text Element
      Transforms.removeNodes(editor, { at: path });
      // Insert new List Element
      Transforms.insertNodes(editor, listElement, { at: path });
    } else if (isListElementType(elementType) && isListElementType(activeElement.type)) {
      /*
       * case: changing list element types in an already existing list element structure
      */
      Transforms.setNodes(editor, { type: elementType }, { at: path });
    } else if (isTextElementType(elementType) && isListElementType(activeElement.type)) {
      /*
       * case: Collapsing list structure into text element.
      */
      const rootElement = getElementNode(editor, [path[0]]);
      const allTextLeaves: TextLeaf[] = collectAllTextLeaves(rootElement as ListElement);
      const textElement: HeaderElement | ParagraphElement = {
        type: elementType,
        align: 'left',
        children: [
          ...allTextLeaves
        ]
      };
      // Remove old List Element
      Transforms.removeNodes(editor, { at: [path[0]] });
      // Insert new Text Element
      Transforms.insertNodes(editor, textElement, { at: [path[0]] });
    } else {
      /*
       * case: changing text element types in an already existing text element structure
      */
      Transforms.setNodes(editor, { type: elementType }, { mode: 'highest' });
    }
  }
};

/* ------------------------ Element Format Actions ------------------------ */
const isElementFormatActive = (editor: CustomEditor, elementFormat: ElementFormat) => {
  const [match] = Editor.nodes(editor, {
    match: node => Element.isElement(node) && elementFormat in node !== null,
  })
  return !!match
};

const hasElementFormatValue = (editor: CustomEditor, elementFormat: ElementFormat, value: Alignment) => {
  const [match] = Editor.nodes(editor, {
    match: node => Element.isElement(node) && elementFormat in node && node[elementFormat] === value,
  })
  return !!match
}

const setElementFormat = (editor: CustomEditor, elementFormat: ElementFormat, value: Alignment) => {
  // update the element format
  Transforms.setNodes(editor, { [elementFormat]: value }, { mode: 'highest' });
}

export {
  // Element Node Actions 
  getElementNode,
  getElementPath,
  getParentElementNode,
  getParentElementPath,
  // Element Type Actions
  isElementTypeActive,
  setElementType,
  // Element Format Actions
  isElementFormatActive,
  hasElementFormatValue,
  setElementFormat
};