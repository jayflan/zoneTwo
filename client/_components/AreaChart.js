import React from "react";
import * as d3 from "d3";
import { useD3 } from "../_hooks/useD3";

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

      const x = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.distance)])  //Todo enter gpx data specifics here ex. d.miles!!!!!
        .rangeRound([margin.left, width - margin.right])

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.speed)]) //Todo enter gpx data specifics here ex. d.miles!!!!!
        .rangeRound([height - margin.bottom, margin.top])

      const xAxis = (g) => 
        g.attr("transform", `translate(0, ${height - margin.bottom})`).call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            .tickSizeOuter(0)
        );

      const y1Axis = (g) => 
        g
          .attr("transform", `translate(${margin.left}, 0)`)
          .style("color", "steelblue")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) => 
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );      
      
      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      const curveFn = d3.area() // make area graph display
        .x(function(d) { return x(d.distance) })
        .y1(function(d) { return y1(d.speed) })
        .y0(220)
        .curve(d3.curveCatmullRom.alpha(0))

      svg
      .select(".plot-area")
      // .datum(data)
      .append("path")
      .attr("stroke", "black")
      .attr("d", curveFn(data))
      .attr("fill", "steelblue")
        // .selectAll(".area")
        // .attr("class", "area")
        // .data(data)
        // .join("rect")
        // .attr("x", (d) => x(d.distance))  //Todo enter gpx data specifics here ex. d.miles!!!!!
        // .attr("width", x.bandwidth())
        // .attr("y", (d) => y1(d.speed)) //Todo enter gpx data specifics here ex. d.miles!!!!!
        // .attr("height", (d) => y1(0) - y1(d.speed))  //Todo enter gpx data specifics here ex. d.miles!!!!!
    },
    [data.length]
  );

  const chart = window.document.getElementById("chart") // make responsive SVG
      // aspect = chart.width() / chart.height(),
      // container = chart.parent();

      // console.log(chart);

      // $(window).on("resize", function() {
      //   let targetWidth = container.width();
      //   chart.attr("width", targetWidth);
      //   chart.attr("height", Math.round(targetWidth / aspect));
      // }).trigger("resize");

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
      <g className="x-axis"/>
      <g className="y-axis"/>
    </svg>
  );
} 

export default AreaChart;