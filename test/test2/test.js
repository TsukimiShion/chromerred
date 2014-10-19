$(function(){
    "use strict";
    /* global mocha: false, suite: false, chromerred: false, chai: false, test: false */
    mocha.setup("tdd");
    suite("chromerred.runtime.getBackgroundPage", function(){
        test("normal", function(done){
            chromerred.runtime.getBackgroundPage()
            .then(function(backgroundPage){
                var title = $(backgroundPage.document.getElementsByTagName("title")).text();
                chai.assert.equal(title, "Hello, World.", "OK");
                done();
            });
        });
    });
    mocha.run();
});
