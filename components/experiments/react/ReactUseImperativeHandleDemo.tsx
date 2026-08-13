"use client";

import {
  type HTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type Ref,
  useImperativeHandle,
  useRef,
} from "react";
import SubTitle from "@/components/SubTitle";

interface MyInputHandle {
  focus: () => void;
  scrollIntoView: () => void;
}

type MyInputProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<MyInputHandle>;
};

const MyInput = function MyInput({ ref, ...props }: MyInputProps) {
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
  const ref = useRef<MyInputHandle>(null);

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

type AddCommentsProps = InputHTMLAttributes<HTMLInputElement> & {
  ref?: Ref<HTMLInputElement>;
};

const AddComments = function AddComents({ ref, ..._props }: AddCommentsProps) {
  return <input placeholder="yada yada" ref={ref} type="text" />;
};

interface CommentsListHandle {
  scrollToBottom: () => void;
}

interface CommentsListProps {
  ref?: Ref<CommentsListHandle>;
}

const CommentsList = function CommentList({
  ref,
  ..._props
}: CommentsListProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      scrollToBottom() {
        const node = divRef.current;
        if (!node) {
          return;
        }
        node.scrollTop = node.scrollHeight;
      },
    }),
    []
  );

  const comments: ReactNode[] = [];
  for (let i = 0; i < 50; i += 1) {
    comments.push(<p key={i}>Comment #{i}</p>);
  }

  return (
    <div className="h-40 overflow-scroll" ref={divRef}>
      {comments}
    </div>
  );
};

interface PostHandle {
  scrollAndFocusAddComment: () => void;
}

type PostProps = HTMLAttributes<HTMLDivElement> & {
  ref?: Ref<PostHandle>;
};

const Post = function Post({ ref, ...props }: PostProps) {
  const commentListRef = useRef<CommentsListHandle>(null);
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
  const buttonRef = useRef<PostHandle>(null);
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
