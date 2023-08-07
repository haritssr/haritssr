import { comments } from "../../data/comments";

export async function getStaticPaths() {
  //    this is possible but unnecessary, since the data already in app
  //   const res = await fetch('/api/comment');
  //   const data = await res.json();
  //   const dataArray = data.map(comment => ({ params: { commentId: comment.id } }));
  return {
    paths: [
      { params: { commentId: "1" } },
      { params: { commentId: "2" } },
      { params: { commentId: "3" } },
    ],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const { commentId } = context.params;

  /**
   * Dont do this!
   * const res = await fetch(`localhost:3000/api/comments/${commentId}`)
   * const data = await re.json()
   *
   * - not do those will save 100ms uneccessary trip
   * - you should not call an api route for pre-rendering
   */
  const comment = comments.find(
    (comment) => comment.id === parseInt(commentId)
  );
  return { props: { comment } };
}

export default function Comment({ comment }) {
  return (
    <div>
      <div>{comment.id}</div>
      <div>{comment.comment}</div>
    </div>
  );
}
