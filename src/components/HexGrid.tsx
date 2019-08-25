import React, { FunctionComponent, Component } from "react";
import styled from "styled-components";
import SvgHexagon from "./svg/Hexagon";
import data from "../data/sector.json";
import colors from "../css/colors.scss";
import dimensions from "../css/dimensions.scss"
import { SectorData, SystemData } from "./StarMapController";

const _ = require("lodash");

const HEX_SIZE = 100;
const COLUMN_OFFSET = 1.48;
const ROW_OFFSET = 0.4275;
const ODD_OFFSET = 0.74;

/**
 * HexGrid Component
 */
interface HexGridProps {
    size: {
        width: number;
        height: number;
    };
    data: SectorData;
}

export const HexGrid: FunctionComponent<HexGridProps> = (
    props: HexGridProps,
) => {
    const gridLayout: JSX.Element[] = _buildLayout(props.size.width, props.size.height);

    return <>{gridLayout}</>;
};

const _buildLayout = (gridWidth: number, gridHeight: number) => {
    const gridLayout: JSX.Element[] = [];
    const rows = gridHeight * 2;
    const columns = gridWidth / 2;
    // Calculate Rows
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            const xGridCoord = _.padStart(
                rowIndex % 2 ? colIndex * 2 + 2 : colIndex * 2 + 1,
                2,
                "0",
            );
            const yGridCoord = _.padStart(Math.floor(rowIndex / 2) + 1, 2, "0");
            const gridCoordString = `${xGridCoord}${yGridCoord}`;
            const hexData = data.systems.filter(node => {
                return node.location === gridCoordString;
            })[0];
            // Odd Rows are offset by 75%
            const rowOffset = rowIndex % 2 ? ODD_OFFSET * HEX_SIZE : 0;
            gridLayout.push(
                <Hexagon
                    key={`hex-${xGridCoord}-${yGridCoord}`}
                    data-hex-text={`hex-${xGridCoord}-${yGridCoord}`}
                    hexText={`${xGridCoord}${yGridCoord}`}
                    size={HEX_SIZE}
                    position={[
                        colIndex * HEX_SIZE * COLUMN_OFFSET + rowOffset,
                        rowIndex * HEX_SIZE * ROW_OFFSET,
                    ]}
                    data={hexData}
                />,
            );
        }
    }
    return gridLayout;
};

/**
 * Hexagon Component
 */
interface HexagonProps {
    size: number;
    position: [number, number];
    hexText?: string;
    data?: SystemData;
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
                <HexCoord size={this.props.size}>{this.props.hexText}</HexCoord>
                {this.props.data && (
                    <>
                        <HexName size={this.props.size}>
                            {this.props.data.name}
                        </HexName>
                        <HexFooter size={this.props.size}>
                            {_.padStart(
                                "",
                                this.props.data.planets.length,
                                "⬤",
                            )}
                        </HexFooter>
                    </>
                )}
                <SvgHexagon
                    width={this.props.size}
                    height={this.props.size}
                    fill={
                        this.state.hover ? colors.hexFillHover : colors.hexFill
                    }
                    stroke={
                        this.state.hover
                            ? colors.hexStrokeHover
                            : colors.hexStroke
                    }
                    strokeWidth={this.state.hover ? dimensions.hexStrokeWidthHover : dimensions.hexStrokeWidth}
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
    z-index: ${(props: HexagonContainerProps) => (props.hover ? `10` : `0`)};

    > div {
        // font-weight: ${(props: HexagonContainerProps) =>
            props.hover ? `600` : `normal`}
        color: ${(props: HexagonContainerProps) =>
            props.hover ? `#b5b5b5` : ``}
    }
`;

const CentreHex = styled.div`
    text-align: center;
    position: absolute;
    width: 50px;
    left: calc(50% - 50px / 2);
    color: ${colors.fontColor};
`;

interface HexLabelProps {
    size: number;
}
const HexCoord = styled(CentreHex)`
    top: ${(props: HexLabelProps) => props.size * 0.1}px;
    font-family: roboto-mono, sans-serif;
    font-size: 12px;
    letter-spacing: -0.05em;
`;

const HexName = styled(CentreHex)`
    top: ${(props: HexLabelProps) => props.size * 0.4}px;
    font-family: roboto-condensed, sans-serif;
    font-size: 14px;
`;

const HexFooter = styled(CentreHex)`
    top: ${(props: HexLabelProps) => props.size * 0.75}px;
    font-family: roboto-mono, sans-serif;
    font-size: 8px;
`;
