import "normalize.css";
import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import { APP_ID } from "./constants";
import App from "./containers/App";
import { createReduxStore } from "./state";
import essay from "./essay";

import "./styles/global.css";
import "./styles/colors.css";
import "./styles/typography.css";

render(
    <Provider store={createReduxStore()}>
        <App>{essay}</App>
    </Provider>,
    document.getElementById(APP_ID)
);
