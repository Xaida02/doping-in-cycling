const url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";
const w = 500;
const h = 400;
const padding = 50;





fetch(url)
        .then(response => response.json())
        .then(dopingInfo => {
            console.log(dopingInfo)


         

            let xScale = d3.scaleLinear()
                            .domain([d3.min(dopingInfo, el => el.Year - 1), d3.max(dopingInfo, el => el.Year + 1)])
                            .range([padding, w - padding]);
            let yScale = d3.scaleTime()
                            .domain([d3.min(dopingInfo, el => new Date(el.Seconds * 1000)),d3.max(dopingInfo, el => new Date(el.Seconds * 1000)),])
                            .range([padding, h - padding])
                            

            // draw Canvas

            let svg = d3.select("svg")
                        .attr("width", w)
                        .attr("height", h)

            let tooltip = d3.select("#tooltip").data(dopingInfo)
            // generate scales

            // draw points
            svg.selectAll("circle")
                  .data(dopingInfo)
                  .enter()
                  .append("circle")
                  .attr("class", "dot")
                  .attr("r", "4")
                  .attr("data-xvalue", (d) => d.Year)
                  .attr("data-yvalue", (d) => new Date(d.Seconds * 1000))
                  .attr("cx", d => xScale(d.Year))
                  .attr("cy", d => yScale(d.Seconds * 1000))
                  .attr("fill", el => el.Doping ? "orange" : "blue")
                  .on("mouseover", (event, item) => {


                    tooltip.style("visibility", "visible")
                           .attr("data-year", item.Year)

                    if(item.Doping) {
                            let str =  `Time: ${item.Time};
                            Name: ${item.Name}.;
                            Doping: ${item.Doping}.`
                           console.log(item)
                            tooltip.text(str) 
                        }
                        else {
                            let str = `Time: ${item.Time};
                            Name: ${item.Name}.`
                            console.log(item)
                            tooltip.text(str)
     
                        }

                  })
                  .on("mouseout", (event) => {
                    tooltip.style("visibility", "hidden")
                  })
                  .on("click", (event, item) => {
                     if(item.URL) {
                        window.open(item.URL, '_blank')
                     }
                  })

            // generate axis

            let xAxis = d3.axisBottom(xScale)
                          .tickFormat(d3.format("d")) 

            svg.append("g")
               .call(xAxis)
               .attr("id", "x-axis")
               .attr("transform", `translate(0, ${h - padding})`)


        
            let yAxis = d3.axisLeft(yScale)   
                          .tickFormat(d3.timeFormat("%M:%S"))

            svg.append("g")
               .call(yAxis)
               .attr("id", "y-axis")
               .attr("transform", `translate(${padding}, 0)`)












        })