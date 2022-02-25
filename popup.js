console.log("popup.js running!");
let isSpanned = 0

chrome.storage.onChanged.addListener(function(changes, namespace) {
    let accuracy_text = document.querySelector(".curr_accuracy")
    let error_text = document.querySelector(".curr_errors")
    let wpm_text = document.querySelector(".curr_wpm")
    for (let [key, {oldValue, newValue}] of Object.entries(changes)) {
        // console.log(
        //   `Storage key "${key}" in namespace "${namespace}" changed.`,
        //   `Old value was "${oldValue}", new value is "${newValue}".`
        // );
        if (key == 'curr_wpm') {
            wpm_text.textContent = newValue + ' WPM'
        }
        if (key == 'curr_errors') {
            error_text.textContent = newValue
        }
        if (key == 'curr_accuracy') {
            accuracy_text.textContent = newValue + '%'
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    console.log('added event listener')
    start_button = document.getElementById('prepare_text')
    console.log(start_button)
    start_button.onclick = spanText
});

function spanText() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            files: ['span-text.js'],
        });
    });
    document.getElementById("userinput").focus();
}