import React, { FunctionComponent, Component } from "react";
import styled from "styled-components";
import SvgHexagon from './svg/Hexagon';
import { render } from "react-dom";

interface HexGridProps {
    size: {
        width: number;
        height: number;
    };
}

const HEX_SIZE = 100;
const COLUMN_OFFSET = 1.50;
const ROW_OFFSET = 0.435;
const ODD_OFFSET = 0.75;

export const HexGrid: FunctionComponent<HexGridProps> = (props: HexGridProps) => {
    const gridLayout: JSX.Element[] = [];
    const rows = props.size.height * 2;
    const columns = props.size.width / 2;
    // Calculate Rows
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            // Odd Rows are offset by 75%
            const rowOffset =  rowIndex % 2 ? ODD_OFFSET * HEX_SIZE : 0;
            gridLayout.push(
                <Hexagon
                    key={`hex-${rowIndex}-${colIndex}`}
                    size={HEX_SIZE}
                    position={[colIndex * HEX_SIZE * COLUMN_OFFSET + rowOffset, rowIndex * HEX_SIZE * ROW_OFFSET]}
                />,
            );
        }
    }

    return (<>{gridLayout}</>);
};


interface HexagonProps {
    size: number;
    position: [number, number];
}

interface HexagonState {
    hover: boolean;
}

export class Hexagon extends Component<HexagonProps, HexagonState> {

    state: HexagonState = {
        hover: false
    }

    _toggleHover = () => {
        this.setState({hover: !this.state.hover})
    }

    render() {
        return (
            <HexagonContainer
                {...this.props}
                onMouseEnter={this._toggleHover}
                onMouseLeave={this._toggleHover}
                hover={this.state.hover}
            >
                <SvgHexagon
                    width={this.props.size}
                    height={this.props.size}
                    fill={"#2b2b2b"}
                    stroke={this.state.hover ? "#6190e6" : "#fff"}
                    strokeWidth={this.state.hover ? 50 : 5}
                />
            </HexagonContainer>
        )
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
        ${(props: HexagonContainerProps) => `${props.position[0]}px,${props.position[1]}px`}
    );
    z-index: ${(props: HexagonContainerProps) => props.hover ? `0` : `1`};
`