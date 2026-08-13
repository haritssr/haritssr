"use client";

import { useImperativeHandle, useRef } from "react";
import SubTitle from "@/components/SubTitle";

const MyInput = function MyInput({ ref, ...props }) {
  const inputRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus() {
        inputRef.current?.focus();
      },
      scrollIntoView() {
        inputRef.current?.scrollIntoView();
      },
    }),
    []
  );

  return <input {...props} ref={inputRef} type="text" />;
};

function SomeApp() {
  const ref = useRef<HTMLInputElement>(null);

  function handleClick(e: { preventDefault: () => void }) {
    e.preventDefault();
    // focus() method  here is something inside the useImperativeHandle, not the actual DOM itself
    ref.current?.focus();
  }

  return (
    <form>
      <MyInput ref={ref} />
      <button onClick={handleClick} type="button">
        Edit
      </button>
    </form>
  );
}

const AddComments = function AddComents({ ref, ..._props }) {
  return <input placeholder="yada yada" ref={ref} type="text" />;
};

const CommentsList = function CommentList({ ref, ..._props }) {
  // biome-ignore lint/suspicious/noExplicitAny: ref type needs to be flexible for imperative handle
  const divRef = useRef<any>(null);

  useImperativeHandle(
    ref,
    () => ({
      scrollToBottom() {
        const node = divRef.current;
        node.scrollTop = node.scrollHeight;
      },
    }),
    []
  );

  const comments: React.ReactNode[] = [];
  for (let i = 0; i < 50; i += 1) {
    comments.push(<p key={i}>Comment #{i}</p>);
  }

  return (
    <div className="h-40 overflow-scroll" ref={divRef}>
      {comments}
    </div>
  );
};

const Post = function Post({ ref, ...props }) {
  const commentListRef = useRef<unknown>(null);
  const addCommentRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => {
    return {
      scrollAndFocusAddComment() {
        // commentListRef.current?.scrollToBottom();
        addCommentRef.current?.focus();
      },
    };
  }, []);
  return (
    <div className="" {...props}>
      <div>Welcome lol</div>
      <CommentsList ref={commentListRef} />
      <AddComments ref={addCommentRef} />
    </div>
  );
};

function Yada() {
  // biome-ignore lint/suspicious/noExplicitAny: ref type needs to be flexible for imperative handle
  const buttonRef = useRef<any>(null);
  function handleClick() {
    buttonRef.current?.scrollAndFocusAddComment();
  }

  return (
    <>
      <button onClick={handleClick} type="button">
        Fuck
      </button>
      <Post ref={buttonRef} />
    </>
  );
}

export default function ReactUseImperativeHandleDemo() {
  return (
    <>
      <SubTitle>Example</SubTitle>
      <SomeApp />
      <Yada />
    </>
  );
}
