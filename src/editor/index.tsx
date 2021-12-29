import { useMemo, useState, KeyboardEvent } from 'react';
import styled from 'styled-components';
import { createEditor } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps, RenderElementProps } from 'slate-react';
import { withHistory } from 'slate-history';
/* -------- Types -------- */
import { CustomEditor, CustomElement } from './types';
/* -------- Editor Components -------- */
import TextLeaf from './elements/text-leaf';
import DefaultElement from './elements/';
import HeaderElement from './elements/header';
import HoveringToolbar from './toolbar';

const Container = styled.div`
  padding: 1rem;
  margin: 2rem;
  border: 1px solid gray;

  /* Box sizing rules */
  & *,
  & *::before,
  & *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  & ul[class],
  & ol[class] {
    padding: 0;
  }

  /* Remove default margin */
  & h1,
  & h2,
  & h3,
  & h4,
  & p,
  & ul[class],
  & ol[class],
  & figure,
  & blockquote,
  & dl,
  & dd {
    margin: 0;
  }

  /* Remove list styles on ul, ol elements with a class attribute */
  & ul[class],
  & ol[class] {
    list-style: none;
  }

  /* A elements that don't have a class get default styles */
  & a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  /* Make images easier to work with */
  & img,
  & picture {
    max-width: 100%;
    display: block;
  }

  /* Natural flow and rhythm in articles by default */
  & article > * + * {
    margin-top: 1em;
  }

  /* Inherit fonts for inputs and buttons */
  & input,
  & button,
  & textarea,
  & select {
    font: inherit;
  }

  /* Blur images when they have no alt attribute */
  & img:not([alt]) {
    filter: blur(10px);
  }

  /* Remove all animations and transitions for people that prefer not to see them */
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  & code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }
`;

const EMPTY_DOCUMENT: CustomElement[] = [
  {
    type: 'paragraph',
    align: 'left',
    children: [{ text: '' }],
  },
];

const renderElement = (props: RenderElementProps) => {
  const { element } = props;
  switch (element.type) {
    case 'header-one':
    case 'header-two':
    case 'header-three':
    case 'header-four':
    case 'header-five':
    case 'header-six':
      return <HeaderElement {...props} />;
    default:
      return <DefaultElement {...props} />
  }
};

const renderLeaf = (props: RenderLeafProps) => {
  return <TextLeaf {...props} />
}

export interface EditorProps {
  readOnly: boolean;
  content?: CustomElement[];
}

const Editor = (props: EditorProps) => {
  const { readOnly, content } = props;
  const editor: CustomEditor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorContent, setEditorContent] = useState<CustomElement[]>(content ? content : EMPTY_DOCUMENT);
  return (
    <Container>
      <Slate
        editor={editor}
        value={editorContent}
        onChange={(value) => setEditorContent(value as CustomElement[])}
      >
        <HoveringToolbar />
        <Editable
          readOnly={readOnly}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onBlur={() => {
            // update blurSelection with last selection before click out
            editor.blurSelection = editor.selection;
          }}
        />
      </Slate>
    </Container>
  )
}

export default Editor;