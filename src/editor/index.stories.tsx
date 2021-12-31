import { ComponentStory, ComponentMeta } from '@storybook/react';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import Editor, { EditorProps } from './';
import { CustomElement } from './types';

const LOREM_IPSUM: CustomElement[] = [
  {
    type: 'paragraph',
    align: 'left',
    children: [{ type:'text', text: 'Quisque eu magna sem. Curabitur interdum vitae ante id fermentum. Donec venenatis ex ut libero semper, eu vulputate enim elementum. Fusce condimentum laoreet massa vitae laoreet. In pharetra elit libero, at hendrerit quam tempor ac. Morbi id blandit elit. Morbi sed nisi tristique, suscipit ante sagittis, elementum arcu. Sed et dapibus lacus. Phasellus laoreet quam et ante aliquet euismod.' }],
  },
  {
    type: 'paragraph',
    align: 'left',
    children: [{ type:'text', text: 'Vestibulum consectetur ipsum at pretium bibendum. Aenean vulputate nunc a porttitor varius. Donec tincidunt turpis felis, ac blandit sem tincidunt non. Integer eget posuere lorem, at semper lorem. Maecenas ac tellus aliquam nibh dictum placerat a sed turpis. Etiam rhoncus tellus ut neque semper, quis rutrum dolor egestas. Sed volutpat nunc rhoncus magna malesuada consectetur. Etiam congue quis odio non cursus.' }],
  },
  {
    type: 'paragraph',
    align: 'left',
    children: [{ type:'text', text: 'Fusce nec justo congue, interdum risus feugiat, molestie velit. Morbi pulvinar vitae nulla at laoreet. Maecenas tempus sodales leo sit amet posuere. Proin mattis tellus id auctor fringilla. In hac habitasse platea dictumst. Nam blandit quam sed leo vestibulum feugiat. Fusce consectetur lorem quis vehicula iaculis. Nulla non fermentum nulla, ac suscipit libero. Cras laoreet sed massa non rhoncus. Curabitur maximus commodo libero eget suscipit. Nulla pulvinar libero quis est tincidunt, ut commodo magna molestie. Nullam et orci tristique, sagittis sapien ac, luctus nunc. Mauris sed ullamcorper urna, at mattis arcu.' }],
  },
  {
    type: 'paragraph',
    align: 'left',
    children: [{ type:'text', text: 'Etiam lectus nisl, rutrum ac lectus a, laoreet elementum nisl. Donec ornare velit lorem, eu ultricies justo hendrerit pellentesque. Nulla lacus velit, pulvinar at tellus at, fringilla aliquam nibh. Sed at nunc accumsan, sollicitudin eros a, iaculis felis. Nullam eget justo dictum, tincidunt nisi in, convallis risus. Curabitur feugiat quam vitae lacinia congue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras aliquam efficitur odio, non ullamcorper lorem bibendum et. Ut congue mauris eros, id ornare lorem interdum vitae. Curabitur vulputate, felis ac molestie blandit, tortor magna venenatis urna, nec semper erat lacus posuere elit. Mauris ornare euismod convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sit amet maximus nibh. Suspendisse ut nisl egestas, tempus lacus sed, placerat ipsum.' }],
  },
  {
    type: 'paragraph',
    align: 'left',
    children: [{ type:'text', text: 'Morbi erat arcu, fringilla et rhoncus ut, molestie sed arcu. Interdum et malesuada fames ac ante ipsum primis in faucibus. Proin placerat metus nunc, at congue mi dignissim vel. Donec consequat faucibus elit, et rhoncus velit aliquam et. Duis interdum purus id euismod fermentum. Pellentesque et rhoncus quam, at eleifend mauris. Fusce vel malesuada urna. Donec rutrum dolor nisi, sed consectetur ex feugiat vel. Cras vehicula ligula at lorem dapibus fermentum. Etiam arcu lacus, ullamcorper in aliquet non, volutpat nec nibh. Etiam pulvinar libero arcu, eu ultrices tellus venenatis molestie. Suspendisse tempus id nulla a molestie. Morbi nisi nibh, ultrices a turpis nec, interdum elementum arcu. Proin ligula orci, tristique id aliquet et, viverra sed lacus.' }],
  },
];

const GRIMM_HANSEL: CustomElement[] = [
  {
    type: "header-one",
    children: [
      {
        type:'text', 
        text: "HANSEL AND GRETEL",
        bold: true
      }
    ],
    align: 'center'
  },
  {
    type: "header-three",
    children: [
      {
        type:'text', 
        text: "By The Brothers Grimm"
      }
    ],
    align: 'center'
  },
  {
    type: 'paragraph',
    children: [
      {
        type:'text',
        text: ""
      }
    ],
    align: 'left'
  },
  {
    type: 'paragraph',
    children: [
      {
        type:'text', 
        text: "Hard by a great forest dwelt a poor wood-cutter with his wife and his two children. The boy was called Hansel and the girl Gretel. He had little to bite and to break, and once when great dearth fell on the land, he could no longer procure even daily bread. Now when he thought over this by night in his bed, and tossed about in his anxiety, he groaned and said to his wife: ‘What is to become of us? How are we to feed our poor children, when we no longer have anything even for ourselves?’ ‘I’ll tell you what, husband,’ answered the woman, ‘early tomorrow morning we will take the children out into the forest to where it is the thickest; there we will light a fire for them, and give each of them one more piece of bread, and then we will go to our work and leave them alone. They will not find the way home again, and we shall be rid of them.’ ‘No, wife,’ said the man, ‘I will not do that; how can I bear to leave my children alone in the forest?--the wild animals would soon come and tear them to pieces.’ ‘O, you fool!’ said she, ‘then we must all four die of hunger, you may as well plane the planks for our coffins,’ and she left him no peace until he consented. ‘But I feel very sorry for the poor children, all the same,’ said the man."
      }
    ],
    align: 'left'
  },
  {
    type: 'paragraph',
    children: [
      {
        type:'text', 
        text: "The two children had also not been able to sleep for hunger, and had heard what their stepmother had said to their father. Gretel wept bitter tears, and said to Hansel: ‘Now all is over with us.’ ‘Be quiet, Gretel,’ said Hansel, ‘do not distress yourself, I will soon find a way to help us.’ And when the old folks had fallen asleep, he got up, put on his little coat, opened the door below, and crept outside. The moon shone brightly, and the white pebbles which lay in front of the house glittered like real silver pennies. Hansel stooped and stuffed the little pocket of his coat with as many as he could get in. Then he went back and said to Gretel: ‘Be comforted, dear little sister, and sleep in peace, God will not forsake us,’ and he lay down again in his bed. When day dawned, but before the sun had risen, the woman came and awoke the two children, saying: ‘Get up, you sluggards! we are going into the forest to fetch wood.’ She gave each a little piece of bread, and said: ‘There is something for your dinner, but do not eat it up before then, for you will get nothing else.’ Gretel took the bread under her apron, as Hansel had the pebbles in his pocket. Then they all set out together on the way to the forest. When they had walked a short time, Hansel stood still and peeped back at the house, and did so again and again. His father said: ‘Hansel, what are you looking at there and staying behind for? Pay attention, and do not forget how to use your legs.’ ‘Ah, father,’ said Hansel, ‘I am looking at my little white cat, which is sitting up on the roof, and wants to say goodbye to me.’ The wife said: ‘Fool, that is not your little cat, that is the morning sun which is shining on the chimneys.’ Hansel, however, had not been looking back at the cat, but had been constantly throwing one of the white pebble-stones out of his pocket on the road."
      }
    ],
    align: 'left'
  },
  {
    type: 'paragraph',
    children: [
      {
        type:'text', 
        text: "When they had reached the middle of the forest, the father said: ‘Now,  children, pile up some wood, and I will light a fire that you may not  be cold.’ Hansel and Gretel gathered brushwood together, as high as a  little hill. The brushwood was lighted, and when the flames were burning  very high, the woman said: ‘Now, children, lay yourselves down by the  fire and rest, we will go into the forest and cut some wood. When we  have done, we will come back and fetch you away.’"
      }
    ],
    align: 'left'
  },
  {
    type: 'paragraph',
    children: [
      {
        type:'text', 
        text: "Hansel and Gretel sat by the fire, and when noon came, each ate a little  piece of bread, and as they heard the strokes of the wood-axe they  believed that their father was near. It was not the axe, however, but  a branch which he had fastened to a withered tree which the wind was  blowing backwards and forwards. And as they had been sitting such a long  time, their eyes closed with fatigue, and they fell fast asleep. When  at last they awoke, it was already dark night. Gretel began to cry and  said: ‘How are we to get out of the forest now?’ But Hansel comforted  her and said: ‘Just wait a little, until the moon has risen, and then we  will soon find the way.’ And when the full moon had risen, Hansel took  his little sister by the hand, and followed the pebbles which shone like  newly-coined silver pieces, and showed them the way."
      }
    ],
    align: 'left'
  },
  {
    type: 'paragraph',
    children: [
      {
        type:'text', 
        text: "They walked the whole night long, and by break of day came once more  to their father’s house. They knocked at the door, and when the woman  opened it and saw that it was Hansel and Gretel, she said: ‘You naughty  children, why have you slept so long in the forest?--we thought you were  never coming back at all!’ The father, however, rejoiced, for it had cut  him to the heart to leave them behind alone.  "
      }
    ],
    align: 'left'
  },
  {
    type: 'paragraph',
    children: [
      {
        type:'text', 
        text: "Not long afterwards, there was once more great dearth throughout the  land, and the children heard their mother saying at night to their  father: ‘Everything is eaten again, we have one half loaf left, and that  is the end. The children must go, we will take them farther into the  wood, so that they will not find their way out again; there is no other  means of saving ourselves!’ The man’s heart was heavy, and he thought:  ‘It would be better for you to share the last mouthful with your  children.’ The woman, however, would listen to nothing that he had to  say, but scolded and reproached him. He who says A must say B, likewise,  and as he had yielded the first time, he had to do so a second time  also."
      }
    ],
    align: 'left'
  }
];


const LIST_EXAMPLE: CustomElement[] = [
  {
    type: 'header-two',
    align: 'left',
    children: [
      {type: 'text', text:'Lists Example'}
    ]
  },
  {
    type: 'header-four',
    align: 'left',
    children: [
      {type: 'text', text:'Ordered list:'}
    ]
  },
  {
    type: 'ordered-list',
    children: [
      { type:'list-item', text: 'list item text 1'},
      { type:'list-item', text: 'list item text 2'},
      { type:'list-item', text: 'list item text 3'}
    ]
  },
  {
    type: 'header-four',
    align: 'left',
    children: [
      {type: 'text', text:'Unordered list:'}
    ]
  },
  {
    type: 'unordered-list',
    children: [
      { type:'list-item', text: 'list item text 1'},
      { type:'list-item', text: 'list item text 2'},
      { type:'list-item', text: 'list item text 3'}
    ]
  },
  {
    type: 'header-four',
    align: 'left',
    children: [
      {type: 'text', text:'Crazy list:'}
    ]
  },
  {
    type: 'unordered-list',
    children: [
      { type:'list-item', text: 'list item text 1'},
      {
        type: 'ordered-list',
        children: [
          { type:'list-item', text: 'list item text 1'},
          { type:'list-item', text: 'list item text 2'},
          { type:'list-item', text: 'list item text 3'}
        ]
      },
      { type:'list-item', text: 'list item text 2'},
      { type:'list-item', text: 'list item text 3'}
    ]
  },
]

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

export const HanselAndGretel = EditorTemplate.bind({});
HanselAndGretel.args = {
  content: GRIMM_HANSEL
};

export const ListExample = EditorTemplate.bind({});
ListExample.args = {
  content: LIST_EXAMPLE
};