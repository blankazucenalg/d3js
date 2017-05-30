(function() {
  'use strict';

  angular
    .module('d3Js')
    .controller('IntroductionController', introductionController);

  /** @ngInject */
  function introductionController($scope, $timeout, $window) {
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
          $window.console.log("Pressed");
        });
      }
    };

    $scope.exercises = [
    '//d3.selectAll(<-- Todos los div dentro de #ejercicio1 -->).style("background", <-- Color -->);\n// Recuerda el selector del hijo en la n-ésima posición div:nth-child(2)',
    "var datos = [30,40,50,80,100]; \nd3.selectAll('#ejercicio2 *').remove(); \nd3.select('#ejercicio2').selectAll('div')\n  .data(datos) // Se hace el enlace con los datos\n  // Usar la subselección .enter() \n  //Agregar un nuevo div usando .append('div')"];
    $scope.codes = [
    "// d3.select(selection).attr(name [,value]); \nvar parrafo = d3.select('#example1 p');\n$window.console.log(parrafo);",

    "// d3.select(selection).attr(name [,value]); \nd3.selectAll('#example1 p').style('color','orange');",

    "//Iteracion con d3\nd3.selectAll('#example2 p')\n  .each(function(d){\n    d3.select(this).style('font-size', (Math.random() * 40) + 'px');\n  });",

    "var data = ['Parrafo A', 'Párrafo B', 'Párrafo C', 'Párrafo D']; \n\nd3.select('#example3 .panel-body')\n  .selectAll('p')\n  .data(data)\n  .enter()\n  .append('p')\n  .text(function(d){ return d; });",

    "var data = ['Parrafo A', 'Párrafo C', 'Párrafo D', 'Párrafo E', 'Párrafo F']; \n\nvar selection = d3.select('#example4 .panel-body')\n  .selectAll('p')\n  .data(data);\n\n// UPDATE\nselection\n  .text(function(d){return d;}); \n\n// ENTER\nselection\n  .enter()\n  .append('p')\n  .text(function(d){return d;}); \n\n// EXIT\nselection\n  .exit()\n  .remove();"
    ];

    //\n\nd3.select('#example4 .panel-body')\n  .selectAll('p')\n  .data(data, function(d){return d;})\n  .enter()\n  .append('p')\n  .text(function(d){ return d; });

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
    $('#code4').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        //ctrl + enter
        eval($scope.codes[4]);
      }
    });

    $('#exercise1').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        //ctrl + enter
        eval($scope.exercises[0]);
      }
    });
    $('#exercise2').keydown(function(e){
      if ((e.ctrlKey || e.metaKey) && (e.keyCode === 13 || e.keyCode === 10)) {
        //ctrl + enter
        eval($scope.exercises[1]);
      }
    });

    //for(var i=0; i < $scope.codes.length; i++)
    //  eval($scope.codes[i]);

  }

})();
