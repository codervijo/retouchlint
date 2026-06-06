import { ThemeProvider } from "@/components/theme-provider";
import Landing from "@/components/Landing";
import Dashboard from "@/components/Dashboard";
import NewProject from "@/components/NewProject";
import ProjectPage from "@/components/ProjectPage";
import SharePage from "@/components/SharePage";

type Page = "landing" | "dashboard" | "new" | "project" | "share";

function getId(): string {
  if (typeof window === "undefined") return "";
  return new URLSearchParams(window.location.search).get("id") ?? "";
}

export default function Island({ page }: { page: Page }) {
  let inner;
  switch (page) {
    case "dashboard":
      inner = <Dashboard />;
      break;
    case "new":
      inner = <NewProject />;
      break;
    case "project":
      inner = <ProjectPage id={getId()} />;
      break;
    case "share":
      inner = <SharePage id={getId()} />;
      break;
    default:
      inner = <Landing />;
  }
  return <ThemeProvider>{inner}</ThemeProvider>;
}
