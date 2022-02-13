import { ChangeEvent, ReactNode, useEffect, useState } from "react";
import { useSlate } from "slate-react";
/* -------- Components -------- */
import ActionButton from "../components/action-button";
import Button from "../components/button";
import Popper from "../components/popper";
/* -------- Icon Components -------- */
import Link from "../icons/link";
/* -------- Actions & Types-------- */
import styled from "styled-components";
import Input from "../components/input";
import { CustomElement, LinkInlineElement } from "../../types";
import { insertLink, isLinkActive, updateLink } from "../../actions/inline";
import { getElementNode } from "../../actions";
import isUrl from "is-url";

const OverlayContainer = styled.div`
  background-color: white;
  border: 1px solid #d1d4d9;
  border-radius: 2px;
  margin-block: 0;
  padding: 0.5rem;
  width: 16rem;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
`;

interface OverlayProps {
  targetRef: HTMLElement;
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
  children: ReactNode;
}

const Overlay = (props: OverlayProps) => {
  const { targetRef, isOpen, setIsOpen, children } = props;
  return (
    <Popper
      targetRef={targetRef}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      clickOutside
      placement="bottom"
      modifiers={[
        {
          name: "offset",
          options: {
            offset: [0, 2],
          },
        },
      ]}
    >
      <OverlayContainer>{children}</OverlayContainer>
    </Popper>
  );
};

interface LinkConfigOverlayProps {
  targetRef: HTMLElement;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  editingMode: "edit" | "new";
  currentNode: CustomElement;
}

const isLinkElement = (node: CustomElement): node is LinkInlineElement => {
  return (
    node.type === "link" &&
    node?.children.length > 0 &&
    "text" in node.children[0]
  );
};

const getInitialURL = (node: CustomElement): string => {
  return isLinkElement(node) ? node.url : "";
}

const getInitialText = (node: CustomElement):string => {
  return isLinkElement(node) &&
    node?.children.length > 0 &&
    "text" in node.children[0]
    ? node.children[0].text
    : "";
};

const LinkConfigOverlay = (props: LinkConfigOverlayProps) => {
  const { targetRef, isOpen, setIsOpen, currentNode, editingMode } = props;
  const editor = useSlate();
  const [url, setURL] = useState<string>(getInitialURL(currentNode));
  const [linkText, setLinkText] = useState<string>(getInitialText(currentNode));
  useEffect(() => {
    /*
     * When a user clicks on a new location, we need to update state
     * to represent current state.
     */
    setURL(getInitialURL(currentNode));
    setLinkText(getInitialText(currentNode));
  }, [currentNode]);

  const onURLChange = (event: ChangeEvent<HTMLInputElement>) => {
    setURL(event.target.value || "");
  }

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLinkText(event.target.value || "");
  }

  const onSubmit = () => {
    if (url !== "" && isUrl(url)) {
      if(editingMode === 'edit') {
        console.log('update existing link with: ', url);
        updateLink(editor, url);
      } else {
        const trimmedLabel = linkText.trim();
        console.log('insert new link with:', trimmedLabel, url);
        insertLink(editor, url, trimmedLabel);
      }
      setIsOpen(false);
    } else {
      console.log("invalid configuration");
    }
  };

  return (
    <Overlay targetRef={targetRef} isOpen={isOpen} setIsOpen={setIsOpen}>
      <Input
        id="url-input"
        type="text"
        label="URL"
        value={url}
        onChange={onURLChange}
      />
      {editingMode === 'new' ? (
        <Input
          id="link-text-input"
          type="text"
          label="Link Text"
          value={linkText}
          onChange={onTextChange}
        />
      ): null}
      <ButtonContainer>
        <Button
          isPrimary={true}
          isActive={false}
          label={editingMode === "edit" ? "Update link" : "Insert link"}
          onClick={onSubmit}
        />
      </ButtonContainer>
    </Overlay>
  );
};

const LinkSection = () => {
  const editor = useSlate();
  const [ActionButtonRef, setActionButtonRef] = useState<HTMLElement | null>(
    null
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const node = getElementNode(editor);
  if (!node) return null;
  const isLinkFocused = isLinkActive(editor);
  return (
    <>
      <ActionButton
        active={isLinkFocused}
        onMouseDown={(event) => {
          event.preventDefault();
          setIsOpen(!isOpen);
        }}
        reference={setActionButtonRef}
      >
        <Link color="black" />
      </ActionButton>
      {ActionButtonRef && node ? (
        <LinkConfigOverlay
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          targetRef={ActionButtonRef}
          currentNode={node}
          editingMode={isLinkFocused ? "edit" : "new"}
        />
      ) : null}
    </>
  );
};

export default LinkSection;
