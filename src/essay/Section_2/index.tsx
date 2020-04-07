import * as React from "react";

import SectionPanel from "../../components/SectionPanel";
import StickyVisual from "../../components/StickyVisual";

export default [
    <SectionPanel
        sectionNo={2}
        title="Chemical Gradients"
        key="section2"
        content={
            <>
                <h4>After this section you’ll be able to: </h4>
                <p>
                    Predict whether ions will move across a membrane given the presence or absence
                    of a carrier.
                </p>
                <p>
                    Predict how ions will move across a membrane given a concentration gradient
                    across the membrane.
                </p>
                <p>
                    Identify the movement of ions down their gradient as a source of potential
                    energy.
                </p>
            </>
        }
    />,
    <StickyVisual
        key="simInteractive"
        currentPanel={0}
        progress={0}
        stuckPosition={0.0}
        duration={2}
        mode="slide"
        panelIndex={0} // will be assigned at render
    >
        <iframe
            style={{ width: "100%", height: "90vh" }}
            src="https://editor.p5js.org/meganrm/embed/4otQyBGv"
        ></iframe>
    </StickyVisual>,
];
