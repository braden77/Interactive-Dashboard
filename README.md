
# Interactive Dashboard of Belly Button Biodiversity

![Dashboard](Images/dashboard.png)

## About The Project

### Background

* [Bacteria by filterforge.com](Images/bacteria.jpg)

* Build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels.

* The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.


### Built With

* HTML/CSS
* Javascript
* JSON file

### Dataset

* [Belly Button Biodiversity dataset](http://robdunnlab.com/projects/belly-button-biodiversity/)

* Hulcr, J. et al.(2012) _A Jungle in There: Bacteria in Belly Buttons are Highly Diverse, but Predictable_. Retrieved from: [http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/](http://robdunnlab.com/projects/belly-button-biodiversity/results-and-data/)

## Procedures

1. Use the D3 library to read in `samples.json`.

2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

* Use `sample_values` as the values for the bar chart.

* Use `otu_ids` as the labels for the bar chart.

* Use `otu_labels` as the hovertext for the chart.

  ![bar Chart](Images/hw01.JPG)

3. Create a bubble chart that displays each sample.

* Use `otu_ids` for the x values.

* Use `sample_values` for the y values.

* Use `sample_values` for the marker size.

* Use `otu_ids` for the marker colors.

* Use `otu_labels` for the text values.

![Bubble Chart](Images/bubble_chart.JPG)

4. Display the sample metadata, i.e., an individual's demographic information.

5. Display each key-value pair from the metadata JSON object somewhere on the page.

![hw](Images/hw03.JPG)

6. Plot the weekly washing frequency of the individual.

![hw](Images/hw02.png)

6. Update all of the plots any time that a new sample is selected.


## Deployment

* Deploy this app to GitHub Pages
* You can check this app through [Interactive Dashboard of Belly Button Biodiversity](https://braden77.github.io/Plotly-Challenge/)


