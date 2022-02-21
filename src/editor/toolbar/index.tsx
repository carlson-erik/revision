import { useEffect, useState } from "react";
import styled from "styled-components";
import { Range } from "slate";
import { useSlate, ReactEditor } from "slate-react";
/* -------- Components -------- */
import Dropdown, { Option } from "./components/dropdown";
import Portal from "./components/portal";
import { SectionContainer } from "./styled";
/* -------- Actions & Types-------- */
import { setElementType } from "../actions";
import { ElementType } from "../types";
/* -------- Toolbar Sections -------- */
import AlignmentSection from "./sections/alignment";
import ListSection from "./sections/lists";
import LinkSection from "./sections/link";
import TextFormatSection from "./sections/text-format";
/* -------- Icon Components -------- */
import Paragraph from "./icons/paragraph";
import Heading from "./icons/heading";
import List from "./icons/list";
import Link from "./icons/link";

const elementOptions: Option[] = [
  {
    label: "Paragraph",
    value: "paragraph",
    icon: <Paragraph color="#343740" />,
  },
  {
    label: "Heading 1",
    value: "header-one",
    icon: <Heading color="#343740" headingSize={1} />,
  },
  {
    label: "Heading 2",
    value: "header-two",
    icon: <Heading color="#343740" headingSize={2} />,
  },
  {
    label: "Heading 3",
    value: "header-three",
    icon: <Heading color="#343740" headingSize={3} />,
  },
  {
    label: "Heading 4",
    value: "header-four",
    icon: <Heading color="#343740" headingSize={4} />,
  },
  {
    label: "Heading 5",
    value: "header-five",
    icon: <Heading color="#343740" headingSize={5} />,
  },
  {
    label: "Heading 6",
    value: "header-six",
    icon: <Heading color="#343740" headingSize={6} />,
  },
];

const allElementOptions: Option[] = [
  ...elementOptions,
  {
    label: "Ordered List",
    value: "ordered-list",
    icon: <List color="#343740" ordered />,
  },
  {
    label: "Bulleted List",
    value: "bulleted-list",
    icon: <List color="#343740" />,
  },
  {
    label: "Link",
    value: "link",
    icon: <Link color="#343740" />,
  },
];

const Menu = styled.div`
  padding: 4px;
  background-color: white;
  border: 1px solid #d1d4d9;
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

interface HoveringToolbarProps {
  containerRef: HTMLElement;
}

const HoveringToolbar = (props: HoveringToolbarProps) => {
  const { containerRef } = props;
  const [ref, setRef] = useState<HTMLDivElement | null>();
  const [editType, setEditType] = useState<"text" | "element" | "hidden">(
    "hidden"
  );
  const editor = useSlate();

  const handleOutsideClick = (event: any) => {
    if (
      containerRef &&
      !containerRef.contains(event.target) &&
      ref
    ) {
      ref.style.opacity = "0";
    }
  };

  useEffect(() => {
    // remove existing
    document.removeEventListener("mousedown", handleOutsideClick);
    // listen for clicks and close dropdown on body
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [containerRef, ref]);

  useEffect(() => {
    const el = ref;
    const { selection } = editor;

    if (!el || !selection || !ReactEditor.isFocused(editor)) {
      setEditType("hidden");
      return;
    }

    if (Range.isCollapsed(selection)) {
      setEditType("element");
    } else {
      setEditType("text");
    }

    const domSelection = window.getSelection();
    if (domSelection) {
      const domRange = domSelection.getRangeAt(0);
      const rect = domRange.getBoundingClientRect();
      el.style.opacity = "1";
      el.style.top = `${rect.top + window.pageYOffset - el.offsetHeight}px`;
      el.style.left = `${
        rect.left + window.pageXOffset - el.offsetWidth / 2 + rect.width / 2
      }px`;
    }
  });

  if (editType === "hidden" && ref) ref.style.opacity = "0";

  return (
      <Menu ref={setRef} className="revision-toolbar">
        {editType === "text" ? (
          <TextFormatSection />
        ) : (
          <>
            <SectionContainer>
              <Dropdown
                options={elementOptions}
                allOptions={allElementOptions}
                placeholder="Select new element.."
                onChange={(newOption) => {
                  setElementType(editor, newOption.value as ElementType);
                }}
              />
            </SectionContainer>
            <AlignmentSection />
            <ListSection />
            <LinkSection />
          </>
        )}
      </Menu>
  );
};

export default HoveringToolbar;
