import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Range } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';
/* -------- Components -------- */
import Button from './components/button';
import Dropdown, { Option } from './components/dropdown';
import Portal from './components/portal';
/* -------- Actions & Types-------- */
import {
  toggleTextFormat,
  isTextFormatActive,
  getActiveTextColor,
  setElementType,
  hasElementFormatValue,
  setElementFormat,
  getElementNode,
  getParentElementNode,
  indentListItem,
  outdentListItem,
  canIndentListItem, 
  canOutdentListItem
} from '../actions';
import { ElementType } from '../types';
/* -------- Icon Components -------- */
import Bold from './icons/bold';
import Italic from './icons/italic';
import Strikethrough from './icons/strikethrough';
import Underline from './icons/underline';
import Color from './icons/color';
import Paragraph from './icons/paragraph';
import Heading from './icons/heading';
import Align from './icons/align';
import List from './icons/list';
import Indent from './icons/indent';
import Unindent from './icons/unindent';

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

const allElementOptions: Option[] = [
  ...elementOptions,
  {
    label: 'Ordered List',
    value: 'ordered-list',
    icon: (
      <List color='#343740' ordered />
    )
  },
  {
    label: 'Bulleted List',
    value: 'bulleted-list',
    icon: (
      <List color='#343740' />
    )
  }
]

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
  display: flex;
  align-items: center;
`;

const ToolbarSection = styled.div<{ noPadding?: boolean }>`
  width: fit-content;
  height: fit-content;
  margin-right: ${props => props.noPadding ? '0' : '0.25rem'};
  display: flex;
  align-items: center;
`;

interface HoveringToolbarProps {
  containerRef: HTMLElement;
}

const HoveringToolbar = (props: HoveringToolbarProps) => {
  const { containerRef } = props;
  const [ref, setRef] = useState<HTMLDivElement | null>();
  const [editType, setEditType] = useState<'text' | 'element' | 'hidden'>('hidden');
  const editor = useSlate();

  const handleOutsideClick = (event: any) => {
    if (containerRef && !containerRef.contains(event.target) && ref && !ref.contains(event.target)) {
      ref.removeAttribute('style')
    }
  }

  useEffect(() => {
    // remove existing
    document.removeEventListener("mousedown", handleOutsideClick)
    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [containerRef, ref]);

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
  const activeElementParent = getParentElementNode(editor);

  return (
    <Portal>
      <Menu ref={setRef} className='revision-toolbar'>
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
              <ToolbarSection>
                <Dropdown
                  options={elementOptions}
                  allOptions={allElementOptions}
                  placeholder='Select new element..'
                  onChange={(newOption) => {
                    setElementType(editor, newOption.value as ElementType)
                  }}
                />
              </ToolbarSection>
              {(activeElement?.type !== 'ordered-list') && (activeElement?.type !== 'bulleted-list') && (activeElement?.type !== 'list-item')
                ? (
                  <>
                    <ToolbarSection>
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
                    </ToolbarSection>
                  </>
                ) : null}
              <Button
                active={activeElementParent?.type === 'ordered-list'}
                onMouseDown={(event) => {
                  event.preventDefault();
                  setElementType(editor, 'ordered-list');
                }}
              >
                <List ordered={true} color='black' />
              </Button>
              <Button
                active={activeElementParent?.type === 'bulleted-list'}
                onMouseDown={(event) => {
                  event.preventDefault();
                  setElementType(editor, 'bulleted-list');
                }}
              >
                <List ordered={false} color='black' />
              </Button>
              {(activeElement?.type === 'list-item')
                ? (
                  <>
                    {canIndentListItem(editor) ? (
                      <Button
                        onMouseDown={(event) => {
                          event.preventDefault();
                          indentListItem(editor);
                        }}>
                        <Indent color='black' />
                      </Button>
                    ) : null}
                    {canOutdentListItem(editor) ? (
                      <Button
                        onMouseDown={(event) => {
                          event.preventDefault();
                          outdentListItem(editor);
                        }}
                      >
                        <Unindent color='black' />
                      </Button>
                    ) : null}
                  </>
                ) : null}
            </>
          )}
      </Menu>
    </Portal >
  )
}

export default HoveringToolbar;