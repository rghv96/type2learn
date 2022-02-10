chrome.runtime.onInstalled.addListener((reason) => {
  if (reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({
          url: 'onboarding.html'
      });
  }
});

console.log("background running");
chrome.browserAction.onClicked.addListener(setup);

function setup() {
  noCanvas();
  let userinput = select('#userinput');
  userinput.input(sendText);

  function sendText() {
      //Value got from input field in popup
      let message = userinput.value();
      //Sending message to content
      chrome.tabs.query({
          active: true,
          currentWindow: true
      }, function(tabs) {
          chrome.tabs.sendMessage(tabs[0].id, message);
      });
  }
}