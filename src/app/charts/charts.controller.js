(function() {
  'use strict';

  angular
    .module('d3Js')
    .controller('ChartsController', chartsController);

  /** @ngInject */
  function chartsController($scope, $timeout, d3) {
    var vm = this;

    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
      onLoad: function(editor){
        // Editor part
        var doc = editor.getDoc();
        editor.focus();

        // Options
        doc.markClean()

        // Events
        editor.on("beforeChange", function(){ });
        editor.on("change", function(){ });
        editor.on("keyHandled", function(){
          console.log("Pressed");
        });
      }
    };

    d3.csv('assets/data/CausasDeMortalidadDF2013.csv', function(d){
      return {
        name: d.Causas,
        deaths: +d.Defunciones
      };
    }, function(data){
      $timeout(function(){
        $scope.$apply(function(){
          $scope.dataBars = data;
        });
      });
      $scope.dataBars = data;
      vm.dataBars = data;
    });

    d3.csv('assets/data/planetas.csv', function(d){
      return {
        planet: d.planeta,
        distance: +d.kmDistanciaAlSol,
        diameter: +d.diametroKm
      };
    }, function(data){
      $timeout(function(){
        $scope.$apply(function(){
          $scope.planets = data;
        });
      });
      $scope.planets = data;
      vm.planets = data;
    });

    function drawBars(){
      d3.csv('assets/data/CausasDeMortalidadDF2013.csv', function(d){
        return {
          name: d.Causas,
          deaths: +d.Defunciones
        };
      }, function(data){
        d3.select('#chart-bar').selectAll('div')
        .data(data, function(d){return d.name; }).enter().append('div')
        .style('width', function(d) { return d.deaths / 11 + 'px'; })
        .style('background-color','yellowgreen')
        .style('margin-bottom','3px')
        .style('padding','1px')
        .text(function(d) { return d.deaths; });
      });
    }

    d3.csv("assets/data/AutosVendidosFeb2016.csv", filter, function(error, data) {
      $scope.dataSvg = data;
    });

    function drawSvg(){
      //Margins of the chart
      var margin = {top: 20, right: 20, bottom: 40, left: 45},
          width = 1100 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var x = d3.scaleBand()
        .rangeRound([0, width])
        .paddingInner(0.1)

      var y = d3.scaleLinear()
        .range([height, 0]);

      var xAxis = d3.axisBottom(x);

      var yAxis = d3.axisLeft(y)
                .ticks(10);

      d3.selectAll('#chart-svg *').remove();
      var svg = d3.select('#chart-svg').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

      d3.csv("assets/data/AutosVendidosFeb2016.csv", filter, function(error, data) {
        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return d.quantity; })]);

        svg.append('g')
          .attr('class', 'x axis')
          .attr('transform', 'translate(0,' + height + ')')
          .call(xAxis);

        svg.append('g')
          .attr('class', 'y axis')
          .call(yAxis);

        svg.selectAll('.bar')
          .data(data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function(d) { return x(d.name); })
          .attr('width', x.bandwidth())
          .attr('y', function(d) { return y(d.quantity); })
          .attr('height', function(d) { return height - y(d.quantity); });

        d3.selectAll('.x.axis text').attr('transform','translate(0,10)rotate(-20)');
      });

      function filter(d) {
        return {
          name: d.GRUPO,
          quantity: +d.CANTIDAD
        };
      }
    }

    function filter(d) {
      return {
        name: d.GRUPO,
        quantity: +d.CANTIDAD
      };
    }

    $scope.codes = [
    "d3.csv('assets/data/CausasDeMortalidadDF2013.csv', function(data){\n  d3.select('#chart-bar')\n  .selectAll('div')\n  .data(data)\n  .enter()\n  .append('div')\n  .style('width', function(d) { \n    return d.Defunciones / 20 + 'px'; \n  })\n  .style('background-color','yellowgreen')\n  .style('margin-bottom','3px')\n  .style('padding','1px')\n  .text(function(d) { \n    return d.Defunciones; \n  });\n});",

    "d3.csv('assets/data/CausasDeMortalidadDF2013.csv', function(d){ \n  return { \n    name: d.Causas,\n    deaths: +d.Defunciones\n    };\n  }, function(data){  \n\n  data.sort(function(a,b){ return a.deaths > b.deaths ? -1 : 1; });\n  var maxValue = d3.max(data, function(d){return d.deaths});   \n\n  var linear = d3.scaleLinear() \n  .range([0, 1024]) \n  .domain([0, maxValue]); \n\n  var color = d3.scaleLinear() \n  .range(['blue', 'green', 'yellow', 'red']) \n  .domain([0, maxValue/4, maxValue/2, maxValue]);  \n\n  d3.select('#scales').selectAll('div')\n  .data(data, function(d){return d.name; }).enter().append('div')\n  .style('width', function(d) { return linear(d.deaths) + 'px'; })\n  .style('background-color', function(d){return color(d.deaths) })\n  .style('margin-bottom','3px')\n  .style('color','white')\n  .style('padding','1px')\n  .text(function(d) { return d.deaths; });\n});",

    "var svg = d3.select('#events').append('svg').attr('width','1000px'); \nsvg.selectAll('circle')\n  .data(['click','overnout'], function(d){ return d;})\n  .enter()\n  .append('circle')\n  .attr('cx', function(d,i){\n    return 200*(i+1);\n   })\n  .attr('cy',70)\n  .attr('r',70)\n  .style('fill','purple')\n  .attr('id',function(d){return d;}); \n\nsvg.select('#click')\n  .on('click', function(d,i){\n    alert('Clicked!')\n  }); \n\nsvg.select('#overnout') \n  .on('mouseover', function(d,i){ \n    d3.select(this) \n      .style('fill', 'yellow')\n   }) \n  .on('mouseout', function(d,i){ \n    d3.select(this) \n      .style('fill', 'purple'); \n  });",

    "\nd3.csv('assets/data/AutosVendidosFeb2016.csv', filter, function(error, data) {\n  //Sort data\n  data.sort(function(a,b){return a.quantity > b.quantity ? -1 : 1; });\n\n  //Margins of the chart\n  var margin = {top: 20, right: 20, bottom: 40, left: 45};\n  var width = 1100;\n  var height = 500;\n\n  // Draw histogram\n  histogram(data, width, height, margin);\n});\n\nfunction histogram(data, chartWidth, chartHeight, margin){\n  var width = chartWidth - margin.left - margin.right,\n    height = chartHeight - margin.top - margin.bottom;\n\n  var x = d3.scaleBand()\n    .rangeRound([0, width])\n    .paddingInner(0.1)\n\n  var y = d3.scaleLinear()\n    .range([height, 0]);\n\n  var xAxis = d3.axisBottom(x);\n\n  var yAxis = d3.axisLeft(y)\n            .ticks(10);\n\n  d3.selectAll('#chart-svg *').remove();\n  var svg = d3.select('#chart-svg').append('svg')\n    .attr('width', width + margin.left + margin.right)\n    .attr('height', height + margin.top + margin.bottom)\n    .append('g')\n    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');\n\n  x.domain(data.map(function(d) { return d.name; }));\n  y.domain([0, d3.max(data, function(d) { return d.quantity; })]);\n\n  svg.append('g')\n  .attr('class', 'x axis')\n  .attr('transform', 'translate(0,' + height + ')')\n  .call(xAxis);\n\n  svg.append('g')\n  .attr('class', 'y axis')\n  .call(yAxis);\n\n  svg.selectAll('.bar')\n  .data(data)\n  .enter().append('rect')\n  .attr('class', 'bar')\n  .attr('x', function(d) { return x(d.name); })\n  .attr('width', x.bandwidth())\n  .attr('y', function(d) { return y(d.quantity); })\n  .attr('height', function(d) { return height - y(d.quantity); });\n\n  d3.selectAll('.x.axis text').attr('transform','translate(0,10)rotate(-20)');\n}\nfunction filter(d) {\n  return {\n  name: d.GRUPO,\n  quantity: +d.CANTIDAD\n  };\n}",
    "var data = [30,50,80,120,150];\nd3.select('#ejemplo1')\n  .selectAll('div')\n  .data(data)\n  .enter()\n  .append('div')\n  .style('background','steelblue')\n  .style('margin','5px')\n  .style('width', function(d){ return d + 'px'; })\n  .style('height','30px');"
    ];

    $scope.exercises = [
    "var datos = [30,40,50,80,100]; \nd3.selectAll('#ejercicio1 *').remove(); \nd3.select('#ejercicio1').selectAll('div')\n  .data(datos) // Se hace el enlace con los datos\n  .enter()// Regresa todos los datos 'nuevos' \n  .append('div')//Agregar un nuevo div para cada dato\n  .attr('class', 'circle')\n  // A cada circulo dale un width y un height acorde con el valor del dato",
    "\nd3.selectAll('#ejercicio2 *').remove();\nd3.csv('assets/data/planetas.csv', function(d){\n  return {\n    planet: d.planeta,\n    distance: +d.kmDistanciaAlSol,\n    diameter: +d.diametroKm\n    };\n  }, function(data){\n    var width = document.getElementById('ejercicio2').offsetWidth - 30; // Obtiene el ancho del contenedor #ejercicio2\n\n    var maxDistance = d3.max(data, function(d) { return d.distance }); // Obtiene la mayor  distancia de los planetas con respecto al Sol\n    console.log('El tamaño del contenedor y el valor máximo son: ', width, maxDistance);\n\n    //Crea una escala lineal para las distancias de los planetas\n    var distancia = d3.scaleLinear()\n      .range( [ 100, width - 25])\n      // Establece el dominio de la escala\n      //.domain([ 0, <-- distancia máxima -->]);\n\n    var height = document.getElementById('ejercicio2').offsetHeight; // Altura del contenedor\n    // Obtén el tamaño más grande de todos los planetas (d3.max(data, function(d) { //Qué propiedad quieres? });\n    var escala = d3.scaleLinear()\n      .range( [ 0, (height - 150)])\n      //.domain([ 0,  maxSize]);\n\n    var color = d3.scaleOrdinal()\n      .range(['#424E4C', '#7C5531', '#7BBBF0', '#CC522C', '#A67845', '#EBA340', '#75D6F1', '#2C73A9'])\n      // Establece el dominio de la escala ordinal con la lista de los nombres de los planetas\n    // data.map(function(objeto){ return PROPIEDAD QUE QUIERES; })\n\n    var svg = d3.select('#ejercicio2')\n      .append('svg')\n      .attr('width',width)\n      .attr('height', height); \n\n    // Dibuja circulos para cada planeta dentro del svg (Ve el ejemplo de los eventos)\n\n  });"
    ];

    $('#code0').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        // ctrl + enter
        eval($scope.codes[0]);
      }
    });
    $('#code1').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        // ctrl + enter
        eval($scope.codes[1]);
      }
    });
    $('#code2').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        //ctrl + enter
        eval($scope.codes[2]);
      }
    });
    $('#code3').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        //ctrl + enter
        eval($scope.codes[3]);
      }
    });
    $('#code4').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        //ctrl + enter
        eval($scope.codes[4]);
      }
    });
    $('#exercise0').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        //ctrl + enter
        eval($scope.exercises[0]);
      }
    });
    $('#exercise1').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        //ctrl + enter
        eval($scope.exercises[1]);
      }
    });



    // for(var i=0; i < $scope.codes.length; i++)
    //   eval($scope.codes[i]);
  }

})();
