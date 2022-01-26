console.log("popup.js running!");

chrome.storage.onChanged.addListener(function (changes, namespace) {
  console.log('found an update!!!')
  let accuracy_text = document.querySelector(".curr_accuracy")
  let error_text = document.querySelector(".curr_errors")
  let wpm_text = document.querySelector(".curr_wpm")
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    // console.log(
    //   `Storage key "${key}" in namespace "${namespace}" changed.`,
    //   `Old value was "${oldValue}", new value is "${newValue}".`
    // );
    if (key == 'curr_wpm') {
      wpm_text.textContent = newValue
    }
    if (key == 'curr_errors') {
      error_text.textContent = newValue
    }
    if (key == 'curr_accuracy') {
      accuracy_text.textContent = newValue
    }
  }
});