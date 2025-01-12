import type { SVGProps } from "react";

const BookMark = ({
    width = 20,
    height = 21,
    stroke = "#818491",
    fill = "none",
    ...props
}: SVGProps<SVGSVGElement>) => (
    <svg
        width={width}
        height={height}
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g id="vuesax/linear/frame">
            <g id="vuesax/linear/frame_2">
                <g id="frame">
                    <path
                        id="Vector"
                        d="M14.0166 1.66699H5.98327C4.20827 1.66699 2.7666 3.11699 2.7666 4.88366V16.6253C2.7666 18.1253 3.8416 18.7587 5.15827 18.0337L9.22493 15.7753C9.65827 15.5337 10.3583 15.5337 10.7833 15.7753L14.8499 18.0337C16.1666 18.767 17.2416 18.1337 17.2416 16.6253V4.88366C17.2333 3.11699 15.7916 1.66699 14.0166 1.66699Z"
                        stroke={stroke}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        id="Vector_2"
                        d="M14.0166 1.66699H5.98327C4.20827 1.66699 2.7666 3.11699 2.7666 4.88366V16.6253C2.7666 18.1253 3.8416 18.7587 5.15827 18.0337L9.22493 15.7753C9.65827 15.5337 10.3583 15.5337 10.7833 15.7753L14.8499 18.0337C16.1666 18.767 17.2416 18.1337 17.2416 16.6253V4.88366C17.2333 3.11699 15.7916 1.66699 14.0166 1.66699Z"
                        fill={fill}
                        stroke={fill}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        id="Vector_3"
                        d="M7.70801 7.54199C9.19134 8.08366 10.808 8.08366 12.2913 7.54199"
                        stroke={stroke}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </g>
        </g>
    </svg>
);

export default BookMark;
