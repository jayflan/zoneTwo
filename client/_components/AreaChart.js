import React from "react";
import * as d3 from "d3";
import { event as currentEvent } from "d3";
import { useD3 } from "../_hooks/useD3";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const AreaChart = () => {
  
  //temp data for testing new graph
  const data = [
    {distance: 0, speed: 0},
    {distance: 1, speed: 6},
    {distance: 2, speed: 6.5},
    {distance: 3, speed: 6},
    {distance: 4, speed: 7},
    {distance: 5, speed: 8},
    {distance: 6, speed: 9},
    {distance: 7, speed: 6},
    {distance: 8, speed: 6},
    {distance: 9, speed: 5.5},
    {distance: 10, speed: 4},
    {distance: 11, speed: 3},
    {distance: 12, speed: 2},
    {distance: 13, speed: 1},
    {distance: 14, speed: 0.5},
    {distance: 15, speed: 0},

  ]

  const ref = useD3(
    (svg) => {
      const height = 250;
      const width = 700;
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };


      // Functions (Axis & mousemovement)

      // function xScale() {
      //   const xExtent = d3.extent(data, (d) => d.distance);
      //   const xScale = d3.scaleTime()
      //     .domain(xExtent)
      //     .range([margin.left, width - margin.right]);
      //   console.log(xExtent)
      //   return xScale;
      // }

      const xScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.distance)])  //Todo enter gpx data specifics here ex. d.miles!!!!!
        .rangeRound([margin.left, width - margin.right])
      
      // const yScale = () => {
      //   const yMax = d3.max(data, (d) => d.speed);
      //   const yMin = 0;
      //   const yScale = d3.scaleLinear()
      //     .domain([yMin, yMax])
      //     .range([height - margin.bottom, margin.top]);
        
      //   return yScale;
      // }

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.speed)]) //Todo enter gpx data specifics here ex. d.miles!!!!!
        .rangeRound([height - margin.bottom, margin.top])
      ;

        // if(typeof window !== "undefined") { window.d3 = d3}

      const mouseMove = (event) => {
        event.preventDefault();
        const mouse = d3.pointer(event);
        const [
          xCoord,
          yCoord,
        ] = mouse;
        
        const mouseDistance =  xScale.invert(xCoord);
        // const mouseDateSnap = d3.timeYear.floor(mouseDate);
        
        if (xScale(mouseDistance) < margin.left ||
        xScale(mouseDistance) > width - margin.right) {
          return;
        }

        const bisectDate = d3.bisector(d => d.distance).right;
        const xIndex = bisectDate(data, mouseDistance, 1);
        // const xIndex = bisectDate(data, mouseDateSnap, 1);
          const mouseSpeed = data[xIndex].speed;
      
        svg.selectAll('.hoverLine')
          .attr('x1', xScale(mouseDistance))
          // .attr('x1', xScale(mouseDateSnap))
          .attr('y1', margin.top)
          .attr('x2', xScale(mouseDistance))
          // .attr('x2', xScale(mouseDateSnap))
          .attr('y2', height - margin.bottom)
          .attr('stroke', '#147F90')
          .attr('fill', '#A6E8F2')
        ;
      
        svg.selectAll('.hoverPoint')
          .attr('cx', xScale(mouseDistance))
          // .attr('cx', xScale(mouseDateSnap))
          .attr('cy', yScale(mouseSpeed))
          .attr('r', '7')
          .attr('fill', '#147F90')
        ;

        const isLessThanHalf = xIndex > data.length / 2;
        const hoverTextX = isLessThanHalf ? '-0.75em' : '0.75em';
        const hoverTextAnchor = isLessThanHalf ? 'end' : 'start';
      
        svg.selectAll('.hoverText')
          .attr('x', xScale(mouseDistance))
          // .attr('x', xScale(mouseDateSnap))
          .attr('y', yScale(mouseSpeed))
          .attr('dx', hoverTextX)
          .attr('dy', '-1.25em')
          .style('text-anchor', hoverTextAnchor)
          .text(d3.format('.5s')(mouseSpeed));
      };
      
      const area = d3.area()
        .x(function(d) { return xScale(d.distance) })
        .y1(function(d) { return yScale(d.speed) })
        .y0(220)
        // .curve(d3.curveCatmullRom.alpha(0))
      ;

      svg.append('path')
        .attr('d', area(data))
        .attr('stroke', '#147F90')
        .attr('stroke-width', '2px')
        .attr('fill', '#A6E8F2')
      ;

      // Axis

      const xAxis = d3.axisBottom()
        .scale(xScale);
      const xAxisTranslate = height - margin.bottom;

      svg.append('g')
        .attr('transform', `translate(0, ${xAxisTranslate})`)
        .call(xAxis)
      ;

      const yAxis = d3.axisLeft()
        .tickFormat(d3.format('~s'))
        .scale(yScale);

      svg.append('g')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxis)
      ;
      
      // Interactivity
  
      svg.append('line').classed('hoverLine', true)
      svg.append('circle').classed('hoverPoint', true);
      svg.append("text").classed('hoverText', true);

      svg.append('rect')
        .attr('fill', 'transparent')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
      ;

      svg.on('mousemove', mouseMove);
      
    },
    [data.length]
  ); //end of ref
      
  

  return (
    <svg id="chart"
      ref={ref}
      style={{
        height: 250,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
        viewBox: "0 0 250 500",
        preserveAspectRatio: "xMinYMid"
      }}
    >
      {/* <g className="plot-area"/>
      <g className="mouse-area"/>
      <g className="x-axis"/>
      <g className="y-axis"/> */}
    </svg>
  );
} 

export default AreaChart;