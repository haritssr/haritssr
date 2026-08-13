import { StatusActionLink, StatusPage } from "../components/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      actions={<StatusActionLink href="/">Back to Home</StatusActionLink>}
      description="The route may have moved or no longer exists."
      fullScreen
      title="Page Not Found"
    />
  );
}
