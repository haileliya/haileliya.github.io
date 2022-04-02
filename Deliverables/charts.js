function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
    console.log(samplesArray);
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = samplesArray.filter(data => data.id == sample);
    console.log(filteredSamples);
    //  5. Create a variable that holds the first sample in the array.
    var firstFilteredSample = filteredSamples[0];
    console.log(firstFilteredSample);
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var OTU_ids = firstFilteredSample.otu_ids;
    console.log(OTU_ids);
    var OTU_labels = firstFilteredSample.otu_labels;
    console.log(OTU_labels);
    var SAMPLE_values = firstFilteredSample.sample_values;
    console.log(SAMPLE_values);

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    console.log("OTU IDs here")
    console.log(OTU_ids)
    var yticks = OTU_ids.slice(0,10).map(id => "OTU " + id).reverse();
    console.log(yticks);

    // 8. Create the trace for the bar chart. 
    var barData = [{
      x: SAMPLE_values.slice(0,10).reverse(),
      y: OTU_labels.slice(0,10).reverse(),
      orientation: 'h',
      type: 'bar',
      marker: {
        color: 'rgba(255,153,51,0.6)',
        width: 1
  }
    }];
    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      //xaxis: {title: "OTU"},
      //yaxis: {title: "Samples"}
  };

    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("myDiv", barData, barLayout);
  // 1. Create the trace for the bubble chart.
    var bubbleData = [{
  x: OTU_ids,
  y: SAMPLE_values,
  //text: ['A<br>size: 40', 'B<br>size: 60', 'C<br>size: 80', 'D<br>size: 100'],
  mode: 'markers',
  marker: {
    color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
    size: SAMPLE_values,
    //opacity: [1, 0.8, 0.6, 0.4],
    //size: [40, 60, 80, 100]
  }
}];

// 2. Create the layout for the bubble chart.
  var bubbleLayout = {
  title: 'Bacteria Cultures per Sample',
  showlegend: false,
  height: 600,
  width: 600
};

// 3. Use Plotly to plot the data with the layout.
Plotly.newPlot("myBubble", bubbleData, bubbleLayout); 


// Create a variable that filters the samples for the object with the desired sample number.
var filteredSamples = samplesArray.filter(obj => obj.id == sample);
console.log(filteredSamples);
// 1. Create a variable that filters the metadata array for the object with the desired sample number.
var metadata = data.metadata;
var meta_array = metadata.filter(sampleObj => sampleObj.id == sample);
// Create a variable that holds the first sample in the array.
var firstArray= filteredSamples[0];
console.log(firstArray);

// 2. Create a variable that holds the first sample in the metadata array.
var metadata_sample = meta_array[0];
console.log(metadata_sample);

// Create variables that hold the otu_ids, otu_labels, and sample_values.
var otu_IDs = firstArray.otu_ids;
var otu_Labs = firstArray.otu_labels;
var sample_Values = firstArray.sample_values; 

// 3. Create a variable that holds the washing frequency.
var washfreq = parseFloat(metadata_sample.wfreq);
// Create the yticks for the bar chart.
var yticks = otu_IDs.slice(0,10).map(id => "OTU " + id).reverse();
var xticks = otu_Labs.slice(0,10).reverse();
var labels = sample_Values.slice(0,10).reverse();

var bar_d = {
  x: xticks,
  y: yticks,
  type: 'bar',
  orientation: 'h',
  text: labels
};

var barLayouts = {
  title: "Top 10 Bacteria Cultures Found",
 };
// Use Plotly to plot the bar data and layout.
//Plotly.newPlot("bar", bar_d, barLayouts);

// Use Plotly to plot the bubble data and layout.
var bubble_d = {
  x: otu_IDs,
  y: sample_Values,
  text: otu_Labs,
  mode: 'markers',
  marker: {
    size: sample_Values,
    color: otu_IDs
  }
};

// Create the layout for the bubble chart.
var bubbleLayouts = {
  title: "Bacteria Cultures Per Sample",
  xaxis: {title: "OTU ID"},
  showlegend: false
};

// Use Plotly to plot the data with the layout.
//Plotly.newPlot("bubble", bubble_d, bubbleLayouts);   


// 4. Create the trace for the gauge chart.
var gauge_d = [ {
  domain: {range: [null, 10], tickwidth: 2, tickcolor: "darkblue"},
  value: washfreq,
  title: { text: "Wash Frequency per Week (number)" },
  type: "indicator",
  mode: "gauge+number"
}];
 


// 5. Create the layout for the gauge chart.
var gaugeLayouts = { 
  width: 500,
  height: 400,
  margin: { t: 25, r: 25, l: 25, b: 25 },
  paper_bgcolor: "white",
  bar: {color: "lavender" },
  bgcolor: "gray",
  borderwidth: 2,
  bordercolor: "black",
  font: { color: "darkblue", family: "Arial"}
};

// 6. Use Plotly to plot the gauge data and layout.
Plotly.newPlot("gauge", gauge_d, gaugeLayouts);
});


}
  




