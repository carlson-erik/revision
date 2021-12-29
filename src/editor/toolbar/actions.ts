import { Editor, Transforms, Node, Text, Selection } from 'slate';
import { CustomEditor, TextFormat } from '../types';

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

const getActiveTextColor = (editor: CustomEditor): string | null => {
  const path = editor.selection?.anchor.path;
  if(path){
    const currentLeaf = Node.leaf( editor, path );
    console.log('currentLeaf:', currentLeaf);
  } else {
    console.log('no path:', editor.selection);
  }
  // if ('textcolor' in textnode)
  //   return textnode.textcolor;
  // else
  //   return 'black';
  // no valid selection, so there is no type to return
  return null;
};

export {
  isTextFormatActive,
  toggleTextFormat,
  setTextColor,
  getActiveTextColor,
};