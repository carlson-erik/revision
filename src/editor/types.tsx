import { BaseEditor } from 'slate';
import { ReactEditor } from 'slate-react';
import { HistoryEditor } from 'slate-history';

type Alignment = 'left' | 'right'  | 'center'  | 'justify';

type Element = 'paragraph';

type CustomText = {
  text: string;
  bold?: true;
  italics?: true;
  underline?: true;
  strikethrough?: true;
  textcolor ?: string;
};

type ParagraphElement = {
  type: 'paragraph';
  align: Alignment;
  children: CustomText[];
};

type CustomElement = ParagraphElement;

type CustomEditor = BaseEditor & ReactEditor & HistoryEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}

export type {
  CustomEditor,
  CustomElement,
  CustomText,
  Element,
}