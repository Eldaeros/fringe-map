import React, { Component } from "react";
import { HexGrid } from "./HexGrid";
import data from "../data/sector.json";

// Get types from JSON File
export type SectorData = typeof import("../data/sector.json");
export type SystemData = SectorData["systems"][0];

interface Props {
    size: {
        width: number;
        height: number;
    };
}

interface State {
    showModal: boolean;
}

export class StarMapController extends Component<Props, State> {

    state: State = {
        showModal: false
    }

    render() {
        return (
            <>
                <HexGrid
                    {...this.props}
                    data={data}
                />
            </>
        )
    }
};