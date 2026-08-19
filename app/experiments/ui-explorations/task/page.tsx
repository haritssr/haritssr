import { permanentRedirect } from "next/navigation";

export default function TaskRedirectPage() {
  permanentRedirect("/task");
}
