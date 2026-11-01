"use client";

import { TabsList, TabsPanel, TabsRoot, TabsTab } from "@/components/Tabs";

export default function Tabs() {
  return (
    <TabsRoot defaultValue="account">
      <TabsList aria-label="Account settings">
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="password">Password</TabsTab>
      </TabsList>
      <TabsPanel value="account">
        Update your profile details and account preferences.
      </TabsPanel>
      <TabsPanel value="password">
        Change your password and keep your account secure.
      </TabsPanel>
    </TabsRoot>
  );
}
