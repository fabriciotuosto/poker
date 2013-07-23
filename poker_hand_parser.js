var _ = require('underscore');
var hands = require('./hands.js');

var dumb_hand = function(){
  return {
    compare : function(){
      return this;
    },
    toCardString: function(){
      return "AC AC AC AC AC";
    }
  };
};

var pre_parse = function(cards){
  var numbers_histogram = {};
  var suits_histogram = {};
  var counter = function(object,key){
    if(!Object.hasOwnProperty.call(object,key)){
      object[key] = 0;
    }
    object[key] += 1;
  };
  cards.forEach(function(card){
    counter(numbers_histogram,card[0]);
    counter(suits_histogram,card[1]);
  });
  return {
    numbers_histogram : numbers_histogram,
    suits_histogram : suits_histogram,
    numbers : _.map(Object.keys(numbers_histogram),numerical_value).sort(compare_numbers),
    hasFlush : Object.keys(suits_histogram).length === 1
  }
};

var compare_numbers = function(a,b){return a-b;};
var numerical_value = function(card_number){
  var transformed = {
    T : 10,
    J : 11,
    Q : 12,
    K : 13,
    A : 14
  };
  var value = +card_number;
  if(isNaN(value)){
    value = transformed[card_number];
  }
  return value;
};


var hasStraight = function(statistics){

};
var hasPoker = function(statistics){
  return _max(_.values(statistics.numbers_histogram)) === 4;
};

var hasThree = function(statistics){
  return _max(_.values(statistics.numbers_histogram)) === 3;
};
var hasPair = function(statistics){
  return _max(_.values(statistics.numbers_histogram)) === 2;
};

var hasFullHouse = function(statistics){
  return hasPair(statistics) && hasThree(statistics);
};
var hasTwoPair = function(statistics){
  if(!hasPair(statistics)){
    return false;
  }
  var n = Object.keys(statistics.numbers_histogram);
  var pair_count = 0;
  n.forEach(function(key){
    if(statistics.numbers_histogram[key] === 2){
      pair_count+=1;
    }
  });
  return pair_count === 2;
};

var hand_parser = function(cards){

  var statistics = pre_parse(cards);
  if(hasStraight(statistics)){
    return statistics.hasFlush ? hands.straight_flush(cards,statistics) : hands.straight(cards.statistics);
  }

  return dumb_hand();
};


module.exports = hand_parser;