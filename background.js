var nid = 'main';
var ctd = false;
var frame = 'none';

// frame options
chrome.storage.sync.get(function(items) {
    if (items.showFrame !== undefined) {
        frame = items.showFrame;
    }
});

var app = function() {
    chrome.app.window.create(
        'index.html',
        {
            id: 'mainWindow',
            innerBounds: { width: 1280, height: 1024, minWidth: 800, minHeight: 800},
            frame: { type: frame },
            resizable: true
        },

        function(e) {

        }
    );
}

chrome.app.runtime.onLaunched.addListener(function() {
    app();
});

chrome.app.runtime.onRestarted.addListener(function() {
    app();
});
