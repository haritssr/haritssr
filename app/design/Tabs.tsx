"use client";

import { TabsList, TabsPanel, TabsRoot, TabsTab } from "@/components/Tabs";

export default function Tabs() {
  return (
    <TabsRoot defaultValue="account">
      <TabsList aria-label="Account settings">
        <TabsTab value="account">Account</TabsTab>
        <TabsTab value="password">Password</TabsTab>
        <TabsTab value="notifications">Notifications</TabsTab>
        <TabsTab value="privacy">Privacy</TabsTab>
      </TabsList>
      <TabsPanel value="account">
        Update your profile details and account preferences.
      </TabsPanel>
      <TabsPanel value="password">
        Change your password and keep your account secure.
      </TabsPanel>
      <TabsPanel value="notifications">
        Choose which notifications you receive.
      </TabsPanel>
      <TabsPanel value="privacy">
        Manage your privacy and sharing preferences.
      </TabsPanel>
    </TabsRoot>
  );
}
