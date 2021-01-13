import React from "react";

import image from "./images/clark-street-mercantile-P3pI6xzovu0-unsplash.jpg";
import "./about.styles.scss";
const AboutPage = () => {
  return (
    <div>
      <h1 className="about__title">Crown Clothing Ltd.</h1>
      <div className="about__content">
        <div className="about__text-box">
          <p className="about__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            sagittis sollicitudin dui eu dapibus. Cras tempus, lacus quis
            vestibulum ultricies, magna sapien blandit urna, sed dictum lorem
            sapien at nisl. Aliquam molestie mi a turpis tempus tempor. Morbi
            iaculis auctor sapien sed imperdiet. Nam mattis elit id risus
            egestas, non consequat orci volutpat. Nam pulvinar id felis vel
            cursus.
          </p>
          <p className="about__text">
            In hac habitasse platea dictumst. Nullam cursus, sem efficitur
            egestas pulvinar, purus purus interdum dolor, eget aliquam nibh leo
            at purus. Vivamus consectetur enim interdum dui suscipit cursus. Sed
            sagittis viverra vestibulum. Aenean tempus quam libero, a faucibus
            libero sagittis sed. Mauris placerat arcu enim, quis vehicula arcu
            elementum eget. Curabitur nec dolor mattis, maximus orci in, feugiat
            odio. Vestibulum sodales ac leo ut lacinia. Nam eu augue arcu.
          </p>
        </div>

        <div className="about__image">
          <img src={image} className="image" />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
