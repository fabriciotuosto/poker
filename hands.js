var signum = function(number){
 return number > 0 ? 1 : number < 0 ? -1 : 0;
};
var hand = function(value){
  var value;
  return {
    getValue : function(){return value},
    equalHandCompare : function(){ throw new Error('Has to be overriden');},
    compare : function(other){
      var result =  signum(this.getValue() - other.getValue());
      console.log('Result', result);
      if(result === 0){
        result = this.equalHandCompare(this,other);
      }
      return result >= 0 ? this : other;
    }
  };
};

var high_card = function(cards){
  var that = hand(1);
  that.getCards = function(){
    return cards;
  };
  return that;
};

var pair = function(pair,kickers){
  var that = hand(2);
  that.getPair = function(){
    return pair;
  };
  that.getKickers = function(){
    return kickers;
  };
  that.equalHandCompare = function(other){
    var result = signum(pair - other.getPair());
    if(result === 0){
      var other_kickers = other.getKickers();
      var i = 0;
      while(result === 0 && i < 3){
        result = signum(kickers[i]-other.get);
        i+=1;
      }
    }
    return result;
  };
  return that;
};

var two_pairs = function(high_pair,low_pair,kicker){
  var that = hand(3);
};

var three = function(threes,kickers){
  var that = hand(4);
};

var straight = function(cards){
  var that = hand(5);
};

var flush = function(kickers){
  var that = hand(6);
};

var full_house = function(threes,pair){
  var that = hand(7);
};

var poker = function(fours,kicker){
  var that = hand(8);
};

var straight_flush = function(cards){
  var that = hand(9);
};

module.exports={
  hand : hand,
  high_card : high_card,
  pair : pair,
  two_pairs : two_pairs,
  three : three,
  straight : straight,
  flush : flush,
  full_house : full_house,
  poker : poker,
  straight_flush : straight_flush
}