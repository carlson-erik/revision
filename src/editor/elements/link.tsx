import { RenderElementProps } from "slate-react";
import { InlineChromiumBugfix } from "../actions/inline";

const LinkElement = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  const url = 'url' in element ? element.url : '#';
  return (
    <a {...attributes} href={url}>
      <InlineChromiumBugfix />
      {children}
      <InlineChromiumBugfix />
    </a>
  );
};

export default LinkElement;
