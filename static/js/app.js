
//update the dashboard
//populate the meta data
function demoInfo(sample)
{
    
    // use d3.json to get the data
    d3.json("samples.json").then((data) => {
        //grab the metadata
        let metaData = data.metadata;
        

        //filter based on the value of the sample- return array
        let result = metaData.filter(sampleResult => sampleResult.id == sample);

      

        //access index 0 from the array
        let resultData = result [0];
        
        //clear the metadata 
        d3.select("#sample-metadata").html("");

        // get value key pairs
        Object.entries(resultData).forEach(([key, value]) => {
            d3.select("#sample-metadata")
                .append("h5").text(`${key}: ${value}`);

        });

    });
}


//build the Bar Chart
function buildBarChart(sample)
{

    d3.json("samples.json").then((data) => {
        //grab the metadata
        let sampleData = data.samples;
        
        
        
        //filter based on the value of the sample- return array
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

      
        
        //access index 0 from the array
        let resultData = result [0];
        

        // get otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        

        //bar chart
        // yTicks
        let yticks = otu_ids.slice(0, 10).map(id => `OTU ${id}`);
        let xValues = sample_values.slice(0, 10);
        let textLabels = otu_labels.slice(0, 10);

        let barChart = {
            y: yticks.reverse(),
            x: xValues.reverse(),
            text: textLabels.reverse(),
            type: "bar",
            orientation: "h"
        }

        let layout = {
            title: "Top 10 Belly Button Bacteria"
        };

        Plotly.newPlot("bar", [barChart], layout);

    });
}

// Build Bubble Chart
function buildBubbleChart(sample)
{
    d3.json("samples.json").then((data) => {
        //grab the metadata
        let sampleData = data.samples;
        
        
        
        //filter based on the value of the sample- return array
        let result = sampleData.filter(sampleResult => sampleResult.id == sample);

      
        
        //access index 0 from the array
        let resultData = result [0];
        

        // get otu_ids
        let otu_ids = resultData.otu_ids;
        let otu_labels = resultData.otu_labels;
        let sample_values = resultData.sample_values;
        

        //bubble chart
       
        let bubbleChart = {
            y: sample_values,
            x: otu_ids,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Picnic"
            }
        }

        let layout = {
            title: "Bacteria Cultures Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"}

        };

        Plotly.newPlot("bubble", [bubbleChart], layout);

    });
}

//initalize the dashboard
function initalize()                                 
{

    
    //access the dropdown selector from the index.html file
    var select = d3.select("#selDataset");
    
    //use D3 to get the data
    d3.json("samples.json").then((data) => {
        let sampleNames = data.names;
        
    
        //create options for each sample
        sampleNames.forEach((sample) => {
            select.append("option")
                .text(sample)
                .property("value", sample);
        });

        // pass in the information
        let sample1 = sampleNames[0];

        // call the function to build the metadata
        demoInfo(sample1);
        buildBarChart(sample1);

        //call the function to bubble chart
        buildBubbleChart(sample1);
    
    });



}

//function that updates the dashboard
function optionChanged(item)
{
    //call the update to the metadata
    demoInfo(item);
    buildBarChart(item);
    buildBubbleChart(item);

}

//call initialize
initalize();