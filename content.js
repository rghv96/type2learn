console.log("Chrome Extension ready to go!");

let characterSpans = []
let start = 0
let errors = 0;
let accuracy = 0
let charactersTyped = 0
let timeElapsed = 0
let wpm = 0
let timeTimer = null
let popupTimer = null

let paragraphs = document.getElementsByTagName("p")
function updateTimeTimer() {
    timeElapsed++;
}

function updatePopupTimer() {
    //update popup text
    console.log('update in interval')
    chrome.storage.sync.set({'curr_wpm': wpm}, function() {
        console.log('curr_wpm is set to ' + wpm);
    });
    chrome.storage.sync.set({'curr_errors': errors}, function() {
        console.log('curr_errors is set to ' + errors);
    });
    chrome.storage.sync.set({'curr_accuracy': accuracy}, function() {
        console.log('curr_accuracy is set to ' + accuracy);
    });
}

function resetValues() {
    errors = 0
    accuracy = 0
    charactersTyped = 0
    timeElapsed = 0
    wpm = 0
    timeTimer = null
    popupTimer = null
    clearInterval(timeTimer);
    clearInterval(popupTimer);
    timeTimer = setInterval(updateTimeTimer, 1000);
    popupTimer = setInterval(updatePopupTimer, 3000);
}


function spanText(characterSpans) {
    // console.log(paragraphs);
    for (para of paragraphs) {
        let originalText = para.innerText
        para.innerHTML = ''
        originalText.split('').forEach(character => {
            const characterSpan = document.createElement('span')
            characterSpan.innerText = character
            para.appendChild(characterSpan)
        })
    }

    for (para of paragraphs) {
        tmpSpans = para.querySelectorAll('span')
        arrayTmpSpans = Array.from(tmpSpans)
        characterSpans.push.apply(characterSpans, arrayTmpSpans)
    }
    console.log('highlighting first letter');
    characterSpans[0].classList.add('current')
}

chrome.runtime.onMessage.addListener(replace);

function replace(message, sender, sendresponse) {
    if (characterSpans.length === 0) {
        spanText(characterSpans)
    }
    if (start === 0) {
        start = 1
        resetValues()
    }
    // console.log("overall msg: " + message);
    // console.log("message.length" + message.length)
    characterSpans.every((characterSpan) => {
        characterSpan.classList.remove('current')
        return true
    })

    errors = 0
    charactersTyped = 0

    characterSpans.every((characterSpan, index) => {
        characterSpan.classList.remove('current')
        if (index >= message.length) {
            // console.log("reached here")
            // console.log(index)
            return false
        }
        charactersTyped++
        const inputCharacter = message[index]
        // console.log("current inputCharacter: " + inputCharacter)
        if (inputCharacter == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
        } else if (inputCharacter === characterSpan.innerText) {
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')
        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            errors++
        }
        return true
    })

    // calculate text
    let correctCharacters = (charactersTyped - errors);
    accuracy = Math.round((correctCharacters / charactersTyped) * 100);
    wpm = Math.round((((charactersTyped / 5) / timeElapsed) * 60));

    if (characterSpans.length > message.length) {
        characterSpans[message.length].classList.add('current')
    }
}