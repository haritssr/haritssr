"use client";

import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function SelectDemo() {
  return (
    <>
      <SubTitle>
        Browser built in select API.
        <br />
        The chevron down is bad, you can not manipulate that.
        <br />
        Alternative using{" "}
        <ExternalLink
          href="https://headlessui.com/react/listbox"
          name="Headless UI Listbox"
        />{" "}
        or{" "}
        <ExternalLink
          href="https://www.radix-ui.com/docs/primitives/components/select"
          name="Radix Primitive Select"
        />
      </SubTitle>
      <select className="w-1/3 px-2 py-2" id="pet-select" name="pets">
        <option value="">Please choose an option</option>
        <option disabled value="dog">
          Dog
        </option>
        <option value="cat">Cat</option>
        <option value="hamster">Hamster</option>
        <option value="parrot">Parrot</option>
        <option value="spider">Spider</option>
        <option value="goldfish">Goldfish</option>
      </select>
    </>
  );
}
