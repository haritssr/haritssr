import { useState } from "react";
import ExplanationList from "@/components/ExplanationList";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

const defaultFormData = {
  title: "",
  body: "",
};
const inputStyle =
  "focus:outline-hidden focus:border focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-md px-2 py-0.5 border border-zinc-400";
const wrapperStyle = "flex flex-col";
const buttonStyle =
  "w-full rounded-md bg-blue-600 px-2 py-1.5 text-white hover:bg-[#2563eb]/90";

export default function SubmitForm() {
  const [formData, setFormData] = useState(defaultFormData);
  const { title, body } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      // e.target.id is id='title' and id='body' on input elements
      [e.target.id]: e.target.value,
    }));
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formData);
    setFormData(defaultFormData);
  };

  return (
    <LayoutToExperiments domain="React" title="Submit Form">
      <SubTitle>
        <ExplanationList>
          <li>Submit (as console.log) contents of input.</li>
        </ExplanationList>
      </SubTitle>
      <form className="w-full space-y-5 sm:w-1/3" onSubmit={onSubmit}>
        <div className={wrapperStyle}>
          <label htmlFor="title">Title</label>
          <input
            className={inputStyle}
            id="title"
            onChange={(e) => onChange(e)}
            type="text"
            value={title}
          />
        </div>
        <div className={wrapperStyle}>
          <label htmlFor="body">Body</label>
          <input
            className={inputStyle}
            id="body"
            onChange={(e) => onChange(e)}
            type="text"
            value={body}
          />
        </div>
        <button className={buttonStyle} type="submit">
          Submit
        </button>
      </form>
    </LayoutToExperiments>
  );
}
