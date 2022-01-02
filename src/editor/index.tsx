import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { createEditor, Descendant } from 'slate';
import { Slate, Editable, withReact, RenderLeafProps, RenderElementProps } from 'slate-react';
import { withHistory } from 'slate-history';
/* -------- Types -------- */
import { CustomEditor, CustomElement } from './types';
/* -------- Editor Components -------- */
import TextLeaf from './leaves/text';
import DefaultElement from './elements/';
import HeaderElement from './elements/header';
import ListElement from './elements/list';
import HoveringToolbar from './toolbar';
import ListLeaf from './leaves/list';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid gray;

  /* Box sizing rules */
  & *,
  & *::before,
  & *::after {
    box-sizing: border-box;
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
    children: [{ type:'text', text: '' }],
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
    case 'ordered-list':
    case 'unordered-list':
      return <ListElement {...props} />;
    default:
      return <DefaultElement {...props} />
  }
};

const renderLeaf = (props: RenderLeafProps) => {
  if(props.leaf.type === 'list-item') {
    return <ListLeaf {...props} />
  }
  return <TextLeaf {...props} />
}

export interface EditorProps {
  readOnly: boolean;
  content?: CustomElement[];
}

const Editor = (props: EditorProps) => {
  const { readOnly, content } = props;
  const [containerRef, setContainerRef]= useState< HTMLElement | null>(null);
  const editor: CustomEditor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [editorContent, setEditorContent] = useState<CustomElement[]>(content ? content : EMPTY_DOCUMENT);

  const onChangeHandler = (value: Descendant[]) => {
    setEditorContent(value as CustomElement[])
  }

  return (
    <Container className='rt-editor' ref={setContainerRef}>
      <Slate
        editor={editor}
        value={editorContent}
        onChange={onChangeHandler}
      >
        {containerRef ? (<HoveringToolbar containerRef={containerRef} />) : null}
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