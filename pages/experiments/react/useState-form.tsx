import { useState } from "react";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import SubTitle from "@/components/SubTitle";

export default function useStateForm() {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
    //[e.target.id] is an input's id attribute, 'title' or 'body'
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("This is the form data: ", formData);
    setFormData({
      title: "",
      body: "",
    });
  };

  return (
    <LayoutToExperiments domain="React" title="useState on Form">
      <SubTitle>
        Simple but not useful useState form. Open your console to see what is
        going on
      </SubTitle>
      <form className="flex flex-col" onSubmit={onSubmit}>
        <div className="mb-4 flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            className="sm:w-1/3"
            id="title"
            onChange={onChange}
            type="text"
            value={formData.title}
          />
        </div>
        <div className="mb-8 flex flex-col">
          <label htmlFor="body">Body</label>
          <input
            className="sm:w-1/3"
            id="body"
            onChange={onChange}
            type="text"
            value={formData.body}
          />
        </div>
        <button className="sm:w-1/3" type="submit">
          Submit
        </button>
      </form>
    </LayoutToExperiments>
  );
}
