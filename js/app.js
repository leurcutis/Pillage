
// playerOne and playerTwo objects below
// 'characters' arrays in each contain all three character classes
// Each character class has it own attributes

 var playerOne = {
   name : 'Player One',
   characters : [
      pOneWizard = {
        name : 'Player One Wizard',
        img : '<img id="pOneWizard" src=\'http://i.imgur.com/kr285Wm.png\'>',
        moveRadius : 2,
        attackRadius : 3,
        attackDamage : 1,
        hitPoints : 7,
        objectId : '0p1',
        alignment : 'playerOne'
      },
      pOneAssassin = {
        name : 'Player One Assassin',
        img : '<img id="pOneAssassin" src=\'http://i.imgur.com/Lm5TnEF.png\'>',
        moveRadius : 3,
        attackRadius : 1,
        attackDamage : 1,
        hitPoints : 5,
        objectId : '1p1',
        alignment : 'playerOne'

      },
      pOneJuggernaut = {
        name : 'Player One Juggernaut',
        img : '<img id="pOneJuggernaut" src=\'http://i.imgur.com/vGUprxO.png>\'>',
        moveRadius : 1,
        attackRadius : 1,
        attackDamage : 2,
        hitPoints : 9,
        objectId : '2p1',
        alignment : 'playerOne'

      }
    ]
 };

 var playerTwo = {
   name : 'Player_Two',
   characters : [
      pTwoWizard = {
        name : 'Player Two Wizard',
        img : '<img id="pTwoWizard" src=\'http://i.imgur.com/KFSlZsV.png\'>',
        moveRadius : 2,
        attackRadius : 3,
        attackDamage : 1,
        hitPoints : 7,
        objectId : '0p2',
        alignment : 'playerTwo'
      },
      pTwoAssassin = {
        name : 'Player Two Assassin',
        img : '<img id="pTwoAssasin" src=\'http://i.imgur.com/80LqFIt.png\'>',
        moveRadius : 3,
        attackRadius : 1,
        attackDamage : 1,
        hitPoints : 5,
        objectId : '1p2',
        alignment : 'playerTwo'
      },
      pTwoJuggernaut = {
        name : 'Player Two Juggernaut',
        img : '<img id="pTwoJuggernaut" src=\'http://i.imgur.com/gbcDNuD.png\'>',
        moveRadius : 1,
        attackRadius : 1,
        attackDamage : 2,
        hitPoints : 9,
        objectId : '2p2',
        alignment : 'playerTwo'
      }
    ]
 };


 //Reaches into each player object and defines the character's images to use as variables to be shown on the board

 var p1Wizard = playerOne.characters[0].img;
 var p1Assassin = playerOne.characters[1].img;
 var p1Juggernaut = playerOne.characters[2].img;

 var p2Wizard = playerTwo.characters[0].img;
 var p2Assassin = playerTwo.characters[1].img;
 var p2Juggernaut = playerTwo.characters[2].img;


//Resets the game, clears the board (reloads the page)

$('.resetGameButton').on('click', function() {
  console.log('reset button clicked');
  location.reload();

});


//Puts both the character image and the character object on the board in specific locations
//Clicking the 'Pillage!' button (startGameButton) shows the characters

$('.startGameButton').on('click', function() {

  $('#Row2-Column0').append(p1Wizard);
  $('#Row2-Column0').data(playerOne.characters[0]);

  $('#Row4-Column0').append(p1Assassin);
  $('#Row4-Column0').data(playerOne.characters[1]);

  $('#Row3-Column1').append(p1Juggernaut);
  $('#Row3-Column1').data(playerOne.characters[2]);


  $('#Row2-Column12').append(p2Wizard);
  $('#Row2-Column12').data(playerTwo.characters[0]);

  $('#Row4-Column12').append(p2Assassin);
  $('#Row4-Column12').data(playerTwo.characters[1]);

  $('#Row3-Column11').append(p2Juggernaut);
  $('#Row3-Column11').data(playerTwo.characters[2]);


// startGameButton is hidden when clicked

  $('.startGameButton').hide();

});


// The begining move logic below

var tempMove = [];      // for temporarily storing what is being moved after initialize move conditions are met
var currentCoord = [];  // for storing the coordinates for the initial space where the character is selected and moved out of
var destCoord = [];     // for storing the coordinates for the target space the character is moving into
var tempObject;         // refers to the object that is currently occupying the space clicked
var targetObject;
var selected = false;


// Parses the space ID (string) for integers, which are then passed into the getDist function below as coordinates

var getCoord = function(str) {
  var tempRow = parseInt(str[3]);
  var tempCol = parseInt(str[11] + str[12]);
  return [tempRow, tempCol];
};

// Takes the integer coordintes (from both initial and target spaces) from the getCoord function above and determines the distance of the radius of a click with math

var getDist = function(coord1, coord2) {
  return Math.floor(Math.sqrt(Math.pow(coord1[0] - coord2[0], 2) + Math.pow(coord1[1] - coord2[1], 2)));
};

var turnCounter = 0;

var moveRadius;
var attackRadius;
var hitPoints;
var attackDamage;
var alignment;

var occupiedSpace = [];
var attackableSpace = [];

var turn = function() {
  turnCounter++;
  return turnCounter;
};



//when a space on the board is selected...

$('.space').click(function(){

  console.log(tempObject);
  console.log(targetObject);


  if($(this).children().length === 1 && !selected)  { //...check clicked space to see if it is empty && if it is not 'selected'
    selected = true;                                  //...if not selected, select it
    tempMove.push($(this).children());                //...put what is in space into tempMove array (above)

    currentCoord = getCoord($(this).attr('id'));      //...assign 'currentCoord' array (above) to the output of 'getCoord' function (above)
    tempObject = $(this);                             //...assign the space to 'tempObject' variable
    moveRadius = tempObject.data().moveRadius;        //...assign the variable 'moveRadius' (above) to the 'moveRadius' value of the object currently in that space
  }

  if($(this).children().length === 0) {               //...check target click space to see if it is empty
    destCoord = getCoord($(this).attr('id'));         //...assign 'destCoord' array (above) to the output of 'getCoord' function (above)
    var tempDist = getDist(currentCoord, destCoord);  //...create local variable 'tempDist' and assign it to output of the 'getDist' function output

    if (moveRadius >= tempDist) {                     //...
      selected = false;                               //...
      $(this).append(tempMove[0]);                    //...
      $(this).data(tempObject.data());                //...
                                                      //.
      tempMove = [];

    } else {
        alert("This character can't move that far!");
        return false;
    }
    // turn();
    // console.log(turn());

    //attackRadius = tempObject.data().attackRadius

  } else {

      checkAttack();

  }

});

var checkAttack = function() {
  if(targetObject&&tempObject){
    if(tempObject.data().alignment!=targetObject.data().alignment){
      console.log("Attack!");
      $('body').append(tempMove[0]);
      tempMove = [];
       selected = false;
    }
  }
};

$('.space').on('click', function(){
  targetObject = $(this);
  console.log(this.id + ' has been clicked');
});

var checkOccupiedSpaces = function() {
  $('.space').each( function() {
    if ($(this).children().length >= 1) {
      occupiedSpace.push(this);
    }
  });
  for(i = 0;i < occupiedSpace.length; i++) {
    console.log($(tempObject).data().alignment);
    var myPlayer = $(tempObject).data().alignment;
    console.log('My player is', myPlayer);
    var enemyPlayer = $(occupiedSpace[i]).data().alignment;
    console.log('Enemy player is', theirPlayer);
    if (myPlayer === theirPlayer) {
      console.log('Friendly space!');
    } else {
      console.log('Enemy space!');
    }
  }
};

$(tempObject).removeData();



//Attack
//if successful move, run a check within character's attack radius
//for objects not within the object of the character that is moving

//upon successful move, loop through .space


// $( '.space' ).filter( function( index ) {
//   occupiedSpace.push( index ).length <= 1;
// });

// var charLoc = function(obj, coordX, coordY) {
//       obj.locx = coordX;
//       obj.locy = coordY;

// };
//if a space has a child element, push into array of 'occupiedSpace'
//then using the getDist function get the distance between the current space
//and every occupied space
//if a space that is occupied that is within the attack radius
//push to new array called attackable
//loop through attackable array
//then if child element is opponent player

//then utilze attackDamage math
//then 1 attack takes place then don't look for another option to attack
//



