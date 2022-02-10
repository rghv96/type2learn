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

if (window.getSelection) {
    let sel = window.getSelection()
    sel.anchorNode.parentElement.classList.add('current')
    if (window.getSelection().empty) {  // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {  // Firefox
      window.getSelection().removeAllRanges();
    }
} else {  // IE?
    if (characterSpans.length > 0) {
        characterSpans[0].classList.add('current')
    }
}