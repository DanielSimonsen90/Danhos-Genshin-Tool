import { Link } from "react-router-dom";
import { ROUTES } from "@/common/constants/routes";
import Highlight from "../Highlight";

export const Usage = () => (
  <section className="usage">
    <h2>Usage</h2>

    <div className="artifact-helper">
      <h3>Artifact Helper</h3>
      <p>
        <span>
          In the header, you are presented with a <Highlight selector=".search-form">form of select inputs</Highlight>.
        </span>
        <span>
          Fill in your artifact's details, <Highlight selector=".search-form [type=submit]">click the search button</Highlight>, and determine whether to save your artifact piece or not.
        </span>
      </p>
      <p>
        <span>
          Additionally, you can research characters, artifacts and domains through the <Highlight selector="a[href*=data]">data page</Highlight>.
        </span>
      </p>
    </div>

    <div className="building">
      <h3>Building</h3>
      <p>
        <span>
          As a new addition to the artifact helper, marking this as a 2.0 release, you can now do more than just finding your perfect artifact piece...
        </span>
        <span>
          In the new <Highlight selector="a[href*=building]">building page</Highlight>, you can navigate yourself the building hub, where you can plan out building your characters per region.
        </span>
      </p>
      <p>
        <span>
          On the <Highlight selector="a[href*=building]">building page</Highlight>, you will find the <Link to={ROUTES.building_priority_list}>priority list</Link> page.
          This page is inspired by <a href="https://tiermaker.com/create/genshin-impact-characters-13-792389">Tiermaker</a> and allows you to create multiple priority lists for characters, artifacts and domains, all saved within your region. This can help you prioritize and plan your favorite characters and artifacts.
        </span>
      </p>
    </div>

  </section>
);