import { Link } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";
import Highlight from "../Highlight";
import { DOMAIN_NAME } from "@/common/constants/domain";

export const Usage = () => (
  <section className="usage">
    <h2>Welcome home!</h2>
    <p>Let's take a look at how we can manage your Genshin account together!</p>

    <div className="building">
      <h3>Building</h3>
      <p>
        <span>To help build your characters, there are currently 3 pages for you to explore!</span>
        <span>If you go directly to the <Highlight selector="a[href*=building]">building page</Highlight>, you will find the sub-page navigation list as well as the weekly calendar!</span>
        <span>The weekly calendar will show you which characters or weapons' materials are currently available for farming.</span>
        <span><b>Tip:</b> Mark your favorite characters as favorite to push them to the top of the list!</span>
      </p>

      <h4>Priority List</h4>
      <p>
        <span>
          On the <Highlight selector="a[href*=building]">building page</Highlight>, you will find the <Link to={ROUTES.building_priority_list}>priority list</Link> page.
          This page is inspired by <a href="https://tiermaker.com/create/genshin-impact-characters-13-792389">Tiermaker</a> and allows you to create multiple priority lists for any Genshin Impact model, all saved within your region. This can help you prioritize and plan your favorite characters and artifacts or even weapons!
        </span>
      </p>

      <h4>Artifact Helper</h4>
      <p>
        <span>
          The original concept of {DOMAIN_NAME} was to provide an algorithm that could help your stored artifacts to find the best character in your account.
        </span>
        <span>
          Today, this feature is still available on the <Link to={ROUTES.building_artifact_helper}>artifact helper page</Link> as a sub-page of the <Highlight selector="a[href*=building]">building page</Highlight>.
        </span>
      </p>
      <p>
        <span>
          Simply provide the helper engine with the artifact set, artifact piece and its stats, then hit search! Immediately, you will see a list of characters who could make use of your artifact piece.
        </span>
      </p>
    </div>

    <div className="data">
      <h3>Data</h3>
      <p>
        <span>
          To easily browse through all the available models in Genshin Impact, you can visit the <Highlight selector="a[href*=data]">data page</Highlight>.
        </span>
        <span>
          The data page will also provide you with detailed information about each model, where to get the item from, who might make use of the item and much more!
        </span>
      </p>
      <p>
        <span>
          <b>Tip:</b> Use the search function OR filters to quickly find specific models or items!
        </span>
      </p>
    </div>
  </section>
);