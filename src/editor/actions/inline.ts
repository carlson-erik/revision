import { Editor, Element, Transforms, Range, Path } from "slate";
import { CustomEditor, CustomElement, LinkInlineElement } from "../types"

import isUrl from 'is-url';
import { getElementPath, getElementNode, getParentElementPath } from "./element";

const isInlineActive = (editor:CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  })
  return !!link
}

const getInlineParentNode = (editor: CustomEditor): CustomElement | null => {
  const parentPath = getInlineParentPath(editor);
  if(!parentPath) return null;
  return getElementNode(editor, parentPath);
};

const getInlineParentPath = (editor: CustomEditor): Path | null => {
  if(!isInlineActive(editor)) return null;
  const path = getParentElementPath(editor);
  if(!path) return null;
  const parentNode = getElementNode(editor, path);
  if(!parentNode) return null;
  return path;
};

const updateLink = (editor: CustomEditor, url: string) => {
  const elementPath = getElementPath(editor);
  if(isLinkActive(editor) && elementPath) {
    Transforms.setNodes(editor, { url }, {at: elementPath})
  }
}

const insertLink = (editor: CustomEditor, url: string, linkLabel?: string) => {
  if(!isLinkActive(editor)){
    const link: LinkInlineElement = {
      type: 'link',
      url,
      children: linkLabel && linkLabel !== '' ? [{ text: linkLabel }] : [{ text: url }],
    }
    Transforms.insertNodes(editor, link);
  }
}

const isLinkActive = (editor:CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  })
  return !!link
}

const wrapLink = (editor: CustomEditor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor)
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkInlineElement = {
    type: 'link',
    url,
    children: isCollapsed ? [{ text: url }] : [],
  }

  if (isCollapsed) {
    Transforms.insertNodes(editor, link)
  } else {
    Transforms.wrapNodes(editor, link, { split: true })
    Transforms.collapse(editor, { edge: 'end' })
  }
}

const unwrapLink = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  })
}

const withInlines = (editor: CustomEditor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element: Element) => {
    return ['link'].includes(element.type) || isInline(element);
  }
  
  editor.insertText = (text:string) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertText(text)
    }
  }

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData('text/plain')
    if (text && isUrl(text)) {
      wrapLink(editor, text)
    } else {
      insertData(data)
    }
  }

  return editor;
}

export {
  withInlines,
  getInlineParentNode,
  getInlineParentPath,
  isInlineActive,
  isLinkActive,
  insertLink,
  updateLink,
}