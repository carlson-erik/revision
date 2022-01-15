import { Editor, Transforms, Node, Text } from 'slate';
import { CustomEditor, TextFormat } from '../types';

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

export {
  isTextFormatActive,
  toggleTextFormat,
  setTextColor,
  getActiveTextColor,
};