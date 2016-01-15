var webview = document.getElementById('main');
var bullet = document.getElementById('drag');
var buttonMinimize = document.getElementById('buttonMinimize');
var buttonMaximize = document.getElementById('buttonMaximize');
var buttonClose = document.getElementById('buttonClose');

var insert_style = '.window-overlay::-webkit-scrollbar{height:33px;width:33px}.window-overlay::-webkit-scrollbar-thumb{min-height:50px;background:rgba(255,255,255,1);border-radius:17px;border:10px solid transparent;background-clip:padding-box}.window-overlay::-webkit-scrollbar-track-piece{background:rgba(0,0,0,.5);border:10px solid transparent;background-clip:padding-box}.window-overlay::-webkit-scrollbar-track-piece:vertical:start{border-radius:17px 17px 0 0}.window-overlay::-webkit-scrollbar-track-piece:vertical:end{border-radius:0 0 17px 17px}';
var window_style = 'div.header-user{right: 96px;}';

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

// hide bullet if window is framed
chrome.storage.sync.get(function(items) {
    if (items.showFrame !== undefined) {
        frame = items.showFrame;
    }
    if (frame == 'chrome') {
        bullet.style.display = 'none';
    } else {
        insert_style += '.header-btn.header-boards,.promo-nav{margin-left:38px!important}';
    }
});

// set some css on trello.com
webview.addEventListener('loadcommit', function(e) {
    if (e.isTopLevel) {
        webview.insertCSS({
            code: insert_style,
            code: window_style,
            runAt: 'document_start'
        });
    }
});

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

buttonMinimize.addEventListener('click', windowMinimize);
buttonMaximize.addEventListener('click', windowMaximize);
buttonClose.addEventListener('click', windowClose);
