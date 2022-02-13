import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Revision, { RevisionProps } from '../';
import { LOREM_IPSUM, HANSEL_AND_GRETEL, LIST_EXAMPLES } from '../mock/content';
import styled from 'styled-components';
import './index.css';

const Container = styled.div`
  display:flex;
  justify-content: center;
  width: 100%;
  padding-top: 1rem;
`;

const EditorContainer = styled.div`
  width: 75%;
  padding: 1rem;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
`;

export default {
  title: 'Editor',
  component: Revision,
  decorators: [withKnobs],
} as ComponentMeta<typeof Revision>;

const EditorTemplate: ComponentStory<typeof Revision> = (args: RevisionProps) => {
  const readOnly = boolean('Read Only', false);
  return (
    <Container>
      <EditorContainer>
        <Revision {...args} readOnly={readOnly} />
      </EditorContainer>
    </Container>
  )
};

export const Empty = EditorTemplate.bind({});
Empty.args = {};

export const LoremIpsum = EditorTemplate.bind({});
LoremIpsum.args = {
  content: LOREM_IPSUM
};

export const HanselAndGretel = EditorTemplate.bind({});
HanselAndGretel.args = {
  content: HANSEL_AND_GRETEL
};

export const ListExamples = EditorTemplate.bind({});
ListExamples.args = {
  content: LIST_EXAMPLES
};