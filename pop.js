const svg = d3.select("svg")

// data = data.map((d,i)=> {
//     d.difference = d["2035"] - d["1950"]
//     return d
// })

const popScale = d3.scaleLinear()
    .domain([1000000, 38000000])
    .range([220, 500])

const area = d3.area()
    .x0((d,i)=>{return popScale(d["2020"])})
    .x1((d,i)=>{return popScale(d["2035"])})
    .y0((d,i)=>{return 40 * i + 40})
    .y1((d,i)=>{return 40 * i + 40})


svg
    .attr("viewBox", `0 0 560 1200`)

    // .attr("height", 40 * data.length)
    // .attr("width", 560)

const areaPath = svg
    .append("path")
    .datum(data)
    .attr("d", area)
    .attr("class", "area")


const groups = svg
    .selectAll("g.city")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "city")
    .attr("transform", (d,i)=> {return `translate(0, ${i*40})`})

groups
    .append("text")
    .attr("class", "title")
    .attr("x", 20)
    .attr("y", 40)
    .text((d,i)=> {return d.City})

groups
    .append("circle")
    .attr("cx", (d, i) => { return popScale(d["1950"]) }) 
    .attr("cy", 40)
    .attr("r", 6)
    .attr("class", "fifty")

groups
    .append("circle")
    .attr("cx", (d, i) => { return popScale(d["2015"]) }) 
    .attr("cy", 40)
    .attr("r", 6)
    .attr("class", "fifteen")

groups
    .append("circle")
    .attr("cx", (d, i) => { return popScale(d["2020"]) }) 
    .attr("cy", 40)
    .attr("r", 6)
    .attr("class", "twenty")

groups
    .append("circle")
    .attr("cx", (d, i) => { return popScale(d["2035"]) }) 
    .attr("cy", 40)
    .attr("r", 6)
    .attr("class", "future")

// // labels
// groups 
//     .append("text")
//     .attr("x", (d,i)=> {return popScale(d["1950"])})
//     .attr("y", 30)
//     .text((d,i)=>{return d["1950"]})



groups
    .append("rect")
    .attr("y", 20)
    .attr("height", 36)
    .attr("width", 560)
    .attr("class", "hoverRect")





const redLine = d3.line()
    .x((d,i)=>{return popScale(d["1950"])})
    .y((d,i)=>{return 40 * i + 40})

const redPath = svg
    .append("path")
    .datum(data)
    .attr("d",redLine)
    .attr("class", "red")

const blueLine = d3.line()
    .x((d,i)=>{return popScale(d["2015"])})
    .y((d,i)=>{return 40 * i + 40})

const bluePath = svg
    .append("path")
    .datum(data)
    .attr("d",blueLine)
    .attr("class", "blue")

const greenLine = d3.line()
    .x((d,i)=>{return popScale(d["2020"])})
    .y((d,i)=>{return 40 * i + 40})

const greenPath = svg
    .append("path")
    .datum(data)
    .attr("d",greenLine)
    .attr("class", "green")

const orangeLine = d3.line()
    .x((d,i)=>{return popScale(d["2035"])})
    .y((d,i)=>{return 40 * i + 40})

const orangePath = svg
    .append("path")
    .datum(data)
    .attr("d",orangeLine)
    .attr("class", "orange")







// sorts data to highest 2021 pop descending order
const selectTag = document.querySelector("select")

selectTag.addEventListener("change", function(){
    
    data.sort((a,b)=>{
        if (this.value == "2020pop") {
            return d3.descending(a["2020"], b["2020"])
        } else if (this.value == "1950pop") {
            return d3.descending(a["1950"], b["1950"])
        } else if (this.value == "difference") {
            return d3.descending(a["Absolute Change"], b["Absolute Change"])
        } else {
            return d3.ascending(a["City"], b["City"])
        }
    })

    groups 
        .data(data, (d,i)=> { return d["City"] })
        .transition()
        .duration(1000)
        .attr("transform", (d,i)=> {return `translate(0, ${i*40})`})


    redPath
        .datum(data, (d,i)=> {return d["City"]})
        .transition()
        .duration(1000)
        .attr("d",redLine)

    bluePath
        .datum(data, (d,i)=> {return d["City"]})
        .transition()
        .duration(1000)
        .attr("d",blueLine)

    greenPath
        .datum(data, (d,i)=> {return d["City"]})
        .transition()
        .duration(1000)
        .attr("d",greenLine)

    orangePath
        .datum(data, (d,i)=> {return d["City"]})
        .transition()
        .duration(1000)
        .attr("d",orangeLine)

    areaPath
        .datum(data, (d,i)=>{return d["City"]})
        .transition()
        .duration(1000)
        .attr("d", area)

})

