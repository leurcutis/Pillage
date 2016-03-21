<!-- Modeling will go here: -->
###"Pillage!" Model

##Objects

* Player One and Player Two
* The Board (aka "The Arena")
* The Characters

##Object Heirarchy

* PlayerOne
    + pOneAssassin
    + pOneJuggernaut
    + pOneWizard

* PlayerTwo
    + pTwoAssassin
    + pTwoJuggernaut
    + pTwoWizard

* The Board (aka The Arena)
    + PlayerOne
        - pOneAssassin
        - pOneJuggernaut
        - pOneWizard
    + PlayerTwo
        - pTwoAssassin
        - pTwoJuggernaut
        - pTwoWizard

* The Characters

##Actions

* Character Movement
* Character Attack
* Character Damage (character's hit point adjustment after attack)
* Character Death



##Action Heirarchy

Character | Movement, Attack, Damage, Death

##State Heirarchy

* Start Game state
* Playing state
* Winning state

<!-- Pseudo code will go here: -->
###Pseudo Code

##Reseting the Game

Loading or Reloading the site resets the game
* resets and displays the board
* places characters in their starting positions
    + resets character hitpoints to full

##Creating Characters

Object Constructor with defined attributes
    * MoveRate
    * attackProximity
    * attackRate
    * hitPoints




##Starting the Game

Click 'Start Game' button starts game
* enables "turns" to take place
* makes characters interactive

##Winning Conditions
If a character hit points are < 1
    Check for winning conditions

If only either Player One || Player Two is still in play
    game ends
    
##Turns

Turns have two parts: the Movement Phase and the Attack Phase. The
Movement phase must be satisfied in order to begin the Attack Phase.
When the Attack Phase is completed, the turn ends which initiates
the next Player's turn.

###Movement

Default, **Player One** always gets first move. Each turn switches
between Player One and Player Two.
    
* Player clicks a character to initiate a move
    + Check move rate thresholds for selected character
    
* If move, click target space {
    + Player Moves
}

* Else if player clicks outside of move threshold {
    + generate message ('That's too far, dummy!')
}

* Else if friendly character occupies space {
    + generate message ('hey! find your own space, dummy!') 
}
    
* Else if no move {
    + click again on selected character
}
    
###Attack

The Attack phase takes place after fullfilling Movement phase

* Check if opponents occupy spaces within attack range
        
    + If yes, Player One can click on opponent(s) to attack 
        - subtract one hit point from victim's total
            
            * update hit points in victim character object

                + If character object hitPoints are > 1,
                    - then character is removed from board (dies)
                        * check for winning conditions
                
                + Else character continues playing
        
        - Else If not, player clicks on selected character to bypass attack phase
        
        - Else, character ends move phase, move to next character
        
        - Checks to see if 
    
    + Player One moves second character
    
    + Player One moves third character



