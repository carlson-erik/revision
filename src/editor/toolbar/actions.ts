import { Editor, Element, Transforms, Node, Text, Selection } from 'slate';
import { Alignment, CustomEditor, CustomElement, ElementFormat, ElementType, TextFormat } from '../types';

/* ------------------------ Text Format Actions ------------------------ */
const isTextFormatActive = (editor: CustomEditor, textFormat: TextFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => Text.isText(n) && n[textFormat] === true,
    mode: 'all',
  })
  return !!match
};

const toggleTextFormat = (editor: CustomEditor, textFormat: TextFormat) => {
  const isActive = isTextFormatActive(editor, textFormat)
  Transforms.setNodes(
    editor,
    { [textFormat]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
};

const setTextColor = (editor: CustomEditor, color: string) => {
  Transforms.setNodes(
    editor,
    { 'textcolor': color },
    { match: t => Text.isText(t), split: true }
  )
};

const getActiveTextColor = (editor: CustomEditor): string => {
  const path = editor.selection?.anchor.path;
  if(path){
    const currLeaf = Node.leaf( editor, path );
    if (currLeaf.textcolor)
      return currLeaf.textcolor;
  }
  return 'PRIMARY';
};

/* ------------------------ Element Type Actions ------------------------ */
const isElementTypeActive = (editor:CustomEditor, elementType: ElementType): boolean => {
  const [match] = Editor.nodes(editor, {
    match: node => Element.isElement(node) && node.type === elementType,
  })
  console.log('match: ', match);
  return !!match
};

const setElementType = (editor:CustomEditor, elementType: ElementType): void => {
  // update the element type
  Transforms.setNodes(editor, { type: elementType }, { mode: 'highest' });
};

const getActiveElement = (editor:CustomEditor): CustomElement | null => {
  if(!editor.selection) return null;
  const path = editor.selection.anchor.path;
  let children = editor.children;
  let parentNode = null;
  let foundNode = null;
  for (let index = 0; index < path.length; index++) {
    const currLevelLocation = path[index];
    const currentNode = children[currLevelLocation];
    if('children' in currentNode){
      parentNode = {...currentNode};
      children = currentNode.children
    } else {
      foundNode = parentNode;
    }
  }
  return foundNode;
}

/* ------------------------ Element Format Actions ------------------------ */
const isElementFormatActive = (editor:CustomEditor, elementFormat: ElementFormat) => {
  const [match] = Editor.nodes(editor, {
    match: node => Element.isElement(node) && elementFormat in node !== null,
  })
  return !!match
};

const hasElementFormatValue = (editor:CustomEditor, elementFormat:ElementFormat, value: Alignment) => {
  const [match] = Editor.nodes(editor, {
    match: node => Element.isElement(node) && elementFormat in node && node[elementFormat] === value,
  })
  return !!match
}

const setElementFormat = (editor:CustomEditor, elementFormat:ElementFormat, value: Alignment) => {
  // update the element format
  Transforms.setNodes(editor, { [elementFormat]: value }, { mode: 'highest' });
}

export {
  // Text Format Actions
  isTextFormatActive,
  toggleTextFormat,
  setTextColor,
  getActiveTextColor,
  // Element Type Actions
  isElementTypeActive,
  setElementType,
  getActiveElement,
  // Element Format Actions
  isElementFormatActive,
  hasElementFormatValue,
  setElementFormat
};