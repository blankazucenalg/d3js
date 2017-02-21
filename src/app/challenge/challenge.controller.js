(function() {
  'use strict';

  angular
    .module('d3Js')
    .controller('ChallengeController', challengeController);

  /** @ngInject */
  function challengeController($scope, $timeout, d3) {
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
    "sudo apt-get install -y build-essential  \ncurl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -  \nsudo apt-get install -y nodejs  \nsudo npm install npm -g  \nsudo npm install --global gulp-cli  \nsudo npm install --save-dev gulp  \nsudo npm install -g yo gulp bower  \nsudo npm install -g generator-gulp-angular  \n \n//Generate gulp-angular project \nmkdir my-new-project && cd $_ \nyo gulp-angular \n \nnpm install && bower install  \n \nbower install d3 --save \n \ngulp serve \n",
    '<script src="https://d3js.org/d3.v3.min.js"></script>'
    ];
  }

})();
