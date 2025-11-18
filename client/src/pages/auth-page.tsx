import { Redirect } from "wouter";

export default function AuthPage() {
  const search = typeof window !== "undefined" ? window.location.search : "";
  return <Redirect to={`/login${search}`} />;
}
