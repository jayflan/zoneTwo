import React from "react";
import * as d3 from "d3";

export const useD3 = (renderChartFn, dependencies) => { 
  // renderChartFn is callback that contains D3.js code to execute
  // dependencies will be a fixed-length array that tells React when to run the renderChartFn
    // this setup helps prevent unnecessary re-rendering
  const ref = React.useRef();

  React.useEffect(() => {
    renderChartFn(d3.select(ref.current));
    return () => {}; 
  }, dependencies);
  return ref;
}