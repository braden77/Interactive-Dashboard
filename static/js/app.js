var names = [];
var metadata = [];
var samples = [];
var reversed_slicedInitial = [];
var samples_restructured_summary = [];

d3.json("samples.json").then(function(data) {
    // fetch the JSON data and console log it
    names = data.names;
    metadata = data.metadata;
    samples = data.samples;
    // var samples_restructured_summary = [];
    var samples_restructured_element_1= {};

    console.log("names: ", names);
    console.log("metedata: ", metadata);
    console.log("samples: ", samples);

    // POPULATE SELECT ELEMENT WITH JSON.
    var ele = document.getElementById('selDataset');
    for (var i = 0; i < samples.length; i++) {  // iterate samples, i =0 to 153
        
        ele.innerHTML = ele.innerHTML +
            '<option value="' + samples[i].id + '">' + samples[i].id + '</option>';

       
        var samples_restructured = []; 
        // store restructured sample in a new array
        for (var j=0; j< samples[i].sample_values.length;j++) {   // j=0 to length of each "sample_values"
            samples_restructured_element = {
                
                otu_ids: samples[i].otu_ids[j],
                otu_labels:samples[i].otu_labels[j] ,
                sample_values: samples[i].sample_values[j]
            }       
            samples_restructured.push(samples_restructured_element);        
        }
       
        var key = samples[i].id;
        var samples_restructured_element_1= {};
        samples_restructured_element_1[key] = samples_restructured;

        samples_restructured_summary.push(samples_restructured_element_1);       
    }

    console.log("restructured samples: ", samples_restructured_summary);

    // data preparation for initial Bar chart, Bubble chart and demographic info
    dataInitial = samples_restructured_summary[0]["940"]; 
    slicedInitial = dataInitial.slice(0,10);

    console.log("initial bar chart data: ", dataInitial);
    console.log("data of top ten: ", slicedInitial);
    console.log("otu_ids: ", slicedInitial.map(object => object.otu_ids));
   
    reversed_slicedInitial = slicedInitial.reverse();
    console.log("reversed sliced initial data: ", reversed_slicedInitial);

    function init() {
        // initial bar chart
        var data1 = [{
            x: reversed_slicedInitial.map(object => object.sample_values),
            
            y : reversed_slicedInitial.map(object => object.otu_ids).map(String).map(array => "OTU" + " " + array.toString() ),
            text: reversed_slicedInitial.map(object => object.otu_labels),
            type: "bar",
            orientation: "h"
        }];

        var layout1 ={
            
            height: 500,
            width: 400

        };
        Plotly.newPlot("bar", data1, layout1);

        // initial bubble chart
        var data2 = [{
            x: reversed_slicedInitial.map(object => object.otu_ids),
            y: reversed_slicedInitial.map(object => object.sample_values),
            mode: 'markers',
            marker: {
                color: reversed_slicedInitial.map(object => object.otu_ids),
                size: reversed_slicedInitial.map(object => object.sample_values)
            },
            text: reversed_slicedInitial.map(object => object.otu_labels)
        }];

        var layout2 = {
            
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: { 
                title: {
                    text: "OTU ID"
                }
            }
        };

        Plotly.newPlot("bubble", data2, layout2);

        // initial demographic info
        document.getElementById("sample-metadata").innerHTML = "id: " + metadata[0].id + "<br />" 
                                                                + "ethnicity: " + metadata[0].ethnicity +"<br />"
                                                                +"gender: " +metadata[0].gender+"<br />" 
                                                                + "age: " + metadata[0].age+"<br />"  
                                                                + "location: " + metadata[0].location + "<br />" 
                                                                + "bbtype: " + metadata[0].bbtype + "<br />"
                                                                + "wfreq: " + metadata[0].wfreq;


    }

    d3.selectAll("#selDataset").on("change",optionChanged);

    init();

    function optionChanged() {
        var dropdownMenu = d3.select('#selDataset');
        // assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
       
        console.log("text: ", Object.keys(samples_restructured_summary[0])[0]);
        console.log("text1: ", Object.values(samples_restructured_summary[0])[0]);
        for (var i = 0; i < samples_restructured_summary.length; i++) {

            var data_x_1 = [];
            var data_y_1 = [];

            if (dataset == Object.keys(samples_restructured_summary[i])[0]) {
                slicedInitial = Object.values(samples_restructured_summary[i])[0].slice(0,10);
                reversed_slicedInitial= slicedInitial.reverse();
                console.log("reserved sliced initial: ", reversed_slicedInitial)

                //update bar chart
                data_x_1 = reversed_slicedInitial.map(object => object.sample_values);
                data_y_1 = reversed_slicedInitial.map(object => object.otu_ids).map(String).map(array => "OTU" + " " + array.toString() );
                
                updatePlotly(data_x_1,data_y_1);
                console.log("updated data x: ", data_x_1); 
                console.log("updated data y: ", data_y_1);
                
                //  update bubble chart
                data_x_2 = reversed_slicedInitial.map(object => object.otu_ids);
                data_y_2 = reversed_slicedInitial.map(object => object.sample_values);
                color_2 = reversed_slicedInitial.map(object => object.otu_ids);
                size_2 = reversed_slicedInitial.map(object => object.sample_values);
                text_2 = reversed_slicedInitial.map(object => object.otu_labels);

                updatePlotly2(data_x_2,data_y_2,color_2,size_2,text_2);

                break;
            }
            else continue;

        }        
        // update demographic info
        for (var i = 0; i < metadata.length; i++) {
            if (dataset == metadata[i].id) {
                document.getElementById("sample-metadata").innerHTML = "id: " + metadata[i].id + "<br />" 
                                                                        + "ethnicity: " + metadata[i].ethnicity +"<br />"
                                                                        +"gender: " +metadata[i].gender+"<br />" 
                                                                        + "age: " + metadata[i].age+"<br />"  
                                                                        + "location: " + metadata[i].location + "<br />" 
                                                                        + "bbtype: " + metadata[i].bbtype + "<br />"
                                                                        + "wfreq: " + metadata[i].wfreq;
                

            }


        }
        
    }
    // restyle function for bar chart
    function updatePlotly(newdata_x,newdata_y) {
        Plotly.restyle("bar","x",[newdata_x],"y",[newdata_y])
    }

    // restyle function for bubble chart
    function updatePlotly2(data_x_2,data_y_2,color_2,size_2,text_2) {
        Plotly.restyle("bubble","x",[data_x_2],"y",[data_y_2],"color", [color_2],"size",[size_2],"text",[text_2])
    } 
    
});





    
















