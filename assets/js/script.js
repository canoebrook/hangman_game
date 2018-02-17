
$(document).ready(function() {
 
 // Create reference variables for our DOM Elements
 var hmWinsHTML        = document.getElementById('hm-wins');
 var hmLossesHTML      = document.getElementById('hm-losses');
 var hmGuessesLeftHTML = document.getElementById('hm-guessesLeft');
 var hmAnswerHTML      = document.getElementById('hm-answer');
 var hmGuessesHTML     = document.getElementById('hm-guesses');
 var hmStatusBarHTML   = document.getElementById('hm-statusBar');

 var audioElement = document.createElement("audio");

 // Create reference to our reset button
 var resetButton = document.getElementById('reset-button');

 // Keeping track of progress variables
 var wins = 0;
 var losses = 0;
 var guessesLeft = 10
 var answer = [];
 var song = [];

 var hmWordArray = ['AFTERLIFE', 'SUPERSYMMETRY','REFLEKTOR','WINDOWSILL','INTERVENTION','ROCOCO','NEIGHBORHOOD','REBELLION','PORNO','CHEMISTRY'];

 var hmSongArray = ['Afterlife.m4a','Supersymmetry.m4a','Reflektor.m4a','Windowsill.m4a','Intervention.m4a','Rococo.m4a','Neighborhood.m4a','Rebellion.m4a','Porno.m4a','Chemistry.m4a']

 var hm = {
   validChars:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  //  answer: "________",
   displayAnswer: '',
   guesses:[],
   wins: wins,
   losses: losses,
   guessesLeft: guessesLeft,
   initGame: function () {
    var i        = Math.floor(Math.random() * 10);
    console.log("i = "+i);
    answer  = hmWordArray[i];
    song  = hmSongArray[i];
    console.log(answer);
    this.guesses = [];
    this.guessesLeft  = 10;
    this.displayAnswer = '';
    for (let y = 0; y < answer.length; y++) {
      if (this.displayAnswer == null) {
        this.displayAnswer = "_";
        
      }
      else { 
        this.displayAnswer += "_";
      }
    };
    hmGuessesLeftHTML.textContent = guessesLeft;    
    hmAnswerHTML.textContent = this.displayAnswer;
    hmGuessesHTML.textContent = [];
    hmStatusBarHTML.textContent      = "Guess any letter from A to Z";
    return true;
   },
   win: function() {
    //  console.log(this.answer);
    //  console.log(this.displayAnswer);
    //  console.log(this.displayAnswer.replace(' ',''));   
      if (answer === this.displayAnswer) {
         this.wins += 1;
         hmWinsHTML.textContent        = this.wins;
         return true;
      }
      else {
         return false;
      }
   },
   validKey: function (userKey) {
      // console.log(this.validChars);
      if (this.validChars.indexOf(userKey.toUpperCase()) === -1) {
        return false;
      }
      console.log(this.guesses);
      if (this.guesses.indexOf(userKey.toUpperCase()) !== -1) {
        return false;
      }
      return true;
   },
   processKey: function(userKey) {
      var newlen = this.guesses.push(userKey.toUpperCase());
      hmGuessesHTML.textContent     = this.guesses;
      console.log('in in? '+answer.indexOf(userKey.toUpperCase()));
      if (answer.indexOf(userKey.toUpperCase()) === -1) {
        this.guessesLeft -= 1;
        hmGuessesLeftHTML.textContent = this.guessesLeft;
      }
      else { 
        for (var i = 0; i < answer.length; i++) {
          const e = answer[i];
          if (e===userKey.toUpperCase()) { 
             var s = this.displayAnswer.substr(0,i) + e + this.displayAnswer.substr(i+1);
             this.displayAnswer = s;
             console.log(this.displayAnswer);
          }
        }
      }
      hmAnswerHTML.textContent      = this.displayAnswer;

      if (hm.win()) {
        hmStatusBarHTML.textContent      = 'You Win!';
        // var audioElement = document.createElement("audio");
        audioElement.setAttribute("src", "assets/images/"+song);
        audioElement.play();   
        alert('You Win! Now you get to listen to it!');
        hm.initGame();
      }
      else if (this.guessesLeft < 1 ) {
        hmStatusBarHTML.textContent      = 'You Lose!';
        this.losses +=1;
        hmLossesHTML.textContent      = this.losses;
        
        alert('You Lose!');
        hm.initGame();
      }
      else {
        hmStatusBarHTML.textContent      = 'Keep Guessing!';
      }
   },

 };

//  Initially write default Hangman info to DOM
hm.initGame();
console.log("wins="+wins);
hmWinsHTML.textContent        = hm.wins;
hmLossesHTML.textContent      = hm.losses;
hmGuessesLeftHTML.textContent = hm.guessesLeft;
hmAnswerHTML.textContent      = hm.displayAnswer;
hmGuessesHTML.textContent     = hm.guesses;
hmStatusBarHTML.textContent   = "by Dave Fischer";


//  Listen for keyup event on document (DOM)
 document.onkeyup = function (event) {
   console.log(event);

   // capture whatever keyboard key i just clicked
  //  var userKey = event.key;
  var userKey = (event.key).toUpperCase();
  console.log("Userkey===="+userKey);
  if (hm.validKey(event.key)) {
    hmStatusBarHTML.textContent = ' ';
    hm.processKey(userKey);
  }
  else {
    hmStatusBarHTML.textContent      = 'Invalid Key! Keep Guessing!';
  }  
 }

 // Adds a 'click' event listener to our resetButton and executes hm.initGame on click
 resetButton.addEventListener('click', hm.initGame);

});