import React, { FunctionComponent, Component } from "react";
import styled from "styled-components";
import SvgHexagon from "./svg/Hexagon";

const _ = require("lodash");

interface HexGridProps {
    size: {
        width: number;
        height: number;
    };
}

const HEX_SIZE = 100;
const COLUMN_OFFSET = 1.48;
const ROW_OFFSET = 0.43;
const ODD_OFFSET = 0.74;

export const HexGrid: FunctionComponent<HexGridProps> = (
    props: HexGridProps,
) => {
    const gridLayout: JSX.Element[] = [];
    const rows = props.size.height * 2;
    const columns = props.size.width / 2;
    // Calculate Rows
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            const xGridCoord = _.padStart(
                rowIndex % 2 ? colIndex * 2 + 2 : colIndex * 2 + 1,
                2,
                "0",
            );
            const yGridCoord = _.padStart(Math.floor(rowIndex / 2) + 1, 2, "0");

            // Odd Rows are offset by 75%
            const rowOffset = rowIndex % 2 ? ODD_OFFSET * HEX_SIZE : 0;
            gridLayout.push(
                <Hexagon
                    key={`hex-${yGridCoord}-${xGridCoord}`}
                    data-hex-text={`hex-${yGridCoord}-${xGridCoord}`}
                    hexText={`${yGridCoord}${xGridCoord}`}
                    size={HEX_SIZE}
                    position={[
                        colIndex * HEX_SIZE * COLUMN_OFFSET + rowOffset,
                        rowIndex * HEX_SIZE * ROW_OFFSET,
                    ]}
                />,
            );
        }
    }

    return (
        <>
            {gridLayout}
        </>
    );
};

interface HexagonProps {
    size: number;
    position: [number, number];
    hexText?: string;
}

interface HexagonState {
    hover: boolean;
}

export class Hexagon extends Component<HexagonProps, HexagonState> {
    state: HexagonState = {
        hover: false,
    };

    _toggleHover = () => {
        this.setState({ hover: !this.state.hover });
    };

    render() {
        return (
            <HexagonContainer
                {...this.props}
                onMouseEnter={this._toggleHover}
                onMouseLeave={this._toggleHover}
                hover={this.state.hover}
            >
                <HexLabel size={this.props.size}>{this.props.hexText}</HexLabel>
                <SvgHexagon
                    width={this.props.size}
                    height={this.props.size}
                    fill={this.state.hover ? "#6190e610" : "#2b2b2b"}
                    stroke={this.state.hover ? "#6190e6" : "#626262"}
                    strokeWidth={this.state.hover ? 20 : 10}
                />
            </HexagonContainer>
        );
    }
}

interface HexagonContainerProps extends HexagonProps {
    hover: boolean;
}
const HexagonContainer = styled.div`
    position: absolute;
    width: ${(props: HexagonContainerProps) => props.size}px;
    height: ${(props: HexagonContainerProps) => props.size}px;
    transform: translate(
        ${(props: HexagonContainerProps) =>
            `${props.position[0]}px,${props.position[1]}px`}
    );
    z-index: ${(props: HexagonContainerProps) => (props.hover ? `0` : `1`)};

    > div {
        // font-weight: ${(props: HexagonContainerProps) =>
            props.hover ? `600` : `normal`}
        color: ${(props: HexagonContainerProps) =>
            props.hover ? `#b5b5b5` : ``}
    }

`;

interface HexLabelProps {
    size: number;
}
const HexLabel = styled.div`
    position: relative;
    top: ${(props: HexLabelProps) => props.size * 0.25}px;
    text-align: center;
    color: #626262;
    font-family: roboto-mono, sans-serif;
    font-size: 12px;
    letter-spacing: -0.05em;
`;
