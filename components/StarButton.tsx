import React from "react";

interface ButtonProps {
  title: string;
  onClick?: () => void;
}

// const StarButton: React.FC = ({ title }: ButtonProps) => {
const StarButton = ({ title, onClick }: ButtonProps) => {
  return (
    <>
      <style jsx>{`
        /* Custom classes for filter drop-shadow and transitions */
        .drop-shadow-blue {
          filter: drop-shadow(0 0 0 rgb(59 130 246));
          transition: filter 1s cubic-bezier(0.05, 0.83, 0.43, 0.96),
            top 1s cubic-bezier(0.05, 0.83, 0.43, 0.96),
            left 1s cubic-bezier(0.05, 0.83, 0.43, 0.96), z-index 1s;
          z-index: -5;
          position: absolute;
          height: auto;
        }
        .drop-shadow-blue.star-2,
        .drop-shadow-blue.star-3,
        .drop-shadow-blue.star-4,
        .drop-shadow-blue.star-5 {
          transition-timing-function: cubic-bezier(0, 0.4, 0, 1.01);
        }
        .drop-shadow-blue.star-5 {
          transition-duration: 0.6s;
        }
        .drop-shadow-blue.star-4,
        .drop-shadow-blue.star-6 {
          transition-duration: 0.8s;
        }
        /* Hover states */
        button:hover .star-1 {
          top: -80% !important;
          left: -30% !important;
          filter: drop-shadow(0 0 10px rgb(59 130 246)) !important;
          z-index: 2 !important;
        }
        button:hover .star-2 {
          top: -25% !important;
          left: 10% !important;
          filter: drop-shadow(0 0 10px rgb(59 130 246)) !important;
          z-index: 2 !important;
        }
        button:hover .star-3 {
          top: 55% !important;
          left: 25% !important;
          filter: drop-shadow(0 0 10px rgb(59 130 246)) !important;
          z-index: 2 !important;
        }
        button:hover .star-4 {
          top: 30% !important;
          left: 80% !important;
          filter: drop-shadow(0 0 10px rgb(59 130 246)) !important;
          z-index: 2 !important;
        }
        button:hover .star-5 {
          top: 25% !important;
          left: 115% !important;
          filter: drop-shadow(0 0 10px rgb(59 130 246)) !important;
          z-index: 2 !important;
        }
        button:hover .star-6 {
          top: 5% !important;
          left: 60% !important;
          filter: drop-shadow(0 0 10px rgb(59 130 246)) !important;
          z-index: 2 !important;
        }
        /* Fill color for SVG path */
        .fil0 {
          fill: rgb(59 130 246);
        }
      `}</style>

      <button
        type="button"
        className="relative px-4 py-2 bg-blue-500 text-white font-medium text-[15px] rounded-full border-2 border-transparent shadow-none transition-all duration-300 ease-in-out cursor-pointer hover:bg-transparent hover:text-blue-500 hover:border-blue-500 hover:shadow-[0_0_25px_#1B56FD]"
        onClick={onClick}
        aria-label="Star"
      >
        {title ? title : "Button"}
        <div
          className="star-1 drop-shadow-blue"
          style={{ top: "20%", left: "20%", width: "25px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              //   imageRendering: 'optimizeQuality',
              imageRendering: "auto",
              fillRule: "evenodd",
              clipRule: "evenodd",
              height: "auto",
              width: "100%",
            }}
            viewBox="0 0 784.11 815.53"
          >
            <g id="Layer_x0020_1">
              <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
              />
            </g>
          </svg>
        </div>
        <div
          className="star-2 drop-shadow-blue star-2"
          style={{ top: "45%", left: "45%", width: "15px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              //   imageRendering: 'optimizeQuality',
              imageRendering: "auto",
              fillRule: "evenodd",
              clipRule: "evenodd",
              height: "auto",
              width: "100%",
            }}
            viewBox="0 0 784.11 815.53"
          >
            <g id="Layer_x0020_1">
              <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
              />
            </g>
          </svg>
        </div>
        <div
          className="star-3 drop-shadow-blue star-3"
          style={{ top: "40%", left: "40%", width: "5px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              //   imageRendering: 'optimizeQuality',
              imageRendering: "auto",
              fillRule: "evenodd",
              clipRule: "evenodd",
              height: "auto",
              width: "100%",
            }}
            viewBox="0 0 784.11 815.53"
          >
            <g id="Layer_x0020_1">
              <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
              />
            </g>
          </svg>
        </div>
        <div
          className="star-4 drop-shadow-blue star-4"
          style={{ top: "20%", left: "40%", width: "8px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              //   imageRendering: 'optimizeQuality',
              imageRendering: "auto",
              fillRule: "evenodd",
              clipRule: "evenodd",
              height: "auto",
              width: "100%",
            }}
            viewBox="0 0 784.11 815.53"
          >
            <g id="Layer_x0020_1">
              <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
              />
            </g>
          </svg>
        </div>
        <div
          className="star-5 drop-shadow-blue star-5"
          style={{ top: "25%", left: "45%", width: "15px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              //   imageRendering: 'optimizeQuality',
              imageRendering: "auto",
              fillRule: "evenodd",
              clipRule: "evenodd",
              height: "auto",
              width: "100%",
            }}
            viewBox="0 0 784.11 815.53"
          >
            <g id="Layer_x0020_1">
              <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
              />
            </g>
          </svg>
        </div>
        <div
          className="star-6 drop-shadow-blue star-6"
          style={{ top: "5%", left: "50%", width: "5px" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            version="1.1"
            style={{
              shapeRendering: "geometricPrecision",
              textRendering: "geometricPrecision",
              //   imageRendering: 'optimizeQuality',
              imageRendering: "auto",
              fillRule: "evenodd",
              clipRule: "evenodd",
              height: "auto",
              width: "100%",
            }}
            viewBox="0 0 784.11 815.53"
          >
            <g id="Layer_x0020_1">
              <path
                className="fil0"
                d="M392.05 0c-20.9,210.08 -184.06,378.41 -392.05,407.78 207.96,29.37 371.12,197.68 392.05,407.74 20.93,-210.06 184.09,-378.37 392.05,-407.74 -207.98,-29.38 -371.16,-197.69 -392.06,-407.78z"
              />
            </g>
          </svg>
        </div>
      </button>
    </>
  );
};

export default StarButton;
