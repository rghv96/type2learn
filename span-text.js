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

if (window.getSelection().anchorNode != null) {
    let sel = window.getSelection().anchorNode
    // sel.anchorNode.parentElement.classList.add('current_character')
    if (sel.nodeName == "#text") { // Chrome(-ium)
        sel.parentElement.classList.add('current_character')
    } else if (sel.nodeName == "P") { // Firefox: For some reason, getSelection() doesn't select the #text-node but the paragraph its surrounded in
        sel.childNodes[0].classList.add('current_character');
    }
} else {  // If no paragraph was selected
    if (characterSpans.length > 0) {
        characterSpans[0].classList.add('current_character')
    }
}