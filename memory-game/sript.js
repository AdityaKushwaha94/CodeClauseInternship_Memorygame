const emojis = ["😊", "😂", "😘", "😁", "👍", "🙌", "😒", "🥳"];
const shuffledEmojis = shuffle(emojis.concat(emojis));
let openedCards = [];
let matchedCards = [];

const gameContainer = document.querySelector('.game');

shuffledEmojis.forEach(emoji => {
    const box = document.createElement('div');
    box.className = 'item';
    box.innerHTML = emoji;
    gameContainer.appendChild(box);
});

const cards = document.querySelectorAll('.item');

cards.forEach(card => {
    card.addEventListener('click', () => {
        if (!card.classList.contains('open') && !card.classList.contains('match') && openedCards.length < 2) {
            card.classList.add('open');
            openedCards.push(card);

            if (openedCards.length === 2) {
                const emoji1 = openedCards[0].innerHTML;
                const emoji2 = openedCards[1].innerHTML;

                if (emoji1 === emoji2) {
                    openedCards.forEach(card => {
                        card.classList.add('match');
                        matchedCards.push(card);
                    });

                    openedCards = [];

                    if (matchedCards.length === emojis.length) {
                        setTimeout(() => {
                            alert('Congratulations! You won the game!');
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        openedCards.forEach(card => {
                            card.classList.remove('open');
                        });

                        openedCards = [];
                    }, 1000);
                }
            }
        }
    });
});

const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', () => {
    cards.forEach(card => {
        card.classList.remove('open', 'match');
    });

    shuffleCards();
});

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function shuffleCards() {
    const shuffled = shuffle(shuffledEmojis);
    cards.forEach((card, index) => {
        card.innerHTML = shuffled[index];
    });
}
