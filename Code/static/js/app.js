
d3.json("samples.json").then(function(data) {
    // fetch the JSON data and console log it
    var names = data.names;
    var metadata = data.metadata;
    var samples = data.samples;
    var samples_restructured_summary = [];
    var samples_restructured_element_1= {};

    console.log(names);
    console.log(metadata);
    console.log(samples);

    // POPULATE SELECT ELEMENT WITH JSON.
    var ele = document.getElementById('selDataset');
    for (var i = 0; i < samples.length; i++) {  // iterate samples, i =0 to 153
        
        ele.innerHTML = ele.innerHTML +
            '<option value="' + samples[i].id + '">' + samples[i].id + '</option>';

        // console.log(samples[i]);

        // sort sample values and print

        
        // sorted_sample_values[i] = samples[i].sample_values.sort(function sortFunction(a,b) {
        //     return b-a ;

        // });

        // console.log(sorted_sample_values[i]);

        // bar chart
        var samples_restructured = []; 
        // store restructured sample in a new array
        for (var j=0; j< samples[i].sample_values.length;j++) {   // j=0 to length of each "sample_values"
            

            samples_restructured_element = {
                // id: samples[i].id,
                otu_ids: samples[i].otu_ids[j],
                otu_labels:samples[i].otu_labels[j] ,
                sample_values: samples[i].sample_values[j]
            }

            // console.log(samples_restructured_element);
            

            samples_restructured.push(samples_restructured_element);
        

            // samples_restructured[j].id = samples[i].id;
            // samples_restructured[j].otu_ids = samples[i].otu_ids[j];
            // samples_restructured[j].otu_labels = samples[i].otu_labels[j];
            // samples_restructured[j].sample_values = samples[i].sample_values[j];

        }
        // var samples_restructured_element_1= {};
        var key = samples[i].id;
        var samples_restructured_element_1= {};
        samples_restructured_element_1[key] = samples_restructured;

        samples_restructured_summary.push(samples_restructured_element_1);
        
        
        // samples_restructured_summary.push(samples_restructured);
        // console.log(samples_restructured_summary);

        

    }

    console.log(samples_restructured_summary);

    // console.log( Object.values(samples_restructured_summary[0]) );  // an array of objects

    // function init() {
    //     data = [{
    //         x: samples_restructured_summary[0].values.
    //         x:  samples[0].sample_values.sort(function sortFunction(a,b) {return b-a ;}).slice(0,10),

    //         y: 
    //     }];
    // }
    dataInitial = samples_restructured_summary[0]["940"]; 
    slicedInitial = dataInitial.slice(0,10);
    console.log(dataInitial);
    console.log(slicedInitial);

    console.log(slicedInitial.map(object => object.otu_ids));
    // console.log(slicedInitial.map(object => object.otu_ids).toString());
    reversed_slicedInitial = slicedInitial.reverse();
   


    function init() {
        var data = [{
            x: reversed_slicedInitial.map(object => object.sample_values),
            
            y : reversed_slicedInitial.map(object => object.otu_ids).map(String).map(array => "OTU" + " " + array.toString() ),
            text: reversed_slicedInitial.map(object => object.otu_labels),
            type: "bar",
            orientation: "h"


        }];

        var layout ={
            title: "'Bar' Chart",

        };
        Plotly.newPlot("bar", data, layout);
    }

    d3.selectAll('#selDataset').on("change",getData);

    function getData() {
        var dropdownMenu = d3.select('#selDataset');
        // assign the value of the dropdown menu option to a variable
        var dataset = dropdownMenu.property("value");
        var data [];

        

    }

    init();


    
});



