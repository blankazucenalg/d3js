(function() {
  'use strict';

  angular
    .module('d3Js')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($scope, $location, moment) {
      var vm = this;
      $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
      };
      // "vm.creation" is avaible by directive option "bindToController: true"
    }
  }

})();
