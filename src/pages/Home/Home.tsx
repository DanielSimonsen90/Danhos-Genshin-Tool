import { DOMAIN_NAME, DEVELOPER, DEVELOPER_GITHUB_URL } from "@/common/constants/domain";
import { Usage, Idea, Roadmap, Contribution } from "./components/posts";

export default function Home() {


  return (
    <>
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
    </>
  );
}
