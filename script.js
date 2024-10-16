// Loader Functionality with a 2-second delay
window.addEventListener('load', function() {
    setTimeout(function() {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').classList.remove('hidden');
    }, 2000); // 2-second delay
});

const words = document.querySelectorAll('.word');
const sentenceContainer = document.getElementById('sentence');
const checkSentenceButton = document.getElementById('checkSentence');

let draggedWord = null;

// Drag events
words.forEach(word => {
    word.addEventListener('dragstart', (e) => {
        draggedWord = word;
        setTimeout(() => word.style.display = 'none', 0);
    });

    word.addEventListener('dragend', (e) => {
        setTimeout(() => {
            draggedWord.style.display = 'block';
            draggedWord = null;
        }, 0);
    });
});

sentenceContainer.addEventListener('dragover', (e) => {
    e.preventDefault();
});

sentenceContainer.addEventListener('drop', (e) => {
    e.preventDefault();
    if (draggedWord) {
        sentenceContainer.appendChild(draggedWord);
    }
});

// Function to animate incorrect sentence with wiggle and light red background
function incorrectSentenceEffect() {
    sentenceContainer.classList.add('wiggle'); // Add wiggle effect

    // Remove the wiggle effect after the animation completes (0.5s)
    setTimeout(() => {
        sentenceContainer.classList.remove('wiggle');
        showCorrectSentence(); // Show correct sentence after the wiggle
    }, 500);
}

// Function to show correct sentence with light green animation
function showCorrectSentence() {
    // Clear the sentence container
    sentenceContainer.innerHTML = '';

    // Correct sentence words
    const correctWords = ['The', 'cat', 'is', 'sleeping'];

    // Fade in the correct sentence with green effect
    correctWords.forEach((wordText) => {
        const wordElement = document.createElement('div');
        wordElement.className = 'word animate-in';
        wordElement.textContent = wordText;
        sentenceContainer.appendChild(wordElement);
    });
}

// Button to check if the sentence is correct
checkSentenceButton.addEventListener('click', () => {
    const formedSentence = Array.from(sentenceContainer.children)
                                .map(word => word.textContent)
                                .join(' ');
    const correctSentence = "The cat is sleeping";

    if (formedSentence === correctSentence) {
        alert('Correct sentence!');
    } else {
        incorrectSentenceEffect();  // Show wiggle effect and correct sentence
    }
});
