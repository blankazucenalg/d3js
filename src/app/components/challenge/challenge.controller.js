(function() {
  'use strict';

  angular
    .module('d3Js')
    .controller('challengeController', challengeController);

  /** @ngInject */
  function challengeController($scope, $timeout) {
    var vm = this;

    d3.csv("assets/data/AutosRegistradosDF.csv", function(d){
      return {
        year: +d.Anio,
        quantity: d.Cantidad
      };
    }, function(data){
      $scope.data = data;
    });

    $scope.codes = [
    "sudo apt-get install -y build-essential \ncurl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - \nsudo apt-get install -y nodejs \nsudo npm install npm -g \nsudo npm install --global gulp-cli \nsudo npm install --save-dev gulp \nsudo npm install -g yo gulp bower \nsudo npm install -g generator-gulp-angular \nnpm install && bower install \ngulp serve"
    ];
  }
  
})();