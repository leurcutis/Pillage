
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

//Resets the game, clears the board (reloads the page)

$('.resetGameButton').on('click', function() {
  console.log('reset button clicked');
  location.reload();

});


//Puts both the character image and the character object on the board in specific locations
//Clicking the 'Pillage!' button (startGameButton) shows the characters

$('.startGameButton').on('click', function() {

  $('#Row2-Column0').append(playerOne.characters[0].img);
  $('#Row2-Column0').data(playerOne.characters[0]);

  $('#Row4-Column0').append(playerOne.characters[1].img);
  $('#Row4-Column0').data(playerOne.characters[1]);

  $('#Row3-Column1').append(playerOne.characters[2].img);
  $('#Row3-Column1').data(playerOne.characters[2]);


  $('#Row2-Column12').append(playerTwo.characters[0].img);
  $('#Row2-Column12').data(playerTwo.characters[0]);

  $('#Row4-Column12').append(playerTwo.characters[1].img);
  $('#Row4-Column12').data(playerTwo.characters[1]);

  $('#Row3-Column11').append(playerTwo.characters[2].img);
  $('#Row3-Column11').data(playerTwo.characters[2]);


// startGameButton is hidden when clicked

  $('.startGameButton').hide();

});

// Console logs the id, which simply displays coordinates
$('.space').on('click', function(){
  targetObject = $(this);
  console.log(this.id + ' has been clicked');
});


// Arrays for storing data collected from move and attack events

var tempMove = [];
var currentCoord = [];
var destCoord = [];

// Variables of 'selected player' and 'target enemy' to be used in move and attack events
var tempObject;
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

// Character variables
var moveRadius;
var attackRadius;
var hitPoints;
var attackDamage;
var alignment;


var occupiedSpace = [];

var p1score=0;
var p2score=0;


//Separates the enemy players:
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
    console.log('Enemy player is', enemyPlayer);

    if (myPlayer === enemyPlayer) {
      console.log('Friendly space!');

    } else {
      console.log('Enemy space!');
    }
  }
};

// This is where both move and attack events start:
$('.space').click(function() {

  console.log(tempObject);
  console.log(targetObject);

// Both move and attack events start by validating that the td ".space" clicked on has a character in it.
  if($(this).children().length === 1 && !selected) {
    selected = true;

// I save the object validated into the 'tempMove' array so that I can refer to it later.
    tempMove.push($(this).children());

// Once the above is validated, I retrieve the coordinates of the space using the 'getCoord' function
    currentCoord = getCoord($(this).attr('id'));
    tempObject = $(this);
    moveRadius = tempObject.data().moveRadius;
    attackRadius = tempObject.data().attackRadius;


  } else if($(this).children().length === 0 && !selected) {
    console.log("you haven't selected anything yet!");
  } else {
      targetObject = $(this);

      if($(this).children().length === 0) {
        destCoord = getCoord($(this).attr('id'));
        var tempDist = getDist(currentCoord, destCoord);

        if(moveRadius >= tempDist) {
          selected = false;
          $(this).append(tempMove[0]);
          $(this).data(tempObject.data());
          tempObject.removeData();

          tempMove = [];

        } else {
            alert("This character can't move that far!");
            return false;
        }
      } else {
          destCoord = getCoord($(this).attr('id'));
          var tempDist = getDist(currentCoord, destCoord);

          if(attackRadius >= tempDist) {
            selected = false;

            if(targetObject && tempObject){

              if(tempObject.data().alignment === targetObject.data().alignment){
                console.log('Friendly fire!');

              } else {
                  console.log('Attack!');

                  if(targetObject.data().alignment === 'playerOne'){
                    p2score++;

                    if(p2score === 3){
                      alert('Player One wins!');
                    }

                  } else if(targetObject.data().alignment === 'playerTwo'){
                    p1score++;

                    if(p1score === 3){
                      alert('Player Two wins!');
                    }
                  }
                  $('body').append($(this).children());
                  targetObject.removeData();
              }

            }

          } else {
              alert('Too far to move!');
              return false;
          }
        }
      }
    });




