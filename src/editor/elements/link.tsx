import styled from 'styled-components';
import { RenderElementProps } from "slate-react";
import { InlineChromiumBugfix } from "../actions/inline";

const Link = styled.a`
  & * {
    color: blue !important;
  }
`;

const LinkElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const url = 'url' in element ? element.url : '#';
  return (
    <Link {...attributes} href={url}>
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </Link>
  );
};

export default LinkElement;
