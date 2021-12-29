import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Editor, Range } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
/* -------- Components -------- */
import Button from './components/button';
/* -------- Actions -------- */
import { toggleTextFormat, isTextFormatActive } from './actions';
/* -------- Icon Components -------- */
import Bold from './icons/bold';
import Italic from './icons/italic';
import Strikethrough from './icons/strikethrough';
import Underline from './icons/underline';

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
  color: red;
  display: flex;
  align-items: center;
`;

const HoveringToolbar = () => {
  const [ref, setRef] = useState<HTMLDivElement | null>();
  const [editType, setEditType] = useState<'text' | 'block' | 'hidden'>('hidden');
  const editor = useSlate();

  useEffect(() => {
    const el = ref;
    const { selection } = editor

    if (!el) {
      setEditType('hidden');
      return;
    }

    if (!selection || !ReactEditor.isFocused(editor)) {
      setEditType('hidden');
      return;
    }

    if (Range.isCollapsed(selection) && editType !== 'block') {
      setEditType('block');
    } else if (!Range.isCollapsed(selection) && editType !== 'text') {
      setEditType('text');
    }

    const domSelection = window.getSelection();
    if (domSelection) {
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

  if(editType === 'hidden') {
    ref?.removeAttribute('style');
  }

  return (
    <Portal>
      <Menu ref={setRef}>
        {editType === 'text'
          ? (
            <>
              <Button
                active={isTextFormatActive(editor, 'bold')}
                onMouseDown={(event) => {
                  event.preventDefault();
                  toggleTextFormat(editor, 'bold')
                }}
              >
                <Bold color='black' />
              </Button>
              <Button
                active={isTextFormatActive(editor, 'italics')}
                onMouseDown={(event) => {
                  event.preventDefault();
                  toggleTextFormat(editor, 'italics')
                }}
              >
                <Italic color='black' />
              </Button>
              <Button
                active={isTextFormatActive(editor, 'underline')}
                onMouseDown={(event) => {
                  event.preventDefault();
                  toggleTextFormat(editor, 'underline')
                }}
              >
                <Underline color='black' />
              </Button>
              <Button
                active={isTextFormatActive(editor, 'strikethrough')}
                onMouseDown={(event) => {
                  event.preventDefault();
                  toggleTextFormat(editor, 'strikethrough')
                }}
              >
                <Strikethrough color='black' />
              </Button>
            </>
          ): (
            <div>add block mode</div>
          )}
      </Menu>
    </Portal>
  )
}

export default HoveringToolbar;