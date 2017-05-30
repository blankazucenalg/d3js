(function() {
  'use strict';

  angular
    .module('d3Js')
    .controller('AngularController', angularController);

  /** @ngInject */
  function angularController() {
    var vm = this;
    vm.updateData = updateData;

    vm.codes = [
    "(function() { \n  'use strict'; \n \n  angular \n    .module('app') \n    .directive('chartDirective', chartDirective); \n \n  function chartDirective(){ \n    var directive = { \n      restrict: 'EA', \n      template: '<div id=\"chart\">', \n      scope: { \n          data: '=' \n      }, \n      controller: chartController, \n      controllerAs: 'vm', \n      bindToController: true \n    }; \n    return directive; \n  } \n \n  /** @ngInject */ \n  function chartController($scope) { \n    var vm = this; \n \n    $scope.$watch('vm.data', function(newValue, oldValue){ \n      drawChart(); \n    }); \n \n    function drawChart(){ \n      d3.select('#chart') .selectAll('div')  \n        .data(vm.data, function(d){return d.key; })  \n        .enter().append('div')  \n        .style('width', function(d) { return d.values + 'px'; })  \n        .style('background-color','pink')  \n        .style('margin-bottom','3px')  \n        .style('padding','1px')  \n        .text(function(d) { return d.values; });  \n    } \n  } \n})(); \n",
    "<chart-directive data=\"data\">"
    ];
    updateData();

    function updateData(){
      vm.data = [];
      for(var i=0; i < Math.random() * 20; i++)
        vm.data.push({key: "Random " + i, values: Math.random() * 1000});
    }
  }

})();
