(function() {
  'use strict';

  angular
    .module('d3Js')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
