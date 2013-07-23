

var _           = require('underscore');
var file_parser = require('./poker_file_parser.js');
var hand_parser = require('./poker_hand_parser.js');
var parser      = file_parser('poker.txt');
var index       = 1;

console.log('Hand\tPlayer 1\tPlayer 2\tWinner');
parser.forEachRound(function(player_1,player_2){
  var hand_1 = hand_parser(player_1);
  var hand_2 = hand_parser(player_2);
  var winner = hand_1.compare(hand_2);
  winner = winner === hand_1 ? 1 : 2;
  console.log(index+'\t'+hand_1.toCardString()+'\t'+hand_2.toCardString()+'\tPlayer'+winner);
  index+=1;
});