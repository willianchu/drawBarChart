## drawBarChart()
#### About
Draws a simple bar chart or a stacked bar charts.

This project generate bar charts or staked bar charts on pages using HTML, CSS and JavaScript.

The signature of the function should be as follows:

drawBarChart(data, options, element);

The data parameter will be the data the chart should work from Start with just an Array of numbers e.g. [1, 2, 3, 4, 5]

The options parameter should be an object which has options for the chart. e.g. width and height of the bar chart

The element parameter should be a DOM element or jQuery element that the chart will get rendered into.
#### Two types of bar graph  in one
This project allows a user call the function from html and draw two types of bar charts graph.
- Simple Bar Chart
`const data = [[1390,1450,1910,1290,1810]];`
- Stack Bar Chart
`const data = [[39,45,91,29,81],[29,35,77,15,58],[12,25,47,5,38]];`
#### Example Screenshots
[![Simple Bar Graph](https://github.com/willianchu/drawBarChart/blob/main/exSimpleBarChart.jpg "Simple Bar Graph")](https://github.com/willianchu/drawBarChart/blob/main/exSimpleBarChart.jpg "Simple Bar Graph")
[![Stack Bar Graph](https://github.com/willianchu/drawBarChart/blob/main/exStackBarChart.jpg "Stack Bar Graph")](https://github.com/willianchu/drawBarChart/blob/main/exStackBarChart.jpg "Stack Bar Graph")
#### the API
`drawBarChart(data, options, element);`

Where is:
- data - is a list of array/ arrays
- options - have settings keys of the graph (more details below)
- element - element of the dom
#### Options Parameters
- backgroundColour - Colour of the canvas background.
- title - Title of the graph
- titleFontSize - Title font size
- titleColour - Title font colour
- bcHeight - Bar Chart total Height in Canvas
- bcWith - Bar Chart total width in Canvas
- bcAxes - description of each bar in array ( ["first","second","third","fourth","fifth"])
- barColour - The colour of the bars in a simple bar chart the first colour it will be set only ([ "brown", "blue", "pink", "orange", "gray", "red"])
- barSpacing - the space between bars in points
- labelColour - The font colour of the Axes description
- fontSize - Font size in points of the labels
- fontColour - Font colour of the labels
- dataPosition - position of the bar labels could be top, bottom or centre
#### A Feature list of your library (options it supports, etc)
#### A list of known issues / bugs
#### A list of features that are on the roadmap but haven't been implemented yet
#### A list of all the external resources (tutorials, docs, example code, etc) that you encountered and used to help you create this library
