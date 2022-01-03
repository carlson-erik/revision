import { Editor, Element, Transforms, Node, Text, Path } from 'slate';
import { Alignment, CustomEditor, CustomElement, ElementFormat, ElementType, TextFormat } from '../types';

const isList = (elementType: ElementType) => {
  return elementType === 'ordered-list' || elementType === 'unordered-list';
}

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
  if (path) {
    const currLeaf = Node.leaf(editor, path);
    if (currLeaf.textcolor)
      return currLeaf.textcolor;
  }
  return 'PRIMARY';
};

/* ------------------------ Element Type Actions ------------------------ */
const isElementTypeActive = (editor: CustomEditor, elementType: ElementType): boolean => {
  const [match] = Editor.nodes(editor, {
    match: node => Element.isElement(node) && node.type === elementType,
  })
  return !!match
};

const setElementType = (editor: CustomEditor, elementType: ElementType): void => {
  const activeElement = getElementNode(editor);
  if (activeElement && activeElement.type !== elementType) {
    console.log(`Update element to ${elementType} at `, getElementPath(editor));
    if (isList(elementType) && !isList(activeElement.type)) {
      console.log('create NEW list element')
    } else if (isList(elementType) && isList(activeElement.type)) { 
      console.log('update list element type')
    }  else if (!isList(elementType) && isList(activeElement.type)) { 
      // This is not currently possible using the current UI
      console.log('collapse list element into text element');
    } else {
      /*
       * All text (Paragraph and Headings) Elements are top level Elements so 
       * we update the the highest Node in the current selection.
      */
      console.log('update text element type')
      Transforms.setNodes(editor, { type: elementType }, { mode: 'highest' });
    }
  }
};

const getElementNode = (editor: CustomEditor): CustomElement | null => {
  if (!editor.selection) return null;
  const path = editor.selection.anchor.path;
  let children = editor.children;
  let parentNode = null;
  let foundNode = null;
  for (let index = 0; index < path.length; index++) {
    const currLevelLocation = path[index];
    const currentNode = children[currLevelLocation];
    if ('children' in currentNode) {
      parentNode = { ...currentNode };
      children = currentNode.children
    } else {
      foundNode = parentNode;
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
  // Text Format Actions
  isTextFormatActive,
  toggleTextFormat,
  setTextColor,
  getActiveTextColor,
  // Element Type Actions
  isElementTypeActive,
  setElementType,
  getElementNode,
  getElementPath,
  // Element Format Actions
  isElementFormatActive,
  hasElementFormatValue,
  setElementFormat
};