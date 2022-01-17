import { BaseEditor, BaseSelection } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

/* -------- Element Types -------- */

export type HeaderElementType = 'header-one' | 'header-two' | 'header-three' | 'header-four' | 'header-five' | 'header-six';

export type ListElementType = 'ordered-list' | 'unordered-list';

export type TextElementType = 'paragraph' | HeaderElementType;

export type ElementType = TextElementType | ListElementType | 'list-item';

/* -------- Formats -------- */

export type Alignment = 'left' | 'right'  | 'center'  | 'justify';

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
  type: HeaderElementType;
  align: Alignment;
  children: TextLeaf[];
};

export interface ListItemElement extends Element {
  type: 'list-item';
  children: TextLeaf[];
}

export interface ListElement extends Element {
  type: ListElementType;
  children: (ListElement | ListItemElement)[];
}

export type TextElement = ParagraphElement | HeaderElement;

export type CustomElement = TextElement | ListElement | ListItemElement;

/* -------- Editor -------- */
export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: TextLeaf
  }
}