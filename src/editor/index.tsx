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
/* -------- Reset Styles -------- */
import './reset.css';

const Container = styled.div`
  padding: 1rem;
  border: 1px solid gray;
`;

const EMPTY_DOCUMENT: CustomElement[] = [
  {
    type: 'paragraph',
    align: 'left',
    children: [{ text: 'empty' }],
  },
];

const renderElement = (props: RenderElementProps) => {
  return <DefaultElement {...props} />
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
        onChange={ (value) => setEditorContent(value as CustomElement[])}
      >
        <Editable
          readOnly={readOnly}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          className='rt-editor'
        />
      </Slate>
    </Container>
  )
}

export default Editor;