import { Editor, Transforms, Text, Selection } from 'slate';
import { CustomEditor, TextFormat } from '../types';

const isFormatActive = (editor: CustomEditor, format: TextFormat) => {
  const [match] = Editor.nodes(editor, {
    match: n => Text.isText(n) && n[format] === true,
    mode: 'all',
  })
  return !!match
};

const toggleTextFormat = (editor: CustomEditor, format: TextFormat) => {
  const isActive = isFormatActive(editor, format)
  Transforms.setNodes(
    editor,
    { [format]: isActive ? null : true },
    { match: Text.isText, split: true }
  )
};

const setTextColor = (editor: CustomEditor, color: string, selection: Selection | null = null) => {
  editor.selection = selection;
  Transforms.setNodes(
    editor,
    { 'textcolor': color },
    { match: t => Text.isText(t), split: true }
  )
};

const getActiveTextColor = (editor: CustomEditor, selection: Selection | null = null) => {
  const { children } = editor;
  // passed selection isn't null, so get and return that block
  if (selection && selection.anchor) {
    const path = selection.anchor.path;
    const textnode = children[path[0]].children[path[1]];
    if ('textcolor' in textnode)
      return textnode.textcolor;
    else
      return 'black';
  }

  // passed selection is null but editor.selection isn't, get and return that block
  if (selection === null && editor.selection && editor.selection.anchor) {
    const path = editor.selection.anchor.path;
    const textnode = children[path[0]].children[path[1]]
    if ('textcolor' in textnode)
      return textnode.textcolor;
    else
      return 'black';
  }
  // no valid selection, so there is no type to return
  return null;
};

export {
  isFormatActive,
  toggleTextFormat,
  setTextColor,
  getActiveTextColor,
};