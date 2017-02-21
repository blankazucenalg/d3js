(function() {
  'use strict';

  angular
    .module('d3Js')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      /*.state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })*/
      .state('start', {
        url: '/start',
        templateUrl: 'app/start/start.html',
        controller: 'StartController',
        controllerAs: 'vm'
      })
      .state('introduction', {
        url: '/introduction',
        templateUrl: 'app/introduction/introduction.html',
        controller: 'IntroductionController',
        controllerAs: 'vm'
      })
      .state('charts', {
        url: '/charts',
        templateUrl: 'app/charts/charts.html',
        controller: 'ChartsController',
        controllerAs: 'vm'
      })
      .state('angular', {
        url: '/angular',
        templateUrl: 'app/using-angular/angular.html',
        controller: 'AngularController',
        controllerAs: 'vm'
      })
      .state('challenge', {
        url: '/challenge',
        templateUrl: 'app/challenge/challenge.html',
        controller: 'ChallengeController',
        controllerAs: 'vm'
      });

    $urlRouterProvider.otherwise('/start');
  }

})();
