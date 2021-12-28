import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Editor, Range } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
/* -------- Components -------- */
import Button from './components/button';
/* -------- Icon Components -------- */
import Bold from './icons/bold';
import Italic from './icons/italic';
import Strikethrough from './icons/strikethrough';
import Underline from './icons/underline';
import Unlink from './icons/unlink';

interface PortalProps {
  children: any;
}

const Portal = (props: PortalProps) => {
  const { children } = props;
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}

const Menu = styled.div`
  padding: 4px;
  background-color: white;
  border: 1px solid #D1D4D9;
  position: absolute;
  z-index: 5;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  border-radius: 2px;
  transition: opacity 0.75s;
  color: white;
  display: flex;
  align-items: center;
`;

const HoveringToolbar = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>();
  const editor = useSlate();

  useEffect(() => {
    const el = ref;
    const { selection } = editor;

    if (!el) {
      return
    }

    if (
      !selection ||
      !ReactEditor.isFocused(editor) ||
      Range.isCollapsed(selection) ||
      Editor.string(editor, selection) === ''
    ) {
      el.removeAttribute('style')
      return
    }

    const domSelection = window.getSelection();
    
    if(domSelection) {
      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect()
      el.style.opacity = '1'
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`
      el.style.left = `${rect.left +
        window.pageXOffset -
        el.offsetWidth / 2 +
        rect.width / 2}px`
    }
  })

  return (
    <Portal>
      <Menu ref={setRef}>
        <Button onClick={() => console.log('bold button')} active={false}>
          <Bold color='black' />
        </Button>
        <Button onClick={() => console.log('italic button')} active={false}>
          <Italic color='black' />
        </Button>
        <Button onClick={() => console.log('underline button')} active={false}>
          <Underline color='black' />
        </Button>
        <Button onClick={() => console.log('strikethrough button')} active={false}>
          <Strikethrough color='black' />
        </Button>
      </Menu>
    </Portal>
  )
}

export default HoveringToolbar;