var data = {
    x: ["Beer", "Wine", "Spritz"],
    y: [20.3, 35.5, 25.0]
    type: "bar"
}

var layout ={
    "title": "Bar Info"
}
plotly.newPlot("plot", [data], layout);
