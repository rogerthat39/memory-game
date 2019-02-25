//based on fisher-yates shuffle algorithm
function shuffle(arr) {
    for(let currentIndex=0; currentIndex < arr.length; currentIndex++) {
        //pick random value between 0 and arr length
        let randomIndex = Math.floor(Math.random() * arr.length)
        //swap random index with current index
        let temp = arr[currentIndex]
        arr[currentIndex] = arr[randomIndex]
        arr[randomIndex] = temp
    }
    return arr
}

function compareCards() {
    let firstIndex = cardsCurrentlyTurnedOver[0]
    let secondIndex = cardsCurrentlyTurnedOver[1]

    //if the cards match
    if(cardsList[firstIndex] == cardsList[secondIndex]) {
        //make the matched cards invisible (but still take up space)
        divsList[firstIndex].style.visibility = 'hidden'
        divsList[secondIndex].style.visibility = 'hidden'
        //check if the game has been won
        if(allCardsCleared()) {
            console.log('you win')
            document.getElementById('win-message').style.visibility = 'visible'
        }
    } 
    //if the cards don't match
    else { 
        //flip cards back over
        divsList[firstIndex].innerHTML = "<img src=\"images/card-back.jpg\">"
        divsList[secondIndex].innerHTML = "<img src=\"images/card-back.jpg\">"
    }
    cardsCurrentlyTurnedOver = [] //reset list
}

//preloads the card images so the user doesn't have to wait for them to load when 
//the card is turned over for the first time
function preloadImages(num) {
    let imagesList = []
    for(let i=1; i <= num; i++) {
        var newImage = new Image()
        newImage.src = 'images/' + i + '.jpg'
        imagesList.push(newImage)
    }
}

//check if the game has been won
function allCardsCleared() {
    for(let i=0; i<divsList.length; i++) {
        if(divsList[i].style.visibility != 'hidden') {
            return false
        }
    }
    return true
}

//main routine
let cardsList = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9]
shuffle(cardsList)

//preload the images of numbered cards
preloadImages(cardsList.length / 2)

let divsList = document.getElementsByClassName('cards')

//the list will contain index nums (i) corresponding to values in the cardsList
let cardsCurrentlyTurnedOver = [] //hold values temporarily to compare them when 2 cards are flipped over

for(let clickedCardIndex in cardsList) {
    divsList[clickedCardIndex].innerHTML = "<img src=\"images/card-back.jpg\">"
    divsList[clickedCardIndex].addEventListener("click", function clickedCard() {
        //checks if the card clicked has already had a match found, and been removed
        //checks if the clicked card has already been clicked (user clicked same card twice)
        //checks if there are already two cards turned over (and in the process of being evaluated)
        if(divsList[clickedCardIndex].style.visibility == "hidden" || 
        cardsCurrentlyTurnedOver[0] == clickedCardIndex ||
        cardsCurrentlyTurnedOver.length == 2) {
            return; //the rest of the function doesn't run
        }
        
        divsList[clickedCardIndex].innerHTML = "<img src=\"images/" + cardsList[clickedCardIndex] + ".jpg\">" //flip over card that was clicked
        cardsCurrentlyTurnedOver.push(clickedCardIndex)

        if(cardsCurrentlyTurnedOver.length == 2) {
            //wait for 1 second before calling function, so the user can see what the card was
            setTimeout(compareCards, 1000)
        }
    })
}
