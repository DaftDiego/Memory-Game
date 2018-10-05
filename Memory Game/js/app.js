/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 // Used to measure a player's time.
 var startTime;
 var endTime;
 var totalTime;

 //The following will be used to count and display the player's moves.
 var displayedMoveCount = document.querySelectorAll('.moves');
 var moveCount = 0;

 var displayedCards = [];

 // Used for event delegation (the user's selected/clicked card).
 var selectedCard;
 var pickedCard;

 // Used to compare the classes between two cards for a match.
 var firstCard = "";
 var secondCard = "";

// Holds a;; game cards in the game.
 var gameCards = document.querySelectorAll('.card');

 // Count the number of paired matches, used to check for game end.
 var matches = 0;

 // Used to capture the "Refresh/Reset" button in the DOM, and reset the game.
 var resetButton = document.querySelectorAll('.fa-repeat');
 var gameReset;

//Winning Message
 var gameWon = document.querySelectorAll('.winner');
 var winningMessage = "Congratulations! You Win :)";

 // Holds the star rating in the DOM.
 var stars = document.querySelectorAll('.stars');
 var star = stars["0"].firstElementChild;
 var starClone;
 var numberOfStars = 3;

 // Holds the number of moves needed for the star rating to go down
 // to two and one stars, subsequently. Feel free to edit the values accordingly.
 var scoreTwoStars = 23;
 var scoreOneStar = 35;

// Initial moves plays value at the beginning of the game.
 displayedMoveCount['0'].textContent = moveCount.toString();

// --------FUNCTIONS------------

 // Function used when a user clicks on a card.
 function flipCard(event)
 {
   selectedCard = event.target;           // Capture the clicked card.

   // Check to see if the card is already played and/or matched with its pair.
   if ((!selectedCard.classList.contains('open', 'show')) && (!selectedCard.classList.contains('match')))
   {
     // Call function to increment/display number of moves.
     moveCounter();

     // Start the timer.
     gameClock();

     // Push the card to array.
     displayedCards.push(selectedCard);

     // Capture the class of the first card.
     if (displayedCards.length == 1)
     {
       firstCard = selectedCard.firstElementChild.classList.value;
     }
      // Capture the class of the second card.
     else if (displayedCards.length == 2)
     {
       secondCard = selectedCard.firstElementChild.classList.value;
     }

     // Display the card after clicking it.
     selectedCard.classList.add('open', 'show');
     if (displayedCards.length > 1)
     {
       // Compare both cards' classes.
       if (firstCard == secondCard)
       {
         cardMatch();
       } else {
         setTimeout(flipBack, 500);
       }
     }
   }
 }

 // Function used when the cards don't match.
 function flipBack()
 {
   displayedCards.forEach(function(card)
   {
     card.classList.remove('open', 'show');
     displayedCards = [];
   });
 }

 // Function used when the cards do match.
function cardMatch()
{
  matches++;                  // Increment the matched pair count.
  displayedCards.forEach(function(card)
  {
    // Change the displayed color to those of the matched cards.
    card.classList.add('match');
    card.classList.remove('open', 'show');
  });
  winner();
  displayedCards = [];
}

// Increment the number of moves played, and display it.
function moveCounter()
{
  moveCount++;
  displayedMoveCount['0'].textContent = moveCount.toString();

  // Call function to check for user's star rating with each move.
  starRating();
}

// It displays the star rating, depending on the number of moves.
function starRating()
{
  if (moveCount == scoreTwoStars)
  {
    // Remove a star once the player makes the 25th move.
    star.parentNode.removeChild(star);
    star = stars["0"].firstElementChild;
    numberOfStars--;
  }
  else if (moveCount == scoreOneStar)
  {
    // Remove a second star once a player makes the 35th move.
    star.parentNode.removeChild(star);
    star = stars["0"].firstElementChild;
    numberOfStars--;
  }
}

function gameClock()
{
  if (moveCount == 1)
  {
    startTime = performance.now();
  }
}
// Function to reset the game.
function resetGame(event)
{
  gameCards.forEach(function(card)
  {
    // Hide all cards.
    card.classList.remove('open', 'show', 'match');

    // Reset move counter to zero, and display it.
    moveCount = 0;
    displayedMoveCount['0'].textContent = moveCount.toString();

    // Clear the winning message if game was already won, and reset the paired matches counter.
    gameWon["0"].textContent = '';
    matches = 0;
  });
  displayedCards = [];

  // Calling function to reset star rating.
  resetStarRating();
}

// Used to reset the rating display to three stars.
function resetStarRating()
{
  // Code will only apply if there are less than three stars.
  while (numberOfStars < 3)
  {
    // Clone a star and append it to the parent node.
    starClone = star.cloneNode(true);
    stars['0'].appendChild(starClone);
    star = stars["0"].firstElementChild;
    numberOfStars++;
  }
}

function winner()
{
  if (matches > 7)
  {
      gameWon["0"].textContent = winningMessage;
      endTime = performance.now();
      totalTime = (endTime - startTime) / 1000;
      console.log("Start Time: " + startTime);
      console.log("End Time: " + endTime);
      console.log("Total Time: " + totalTime.toFixed(2) + " seconds.");
  }
}

 resetButton.forEach(function(r)
 {
   gameReset = r;
   gameReset.addEventListener('click',resetGame);
 })

 gameCards.forEach(function(c)
 {
   pickedCard = c;
   pickedCard.addEventListener('click', flipCard);
 });
