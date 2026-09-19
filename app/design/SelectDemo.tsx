import { Select } from "@base-ui/react/select";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/24/outline";

const FORM_CONTROL_CLASS_NAME =
  "form-control w-full appearance-none rounded-lg border border-border bg-white px-3 py-2 text-sm text-foreground/90 shadow-sm outline-hidden placeholder:text-foreground/40 focus:border-foreground/80 focus:ring-2 focus:ring-foreground/20 sm:max-w-xs";

export default function SelectDemo() {
  return (
    <Select.Root defaultValue="design">
      <Select.Trigger
        aria-label="Choose a discipline"
        className={`${FORM_CONTROL_CLASS_NAME} focus-visible:outline-action hover:bg-foreground/5 inline-flex items-center justify-between gap-3 focus-visible:outline-2`}
      >
        <Select.Value placeholder="Choose one" />
        <Select.Icon>
          <ChevronDownIcon className="h-4 w-4" />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={4}>
          <Select.Popup className="border-border z-50 overflow-hidden rounded-lg border bg-white shadow-xl">
            <Select.List className="p-1">
              <Select.Item
                className="text-foreground data-highlighted:bg-foreground/10 relative flex cursor-pointer items-center rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden select-none"
                value="design"
              >
                <Select.ItemText>Design</Select.ItemText>
                <Select.ItemIndicator className="absolute right-2">
                  <CheckIcon className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
              <Select.Item
                className="text-foreground data-highlighted:bg-foreground/10 relative flex cursor-pointer items-center rounded-md py-1.5 pr-8 pl-2 text-sm outline-hidden select-none"
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
