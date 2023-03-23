import React from "react";
import * as d3 from "d3";
import { useD3 } from "../_hooks/useD3";
// import { svg } from "d3";

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

        //* apply data to get x-axis scale for display
      const x = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.distance)])  //Todo enter gpx data specifics here ex. d.miles!!!!!
        .rangeRound([margin.left, width - margin.right])

        //* apply data to get y-axis scale for display
      const y1 = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.speed)]) //Todo enter gpx data specifics here ex. d.miles!!!!!
      .rangeRound([height - margin.bottom, margin.top])

        //* apply data to get x axis scale for mouseover
      const xMouse = d3
      .scaleBand()
      .domain(data.map((d) => d.distance))  //Todo enter gpx data specifics here ex. d.miles!!!!!
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);

      //* apply data to get y axis scale for mouseover
    const y1Mouse = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.speed)]) //Todo enter gpx data specifics here ex. d.miles!!!!!
      .rangeRound([height - margin.bottom, margin.top])



        //* x axis formatting for display
      const xAxis = (g) => 
        g.attr("transform", `translate(0, ${height - margin.bottom})`)
         .style("color", "gray")
         .call(
          d3
            .axisBottom(x)
            .tickValues(
              d3
                .ticks(...d3.extent(x.domain()), width / 40)
                .filter((v) => x(v) !== undefined)
            )
            // .tickSizeOuter(0)
            // .tickSize(-200)
        )
        .call(g => g.selectAll(".tick"))

        //* y axis formatting for display
      const y1Axis = (g) => 
        g.attr("transform", `translate(${margin.left}, 0)`)
        .style("color", "gray")
        .call(
          d3
            .axisLeft(y1)
            // .ticks(4)
            // .tickSizeOuter(0)
            // .tickSize(-width)
        )

        //* chart axis creation
      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);
      
        //* chart plot-area creation
      const curveFn = d3.area() // make area graph display
        .x(function(d) { return x(d.distance) })
        .y1(function(d) { return y1(d.speed) })
        .y0(220) // apply color to inside plotted area
        .curve(d3.curveCatmullRom.alpha(0))

      //* visible chart
      svg
      .select(".plot-area")
      .datum(data)
      .append("path")
      // .attr("stroke", "black") // plot outline
      .attr("d", curveFn(data))
      .attr("fill", "gainsboro")
      // .attr("fill", "steelblue")
        // .selectAll(".area")
        // .attr("class", "area")
        // .data(data)
        // .join("rect")
        // .attr("x", (d) => x(d.distance))  //Todo enter gpx data specifics here ex. d.miles!!!!!
        // .attr("width", x.bandwidth())
        // .attr("y", (d) => y1(d.speed)) //Todo enter gpx data specifics here ex. d.miles!!!!!
        // .attr("height", (d) => y1(0) - y1(d.speed))  //Todo enter gpx data specifics here ex. d.miles!!!!!
          
          //* invisible chart for mouseover (tooltip)
        svg
        .select(".mouse-area")
        // .select(".plot-area")
        .attr("class", "area")
        .selectAll(".area")
        .data(data)
        .join("rect")
        // .attr("fill", "steelblue")
        .attr("x", (d) => xMouse(d.distance))  //Todo enter gpx data specifics here ex. d.miles!!!!!
        .attr("width", xMouse.bandwidth())
        .attr("y", (d) => y1Mouse(d.speed)) //Todo enter gpx data specifics here ex. d.miles!!!!!
        .attr("height", (d) => y1Mouse(0) - y1Mouse(d.speed))  //Todo enter gpx data specifics here ex. d.miles!!!!! 
    
        //* chart interactions via mouse

        const divMouse = d3.select("body").append("div")
          .style("position", "absolute")
          .style("text-align", "center")
          .style("width", "200px")
          .style("height", "2.5em")
          .style("font", "0.6em sans-serif")
          .style("color", "black")
          .style("background", "white")
          .style("border", "solid 1px black")
          .style("opacity",0);

        function mouseover(d) {
          const elemParent = document.getElementsByClassName("area")[0];
          // const elemTarget = elemParent;
          console.log(elemParent)
          // console.log("Dist:", d.distance, "Spd:", d.speed);
          // console.log("Dist:", xMouse(d.distance), "Spd:", y1Mouse(d.speed));
          // console.log(elemParent)
          // divMouse.html()
          // elem.innerHTML = "Hello World"
          divMouse.html("Dist:" + d +
                   "<br/>" +
                   "Spd:" + d)
            //  .style("left", (d3.event.pageX) + "px")
            //  .style("top", (d3.event.pageY) + "px")
             .style("opacity", 1);
        }
        
        const mouseout = () => {
          divMouse.style("opacity", 1e-6);
        }

        d3.selectAll("rect")
        .on("mouseover", mouseover)
        .on("mouseout", mouseout)
        ;

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
      <g className="plot-area"/>
      <g className="mouse-area"/>
      <g className="x-axis"/>
      <g className="y-axis"/>
    </svg>
  );
} 

export default AreaChart;