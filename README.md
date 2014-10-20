chromerred
==========

Make [Chrome JavaScript APIs](https://developer.chrome.com/extensions/api_index) chainable using the [jQuery.Deferred()](http://api.jquery.com/category/deferred-object/) method.

In this version, we implement only a few APIs, but in the future version, we will also implement other APIs.

## Example
```javascript
chromerred.storage.sync.get(null)
.then(function(items){
    //
    return chromerred.storage.local.get(null);
}).then(function(items){
    //
    return chromerred.tabs.create({url: "http://example.org/"});
}).then(function(tab){
    //
});
```

## INSTALL
```
$ bower install chromerred
```

## Dependency
- [jQuery](http://jquery.com/)
- [Chrome JavaScript API](https://developer.chrome.com/extensions/api_index)

## API Reference
If you want to see the reference of the latest version, please see http://TsukimiShion.github.io/chromerred .
Or if you want to see the reference of the specifed version, please see ``` http://TsukimiShion.github.io/chromerred/v{MAJOR_VERSION}.{MINOR_VERSION}/ ``` .
For example, if you want to see the reference of the version 1.0.0, please see http://TsukimiShion.github.io/chromerred/v1.0/ .
This document is made by [YUIDoc](http://yui.github.io/yuidoc/).

## Exception Handling
If ``` chrome.runtime.lastError !== undefined ``` , which means that there was an error, ``` $.Deferred().reject(chrome.runtime.lastError).promise()``` is returned.

For example,

```javascript
chromerred.storage.sync.set(items).then(
function(){
    // success
}, function(e){
    // failure
    // e is chrome.runtime.lastError
    alert(e.message); // For example, "MAX_ITEMS quota exceeded"
});
```

For more information about **chrome.runtime.lastError**, Please see [chrome.runtime#property-lastError](https://developer.chrome.com/extensions/runtime#property-lastError).

## For Developers

### Set up
We assume that the following tools are installed.

- [Node.js](http://nodejs.org/)
- [git](http://git-scm.com/)
- [Grunt](http://gruntjs.com/)

### TEST
Tests are executed with [Chrome Extensions](https://developer.chrome.com/extensions).

> Note: If you make a Chrome Extension for tests, you must copy **src/chromerred.js** and **lib** there.
In the future version, we want to automatically copy them and execute tests.
