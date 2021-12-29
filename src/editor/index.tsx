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
/* -------- Reset Styles -------- */
import './reset.css';

const Container = styled.div`
  padding: 1rem;
  margin: 2rem;
  border: 1px solid gray;
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
          className='rt-editor'
        />
      </Slate>
    </Container>
  )
}

export default Editor;