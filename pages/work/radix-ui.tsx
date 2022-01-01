import { SubTitle } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import AccordionDemo from '@/components/radix-ui/AccordionDemo';
import AlertDialogDemo from '@/components/radix-ui/AlertDialogDemo';
import AspectRatioDemo from '@/components/radix-ui/AspectRatioDemo';
import CheckboxDemo from '@/components/radix-ui/CheckboxDemo';
import CollapsibleDemo from '@/components/radix-ui/CollapsibleDemo';
import ContextMenuDemo from '@/components/radix-ui/ContextMenuDemo';
import DialogDemo from '@/components/radix-ui/DialogDemo';
import DropdownMenuDemo from '@/components/radix-ui/DropdownMenuDemo';
import HoverCardDemo from '@/components/radix-ui/HoverCardDemo';
import LabelDemo from '@/components/radix-ui/LabelDemo';
import PopoverDemo from '@/components/radix-ui/PopoverDemo';
import ProgressDemo from '@/components/radix-ui/ProgressDemo';
import RadioGroupDemo from '@/components/radix-ui/radio-group';
import ScrollAreaDemo from '@/components/radix-ui/ScrollAreaDemo';
import Image from 'next/image';

export default function Radix() {
  return (
    <LayoutSubWorkToTopic href='/work' hrefName='My Work' title='Radix UI'>
      <SubTitle>
        Radix UI is an open-source UI component library for building high-quality, accessible design
        systems and web apps, and here is my implementation while using this library and some use
        cases.
      </SubTitle>

      <main className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
        <BlueBox>
          <AccordionDemo title='Accordion'>
            A vertically stacked set of interactive headings that each reveal an associated section
            of content.
          </AccordionDemo>
        </BlueBox>

        <BlueBox>
          <AlertDialogDemo
            buttonTitle='Alert Dialog'
            actionDesc='Yes, delete'
            contentDesc='A dialog that displays a message and an OK button.'
            contentTitle='Are you sure?'
          />
        </BlueBox>

        <BlueBox>
          <AspectRatioDemo>
            <Image
              src='https://images.unsplash.com/photo-1535025183041-0991a977e25b?w=300&dpr=2&q=80'
              alt='Landscape photo by Tobias Tullius'
              layout='fill'
            />
          </AspectRatioDemo>
        </BlueBox>

        <BlueBox>
          <CheckboxDemo />
        </BlueBox>

        <BlueBox>
          <CollapsibleDemo />
        </BlueBox>

        <BlueBox>
          <ContextMenuDemo />
        </BlueBox>

        <BlueBox>
          <DialogDemo />
        </BlueBox>

        <BlueBox>
          <DropdownMenuDemo />
        </BlueBox>

        <BlueBox>
          <HoverCardDemo />
        </BlueBox>

        <BlueBox>
          <LabelDemo />
        </BlueBox>

        <BlueBox>
          {/* Lol, opened only on the right direction */}
          <PopoverDemo />
        </BlueBox>

        <BlueBox>
          {/* 
          TYPESCRIPT ALERT
          const setProgress: (value: React.SetStateAction<number>) => void
            Type 'Timeout' is not assignable to type 'void | Destructor'.
              Type 'Timeout' is not assignable to type 'Destructor'.
                Type 'Timeout' provides no match for the signature '(): void | { [UNDEFINED_VOID_ONLY]: never; }'.ts(2322)
            index.d.ts(901, 27): The expected type comes from the return type of this signature. 
          */}
          <ProgressDemo />
        </BlueBox>

        <BlueBox>
          {/* still don't understand the use of lots of API */}
          <ScrollAreaDemo />
        </BlueBox>

        <BlueBox>
          {/* Error, i'm tired -_- */}
          <RadioGroupDemo />
        </BlueBox>
      </main>
    </LayoutSubWorkToTopic>
  );
}

const BlueBox = ({ children }) => (
  <div className='flex items-center justify-center h-auto p-10 bg-blue-200 rounded-md'>
    {children}
  </div>
);
