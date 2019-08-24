import * as React from "react";

const SvgHexagon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg height={628} width={726} viewBox={"0 0 726 628"} {...props}>
        <defs>
            <clipPath id="clipPath">
                <path d="M723 314L543 625.77H183L3 314 183 2.23h360L723 314z" />
            </clipPath>
        </defs>
        <path
            fill={props.fill || "#fff"}
            stroke={props.stroke || "#000"}
            strokeWidth={props.strokeWidth || 4}
            d="M723 314L543 625.77H183L3 314 183 2.23h360L723 314z"
            clip-path={"url(#clipPath)"}
        />
    </svg>
);

export default SvgHexagon;
