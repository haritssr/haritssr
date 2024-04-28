import SubTitle from "@/components/SubTitle";
import LayoutToExperiments from "@/components/LayoutToExperiments";
import { useRef, useImperativeHandle, forwardRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const MyInput = forwardRef(function MyInput(props, ref: any) {
	const inputRef = useRef<HTMLInputElement>(null);

	useImperativeHandle(
		ref,
		() => {
			return {
				focus() {
					inputRef.current?.focus();
				},
				scrollIntoView() {
					inputRef.current?.scrollIntoView();
				},
			};
		},
		[],
	);

	return <input {...props} ref={inputRef} type="text" />;
});

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
			<button type="button" onClick={handleClick}>
				Edit
			</button>
		</form>
	);
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const AddComments = forwardRef(function AddComents(props, ref: any) {
	return <input type="text" placeholder="yada yada" ref={ref} />;
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const CommentsList = forwardRef(function CommentList(props, ref: any) {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const divRef = useRef<any>(null);

	useImperativeHandle(
		ref,
		() => {
			return {
				scrollToBottom() {
					const node = divRef.current;
					node.scrollTop = node.scrollHeight;
				},
			};
		},
		[],
	);

	const comments: React.ReactNode[] = [];
	for (let i = 0; i < 50; i++) {
		comments.push(<p key={i}>Comment #{i}</p>);
	}

	return (
		<div ref={divRef} className="h-40 overflow-scroll">
			{comments}
		</div>
	);
});

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const Post = forwardRef(function Post(props, ref: any) {
	const commentListRef = useRef<unknown>(null);
	const addCommentRef = useRef<HTMLInputElement>(null);
	useImperativeHandle(
		ref,
		() => {
			return {
				scrollAndFocusAddComment() {
					// commentListRef.current?.scrollToBottom();
					addCommentRef.current?.focus();
				},
			};
		},
		[],
	);
	return (
		<div className="" {...props}>
			<div>Welcome lol</div>
			<CommentsList ref={commentListRef} />
			<AddComments ref={addCommentRef} />
		</div>
	);
});

function Yada() {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const buttonRef = useRef<any>(null);
	function handleClick() {
		buttonRef.current?.scrollAndFocusAddComment();
	}

	return (
		<>
			<button type="button" onClick={handleClick}>
				Fuck
			</button>
			<Post ref={buttonRef} />
		</>
	);
}
export default function UseImperativeHandlePage() {
	return (
		<LayoutToExperiments domain="React" title="useImperativeHandlePage">
			<SubTitle>Example</SubTitle>
			<SomeApp />
			<Yada />
		</LayoutToExperiments>
	);
}
