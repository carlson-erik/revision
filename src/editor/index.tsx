import { useMemo, useState } from "react";
import styled from "styled-components";
import { createEditor, Descendant, Transforms, Range } from "slate";
import { isKeyHotkey } from "is-hotkey";
import {
  Slate,
  Editable,
  withReact,
  RenderLeafProps,
  RenderElementProps,
} from "slate-react";
import { withHistory } from "slate-history";
/* -------- Types -------- */
import { CustomEditor } from "./types";
/* -------- Editor Components -------- */
import TextLeaf from "./leaves/text";
import ParagraphElement from "./elements/";
import HeaderElement from "./elements/header";
import ListElement from "./elements/list";
import ListItemElement from "./elements/list-item";
import HoveringToolbar from "./toolbar";
/* -------- Editor Actions -------- */
import {
  canIndentListItem,
  canOutdentListItem,
  getElementNode,
  getElementPath,
  indentListItem,
  isListElement,
  isTextElement,
  outdentListItem,
} from "./actions";
import { focusPath } from "./actions/utils";
import LinkElement from "./elements/link";
import { withInlines } from "./actions/inline";

const Container = styled.div`
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
    font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
      monospace;
  }
`;

const EMPTY_DOCUMENT: Descendant[] = [
  {
    type: "paragraph",
    align: "left",
    children: [{ text: "" }],
  },
];

const renderElement = (props: RenderElementProps) => {
  const { element } = props;
  switch (element.type) {
    /* ------ LIST ELEMENTS ------ */
    case "ordered-list":
    case "bulleted-list":
      return <ListElement {...props} />;
    case "list-item":
      return <ListItemElement {...props} />;
    /* ------ INLINE ELEMENTS ------ */
    case "link":
      return <LinkElement {...props} />;
    /* ------ TEXT ELEMENTS ------ */
    case "header-one":
    case "header-two":
    case "header-three":
    case "header-four":
    case "header-five":
    case "header-six":
      return <HeaderElement {...props} />;
    default:
      return <ParagraphElement {...props} />;
  }
};

const renderLeaf = (props: RenderLeafProps) => {
  return <TextLeaf {...props} />;
};

export interface EditorProps {
  readOnly: boolean;
  content?: Descendant[];
}

const Editor = (props: EditorProps) => {
  const { readOnly, content } = props;
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const editor: CustomEditor = useMemo(
    () => withInlines(withHistory(withReact(createEditor()))),
    []
  );
  const [editorContent, setEditorContent] = useState<Descendant[]>(
    content ? content : EMPTY_DOCUMENT
  );

  const onContentChange = (value: Descendant[]) => setEditorContent(value);

  const onKeydown = (event: any) => {
    const currentNode = getElementNode(editor);
    const currentPath = getElementPath(editor);
    const { selection } = editor;
    if (currentNode && currentPath) {
      const currentNodeIndex = currentPath[0];

      /*
        These Left and Right overrides help ease a problem with inlne nodes (links) and the user not
        being able to focus the empty text nodes after them.

        Original comment:
        Default left/right behavior is unit:'character'.
        This fails to distinguish between two cursor positions, such as
        <inline>foo<cursor/></inline> vs <inline>foo</inline><cursor/>.
        Here we modify the behavior to unit:'offset'.
        This lets the user step into and out of the inline without stepping over characters.
        You may wish to customize this further to only use unit:'offset' in specific cases.
      */
      if (selection && Range.isCollapsed(selection)) {
        const { nativeEvent } = event;
        if (isKeyHotkey("left", nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, { unit: "offset", reverse: true });
          return;
        }
        if (isKeyHotkey("right", nativeEvent)) {
          event.preventDefault();
          Transforms.move(editor, { unit: "offset" });
          return;
        }
      }
      if (
        event.key === "Enter" &&
        currentNode.type === "list-item" &&
        "text" in currentNode.children[0] && 
        currentNode.children[0].text === ""
      ) {
        // This prevents the user from creating more than one empty list item in any given list.
        event.preventDefault();
        if (currentPath.length === 2) {
          /*
            This implies the user is ending a top-level list and moving back to text content. So, we add a empty paragraph after the list and shift focus to it.
          */
          Transforms.insertNodes(
            editor,
            { type: "paragraph", align: "left", children: [{ text: "" }] },
            { at: [currentPath[0] + 1] }
          );
          focusPath(editor, [currentPath[0] + 1]);
        }
      } else if (
        event.key === "Backspace" &&
        isTextElement(currentNode) &&
        currentNodeIndex > 0 &&
        "text" in currentNode.children[0] &&
        currentNode.children[0].text === ""
      ) {
        /*
          Original behavior wasn't great in this case. When deleting an empty Text Element and then switching focus to a list in the previous node, we correctly shift selection to be the very last list item in the top level list.

          NOTE: We will have to account for all future new top level Element types here to prevent said not great behavior.
        */
        event.preventDefault();
        Transforms.removeNodes(editor, { at: currentPath });
        const listElement = editor.children[currentNodeIndex - 1];
        if (isListElement(listElement)) {
          focusPath(editor, [
            currentNodeIndex - 1,
            listElement.children.length - 1,
            0,
          ]);
        }
      } else if (
        event.key === "Tab" &&
        currentNode.type === "list-item" &&
        !event.shiftKey
      ) {
        // This enables a user to indent the current list item with their keyboard
        event.preventDefault();
        if (canIndentListItem(editor)) {
          indentListItem(editor);
        }
      } else if (
        event.key === "Tab" &&
        currentNode.type === "list-item" &&
        event.shiftKey
      ) {
        // This enables a user to outdent the current list item with their keyboard
        event.preventDefault();
        if (canOutdentListItem(editor)) {
          outdentListItem(editor);
        }
      }
    }
  };
  return (
    <Container className="revision" ref={setContainerRef}>
      <Slate editor={editor} value={editorContent} onChange={onContentChange}>
        {containerRef ? <HoveringToolbar containerRef={containerRef} /> : null}
        <Editable
          readOnly={readOnly}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          onKeyDown={onKeydown}
        />
      </Slate>
    </Container>
  );
};

export default Editor;
