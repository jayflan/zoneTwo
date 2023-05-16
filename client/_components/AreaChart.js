import React from "react";
import * as d3 from "d3";
import { useD3 } from "../_hooks/useD3";
import { useSelector } from "react-redux";
// import { displayFeetOrMeters, displayMilesOrKilos, displayFahrenheit } from "../_functions/logicFrontend";


const AreaChart = () => {

  const userInfo = useSelector((state) => state.auth) || [];
  const userUnitDist =  userInfo.distUnit || []; // miles or kilometers
  const singleWorkout = useSelector((state) => state.singleWorkout) || [];
  const gpxData = singleWorkout.data || [];

  const height = 250;
  const width = 900;


  //create new gpxData based on user units of measurement (empirical or metric)
  const updateGpxData = (originalGpxData) => { 
    const deepCopyGpxData = JSON.parse(JSON.stringify(originalGpxData)); //deep copy of originalGpxData

    return deepCopyGpxData.map((currElem) => {
      if (userUnitDist === "miles") {
      if(currElem.distanceAccum !== 0) {
        currElem.distanceAccum = currElem.distanceAccum / 1.60934; // convert to miles
      };
      if(currElem.distance !== 0) {
        currElem.distance = currElem.distance / 1.60934;  // convert to miles
      };
      if(currElem.speed !== 0) {
        currElem.speed = currElem.speed * 2.23694; // convert to mph
      };
      if(currElem.ele !== 0) {
        currElem.ele = currElem.ele * 3.28084; // convert to feet
      };
      if(currElem.temp !== 0) {
        currElem.temp = currElem.temp * 1.8 + 32;  // convert to fahrenheit
      };
    };
    return currElem
    });  
  };

  const newGpxData = updateGpxData(gpxData);

  const ref = useD3(
    (svg) => {

      const margin = { top: 20, right: 30, bottom: 30, left: 40 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      
      const xScale = d3
      .scaleLinear()
      .domain([0, d3.max(newGpxData, (d) => d.distanceAccum)])
      .range([margin.left, width - margin.right])
      ;
      
      const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(newGpxData, (d) => parseFloat(d.ele) + 100)])
      .range([height - margin.bottom, margin.top])
      ;

      // create graph/area data
      const area = d3.area()
      .x(function(d) { return xScale(d.distanceAccum) })
      .y1(function(d) { return yScale(parseFloat(d.ele)) })
      .y0(height - margin.bottom)
      .curve(d3.curveCatmullRom.alpha(0))
      ;

      //display graph/area data
      svg.append('path')
      .attr('d', area(newGpxData))
      .attr('class', 'area')
      .attr('fill', '#A6E8F2')
      // .attr('stroke', '#147F90') // turned off
      // .attr('stroke-width', '2px') // turned off
      .attr('fill', '#A6E8F2')
      ;
      

      // create mouse interaction
      const mouseMove = (event) => {
        event.preventDefault();
        const mouse = d3.pointer(event);
        const [
          xCoord,
          yCoord,
        ] = mouse;

        const mouseDistance =  xScale.invert(xCoord);
        if (xScale(mouseDistance) < margin.left ||
        xScale(mouseDistance) > width - margin.right) {
          return;
        };

        const mouseYAxis = yScale.invert(yCoord);
        if(yScale(mouseYAxis) < margin.top ||
        yScale(mouseYAxis) > height - margin.bottom) {
          return;
        };

        const bisectData = d3.bisector(function(d) { return d.distanceAccum; }).center;
        const xIndex = bisectData(newGpxData, mouseDistance, 1);
        
        svg.selectAll('.hoverLine')
        .attr('x1', xScale(mouseDistance))
        .attr('y1', margin.top)
        .attr('x2', xScale(mouseDistance))
        .attr('y2', height - margin.bottom)
        .attr('stroke', '#147F90')
        .attr('fill', '#A6E8F2')
        ;
        
        svg.selectAll('.hoverPoint')
        .attr('cx', xScale(mouseDistance))
        .attr('cy', yScale(newGpxData[xIndex].ele))
        .attr('r', 3)
        .attr('fill', '#147F90')
        .attr('stroke', '#147F90')
        ;

        const isLessThanHalf = xIndex > newGpxData.length / 2;
        const hoverTextX = isLessThanHalf ? '-0.75em' : '0.75em';
        const hoverTextAnchor = isLessThanHalf ? 'end' : 'start';

        svg.selectAll('.hoverText')
        .attr('x', xScale(mouseDistance))
        .attr('y', yScale(mouseYAxis))
        .attr('dx', hoverTextX)
        .attr('dy', '-1em')
        .attr('fill', '#147F90')
        .style('text-anchor', hoverTextAnchor)
        .text(`Dist: ${mouseDistance.toFixed(2)}`)
        ;

      };
      
      // display x and y axis
      const xAxis = d3.axisBottom()
      .tickFormat(d => `${d} ${userUnitDist === "miles" ? "mi" : "km"}`)
      .scale(xScale);
      const xAxisTranslate = height - margin.bottom;
      // position xAxis on chart
      svg.append('g')
      .attr('transform', `translate(0, ${xAxisTranslate})`)
      .call(xAxis)
      ;
      
      const yAxis = d3.axisLeft()
      .tickFormat(d => `${d} ${userUnitDist === "miles" ? "ft" : "m"}`)
      .scale(yScale);
      // position yAxis on chart
      svg.append('g')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)
      ;
      
      
      // create x and y gridlines
      const xAxisGrid = d3.axisBottom(xScale)
      .tickSize(innerHeight)
      .tickFormat("")
      ;
      svg.selectAll('.x-grid')
      .attr('transform', `translate(0, ${margin.top})`)
      .call(xAxisGrid)
      .lower()
      ;
      
      const yAxisGrid = d3.axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickFormat("")
      ;
      svg.selectAll('.y-grid')
        .attr('transform', `translate(${margin.left}, 0)`)
        .call(yAxisGrid)
        .lower()
      ;
      
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
      svg.on('mouseout', () => {
        // d3.select(this).remove(); //? not needed ?
        svg.selectAll('.hoverLine')
        .attr('stroke', 'transparent')
        .attr('fill', 'transparent')
        ;
        svg.selectAll('.hoverText')
        .attr('fill', 'transparent')
        ;
        svg.selectAll('.hoverPoint')
        .attr('stroke', 'transparent')
        .attr('fill', 'transparent')
        ;
      
      });
      
    },
    [newGpxData.length]
  ); //end of ref
      
  return (
    <svg id="chart"
      ref={ref}
      style={{
        height: 250,
        width: 900,
        // width: "100%",
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