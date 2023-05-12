import React from "react";
import * as d3 from "d3";
import { useD3 } from "../_hooks/useD3";
import { useSelector } from "react-redux";
import { displayFeetOrMeters, displayMilesOrKilos, displayFahrenheit } from "../_functions/logicFrontend";


const AreaChart = () => {

  const userInfo = useSelector((state) => state.auth) || [];
  const singleWorkout = useSelector((state) => state.singleWorkout) || [];
  const gpxData = singleWorkout.data || [];

  const height = 250;
  const width = 900;

  

  const ref = useD3(
    (svg) => {
      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      // Functions (Axis & mousemovement)

      const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(gpxData, (d) => d.distanceAccum)])
      .rangeRound([margin.left, width - margin.right])
      ;
      
      const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(gpxData, (d) => parseFloat(d.ele) + 10)])
      .rangeRound([height - margin.bottom, margin.top])
      ;
      
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
        
        const bisectDate = d3.bisector(d => parseFloat(d.ele).right);
        const xIndex = bisectDate(gpxData, mouseDistance, 1);
        const mouseSpeed = gpxData[xIndex].speed;
        
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
        
        const isLessThanHalf = xIndex > gpxData.length / 2;
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
      // create graph/area data
      const area = d3.area()
      .x(function(d) { return xScale(d.distanceAccum) })
      .y1(function(d) { return yScale(parseFloat(d.ele)) })
      .y0(220)
      .curve(d3.curveCatmullRom.alpha(0))
      ;
      //position graph/area data
      svg.append('path')
      .attr('d', area(gpxData))
      .attr('stroke', '#147F90')
      .attr('stroke-width', '2px')
      .attr('fill', '#A6E8F2')
      ;
      
      // Axis
      
      const xAxis = d3.axisBottom()
      .tickFormat(d3.format('~s'))  
      .scale(xScale);
      const xAxisTranslate = height - margin.bottom;
      // position xAxis on chart
      svg.append('g')
      .attr('transform', `translate(0, ${xAxisTranslate})`)
      .call(xAxis)
      ;
      
      const yAxis = d3.axisLeft()
      .tickFormat(d => `${d} m`)
      // .tickFormat(d3.format('~s'))
      .scale(yScale);
      // position yAxis on chart
      svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      ;
      
      
      // yAxis grid setup
      const yAxisGrid = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat("")
      ;
      // create horizontal gridlines
      svg.selectAll('.y-grid')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxisGrid)
        .lower()
      ;

      // xAxis grid setup
      const xAxisGrid = d3.axisBottom(xScale)
        .tickSize(innerHeight)
        .tickFormat("")
      ;
      // create vertical gridlines
      svg.selectAll('.x-grid')
        .attr('transform', `translate(0, ${margin.top})`)
        .call(xAxisGrid)
        .lower()
      ;

      
      // Interactivity
  
      // svg.append('line').classed('hoverLine', true)
      // svg.append('circle').classed('hoverPoint', true);
      // svg.append("text").classed('hoverText', true);

      // svg.append('rect')
      //   .attr('fill', 'transparent')
      //   .attr('x', 0)
      //   .attr('y', 0)
      //   .attr('width', width)
      //   .attr('height', height)
      // ;

      // svg.on('mousemove', mouseMove);
      
    },
    [gpxData.length]
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
      <g className="plot-area"/>
      <g className="mouse-area"/>
      <g className="x-axis"/>
      <g className="y-axis"/>
      <g className="x-grid"/>
      <g className="y-grid"/>
    </svg>
  );
} 

// write a d3.js function to create an area chart
// https://observablehq.com/@d3/area-chart

export default AreaChart;