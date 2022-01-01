import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { Range } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
/* -------- Components -------- */
import Button from './components/button';
import Dropdown, { Option } from './components/dropdown';
/* -------- Actions -------- */
import {
  toggleTextFormat,
  isTextFormatActive,
  getActiveTextColor,
  setElementType,
  hasElementFormatValue,
  setElementFormat,
  getElementNode
} from './actions';
/* -------- Icon Components -------- */
import Bold from './icons/bold';
import Italic from './icons/italic';
import Strikethrough from './icons/strikethrough';
import Underline from './icons/underline';
import Color from './icons/color';
import Paragraph from './icons/paragraph';
import Heading from './icons/heading';
import { ElementType } from '../types';
import Align from './icons/align';
import List from './icons/list';
import Indent from './icons/indent';
import Unindent from './icons/unindent';

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
      <Paragraph color='#343740' />
    )
  },
  {
    label: 'Heading 1',
    value: 'header-one',
    icon: (
      <Heading color='#343740' headingSize={1} />
    )
  },
  {
    label: 'Heading 2',
    value: 'header-two',
    icon: (
      <Heading color='#343740' headingSize={2} />
    )
  },
  {
    label: 'Heading 3',
    value: 'header-three',
    icon: (
      <Heading color='#343740' headingSize={3} />
    )
  },
  {
    label: 'Heading 4',
    value: 'header-four',
    icon: (
      <Heading color='#343740' headingSize={4} />
    )
  },
  {
    label: 'Heading 5',
    value: 'header-five',
    icon: (
      <Heading color='#343740' headingSize={5} />
    )
  },
  {
    label: 'Heading 6',
    value: 'header-six',
    icon: (
      <Heading color='#343740' headingSize={6} />
    )
  }
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
  const [editType, setEditType] = useState<'text' | 'element' | 'hidden'>('hidden');
  const editor = useSlate();

  useEffect(() => {
    const el = ref;
    const { selection } = editor

    if (!el || !selection || !ReactEditor.isFocused(editor)) {
      setEditType('hidden');
      return;
    }

    if (!Range.isCollapsed(selection)) {
      setEditType('text');
    } else {
      setEditType('element')
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

  if (editType === 'hidden' && ref) ref.removeAttribute('style');

  const activeElement = getElementNode(editor);

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
              {(activeElement?.type !== 'ordered-list') && (activeElement?.type !== 'unordered-list')
                ? (
                  <>
                    <Dropdown
                      options={elementOptions}
                      placeholder='Select new element..'
                      disabled={false}
                      onChange={(newOption) => {
                        setElementType(editor, newOption.value as ElementType)
                      }}
                    />
                    <Button
                      active={hasElementFormatValue(editor, 'align', 'left')}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        setElementFormat(editor, 'align', 'left');
                      }}
                    >
                      <Align direction='left' color='black' />
                    </Button>
                    <Button
                      active={hasElementFormatValue(editor, 'align', 'center')}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        setElementFormat(editor, 'align', 'center');
                      }}
                    >
                      <Align direction='center' color='black' />
                    </Button>
                    <Button
                      active={hasElementFormatValue(editor, 'align', 'right')}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        setElementFormat(editor, 'align', 'right');
                      }}
                    >
                      <Align direction='right' color='black' />
                    </Button>
                    <Button
                      active={hasElementFormatValue(editor, 'align', 'justify')}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        setElementFormat(editor, 'align', 'justify');
                      }}
                    >
                      <Align direction='justify' color='black' />
                    </Button>
                  </>
                ) : null}
              <Button
                active={activeElement?.type === 'ordered-list'}
                onMouseDown={(event) => {
                  event.preventDefault();
                  if(activeElement?.type !== 'ordered-list') {
                    console.log('update to ordered list');
                  }
                }}
              >
                <List ordered={true} color='black' />
              </Button>
              <Button
                active={activeElement?.type === 'unordered-list'}
                onMouseDown={(event) => {
                  event.preventDefault();
                  if(activeElement?.type !== 'unordered-list') {
                    console.log('update to unordered list');
                  }
                }}
              >
                <List ordered={false} color='black' />
              </Button>
              {(activeElement?.type === 'ordered-list') || (activeElement?.type === 'unordered-list')
                ? (
                  <>
                    <Button
                      active={hasElementFormatValue(editor, 'align', 'left')}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        console.log('indent clicked');
                      }}
                    >
                      <Indent color='black' />
                    </Button>
                    <Button
                      active={hasElementFormatValue(editor, 'align', 'left')}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        console.log('unindent clicked');
                      }}
                    >
                      <Unindent color='black' />
                    </Button>
                  </>
                ) : null}
            </>
          )}
      </Menu>
    </Portal>
  )
}

export default HoveringToolbar;