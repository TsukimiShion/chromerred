/* global chrome: false */
chrome.browserAction.onClicked.addListener(function(tab){
    "use strict";
    chrome.tabs.create({
        url: "index.html",
    });    
});
