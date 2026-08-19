"use client";

import ExternalLink from "@/components/ExternalLink";
import Section from "@/components/Section";
import SubTitle from "@/components/SubTitle";
/*
BEFORE
{ showSidebar && <SideBar/> }
when showSidebar is false:
- state destroyed
- effects cleaned up
- DOM removed
opening again create everything from scratch


NOW
<Activity mode={ showSidebar ? "visible" : "hidden" }>
  <SideBar/>
</Activity>
when hidden:
- state preserved
- effects stopped
- subscription cleaned
- DOM hidden (display:none)
when visible:
- state restored
- effects restarted
- DOM shown


*/

import { Activity, useEffect, useState } from "react";

export default function ActivityDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="space-y-10">
      <SubTitle>
        The page intentionally bad looking in order to focus on the code behind
        the screen.
      </SubTitle>
      <div className="mb-8">
        <ExternalLink
          href="https://github.com/haritssr/haritssr/tree/try/app/experiments/react/activity-demo"
          name="Source code"
        />
      </div>
      <button
        className="rounded-sm bg-blue-500 px-2.5 py-1.5 text-sm text-white hover:bg-blue-500/95 active:translate-y-px"
        onClick={() => setVisible((v) => !v)}
        type="button"
      >
        Toggle Visibility
      </button>

      <div>
        <Section name="Counter Button" />
        <Activity mode={visible ? "visible" : "hidden"}>
          <Counter />
        </Activity>
        {Boolean(visible) && <Counter />}
      </div>

      <div>
        <Section name="Input State" />
        <Activity mode={visible ? "visible" : "hidden"}>
          <Form />
        </Activity>
      </div>

      <div>
        <Section name="Effect Livecycle" />
        <Activity mode={visible ? "visible" : "hidden"}>
          <Clock />
        </Activity>
      </div>

      <div>
        <Section name="Tab" />
        <Tabs />
      </div>

      <div>
        <Section name="Pre-render Hidden UI" />
        {/*Although it hidden, but behind the screen the dashboard is rendered, prepare jsx, load code, suspend for data*/}
        {/*Later when mode is visible, it appear much faster, because much of work already done in the backgroudn at a lower priority*/}
        <Activity mode="hidden">
          <ExpensiveDashboard />
        </Activity>
      </div>
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h2>{count}</h2>
      <button onClick={() => setCount((c) => c + 1)} type="button">
        +
      </button>
    </>
  );
}

function Form() {
  const [name, setName] = useState("");
  return (
    <input
      className="bg-gray-100"
      onChange={(e) => setName(e.target.value)}
      value={name}
    />
  );
}

function Clock() {
  useEffect(() => {
    console.log("clock running");

    const interval = setInterval(() => {
      console.log(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      console.log("cleaned up");
      clearInterval(interval);
    };
  }, []);

  return <div>Clock is running...</div>;
}

function Tabs() {
  const [tab, setTab] = useState("profile");

  return (
    <div>
      {/*For butotn, every switch destroy: scroll position, form values, local UI updates*/}
      <button onClick={() => setTab("settings")} type="button">
        set settings
      </button>
      <button onClick={() => setTab("profile")} type="button">
        set profile
      </button>

      {tab === "profile" && <Profile />}
      {tab === "settings" && <Settings />}

      <Activity mode={tab === "profile" ? "visible" : "hidden"}>
        <Profile />
      </Activity>

      <Activity mode={tab === "settings" ? "visible" : "hidden"}>
        <Settings />
      </Activity>
    </div>
  );
}

function Profile() {
  return <div>Profil</div>;
}

function Settings() {
  return <div>Settings</div>;
}

function ExpensiveDashboard() {
  return <div>ExpensiveDashboard</div>;
}
