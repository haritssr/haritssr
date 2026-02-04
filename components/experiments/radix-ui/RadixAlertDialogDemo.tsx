"use client";

import { AlertDialog } from "radix-ui";

import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

interface AlertDialogDemoProps {
  buttonTitle: string;
  contentTitle: string;
  contentDesc: string;
  actionDesc: string;
}

export default function RadixAlertDialogDemo() {
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/alert-dialog"
          name="Radix UI Alert Dialog"
        />
        <ExplanationList>
          <li>
            A modal dialog that interrupts the user with important content and
            expects a response.
          </li>
          <li>
            Click the button and the popup will appear in the middle of the
            screen.
          </li>
        </ExplanationList>
      </SubTitle>
      <AlertDialogDemo
        actionDesc="Continue"
        buttonTitle="Delete"
        contentDesc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro a officiis eaque laborum natus repellat exercitationem recusandae veniam et dolores!"
        contentTitle="This Is Title"
      />
    </>
  );
}

function AlertDialogDemo({
  buttonTitle,
  contentTitle,
  contentDesc,
  actionDesc,
}: AlertDialogDemoProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger className="rounded-full border border-red-600 bg-white px-4 py-1 text-red-600 duration-100 hover:bg-red-50">
        {buttonTitle}
      </AlertDialog.Trigger>
      <AlertDialog.Overlay className="fixed inset-0 z-50 bg-gray-900/50" />
      <AlertDialog.Content className="fixed top-1/2 left-1/2 z-90 max-h-[80vh] w-4/5 -translate-x-1/2 -translate-y-1/2 select-none rounded-md bg-white p-5 sm:max-w-screen-xs">
        <AlertDialog.Title className="text-center font-semibold text-gray-800 text-xl sm:text-left">
          {contentTitle}
        </AlertDialog.Title>
        <AlertDialog.Description className="mb-5 text-center text-zinc-800 sm:text-left">
          {contentDesc}
        </AlertDialog.Description>
        <div className="flex flex-col space-y-2 sm:flex-row sm:justify-end sm:space-x-4 sm:space-y-0">
          <AlertDialog.Cancel className="rounded-md border border-red-600 bg-white px-3 py-2 font-medium text-red-600 hover:bg-red-50 sm:py-1.5">
            Cancel
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <div className="rounded-md bg-red-600 px-3 py-2 text-white hover:bg-red-700 sm:py-1.5">
              {actionDesc}
            </div>
          </AlertDialog.Action>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
