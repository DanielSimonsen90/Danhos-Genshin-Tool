import { PROJECT_GITHUB_CREATE_ISSUE_URL, PROJECT_GITHUB_URL } from "@/common/constants/domain";

export const Contribution = () => (
  <section className="contribution">
    <h2>Contribution</h2>
    <section>
      <p>
        If you spot any mistakes, have any suggestions, or would like to contribute to the project in any way, please feel free to <a href={PROJECT_GITHUB_CREATE_ISSUE_URL} target="_blank">create an issue</a> on the <a href={PROJECT_GITHUB_URL}>GitHub repository</a>.
      </p>
    </section>
  </section>
);