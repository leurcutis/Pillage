




// player one and player two objects below
// both have 'characters' arrays that are populated with characters when game starts
// when attacks take place

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
        objectId : '0p1'
      },
      pOneAssassin = {
        name : 'Player One Assassin',
        img : '<img id="pOneAssassin" src=\'http://i.imgur.com/Lm5TnEF.png\'>',
        moveRadius : 3,
        attackRadius : 1,
        attackDamage : 1,
        hitPoints : 5,
        objectId : '1p1'

      },
      pOneJuggernaut = {
        name : 'Player One Juggernaut',
        img : '<img id="pOneJuggernaut" src=\'http://i.imgur.com/vGUprxO.png>\'>',
        moveRadius : 1,
        attackRadius : 1,
        attackDamage : 2,
        hitPoints : 9,
        objectId : '2p1'
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
        objectId : '0p2'
      },
      pTwoAssassin = {
        name : 'Player Two Assassin',
        img : '<img id="pTwoAssasin" src=\'http://i.imgur.com/80LqFIt.png\'>',
        moveRadius : 3,
        attackRadius : 1,
        attackDamage : 1,
        hitPoints : 5,
        objectId : '1p2'
      },
      pTwoJuggernaut = {
        name : 'Player Two Juggernaut',
        img : '<img id="pTwoJuggernaut" src=\'http://i.imgur.com/gbcDNuD.png\'>',
        moveRadius : 1,
        attackRadius : 1,
        attackDamage : 2,
        hitPoints : 9,
        objectId : '2p2'
      }
    ]
 };






 //reaching into each player object and defining the character's
 // images to use as variables

 var p1Wizard = playerOne.characters[0].img;
 var p1Assassin = playerOne.characters[1].img;
 var p1Juggernaut = playerOne.characters[2].img;

 var p2Wizard = playerTwo.characters[0].img;
 var p2Assassin = playerTwo.characters[1].img;
 var p2Juggernaut = playerTwo.characters[2].img;

 // var allCharacters =

 //hard coded the starting places of each of the characters
 //It also initializes the game

function initializeGame(){

  $('#Row2-Column0').append(p1Wizard);
  $('#Row3-Column1').append(p1Juggernaut);
  $('#Row4-Column0').append(p1Assassin);

  $('#Row2-Column12').append(p2Wizard);
  $('#Row3-Column11').append(p2Juggernaut);
  $('#Row4-Column12').append(p2Assassin);
}
initializeGame();

//This logs the clicks on the td's in the console and gives
//the coordinates

$('td').on('click', function(){
  console.log(this.id + ' has been clicked');
});

//the begining move logic below

// click on character i want to move,
// which selects the character
// then click on the space
// I want the character to move too

// original space removes the character image
// from the space moved away from
// and adds it to the new space

// var board = [
// [null, null, null, null, null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null, null, null, null, null],
// [null, null, null, null, null, null, null, null, null, null, null, null],
// ]

// for(i = 0, i < something; i++) {
//   for(j = 0, j < something; i++)
// }


// when I click on any space
// if that space has children = 1
// then log 'boom'

// record the thing we clicked (which piece) <- push it into an array
// the next thing we click must be an open space
// if it's open, append the thing we clicked before (which we get from the array), to what we just clicked.


//create variables for hitPoints, moveRate, attackRadius that reach into each character object
// var p1WizardHitPoints = playerOne.characters[0].hitPoints;
// var p1WizardMoveRadius = playerOne.characters[0].moveRadius;
// var p1WizardAttackDamage = playerOne.characters[0].attackDamage;
// var p1WizardAttackRadius = playerOne.characters[0].attackRadius;

// var p1AssassinHitPoints = playerOne.characters[1].hitPoints;
// var p1AssassinMoveRadius = playerOne.characters[1].moveRadius;
// var p1AssassinAttackDamage = playerOne.characters[1].attackDamage;
// var p1AssassinAttackRadius = playerOne.characters[1].attackRadius;

// var p1JuggernautHitPoints = playerOne.characters[2].hitPoints;
// var p1JuggernautMoveRadius = playerOne.characters[2].moveRadius;
// var p1JuggernautAttackDamage = playerOne.characters[2].attackDamage;
// var p1JuggernautAttackRadius = playerOne.characters[2].attackRadius;



// var p2WizardHitPoints = playerTwo.characters[0].hitPoints;
// var p2WizardMoveRadius = playerTwo.characters[0].moveRadius;
// var p2WizardAttackDamage = playerTwo.characters[0].attackDamage;
// var p2WizardAttackRadius = playerTwo.characters[0].attackRadius;

// var p2AssassinHitPoints = playerTwo.characters[1].hitPoints;
// var p2AssassinMoveRadius = playerTwo.characters[1].moveRadius;
// var p2AssassinAttackDamage = playerTwo.characters[1].attackDamage;
// var p2AssassinAttackRadius = playerTwo.characters[1].attackRadius;

// var p2JuggernautHitPoints = playerTwo.characters[2].hitPoints;
// var p2JuggernautMoveRadius = playerTwo.characters[2].moveRadius;
// var p2JuggernautAttackDamage = playerTwo.characters[2].attackDamage;
// var p2JuggernautAttackRadius = playerTwo.characters[2].attackRadius;



var tempMove = [];
// gets the coordinates of specific .space click
var currentCoord = [];
var destCoord = [];

var getMove;

var getCoord = function(str) {
  var tempRow = parseInt(str[3]);
  var tempCol = parseInt(str[11] + str[12]);
  return [tempRow, tempCol];
};

  var getDist = function(coord1, coord2) {
  return Math.floor(Math.sqrt(Math.pow(coord1[0] - coord2[0], 2) + Math.pow(coord1[1] - coord2[1], 2)));
};

$('.space').click(function(){

  if($(this).children().length === 1) {
    tempMove.push($(this).children());
    currentCoord = getCoord($(this).attr('id'));
  }

  if($(this).children().length === 0) { // reach into the clicked td and look for an object $(this).children()
    destCoord = getCoord($(this).attr('id'));
    var tempDist = getDist(currentCoord, destCoord);
    console.log(tempDist);
    $(this).append(tempMove[0]);
    tempMove = [];
  }
});

// if (getMove <= 4)  {
//   return true;
// } else {
//   return false;
// }

//when clicking square with a character in it, determine what player it is
//then determine what character it is























// $('.space').click(function(){

//   if($(this).children().length === 0) {
//     destCoord = getCoord($(this).attr('id'));
//     var tempDist = getDist(currentCoord, destCoord);
//     console.log(tempDist);
//     $(this).append(move[0]);
//     move = [];
//   }
// });



// var origSpace = null
// $('characters').on('click', function()) {
//   if (origSpace) === null && (".space" !== ''); {
//         origSpace = (this);
//   } else (this).appendTo('.space');
//   origSpace.removeClass;
//   (this).addClass;


// var playerMove = function() {

// }



// // Character constructor below

// var Character = function(moveRate, attackProximity, attackDamage, hitPoints ) {
//   this.characterMoveRate = moveRate;
//   this.characterAttackProximity = attackProximity;
//   this.characterAttackDamage = attackDamage;
//   this.characterHitPoints = hitPoints;
// };

//  Characters generated by above Character constructor
//  after each one is generated, they are pushed into the playerOne and playerTwo object arrays
//  when a character is killed by 'hitPoints < 1' then they are removed from the array
//  when an array is emptied during play, then game is over
//  player with an array that still contains character objects wins the game

// var pOneAssassin = new Character(3, 1, 1, 5);
// playerOne.characters.push(pOneAssassin);

// var pOneJuggernaut = new Character(1, 1, 2, 9);
// playerOne.characters.push(pOneJuggernaut);

// var pOneWizard = new Character(2, 3, 1, 7);
// playerOne.characters.push(pOneWizard);



// var move = function(character) {

// character moves
// check for attack opportunity within threshold
// if yes, then call attack function here

// };


// var attack = function {
//    if opponent is in range
//      then attack
//
// }
//  Player prototypes

//  Character.prototype.player


//  Move logic


//  Attack logic

