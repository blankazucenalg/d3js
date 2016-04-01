(function() {
  'use strict';

  angular
    .module('d3Js')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('introduction', {
        url: '/introduction',
        templateUrl: 'app/components/introduction/introduction.html',
        controller: 'introductionController',
        controllerAs: 'introduction'
      })
      .state('selections', {
        url: '/selections',
        templateUrl: 'app/components/selections/selections.html',
        controller: 'selectionsController',
        controllerAs: 'selections'
      })
      .state('charts', {
        url: '/charts',
        templateUrl: 'app/components/charts/charts.html',
        controller: 'chartsController',
        controllerAs: 'charts'
      })
      .state('angular', {
        url: '/angular',
        templateUrl: 'app/components/angular/angular.html',
        controller: 'angularController',
        controllerAs: 'angular'
      })
      .state('challenge', {
        url: '/challenge',
        templateUrl: 'app/components/challenge/challenge.html',
        controller: 'challengeController',
        controllerAs: 'challenge'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
