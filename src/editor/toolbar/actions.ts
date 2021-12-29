import { Editor, Element, Transforms, Node, Text, Selection } from 'slate';
import { CustomEditor, TextFormat, ElementType } from '../types';

const isTextFormatActive = (editor: CustomEditor, format: TextFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => Text.isText(n) && n[format] === true,
    mode: 'all',
  })
  return !!match
};

const toggleTextFormat = (editor: CustomEditor, format: TextFormat) => {
  const isActive = isTextFormatActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
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

const isBlockTypeActive = (editor:CustomEditor, blockType: ElementType) => {
  const [match] = Editor.nodes(editor, {
    match: node => Element.isElement(node) && node.type === blockType,
  })
  return !!match
};

const setBlockType = (editor:CustomEditor, blockType: ElementType) => {
  // update the block type
  Transforms.setNodes(editor, { type: blockType }, { mode: 'highest' });
};

const getActiveBlockType = (editor:CustomEditor): ElementType | null => {
  const path = editor.selection?.anchor.path;
  
  if(path) {
    const element = editor.children[path[0]];
    if(Element.isElement(element))
      return element.type;
  }

  return null;
};

export {
  isTextFormatActive,
  toggleTextFormat,
  setTextColor,
  getActiveTextColor,
  isBlockTypeActive,
  setBlockType,
  getActiveBlockType
};