import { Editor, Element, Transforms, Range, Path } from "slate";
import { CustomEditor, CustomElement, LinkInlineElement } from "../types";

import isUrl from "is-url";
import { getElementPath, getElementNode } from "./element";
import { ReactEditor } from "slate-react";

const isInlineActive = (editor: CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === "link",
  });
  return !!link;
};

const getContainer = (editor: CustomEditor): CustomElement | null => {
  if (!isInlineActive(editor)) return null;
  const parentPath = getContainerPath(editor);
  if (!parentPath) return null;
  return getElementNode(editor, parentPath);
};

const getContainerPath = (editor: CustomEditor): Path | null => {
  if (!isInlineActive(editor)) return null;
  const path = getElementPath(editor);
  if (!path) return null;
  path.pop();
  return path;
};

const getContainerParent = (editor: CustomEditor): CustomElement | null => {
  if (!isInlineActive(editor)) return null;
  const containerParentPath = getContainerParentPath(editor);
  if (!containerParentPath) return null;
  return getElementNode(editor, containerParentPath);
};

const getContainerParentPath = (editor: CustomEditor): Path | null => {
  if (!isInlineActive(editor)) return null;
  const containerPath = getContainerPath(editor);
  if (!containerPath || containerPath.length === 1) return null;
  containerPath.pop();
  return containerPath;
};

const updateLink = (editor: CustomEditor, url: string) => {
  const selection = editor.selection;
  const elementPath = getElementPath(editor);
  if (isLinkActive(editor) && elementPath && selection) {
    Transforms.setNodes(editor, { url }, { at: elementPath });
    ReactEditor.focus(editor);
    Transforms.select(editor, selection);
  }
};

const insertLink = (editor: CustomEditor, url: string, linkLabel?: string) => {
  const selection = editor.selection;
  if (!isLinkActive(editor) && selection) {
    const link: LinkInlineElement = {
      type: "link",
      url,
      children:
        linkLabel && linkLabel !== "" ? [{ text: linkLabel }] : [{ text: url }],
    };
    Transforms.insertNodes(editor, link);
    ReactEditor.focus(editor);
    Transforms.select(editor, selection);
  }
};

const isLinkActive = (editor: CustomEditor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
  return !!link;
};

const wrapLink = (editor: CustomEditor, url: string) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link: LinkInlineElement = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const unwrapLink = (editor: CustomEditor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === "link",
  });
};

const withInlines = (editor: CustomEditor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element: Element) => {
    return ["link"].includes(element.type) || isInline(element);
  };

  editor.insertText = (text: string) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data: DataTransfer) => {
    const text = data.getData("text/plain");
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export {
  withInlines,
  getContainer,
  getContainerPath,
  getContainerParent,
  getContainerParentPath,
  isInlineActive,
  isLinkActive,
  insertLink,
  updateLink,
};
