var webview = document.getElementById('main');
var bullet = document.getElementById('drag');
var buttonMinimize = document.getElementById('buttonMinimize');
var buttonMaximize = document.getElementById('buttonMaximize');
var buttonClose = document.getElementById('buttonClose');

var insert_style = '';

function windowMinimize() {
  chrome.app.window.current().minimize();
}

function windowMaximize() {
  if (chrome.app.window.current().isMaximized()) {
      chrome.app.window.current().restore();
  } else {
      chrome.app.window.current().maximize();
  }
}
function windowClose() {
    chrome.app.window.current().close();
}

// send new-window-links to browser
webview.addEventListener('newwindow', function(e) {
    e.stopImmediatePropagation();
    window.open(e.targetUrl);
});

// hotkeys
window.addEventListener('keydown', function(e) {
    // F5
    if (e.keyCode == 115) {
        webview.reload();
    }
    // F11
    if (e.keyCode == 122) {
        windowRestore();
    }
});

// fix webview lose focus
window.addEventListener('focus', function(e) {
    webview.focus();
});

//windows buttons actions
buttonMinimize.addEventListener('click', windowMinimize);
buttonMaximize.addEventListener('click', windowMaximize);
buttonClose.addEventListener('click', windowClose);
