import { BaseEditor, BaseSelection } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

type Alignment = 'left' | 'right'  | 'center'  | 'justify';

type HeaderType = 'header-one' | 'header-two' | 'header-three' | 'header-four' | 'header-five' | 'header-six';

type ListType = 'ordered-list' | 'unordered-list';

type ElementType = 'paragraph' | HeaderType | ListType | 'list-item';

type ElementFormat = 'align';

type TextFormat = 'bold' | 'italics' | 'underline' | 'strikethrough' | 'textcolor';

/* -------- Leaves -------- */
interface TextLeaf {
  text: string;
  bold?: true;
  italics?: true;
  underline?: true;
  strikethrough?: true;
  textcolor?: string;
}

/* -------- Elements -------- */
interface Element {
  type: ElementType
}

interface ParagraphElement extends Element {
  type: 'paragraph';
  align: Alignment;
  children: TextLeaf[];
};

interface HeaderElement extends Element {
  type: HeaderType;
  align: Alignment;
  children: TextLeaf[];
};

interface ListItemElement extends Element {
  type: 'list-item';
  children: TextLeaf[];
}

interface ListElement extends Element {
  type: ListType;
  children: (ListElement | ListItemElement)[];
}

type CustomElement = ParagraphElement | HeaderElement | ListElement | ListItemElement;

/* -------- Editor -------- */
interface BlurSelectionEditor extends BaseEditor { 
  blurSelection: BaseSelection |  null;
}

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & BlurSelectionEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: TextLeaf
  }
}

export type {
  Alignment,
  CustomEditor,
  CustomElement,
  TextLeaf,
  ElementType,
  ElementFormat,
  TextFormat
}