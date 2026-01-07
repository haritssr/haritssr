import { Cross2Icon } from "@radix-ui/react-icons";
import { Dialog } from "radix-ui";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function ModalInsideModal() {
  return (
    <LayoutToExperiments domain="React" title="Modal Inside Modal">
      <SubTitle>Modal Inside Modal</SubTitle>

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <button
            className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium text-violet11 leading-none shadow-[0_2px_10px] shadow-blackA7 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-hidden"
            type="button"
          >
            Edit profile
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
          <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%/35%)_0px_10px_38px_-10px,hsl(206_22%_7%/20%)_0px_10px_20px_-15px] focus:outline-hidden data-[state=open]:animate-contentShow">
            <Dialog.Title className="m-0 font-medium text-[17px] text-mauve12">
              Edit profile
            </Dialog.Title>
            <Dialog.Description className="mt-[10px] mb-5 text-[15px] text-mauve11 leading-normal">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </Dialog.Description>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="w-[90px] text-right text-[15px] text-violet11"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-hidden focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                defaultValue="Pedro Duarte"
                id="name"
              />
            </fieldset>
            <fieldset className="mb-[15px] flex items-center gap-5">
              <label
                className="w-[90px] text-right text-[15px] text-violet11"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-hidden focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                defaultValue="@peduarte"
                id="username"
              />
            </fieldset>

            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button
                  className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-white px-[15px] font-medium text-violet11 leading-none shadow-[0_2px_10px] shadow-blackA7 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-hidden"
                  type="button"
                >
                  Another Edit profile
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-blackA9 data-[state=open]:animate-overlayShow" />
                <Dialog.Content className="fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%/35%)_0px_10px_38px_-10px,hsl(206_22%_7%/20%)_0px_10px_20px_-15px] focus:outline-hidden data-[state=open]:animate-contentShow">
                  <Dialog.Title className="m-0 font-medium text-[17px] text-mauve12">
                    Another Edit profile
                  </Dialog.Title>
                  <Dialog.Description className="mt-[10px] mb-5 text-[15px] text-mauve11 leading-normal">
                    Make changes to your profile here. Click save when
                    you&apos;re done.
                  </Dialog.Description>
                  <fieldset className="mb-[15px] flex items-center gap-5">
                    <label
                      className="w-[90px] text-right text-[15px] text-violet11"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-hidden focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                      defaultValue="Pedro Duarte"
                      id="name"
                    />
                  </fieldset>
                  <fieldset className="mb-[15px] flex items-center gap-5">
                    <label
                      className="w-[90px] text-right text-[15px] text-violet11"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <input
                      className="inline-flex h-[35px] w-full flex-1 items-center justify-center rounded-[4px] px-[10px] text-[15px] text-violet11 leading-none shadow-[0_0_0_1px] shadow-violet7 outline-hidden focus:shadow-[0_0_0_2px] focus:shadow-violet8"
                      defaultValue="@peduarte"
                      id="username"
                    />
                  </fieldset>
                  <div className="mt-[25px] flex justify-end">
                    <Dialog.Close asChild>
                      <button
                        className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium text-green11 leading-none hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-hidden"
                        type="button"
                      >
                        Save changes
                      </button>
                    </Dialog.Close>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      aria-label="Close"
                      className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-hidden"
                      type="button"
                    >
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
            <div className="mt-[25px] flex justify-end">
              <Dialog.Close asChild>
                <button
                  className="inline-flex h-[35px] items-center justify-center rounded-[4px] bg-green4 px-[15px] font-medium text-green11 leading-none hover:bg-green5 focus:shadow-[0_0_0_2px] focus:shadow-green7 focus:outline-hidden"
                  type="button"
                >
                  Save changes
                </button>
              </Dialog.Close>
            </div>
            <Dialog.Close asChild>
              <button
                aria-label="Close"
                className="absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-hidden"
                type="button"
              >
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </LayoutToExperiments>
  );
}
