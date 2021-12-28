import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Editor, Range } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
import ReactDOM from 'react-dom'

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
  padding: 8px 7px 6px;
  position: absolute;
  z-index: 5;
  top: -10000px;
  left: -10000px;
  margin-top: -6px;
  opacity: 0;
  background-color: #222;
  border-radius: 4px;
  transition: opacity 0.75s;
  color: white;
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
        hovering toolbar
      </Menu>
    </Portal>
  )
}

export default HoveringToolbar;