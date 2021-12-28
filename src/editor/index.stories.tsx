import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Editor, { EditorProps } from './';
import { CustomElement } from './types';

const LOREM_IPSUM: CustomElement[] = [
  {
    type: 'paragraph',
    align: 'left',
    children: [{ text: 'Quisque eu magna sem. Curabitur interdum vitae ante id fermentum. Donec venenatis ex ut libero semper, eu vulputate enim elementum. Fusce condimentum laoreet massa vitae laoreet. In pharetra elit libero, at hendrerit quam tempor ac. Morbi id blandit elit. Morbi sed nisi tristique, suscipit ante sagittis, elementum arcu. Sed et dapibus lacus. Phasellus laoreet quam et ante aliquet euismod.' }],
  },
  {
    type: 'paragraph',
    align: 'left',
    children: [{ text: 'Vestibulum consectetur ipsum at pretium bibendum. Aenean vulputate nunc a porttitor varius. Donec tincidunt turpis felis, ac blandit sem tincidunt non. Integer eget posuere lorem, at semper lorem. Maecenas ac tellus aliquam nibh dictum placerat a sed turpis. Etiam rhoncus tellus ut neque semper, quis rutrum dolor egestas. Sed volutpat nunc rhoncus magna malesuada consectetur. Etiam congue quis odio non cursus.' }],
  },
  {
    type: 'paragraph',
    align: 'left',
    children: [{ text: 'Fusce nec justo congue, interdum risus feugiat, molestie velit. Morbi pulvinar vitae nulla at laoreet. Maecenas tempus sodales leo sit amet posuere. Proin mattis tellus id auctor fringilla. In hac habitasse platea dictumst. Nam blandit quam sed leo vestibulum feugiat. Fusce consectetur lorem quis vehicula iaculis. Nulla non fermentum nulla, ac suscipit libero. Cras laoreet sed massa non rhoncus. Curabitur maximus commodo libero eget suscipit. Nulla pulvinar libero quis est tincidunt, ut commodo magna molestie. Nullam et orci tristique, sagittis sapien ac, luctus nunc. Mauris sed ullamcorper urna, at mattis arcu.' }],
  },
  {
    type: 'paragraph',
    align: 'left',
    children: [{ text: 'Etiam lectus nisl, rutrum ac lectus a, laoreet elementum nisl. Donec ornare velit lorem, eu ultricies justo hendrerit pellentesque. Nulla lacus velit, pulvinar at tellus at, fringilla aliquam nibh. Sed at nunc accumsan, sollicitudin eros a, iaculis felis. Nullam eget justo dictum, tincidunt nisi in, convallis risus. Curabitur feugiat quam vitae lacinia congue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras aliquam efficitur odio, non ullamcorper lorem bibendum et. Ut congue mauris eros, id ornare lorem interdum vitae. Curabitur vulputate, felis ac molestie blandit, tortor magna venenatis urna, nec semper erat lacus posuere elit. Mauris ornare euismod convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet maximus nibh. Suspendisse ut nisl egestas, tempus lacus sed, placerat ipsum.' }],
  },
  {
    type: 'paragraph',
    align: 'left',
    children: [{ text: 'Morbi erat arcu, fringilla et rhoncus ut, molestie sed arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin placerat metus nunc, at congue mi dignissim vel. Donec consequat faucibus elit, et rhoncus velit aliquam et. Duis interdum purus id euismod fermentum. Pellentesque et rhoncus quam, at eleifend mauris. Fusce vel malesuada urna. Donec rutrum dolor nisi, sed consectetur ex feugiat vel. Cras vehicula ligula at lorem dapibus fermentum. Etiam arcu lacus, ullamcorper in aliquet non, volutpat nec nibh. Etiam pulvinar libero arcu, eu ultrices tellus venenatis molestie. Suspendisse tempus id nulla a molestie. Morbi nisi nibh, ultrices a turpis nec, interdum elementum arcu. Proin ligula orci, tristique id aliquet et, viverra sed lacus.' }],
  },
];

export default {
  title: 'Editor',
  component: Editor,
  decorators: [withKnobs],
} as ComponentMeta<typeof Editor>;

const EditorTemplate: ComponentStory<typeof Editor> = (args: EditorProps) => {
  const readOnly = boolean('Read Only', false);
  return (
    <Editor {...args} readOnly={readOnly} />
  )
};

export const Empty = EditorTemplate.bind({});
Empty.args = {};

export const LoremIpsum = EditorTemplate.bind({});
LoremIpsum.args = {
  content: LOREM_IPSUM
};