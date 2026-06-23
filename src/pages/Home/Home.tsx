import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DOMAIN_NAME, DEVELOPER, DEVELOPER_GITHUB_URL } from "@/common/constants/domain";
import { useSettingsStore } from "@/stores/SettingsStore";
import { Usage, Idea, Roadmap, Contribution } from "./components/posts";

export default function Home() {
  const navigate = useNavigate();
  const defaultLandingPage = useSettingsStore(s => s.getSetting('defaultLandingPage'));

  useEffect(() => {
    if (defaultLandingPage) navigate(`/${defaultLandingPage}`, { replace: true });
  }, []);
  return (
    <section className="landing">
      <header>
        <h1><span className="domain-name">{DOMAIN_NAME}</span></h1>
        <p className="muted">Developed by <a href={DEVELOPER_GITHUB_URL}>{DEVELOPER}</a>
        </p>
      </header>
      <main>
        <Usage />
        <Idea />
        <Roadmap />
        <Contribution />
      </main>
    </section>
  );
}
