import { BaseEditor, BaseSelection } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

export type Alignment = 'left' | 'right'  | 'center'  | 'justify';

export type HeaderType = 'header-one' | 'header-two' | 'header-three' | 'header-four' | 'header-five' | 'header-six';

export type ListType = 'ordered-list' | 'unordered-list';

export type ElementType = 'paragraph' | HeaderType | ListType | 'list-item';

export type ElementFormat = 'align';

export type TextFormat = 'bold' | 'italics' | 'underline' | 'strikethrough' | 'textcolor';

/* -------- Leaves -------- */
export interface TextLeaf {
  text: string;
  bold?: true;
  italics?: true;
  underline?: true;
  strikethrough?: true;
  textcolor?: string;
}

/* -------- Elements -------- */
export interface Element {
  type: ElementType
}

export interface ParagraphElement extends Element {
  type: 'paragraph';
  align: Alignment;
  children: TextLeaf[];
};

export interface HeaderElement extends Element {
  type: HeaderType;
  align: Alignment;
  children: TextLeaf[];
};

export interface ListItemElement extends Element {
  type: 'list-item';
  children: TextLeaf[];
}

export interface ListElement extends Element {
  type: ListType;
  children: (ListElement | ListItemElement)[];
}

export type CustomElement = ParagraphElement | HeaderElement | ListElement | ListItemElement;

/* -------- Editor -------- */
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: TextLeaf
  }
}