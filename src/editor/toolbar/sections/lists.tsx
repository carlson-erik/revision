import { useSlate } from "slate-react";
/* -------- Components -------- */
import ActionButton from "../components/action-button";
/* -------- Icon Components -------- */
import Indent from "../icons/indent";
import List from "../icons/list";
import Unindent from "../icons/unindent";
/* -------- Actions & Types-------- */
import {
  canIndentListItem,
  canOutdentListItem,
  getElementNode,
  getParentElementNode,
  indentListItem,
  outdentListItem,
  setElementType,
} from "../../actions";
import { SectionContainer } from "../styled";
import {
  getContainer,
  getContainerParent,
  isInlineActive,
} from "../../actions/inline";

const ListSection = () => {
  const editor = useSlate();
  const activeInline = isInlineActive(editor);
  const activeElement = activeInline
    ? getContainer(editor)
    : getElementNode(editor);
  const activeElementParent = activeInline
    ? getContainerParent(editor)
    : getParentElementNode(editor);
  return (
    <SectionContainer>
      <ActionButton
        active={activeElementParent?.type === "ordered-list"}
        onMouseDown={(event) => {
          event.preventDefault();
          setElementType(editor, "ordered-list");
        }}
      >
        <List ordered={true} color="black" />
      </ActionButton>
      <ActionButton
        active={activeElementParent?.type === "bulleted-list"}
        onMouseDown={(event) => {
          event.preventDefault();
          setElementType(editor, "bulleted-list");
        }}
      >
        <List ordered={false} color="black" />
      </ActionButton>
      {activeElement?.type === "list-item" ? (
        <>
          {canOutdentListItem(editor) ? (
            <ActionButton
              onMouseDown={(event: any) => {
                event.preventDefault();
                outdentListItem(editor);
              }}
            >
              <Unindent color="black" />
            </ActionButton>
          ) : null}
          {canIndentListItem(editor) ? (
            <ActionButton
              onMouseDown={(event) => {
                event.preventDefault();
                indentListItem(editor);
              }}
            >
              <Indent color="black" />
            </ActionButton>
          ) : null}
        </>
      ) : null}
    </SectionContainer>
  );
};

export default ListSection;
