import "katex/dist/katex.min.css";
import katexify from "@/utils/katexify";

export default function ContentsMath({ tex }: { tex: string }) {
  return katexify(tex, false);
}
