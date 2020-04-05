import * as React from "react";

import SectionPanel from "../../components/SectionPanel";
import ParallaxPanel from "../../components/ParallaxPanel";
import HalfPanel from "../../components/HalfPanel";

export default [
    <SectionPanel
        sectionNo={1}
        title="Structure and Location Matter"
        key="sectionStart"
        content={
            <>
                <h4>After this section you’ll be able to: </h4>
                <p>Learning goal 1</p>
                <p>Learning goal 2</p>
            </>
        }
    />,
    <ParallaxPanel
        key="organelles"
        backgroundImageId="tem"
        content={
            <>
                <p>Example parallax panel</p>
            </>
        }
    />,
];
