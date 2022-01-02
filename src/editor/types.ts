import { BaseEditor, BaseSelection } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

type Alignment = 'left' | 'right'  | 'center'  | 'justify';

type HeaderType = 'header-one' | 'header-two' | 'header-three' | 'header-four' | 'header-five' | 'header-six';

type ListType = 'ordered-list' | 'unordered-list';

type ElementType = 'paragraph' | HeaderType | ListType;

type ElementFormat = 'align';

type LeafType = 'text' | 'list-item'

type TextFormat = 'bold' | 'italics' | 'underline' | 'strikethrough' | 'textcolor';

/* -------- Leaves -------- */
interface Leaf {
  type: LeafType;
  text: string;
  bold?: true;
  italics?: true;
  underline?: true;
  strikethrough?: true;
  textcolor?: string;
}

interface TextLeaf extends Leaf {
  type: 'text'
}

interface ListLeaf extends Leaf {
  type: 'list-item'
}

type CustomText = TextLeaf | ListLeaf;

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

interface ListElement extends Element {
  type: ListType;
  children: (ListElement | ListLeaf)[];
}

type CustomElement = ParagraphElement | HeaderElement | ListElement;

/* -------- Editor -------- */
interface BlurSelectionEditor extends BaseEditor { 
  blurSelection: BaseSelection |  null;
}

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor & BlurSelectionEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

export type {
  Alignment,
  CustomEditor,
  CustomElement,
  CustomText,
  ListLeaf,
  TextLeaf,
  ElementType,
  ElementFormat,
  TextFormat
}