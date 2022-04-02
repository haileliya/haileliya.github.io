// Create the buildChart function.
function buildCharts(sample) {
    // Use d3.json to load the samples.json file 
    d3.json("samples.json").then((data) => {
      console.log(data);
  
      // Create a variable that holds the samples array. 
      var samplesArray = data.samples;
      console.log(samplesArray);
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
      Plotly.newPlot("bar", bar_d, barLayouts);
      
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
      Plotly.newPlot("bubble", bubble_d, bubbleLayouts);   
  
      
      // 4. Create the trace for the gauge chart.
      var gauge_d = [ {
        domain: { x: [0, 1], y: [0, 1] },
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
        paper_bgcolor: "lavender",
        font: { color: "darkblue", family: "Arial"}
      };
  
      // 6. Use Plotly to plot the gauge data and layout.
      Plotly.newPlot("gauge", gauge_d, gaugeLayouts);
    });
  }
  