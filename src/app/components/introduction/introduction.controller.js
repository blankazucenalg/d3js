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
      mode: "javascript",
      theme:  "default",
      tabSize: 2,
      onLoad: function(editor){
        // Editor part
        var doc = editor.getDoc();
        editor.focus();

        // Options
        doc.markClean();

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

    "//Iteracion manual\nvar p = d3.selectAll('#example2 p')[0]; //Grupo de parrafos\nfor(var i in p) \n  d3.select(p[i]).style('font-size', (Math.random() * 40) + 'px');\n\n//Iteracion con d3\nd3.selectAll('#example2 p')\n  .each(function(d){\n    d3.select(this).style('font-size', (Math.random() * 40) + 'px');\n  });",

    "var data = ['Parrafo A', 'Párrafo B', 'Párrafo C', 'Párrafo D']; \n\nd3.select('#example3 .panel-body')\n  .selectAll('p')\n  .data(data)\n  .enter()\n  .append('p')\n  .text(function(d){ return d; });\n\nd3.select('#example4 .panel-body')\n  .selectAll('p')\n  .data(data, function(d){return d;})\n  .enter()\n  .append('p')\n  .text(function(d){ return d; });",

    "var data = ['Parrafo A', 'Párrafo C', 'Párrafo D', 'Párrafo E', 'Párrafo F']; \n\nvar selection = d3.select('#example5 .panel-body')\n  .selectAll('p')\n  .data(data, function(d){ return d; });\n\nselection\n  .enter()\n  .append('p')\n  .text(function(d){return d;}); \n\nselection\n  .exit()\n  .remove();"
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