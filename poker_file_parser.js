var fs    = require('fs');

var file_parser = function(file_path) {
  var file = fs.readFileSync(file_path,'utf-8');
  var lines = file.split('\n');
  return {
    forEachRound : function(iterator){
      var arrayLine,line;
      //lines.forEach(function(line){
        line = lines[0];
         arrayLine = line.split(' ');
         var first = arrayLine.splice(0,5);
         var second = arrayLine;
         iterator(first,second);
      //});      
    }
  }
};

module.exports = file_parser;