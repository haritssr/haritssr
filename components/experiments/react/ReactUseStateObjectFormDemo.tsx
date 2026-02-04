"use client";

import { useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import ExternalLink from "@/components/ExternalLink";
import SubTitle from "@/components/SubTitle";

export default function ReactUseStateObjectFormDemo() {
  const [person, setPerson] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  function handleChange(e: { target: { name: string; value: string } }) {
    // console.log(e.target.name);
    setPerson({
      ...person,
      [e.target.name]: e.target.value,
    });
  }

  const inputStyle =
    "focus:outline-hidden focus:ring-2 border border-zinc-400 focus:border-blue-500 focus:ring-blue-200 px-2 py-0.5 rounded text-base";
  const labelStyle = "flex flex-col space-y-0.5 w-full sm:w-fit text-sm";
  return (
    <>
      <SubTitle>
        <ExternalLink
          href="https://beta.reactjs.org/learn/updating-objects-in-state"
          name="Updating objects in state"
        />
        <ExplanationList>
          <li>
            Fill the input and simultaneously the value of the input will appear
            in the buttom.
          </li>
        </ExplanationList>
      </SubTitle>
      <form className="mb-5 flex flex-col space-y-3">
        <label className={labelStyle}>
          First Name
          <input
            className={inputStyle}
            name="firstName"
            onChange={handleChange}
            placeholder="First Name"
            type="text"
            value={person.firstName}
          />
        </label>
        <label className={labelStyle}>
          Last Name
          <input
            className={inputStyle}
            name="lastName"
            onChange={handleChange}
            placeholder="Last Name"
            type="text"
            value={person.lastName}
          />
        </label>
        <label className={labelStyle}>
          Email
          <input
            className={inputStyle}
            name="email"
            onChange={handleChange}
            placeholder="Email"
            type="email"
            value={person.email}
          />
        </label>
      </form>
      <div className="flex flex-col">
        <div>
          Full Name : {person.firstName} {person.lastName}
        </div>
        <div>Email : {person.email}</div>
      </div>
    </>
  );
}
