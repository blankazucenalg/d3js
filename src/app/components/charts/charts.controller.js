(function() {
  'use strict';

  angular
    .module('d3Js')
    .controller('chartsController', chartsController);

  /** @ngInject */
  function chartsController($scope, $timeout) {
    var vm = this;

    $scope.editorOptions = {
      lineWrapping : true,
      lineNumbers: true,
      mode: 'javascript',
      tabSize: 2,
      onLoad: function(editor){
        // Editor part
        var doc = _editor.getDoc();
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
        $scope(function(){
          $scope.dataBars = data;
        });
      });
      $scope.dataBars = data;
      vm.dataBars = data;
      drawBars();
    });

    function drawBars(){
      d3.select('#chart-bar').selectAll('div')
      .data(vm.dataBars, function(d){return d.name; }).enter().append('div')
      .style('width', function(d) { return d.deaths / 11 + 'px'; })
      .style('background-color','yellowgreen')
      .style('margin-bottom','3px')
      .style('padding','1px')
      .text(function(d) { return d.deaths; });
    }

    drawSvg();

    function drawSvg(){
      var margin = {top: 20, right: 20, bottom: 40, left: 45},
          width = 1100 - margin.left - margin.right,
          height = 500 - margin.top - margin.bottom;

      var x = d3.scale.ordinal()
          .rangeRoundBands([0, width], .1);

      var y = d3.scale.linear()
          .range([height, 0]);

      var xAxis = d3.svg.axis()
          .scale(x)
          .orient("bottom");

      var yAxis = d3.svg.axis()
          .scale(y)
          .orient("left")
          .ticks(10);

      var svg = d3.select("#chart-svg").append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      d3.csv("assets/data/AutosVendidosFeb2016.csv", filter, function(error, data) {
        $scope.dataSvg = data;
        if (error) throw error;

        x.domain(data.map(function(d) { return d.name; }));
        y.domain([0, d3.max(data, function(d) { return d.quantity; })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Cantidad");

        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.name); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.quantity); })
            .attr("height", function(d) { return height - y(d.quantity); });

        d3.selectAll(".x.axis text").attr("transform","translate(0,10)rotate(-20)");
      });

      function filter(d) {
        return {
          name: d.GRUPO,
          quantity: +d.CANTIDAD
        };
      }
    }

    $scope.codes = [
    "d3.csv('CausasDeMortalidadDF2013.csv', filter, function(data){ \n  d3.select('#chart-bar') .selectAll('div') \n    .data(data, function(d){return d.name; }) \n    .enter().append('div') \n    .style('width', function(d) { return d.deaths / 11 + 'px'; }) \n    .style('background-color','yellowgreen') \n    .style('margin-bottom','3px') \n    .style('padding','1px') \n    .text(function(d) { return d.deaths; }); \n}); \n\nfunction filter(d){ \n  return { \n    name: d.Causas, \n    deaths: +d.Defunciones \n  }; \n}",

    "var linear = d3.scale.linear() \n.domain([0, 100]); \n.range([0, width]); \n\nvar ordinal = d3.scale.ordinal() \n.domain(['blue', 'green', 'yellow', 'red']) \n.rangePoints([0, 100]);",

    "var svg = d3.select('#events').append('svg').attr('width','1000px'); \nsvg.selectAll('circle').data(['click','overnout'], function(d){return d;}).enter().append('circle').attr('cx',function(d,i){return 200*(i+1);}).attr('cy',70).attr('r',70).style('fill','purple').attr('id',function(d){return d;}); \n\nsvg.select('#click').on('click', function(d,i){\nalert('Clicked!')\n}); \n\nsvg.select('#overnout') \n.on('mouseover', function(d,i){ \nd3.select(this) \n.style('fill', 'yellow')}) \n.on('mouseout', function(d,i){ \nd3.select(this) \n.style('fill', 'purple'); \n});",

    "var margin = {top: 20, right: 20, bottom: 40, left: 45}, \n    width = 1100 - margin.left - margin.right, \n    height = 500 - margin.top - margin.bottom; \n \nvar x = d3.scale.ordinal() \n    .rangeRoundBands([0, width], .1); \n \nvar y = d3.scale.linear() \n    .range([height, 0]); \n \nvar xAxis = d3.svg.axis() \n    .scale(x) \n    .orient('bottom'); \n \nvar yAxis = d3.svg.axis() \n    .scale(y) \n    .orient('left') \n    .ticks(10); \n \nvar svg = d3.select('#chart-svg').append('svg') \n    .attr('width', width + margin.left + margin.right) \n    .attr('height', height + margin.top + margin.bottom) \n  .append('g') \n    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')'); \n \nd3.csv('assets/data/AutosVendidosFeb2016.csv', filter, function(error, data) { \n  $scope.dataSvg = data; \n  if (error) throw error; \n \n  x.domain(data.map(function(d) { return d.name; })); \n  y.domain([0, d3.max(data, function(d) { return d.quantity; })]); \n \n  svg.append('g') \n      .attr('class', 'x axis') \n      .attr('transform', 'translate(0,' + height + ')') \n      .call(xAxis); \n \n  svg.append('g') \n      .attr('class', 'y axis') \n      .call(yAxis) \n    .append('text') \n      .attr('transform', 'rotate(-90)') \n      .attr('y', 6) \n      .attr('dy', '.71em') \n      .style('text-anchor', 'end') \n      .text('Cantidad'); \n \n  svg.selectAll('.bar') \n      .data(data) \n    .enter().append('rect') \n      .attr('class', 'bar') \n      .attr('x', function(d) { return x(d.name); }) \n      .attr('width', x.rangeBand()) \n      .attr('y', function(d) { return y(d.quantity); }) \n      .attr('height', function(d) { return height - y(d.quantity); }); \n \n  svg.selectAll('.x.axis text').attr('transform','translate(0,10)rotate(-20)'); \n}); \n \nfunction filter(d) { \n  return { \n    name: d.GRUPO, \n    quantity: +d.CANTIDAD \n  }; \n} "
    ];

    eval($scope.codes[2]);
    


    // for(var i=0; i < $scope.codes.length; i++)
    //   eval($scope.codes[i]); 
  }
  
})();