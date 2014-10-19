$(function(){
    "use strict";
    /* global mocha: false, suite: false, chromerred: false, chai: false, test: false, _: false */
    mocha.setup("tdd");
    suite("chromerred.storage.local", function(){
        test("normal", function(done){
            chromerred.storage.local.clear()
            .then(function(){
                return chromerred.storage.local.get(null);
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, {}), "");
                return chromerred.storage.local.set({ name: "John"});
            }).then(function(){
                return chromerred.storage.local.get("name");
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, { name: "John"}), "");
                return chromerred.storage.local.set("age", 19);
            }).then(function(){
                return chromerred.storage.local.get(["name", "age"]);
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, {name: "John", age: 19}), "");
                return chromerred.storage.local.remove("name");
            }).then(function(){
                return chromerred.storage.local.get(["name", "age"]);
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, {age: 19}), "");
                return chromerred.storage.local.clear();
            }).then(function(){
                return chromerred.storage.local.get(null);
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, {}), "");
                return $.Deferred().resolve().promise();
            }).then(done);
        });
    });
    suite("chromerred.storage.sync", function(){
        test("normal", function(done){
            chromerred.storage.sync.clear()
            .then(function(){
                return chromerred.storage.sync.get(null);
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, {}), "");
                return chromerred.storage.sync.set({ name: "John"});
            }).then(function(){
                return chromerred.storage.sync.get("name");
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, { name: "John"}), "");
                return chromerred.storage.sync.set("age", 19);
            }).then(function(){
                return chromerred.storage.sync.get(["name", "age"]);
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, {name: "John", age: 19}), "");
                return chromerred.storage.sync.remove("name");
            }).then(function(){
                return chromerred.storage.sync.get(["name", "age"]);
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, {age: 19}), "");
                return chromerred.storage.sync.clear();
            }).then(function(){
                return chromerred.storage.sync.get(null);
            }).then(function(items){
                chai.assert.ok(_.isEqual(items, {}), "");
                return $.Deferred().resolve().promise();
            }).then(done);
        });
    });
    suite("chromerred.tabs.create", function(){
        test("normal", function(done){
            var url = "http://example.org/";
            chromerred.tabs.create({url: url})
            .then(function(tab){
                chai.assert.equal(tab.url, url);
                done();
            });
        });
    });
    suite("chromerred.tabs.get", function(){
        test("normal", function(done){
            var tab1;
            chromerred.tabs.getCurrent()
            .then(function(tab){
                console.log(tab.id);
                tab1 = tab;
                return chromerred.tabs.get(tab.id);
            }).then(function(tab){
                console.log(tab1.id);
                console.log(tab.id);
                chai.assert.equal(tab1.id, tab.id);
                done();
            });
        });
    });
    suite("chromerred.tabs.getCurrent", function(){
        test("normal", function(done){
            var url = "http://example.org/";
            chromerred.tabs.getCurrent()
            .then(function(tab){
                // console.log(tab);
                // chai.assert.equal(tab.url, url);
                done();
            });
        });
    });
    suite("chromerred.tabs.query", function(){
        test("normal", function(done){
            var url = "http://example.org/";
            chromerred.tabs.query({active: true})
            .then(function(tabs){
                var tab = tabs[0];
                // console.log(tabs);
                // chai.assert.equal(tab.url, url);
                done();
            });
        });
    });
    mocha.run();
});
