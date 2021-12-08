// Function Draws a Bar Graph (array , options, DOM element)
const drawBarChart = function (dataArray, options, element){
  const canvas = document.querySelector(element); // select element from DOM
  if (!canvas.getContext) { // jumps out if not supported
      return;
  }
  const ctx = canvas.getContext('2d');
  let data = dataArray[0];
  // Graph Dynamic Margins Calculations over given options
  const graphBoundaries = { // internal margins
    left: options.fontSize * 4,
    right: options.bcWith - (options.fontSize * 2),
    top: options.fontSize * 6,
    bottom: options.bcHeight - (options.fontSize * 2)
  }; // drawing area size
  graphBoundaries.verticalRange = graphBoundaries.bottom - graphBoundaries.top;
  graphBoundaries.horizontalRange = graphBoundaries.right - graphBoundaries.left;
    
  // Bars Dynamic shape size calculations
  const dataLength = data.length; // number of elements in the array
  const barWidth = (graphBoundaries.horizontalRange - ((dataLength + 1) * options.barSpacing)) / dataLength; // dynamic calculated
  const topDataExtrapolation = upperMaxValue(data); // the max value of the scale
  const barPace = (graphBoundaries.verticalRange / topDataExtrapolation); // value of data converted to points proportion
  const linePace = (topDataExtrapolation / dataLength * barPace); // scale lines pace

  // ****** THE TITLE *****
  ctx.font = options.titleFontSize + 'px san-serif'; 
  ctx.fillStyle = options.titleColour;
  ctx.fillText(options.title, ((graphBoundaries.horizontalRange - ((options.title).length * options.titleFontSize/2)) / 2 ) + graphBoundaries.left, (options.titleFontSize * 1.5), (options.bcWith * .8)); // cuts off if exceed 80% of free space


  // ***** GRAPH BACKGROUND *****
  // Draws graph background and the lateral scales
  let guide = graphBoundaries.bottom; // accumulator to draw scale lines
  ctx.strokeStyle = options.labelColour; // color of labels
  ctx.lineWidth = 1; // width of scale lines
  for(let i = 0 ; i < dataLength + 1 ; i++){
    // ***** The Lines *****
    ctx.beginPath();
    ctx.moveTo(graphBoundaries.left, guide ); // Draw Scale lines
    ctx.lineTo(graphBoundaries.right, guide );
    // ***** graph scale text *****
    ctx.font = options.fontSize + 'px san-serif'; 
    ctx.fillStyle = options.fontColour;
    let label = (topDataExtrapolation / dataLength * i);
    ctx.fillText(label%10 ? label : label%10==0 ? label : label.toFixed(2), graphBoundaries.left - (options.fontSize * (label.toString().length == 1 ? 1 : label.toString().length / 1.5)), guide + options.fontSize / 2.5, barWidth);  
    guide -= linePace;
    ctx.stroke(); 
  };
  // draws a base line Y
  ctx.beginPath();
  ctx.moveTo(graphBoundaries.left, graphBoundaries.bottom);
  ctx.lineTo(graphBoundaries.right, graphBoundaries.bottom);
  ctx.stroke();
  
  
  // ***** THE BARS *****
  // Draw Bars
  
  for(let idx in dataArray){
    // Bar setup
    let initialBar = graphBoundaries.left + options.barSpacing;
    data = dataArray[idx];
    for(let i = 0 ; i < dataLength ; i++){
      // Draw Bars
      ctx.fillStyle = options.barColour[idx];
      ctx.beginPath();
      ctx.fillRect(initialBar, (graphBoundaries.bottom - (data[i] * barPace)), barWidth, (data[i] * barPace));
      
      // Bar data label (centre, top bottom)
      ctx.fillStyle = options.labelColour;
      ctx.fillText(data[i], initialBar + (barWidth / 2) - ((data[i].toString().length) * options.fontSize / 5), graphBoundaries.bottom - barPosition(options.dataPosition, data[i], barPace, options.fontSize), barWidth);          
      // Bar Axis Header/ Description
      ctx.font = options.fontSize + 'px san-serif';
      ctx.fillStyle = options.labelColour;
      ctx.fillText(options.bcAxes[i], initialBar + (barWidth / 2) - ((options.bcAxes[i]).length * options.fontSize / 4), graphBoundaries.bottom + (options.fontSize), barWidth);  
      // Increment to the next bar;
      initialBar += barWidth + options.barSpacing;
    };

  };
  // Draws a X line axis
  // set line stroke and line width
  ctx.strokeStyle = options.labelColour;
  ctx.lineWidth = 3;
  
}

const upperMaxValue = function(array){ // Determines the upper Value of scale
  let max = 0;
  for(let i of array){ // Finds the biggest number in the array
    if( max < i ){ 
      max = i;
    };
  };
  let numDigits = max.toString().length; 
  let reduce = Math.pow(10, numDigits - Math.round((numDigits/2)));
  return Math.round(max / reduce + .5) * reduce; // Extrapolates the biggest number to a round number.
};
const barPosition = (dataPosition, value, equivalentPixels, fontSize) => { // Determines line dislocation to position values on bars
  // position of values bars
  let position = 0;
  switch(dataPosition) {
    case "top": 
      position = (value * equivalentPixels) - fontSize;
      break;
    case "centre":
      position = (value / 2) * equivalentPixels - (fontSize / 2);
      break;
    case "bottom":
      position = fontSize / 2;
      break;
    default:
      position = false;
      break;
  };
  return position;
};

const data = [[39,45,57,29,81],[29,35,37,15,58],[12,25,27,5,38]];

const options ={
  title: "Awesome Bar Graph",
  titleFontSize: 35,
  titleColour: "red",
  bcHeight: 450,
  bcWith: 800,
  bcAxes: ["August","September","October","November","December"],
  barColour: [ "red", "yellow", "green", "blue", "pink", "orange"],
  barSpacing: 35,
  labelColour: "black",
  fontSize: 16,
  fontColour: "blue",
  dataPosition: "top" // top, bottom, centre
};

const element = "#canvas";

drawBarChart(data, options, element);


