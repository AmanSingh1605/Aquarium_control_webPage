import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";
import Highcharts from "https://code.highcharts.com/es-modules/masters/highcharts.src.js";
const db = getDatabase();

const refLevel = ref(db, "board1/outputs/User/level");
const refTemp = ref(db, "board1/outputs/User/temperature");
const refOxygen = ref(db, "board1/outputs/User/oxygen");
const refTurbidity = ref(db, "board1/outputs/User/turbidity");

const tempRadio=document.getElementById("Temp-radio");
const oxygenRadio=document.getElementById("Oxygen-radio");
const turbRadio=document.getElementById("Turbidity-radio");
const levelRadio=document.getElementById("Level-radio");

const myChartTemp=document.getElementById("myChart-Temp");
const myChartoxygen=document.getElementById("myChart-oxygen");
const myChartlevel=document.getElementById("myChart-level");
const myChartturb=document.getElementById("myChart-turb");

tempRadio.addEventListener('click',()=>{
  
  
    myChartTemp.style.display='block';
    myChartoxygen.style.display='none';
    myChartlevel.style.display='none';
    myChartturb.style.display='none';
});

oxygenRadio.addEventListener('click',()=>{
  myChartTemp.style.display='none';
  myChartoxygen.style.display='block';
  myChartlevel.style.display='none';
  myChartturb.style.display='none';
});

levelRadio.addEventListener('click',()=>{
  myChartTemp.style.display='none';
  myChartoxygen.style.display='none';
  myChartlevel.style.display='block';
  myChartturb.style.display='none';

});

turbRadio.addEventListener('click',()=>{
  myChartTemp.style.display='none';
  myChartoxygen.style.display='none';
  myChartlevel.style.display='none';
  myChartturb.style.display='block';

});

var charttemp = new Highcharts.Chart({
  chart: { renderTo: "myChart-Temp" },
  title: { text: undefined },
  tooltip:{
    valueDecimals: 2,
    valueSuffix: '℃'
  },
  series: [
    {
      showInLegend: false,
      data: [],
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
    series: { color: "#059e8a" },
  },
  xAxis: { type: "datetime", dateTimeLabelFormats: { second: "%H:%M" } },
  yAxis: {
    min:10,
    max:50,
    title: { text: "Temperature (Celsius)" },
    //title: { text: 'Temperature (Fahrenheit)' }
  },
  credits: { enabled: false },
});

onValue(refTemp, (snapshot) => {
  var y = parseFloat(snapshot.val().toFixed(2));
  var x = new Date().getTime();
  if (charttemp.series[0].data.length > 40) {
    charttemp.series[0].addPoint([x, y], true, true, true);
  } else {
    charttemp.series[0].addPoint([x, y], true, false, true);
  }
});

//water level

var chartlev = new Highcharts.Chart({
  chart: { renderTo: "myChart-level" },
  title: { text: undefined },
  tooltip:{
    valueDecimals: 2,
    valueSuffix: 'cm'
  },
  series: [
    {
      showInLegend: false,
      data: [],
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
    series: { color: "#059e8a" },
  },
  xAxis: { type: "datetime", dateTimeLabelFormats: { second: "%H:%M" } },
  yAxis: {
    title: { text: "Water Level(cm)" },
    //title: { text: 'Temperature (Fahrenheit)' }
  },
  credits: { enabled: false },
});

onValue(refLevel, (snapshot) => {
  var y = parseFloat(snapshot.val().toFixed(2));
  var x = new Date().getTime();
  if (chartlev.series[0].data.length > 40) {
    chartlev.series[0].addPoint([x, y], true, true, true);
  } else {
    chartlev.series[0].addPoint([x, y], true, false, true);
  }
});

//Oxygen Level


var chartOxy = new Highcharts.Chart({
  chart: { renderTo: "myChart-oxygen" },
  title: { text: undefined },
  series: [
    {
      showInLegend: false,
      data: [],
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
    series: { color: "#059e8a" },
  },
  xAxis: { type: "datetime", dateTimeLabelFormats: { second: "%H:%M" } },
  yAxis: {
    title: { text: "Oxygen(%)" },
    //title: { text: 'Temperature (Fahrenheit)' }
  },
  credits: { enabled: false },
});

onValue(refOxygen, (snapshot) => {
  var y = parseFloat(snapshot.val().toFixed(2));
  var x = new Date().getTime();
  if (chartOxy.series[0].data.length > 40) {
    chartOxy.series[0].addPoint([x, y], true, true, true);
  } else {
    chartOxy.series[0].addPoint([x, y], true, false, true);
  }
});

//Turbuidity chart


var chartTr = new Highcharts.Chart({
  chart: { renderTo: "myChart-turb" },
  title: { text: undefined },
  series: [
    {
      showInLegend: false,
      data: [],
    },
  ],
  plotOptions: {
    line: { animation: false, dataLabels: { enabled: true } },
    series: { color: "#059e8a" },
  },
  xAxis: { type: "datetime", dateTimeLabelFormats: { second: "%H:%M" } },
  yAxis: {
    title: { text: "Turbuidity(%)" },
  },
  credits: { enabled: false },
});

onValue(refTurbidity, (snapshot) => {
  var y = parseFloat(snapshot.val().toFixed(2));
  var x = new Date().getTime();
  if (chartTr.series[0].data.length > 40) {
    chartTr.series[0].addPoint([x, y], true, true, true);
  } else {
    chartTr.series[0].addPoint([x, y], true, false, true);
  }
});


