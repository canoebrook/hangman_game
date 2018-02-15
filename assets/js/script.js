 // Create reference variables for our DOM Elements
 var hmWinsHTML        = document.getElementById('hm-wins');
 var hmLossesHTML      = document.getElementById('hm-losses');
 var hmGuessesLeftHTML = document.getElementById('hm-guessesLeft');
 var hmAnswerHTML      = document.getElementById('hm-answer');
 var hmGuessesHTML     = document.getElementById('hm-guesses');
 var hmStatusBarHTML   = document.getElementById('hm-statusBar');


 // Create reference to our reset button
 var resetButton = document.getElementById('reset-button');

 // Keeping track of progress variables
 var wins = 0;
 var losses = 0;
 var guessesLeft = 10
 
 var hmWordArray = ['AFTERLIFE', 'SUPERSYMMETRY','REFLEKTOR','WINDOWSILL','INTERVENTION','ROCOCO','NEIGHBORHOOD','REBELLION','PORNO','HAITI'];

 var hm = {
   validChars:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
   answer: null,
   displayAnswer: null,
   guesses: [],
   initGame: function () {
    var i        = Math.floor(Math.random() * 10);
    this.answer  = hmWordArray[i];
    this.guesses = null;
    guessesLeft  = 10;
    this.answer.forEach(function(answer) {
      this.displayAnswer += "_";
    });
    hmAnswerHTML.textContent = this.displayAnswer;
    hmStatusBarHTML.textContent      = "Guess any letter from A to Z";
   },
   win: function() {
      if (this.answer === this.displayAnswer) {
         return true;
      }
      else {
         return false;
      }
   },
   validKey: function (userKey) {
      if (this.validChars.indexOf(userKey) != -1 
      && this.guesses.indexOf(userKey) === -1)
        return true;
      else
        return false;
   },
   processKey: function(userKey) {
      this.guesses += userKey;
      guessesLeft--;
      
      for (let i = 0; i < this.answer.length; i++) {
        const e = this.answer[i];
        if (e==userKey) { 
           this.displayAnswer[i] = e;
        }
      }
      hmAnswerHTML.textContent      = this.displayAnswer;

      if (win()) {
        hmStatusBarHTML.textContent      = 'You Win!';
      }
      else if (guessesLeft < 1 ) {
        hmStatusBarHTML.textContent      = 'You Lose!';
      }
      else {
        hmStatusBarHTML.textContent      = 'Keep Guessing!';
      }
   },

 };

//  Initially write default Hangman info to DOM
hm.initGame();
hmWinsHTML.textContent        = hm.wins;
hmLossesHTML.textContent      = hm.losses;
hmGuessesLeftHTML.textContent = hm.guessesLeft;
hmAnswerHTML.textContent      = hm.displayAnswer;
hmGuessesHTML.textContent     = hm.guesses;


//  Listen for keyup event on document (DOM)
 document.onkeyup = function (event) {
   console.log(event);

   // capture whatever keyboard key i just clicked
  //  var userKey = event.key;
  var userKey = toString(event.key).toUpperCase;
  
  if (hm.validKey(userKey)) {
    hm.processKey(userKey);
  }  
 }

 // Adds a 'click' event listener to our resetButton and executes car.reWriteStats on click
 resetButton.addEventListener('click', hm.initGame);