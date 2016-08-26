(function() {
  'use strict';

  angular
    .module('d3Js')
    .controller('introductionController', introductionController);

  /** @ngInject */
  function introductionController($scope, $timeout, $log) {
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

    $scope.codes = [
    "// d3.select(selection).attr(name [,value]); \nd3.selectAll('#example1 p').style('color','orange');",

    "var p = d3.selectAll('#example2 p')[0]; \nfor(var i in p) \n  d3.select(p[i]).style('font-size', (Math.random() * 40) + 'px');",

    "var data = ['Parrafo A', 'Párrafo B', 'Párrafo C', 'Párrafo D']; \nd3.select('#example3 .panel-body').selectAll('p').data(data).enter().append('p').text(function(d){return d;}); \nd3.select('#example4 .panel-body').selectAll('p').data(data, function(d){return d;}).enter().append('p').text(function(d){return d;});",

    "var data = ['Parrafo A', 'Párrafo C', 'Párrafo D', 'Párrafo E', 'Párrafo F']; \nvar selection = d3.select('#example5 .panel-body').selectAll('p').data(data, function(d){return d;}) \nselection.enter().append('p').text(function(d){return d;}); \nselection.exit().remove();"
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

    //for(var i=0; i < $scope.codes.length; i++)
    //  eval($scope.codes[i]); 

  }
  
})();