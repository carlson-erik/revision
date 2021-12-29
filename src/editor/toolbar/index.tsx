import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Editor, Range } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
/* -------- Components -------- */
import Button from './components/button';
import Dropdown, { Option } from './components/dropdown';
/* -------- Actions -------- */
import { toggleTextFormat, isTextFormatActive, getActiveTextColor, getActiveBlockType, setBlockType } from './actions';
/* -------- Icon Components -------- */
import Bold from './icons/bold';
import Italic from './icons/italic';
import Strikethrough from './icons/strikethrough';
import Underline from './icons/underline';
import Color from './icons/color';
import Paragraph from './icons/paragraph';
import Header from './icons/header';
import { ElementType } from '../types';

interface PortalProps {
  children: any;
}

const Portal = (props: PortalProps) => {
  const { children } = props;
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null
}

const elementOptions: Option[] = [ 
  {
    label: 'Paragraph',
    value: 'paragraph',
    icon: (
      <Paragraph color='black'/>
    )
  },
  {
    label: 'Header 1',
    value: 'header-one',
    icon: (
      <Header color='black' size={1} />
    )
  },
  {
    label: 'Header 2',
    value: 'header-two',
    icon: (
      <Header color='black' size={2} />
    )
  },
  {
    label: 'Header 3',
    value: 'header-three',
    icon: (
      <Header color='black' size={3} />
    )
  },
  {
    label: 'Header 4',
    value: 'header-four',
    icon: (
      <Header color='black' size={4} />
    )
  },
  {
    label: 'Header 5',
    value: 'header-five',
    icon: (
      <Header color='black' size={5} />
    )
  },
  {
    label: 'Header 6',
    value: 'header-six',
    icon: (
      <Header color='black' size={6} />
    )
  },
];

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
  transition: opacity 0.25s;
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

    if (!el || !selection || !ReactEditor.isFocused(editor)) {
      setEditType('hidden');
      return;
    } else if (Range.isCollapsed(selection) && editType !== 'block') {
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

  if (editType === 'hidden' && ref) {
    ref.style.opacity = '0'
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
              <Button
                active={isTextFormatActive(editor, 'textcolor')}
                onMouseDown={(event) => {
                  event.preventDefault();
                  console.log('active color: ', getActiveTextColor(editor));
                }}
              >
                <Color color={getActiveTextColor(editor) == 'PRIMARY' ? 'black' : getActiveTextColor(editor)} />
              </Button>
            </>
          ) : (
            <>
              <Dropdown 
                options={elementOptions}
                placeholder='dropdown placeholder'
                onChange={(newOption) => {
                  setBlockType(editor, newOption.value as ElementType)
                }}
              />
            </>
          )}
      </Menu>
    </Portal>
  )
}

export default HoveringToolbar;