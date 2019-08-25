import React from "react";
import ReactDOM from "react-dom";
import { StarMapController } from "./components/StarMapController";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(
        <StarMapController
            size={{
                width: 1,
                height: 1,
            }}
        />,
        div,
    );
    ReactDOM.unmountComponentAtNode(div);
});
