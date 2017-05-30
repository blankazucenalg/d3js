(function() {
  'use strict';

  angular
    .module('d3Js')
    .controller('DboxController', DboxController);

  /** @ngInject */
  function DboxController($scope, $timeout){
    var vm = this;

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

    $scope.examples = [
    "var config = {\n  'bindTo': '#scatter',\n  'size':{\n    'width': 555,\n    'height':400,\n    'margin':{top: 20, right: 50, bottom: 50, left: 50},\n  },\n  'template':'dbox-gray',\n  'chart':{\n    'title': 'Scatter',\n    'subtitle': '',\n  },\n  'data':{\n    'raw': data,\n    parser:function(d) {\n      d.color = 'steelblue';\n      return d;\n    },\n    tip:function(d) {\n      return d.name + '<br>('+ d.x.toFixed(2) +' ,'+ d.y.toFixed(2) +')';\n    },\n    mouseover: function(d){\n    },\n    mouseout: function(d){\n    },\n  },\n  'xAxis':{\n    'scale' : 'linear',\n    'text': ''//subcategory.title\n  },\n  'yAxis':{\n    'visible':true,\n    'scale' : 'linear',\n    'text': '',//layer.first.variable.title\n    'ticks':{\n      'enabled':true\n    }\n  },\n  'plotOptions':{\n    'scatter':{\n      'draw45Line':false\n    }\n  }\n}\n\nvar scatter = dbox.scatter(config);\nscatter.generate();",
    "var config = {\n          'bindTo': '#columns',\n          'style':'columns',\n          'size':{\n            'width':  555,\n            'height':400,\n            'margin':{top: 20, right: 55, bottom: 100, left: 40},\n          },\n          'template':'dbox-gray',\n          'chart':{\n            'title': 'Columns',\n            'subtitle':'',\n          },\n          'data':{\n            'raw': nested,\n            'sort':{\n              'axis': 'y',\n              'order': 'desc', // asc - 1, desc  -1 ,\n              //'visible':false,\n            },\n            parser:function(d) {\n              var n = {};\n              n.x = +d.key;\n              n.y = +d.values;\n              n.color = '#fc3'\n              return n;\n            },\n            tip: function(d) {\n              return d.x.toFixed(0) +'<br>'+ d.y.toFixed(2);\n            },\n            mouseover: function(d){\n              var vm = this;\n              vm._chart._tip.show(d);\n            },\n            mouseout: function(d){\n              var vm = this;\n              vm._chart._tip.hide();\n            }\n          },\n          'xAxis':{\n            'scale' : 'linear',\n            'text'  : '',\n            'ticks':{\n              'enabled':true\n            }\n          },\n          'yAxis':{\n            'scale' : 'linear',\n            'text'  : '',//subcategory.title,\n            'ticks':{\n              'enabled':true,\n              'style':'straightLine'\n            }\n          },\n          'events':{\n            'load': function(bars){\n              var bar = bars.select(data.district_a);\n              if( bar !== false){\n                bar.attr('fill', '#da2b46')\n              };\n            }\n          },\n          'plotOptions':{\n            'bars':{\n\n            }\n          }\n        }\n\n        var bars = dbox.bars(config);\n        bars.generate();",
    "config = {\n          'bindTo': '#linesAndCircles',\n          'style':'lineAndCircles',\n          'size':{\n            'width': 555,\n            'height':400,\n            'margin':{top: 20, right: 50, bottom: 100, left: 40},\n          },\n          'template':'dbox-gray',\n          'chart':{\n            'title': 'Lines and circles',\n            'subtitle':'',\n          },\n          'data':{\n            'raw': nested,\n            'sort':{\n              'axis': 'y',\n              'order': 'desc', // asc - 1, desc  -1 ,\n              //'visible':false,\n            },\n            parser:function(d) {\n              var n = {};\n              n.x = +d.key;\n              n.y = +d.values;\n              n.color = '#fda709'\n              return n;\n            },\n            tip:function(d) {\n              return d.x +'<br>'+ d.y.toFixed(2);\n            },\n            'highlight':{\n              'axis':'x',\n              'value':'Lower Dir'\n            },\n            mouseover: function(d){\n              var vm = this;\n              vm._chart._tip.show(d);\n            },\n            mouseout: function(d){\n              var vm = this;\n              vm._chart._tip.hide();\n            },\n          },\n          'xAxis':{\n            'scale' : 'ordinal',\n            'text'  : '',\n          },\n          'yAxis':{\n            'scale' : 'linear',\n            'text'  : '',//subcategory.title,\n            'ticks':{\n              'enabled':true,\n              'style':'straightLine'\n            }\n          },\n          'events':{\n            'load': function(bars){\n              //console.log('chart loaded',bars);\n            }\n          }\n\n        }\n\n        var linesAndCircles = dbox.bars(config);\n        linesAndCircles.generate();",
    "var config = {\n  'bindTo': '#map',\n  'chart':{\n    'background':{\n      'color':'transparent'\n    }\n  },\n  'data':{\n    'raw': vm.dataMap,\n    'sort':{\n      'axis': 'y',\n      'order': 'desc' // asc - 1, desc  -1 ,\n      //'visible':false,\n    },\n    'parser':function(d){\n      var n = {};\n\n      n.id = d._id;\n      n.Estado = d._id;\n      n.z = d.count;\n      return n;\n    },\n    /*'filter':function(d) {\n      return true; //Ignore national values\n    },*/\n    tip:function(d) {\n      console.log(d);\n      var html = '';\n      var total = d3.select('#map svg path#state-'+d.id).attr('data-total');\n\n      html+=d.properties.state_name;\n      if(total % 1 === 0)\n        html+='<br>'+ d3.format(',.0f')(total);\n      else\n        html+='<br>'+ d3.format',.2f')(total);\n\n      return html;\n    },\n    mouseover:function(d,i){\n    },\n    click:function(d,i){\n      console.log(d);\n    }\n  },\n  'events':{\n    'load': function _mapLoaded(chart){\n\n    }\n  },\n  'legend':{\n    'width':210,\n    'fill':'#ececec'\n  },\n  'size':{\n    'width':  width ? width : 555,\n    'height': 440,//$d4db.data.reduceHeight ? 500 : 650,\n    'margin':{top: -5, right: 20, bottom: 90, left: 20},\n    'scale': .95,//setScale(),\n    'translateX': width/5\n  },\n  'template':'dbox-gray',\n  'plotOptions':{\n    'map':{\n      'geo':'mexico',\n      'geoDivision':'states',\n      'units': 'total',//'percentage',\n      'quantiles':{\n        'buckets':5,\n        'colors': [ '#fff', '#cddae6', '#9ab5cd','#688fb4',  '#356a9b' ],\n        'outOfRangeColor': '#969696'\n      }\n    }\n  }\n};\n\nvar map = dbox.map(config);\nmap.generate();"
    ];

    var data = [];
      for(var i = 0; i < 40; i++){
        data.push({x: Math.random() * 20, y: Math.random() * 20, name: ('Dato ' + i)});
      }
      config = {
          'bindTo': '#scatter',
          'size':{
            'width': 555,
            'height':400,
            'margin':{top: 20, right: 50, bottom: 50, left: 50},
          },
          'template':'dbox-gray',
          'chart':{
            'title': "Scatter",
            'subtitle': '',
          },
          'data':{
            'raw': data,
            parser:function(d) {
              d.color = 'steelblue';
              return d;
            },
            tip:function(d) {
              return d.name + "<br>("+ d.x.toFixed(2) +" ,"+ d.y.toFixed(2) +")";
            },
            mouseover: function(d){
            },
            mouseout: function(d){

            },
          },
          'xAxis':{
            'scale' : 'linear',
            'text': ''//subcategory.title
          },
          'yAxis':{
            'visible':true,
            'scale' : 'linear',
            'text': '',//layer.first.variable.title
            'ticks':{
              'enabled':true
            }
          },
          'plotOptions':{
            'scatter':{
              'draw45Line':false
            }
          }
        }

        var scatter = dbox.scatter(config);
        scatter.generate();

        var nested = d3.nest().key(function(d){ return d.x.toFixed(0); }).rollup(function(leaves){ return d3.sum(leaves, function(d){return d.y;}); }).entries(data);

        var config = {
          'bindTo': '#columns',
          'style':'columns',
          'size':{
            'width':  555,
            'height':400,
            'margin':{top: 20, right: 55, bottom: 100, left: 40},
          },
          'template':'dbox-gray',
          'chart':{
            'title': "Columns",
            'subtitle':'',
          },
          'data':{
            'raw': nested,
            'sort':{
              'axis': 'y',
              'order': 'desc', // asc - 1, desc  -1 ,
              //'visible':false,
            },
            parser:function(d) {
              var n = {};
              n.x = +d.key;
              n.y = +d.values;
              n.color = '#fc3'
              return n;
            },
            tip: function(d) {
              return d.x.toFixed(0) +"<br>"+ d.y.toFixed(2);
            },
            mouseover: function(d){
              var vm = this;
              vm._chart._tip.show(d);
            },
            mouseout: function(d){
              var vm = this;
              vm._chart._tip.hide();
            }
          },
          'xAxis':{
            'scale' : 'linear',
            'text'  : '',
            'ticks':{
              'enabled':true
            }
          },
          'yAxis':{
            'scale' : 'linear',
            'text'  : '',//subcategory.title,
            'ticks':{
              'enabled':true,
              'style':'straightLine'
            }
          },
          'events':{
            'load': function(bars){
              var bar = bars.select(data.district_a);
              if( bar !== false){
                bar.attr('fill', '#da2b46')
              };
            }
          },
          'plotOptions':{
            'bars':{
              
            }
          }
        }

        var bars = dbox.bars(config);
        bars.generate();

        config = {
          'bindTo': '#linesAndCircles',
          'style':'lineAndCircles',
          'size':{
            'width': 555,
            'height':400,
            'margin':{top: 20, right: 50, bottom: 100, left: 40},
          },
          'template':'dbox-gray',
          'chart':{
            "title": "Lines and circles",
            "subtitle":'',
          },
          'data':{
            'raw': nested,
            'sort':{
              'axis': 'y',
              'order': 'desc', // asc - 1, desc  -1 ,
              //'visible':false,
            },
            parser:function(d) {
              var n = {};
              n.x = +d.key;
              n.y = +d.values;
              n.color = '#fda709'
              return n;
            },
            tip:function(d) {
              return d.x +"<br>"+ d.y.toFixed(2);
            },
            'highlight':{
              'axis':'x',
              'value':'Lower Dir'
            },
            mouseover: function(d){
              var vm = this;
              vm._chart._tip.show(d);
            },
            mouseout: function(d){
              var vm = this;
              vm._chart._tip.hide();
            },
          },
          'xAxis':{
            'scale' : 'ordinal',
            'text'  : '',
          },
          'yAxis':{
            'scale' : 'linear',
            'text'  : '',//subcategory.title,
            'ticks':{
              'enabled':true,
              'style':'straightLine'
            }
          },
          'events':{
            'load': function(bars){
              //console.log('chart loaded',bars);
            }
          }

        }

        var linesAndCircles = dbox.bars(config);
        linesAndCircles.generate();

        var config = {
          'bindTo': '#quantileAndCircles',
          'style':'quantilesAndCircles',
          'size':{
            'width': 555,
            'height': 400,
            'margin':{top: 20, right: 10, bottom: 100, left: 40},
          },
          'data':{
            'raw': data,
            'sort':{
              'axis': 'x',
              'order': 'asc', // asc - 1, desc  -1 ,
              //'visible':false,
            },
            parser:function(d) {            
              var n = {};
              n.x = +d.x;
              n.y = +d.y;
              n.color = "yellowgreen"

              return n;
            },
            tip: function(d) {
              return d.x +"<br>"+ d.y.toFixed(2);
            },
            'highlight':{
              'axis':'x',
              'value':'Lower Dir'
            },
            mouseover: function(d){
              var vm = this;
              vm._chart._tip.show(d);
            },
            mouseout: function(d){
              var vm = this;
              vm._chart._tip.hide();
            }
          },
          'xAxis':{
            'scale' : 'quantile',
            'text'  : '',
            'buckets': 5
          },
          'yAxis':{
            'scale' : 'linear',
            'text'  : '',
            'ticks':{
              'enabled':true,
              'style':'straightLine'
            }
          },
          'events':{
            'load': function(bars){
            }
          }
        }

        var quantileAndCircles = dbox.bars(config);
        //quantileAndCircles.generate();

                vm.dataMap = [];
        for(var i = 1; i <= 32; i++){
          vm.dataMap.push({
            _id: i, //< 10 ? '0'+ i : '' + i,
            count: Math.ceil(Math.random() * 100)
          })
        }
        console.log(vm.dataMap);

        var width = 855;
        var config = {
          'bindTo': '#map',
          'chart':{
            'background':{
              'color':'transparent'
            }
          },
          'data':{
            'raw': vm.dataMap,
            'sort':{
              'axis': 'y',
              'order': 'desc' // asc - 1, desc  -1 ,
              //'visible':false,
            },
            'parser':function(d){
              var n = {};

              n.id = d._id;
              n.Estado = d._id;
              n.z = d.count;
              return n;
            },
            /*'filter':function(d) {
              return true; //Ignore national values
            },*/
            tip:function(d) {
              console.log(d);
              var html = '';
              var total = d3.select('#map svg path#state-'+d.id).attr('data-total');

              html+=d.properties.state_name;
              if(total % 1 === 0)
                html+='<br>'+ d3.format(",.0f")(total);
              else
                html+='<br>'+ d3.format(",.2f")(total);

              return html;
            },
            mouseover:function(d,i){
            },
            click:function(d,i){
              console.log(d);
            }
          },
          'events':{
            'load': function _mapLoaded(chart){
                
            }
          },
          'legend':{
            'width':210,
            'fill':'#ececec'
          },
          'size':{
            'width':  width ? width : 555,
            'height': 440,//$d4db.data.reduceHeight ? 500 : 650,
            'margin':{top: -5, right: 20, bottom: 90, left: 20},
            'scale': .95,//setScale(),
            'translateX': width/5
          },
          'template':'dbox-gray',
          'plotOptions':{
            'map':{
              'geo':'mexico',
              'geoDivision':'states',
              'units': 'total',//'percentage',
              'quantiles':{
                'buckets':5,
                'colors': [ '#fff', '#cddae6', '#9ab5cd','#688fb4',  '#356a9b' ],
                'outOfRangeColor': '#969696'
              }
            }
          }
        };

        var map = dbox.map(config);
        map.generate();
  }
  
})();