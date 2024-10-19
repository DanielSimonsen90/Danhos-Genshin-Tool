import Highlight from "../Highlight";

export const Usage = () => (
  <section className="usage">
    <h2>Usage</h2>
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
        Additionally, you can research <Highlight selector="a[href*=characters]">characters</Highlight>, <Highlight selector="a[href*=artifacts]">artifacts</Highlight> and <Highlight selector="a[href*=domains]">domains</Highlight> to find the best builds for your characters.
      </span>
    </p>
  </section>
);