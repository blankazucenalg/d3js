(function() { 
  'use strict'; 
 
  angular 
    .module('d3Js') 
    .directive('chartDirective', chartDirective); 
 
  function chartDirective(){ 
    var directive = { 
      restrict: 'EA', 
      template: '<div id=\"chart\"></div>', 
      scope: { 
          data: '=' 
      }, 
      controller: chartController, 
      controllerAs: 'vm', 
      bindToController: true 
    }; 
    return directive; 
  } 
 
  /** @ngInject */ 
  function chartController($scope) { 
    var vm = this; 
 
    $scope.$watch('vm.data', function(newValue, oldValue){ 
      drawChart(); 
    }); 
 
    function drawChart(){ 
      d3.select('#chart') .selectAll('div').remove();
      d3.select('#chart') .selectAll('div')  
        .data(vm.data, function(d){return d.key; })  
        .enter().append('div')  
        .style('width', function(d) { return d.values + 'px'; })  
        .style('background-color','pink')  
        .style('margin-bottom','3px')  
        .style('padding','1px')  
        .text(function(d) { return d.values; });  
    } 
  } 
})();