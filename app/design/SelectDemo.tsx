import { Select } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const FORM_CONTROL_CLASS_NAME =
  "form-control w-full appearance-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-800 shadow-sm outline-hidden placeholder:text-zinc-400 focus:border-zinc-700 focus:ring-2 focus:ring-zinc-700/20 sm:max-w-xs";

export default function SelectDemo() {
  return (
    <Select.Root defaultValue="design">
      <Select.Trigger
        aria-label="Choose a discipline"
        className={`${FORM_CONTROL_CLASS_NAME} focus-visible:outline-action inline-flex items-center justify-between gap-3 hover:bg-zinc-50 focus-visible:outline-2`}
      >
        <Select.Value placeholder="Choose one" />
        <Select.Icon>
          <ChevronDownIcon className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup className="z-50 overflow-hidden rounded-lg border border-zinc-300 bg-white shadow-xl">
            <Select.List className="p-1">
              <Select.Item
                className="relative flex cursor-pointer items-center rounded-md py-1.5 pr-8 pl-2 text-sm text-zinc-700 outline-hidden select-none data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900"
                value="design"
              >
                <Select.ItemText>Design</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <CheckIcon className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item
                className="relative flex cursor-pointer items-center rounded-md py-1.5 pr-8 pl-2 text-sm text-zinc-700 outline-hidden select-none data-highlighted:bg-zinc-100 data-highlighted:text-zinc-900"
                value="engineering"
              >
                <Select.ItemText>Engineering</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <CheckIcon className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.List>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
