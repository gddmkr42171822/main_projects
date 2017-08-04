QUnit.module( "checkStreetAnswers" );
QUnit.test("checkStreetAnswers correct test", function( assert ) {
  var fixture = $("#qunit-fixture");
  fixture.append("<div id='testScore'></div>");
  fixture.append("<input type='text' id='1' class='form2Input incorrect' value='test value' >");
  $("#1").focus();

  var $providedValue = $(":text.form2Input:focus");
  var expectedValue = "test value";
  markers = [1,2,3];
  numCorrectTextBoxes = 0;

  checkStreetAnswers($providedValue, expectedValue);

  assert.deepEqual(numCorrectTextBoxes, 1, "The user enter the correct name into the text box!");
  assert.deepEqual($("#testScore").html(), "<h3>Total Correct: 1 out of 3</h3>", "Score html is correct.");
  assert.ok($("#1").hasClass("correct"), "Text box has the 'correct' class.");
  assert.notOk($("#1").hasClass("incorrect"), "Text box does not have the 'incorrect' class.");
});

QUnit.module( "checkLandMarkAnswers" );
QUnit.test("checkLandMarkAnswers correct test", function(assert) {
    var fixture = $("#qunit-fixture");
    fixture.append("<div id='testScore'></div>");
    fixture.append(
        `<div id="1"><input type='text' id='lname' 
        oninput='checkTestAnswers()' placeholder='Apt A: Name' class='form2Input' value='test name'/>
        <input type='text' id='laddress' oninput='checkTestAnswers()' 
        placeholder='Apt A: Address' class='form2Input' value='test address'
        /></div>`);

    markers = [1,2,3];
    numCorrectTextBoxes = 0;

    $("#lname").focus();
    var $providedValue = $(":text.form2Input:focus");
    var expectedValue = "test name - test address";

    checkLandMarkAnswers($providedValue, expectedValue);
    assert.ok($("#lname").hasClass("correct"), "Text box has the 'correct' class.");
    assert.notOk($("#laddress").hasClass("correct"), "Text box does not have the 'correct' class.");
    assert.deepEqual($("#testScore").html(), "<h3>Total Correct: 0 out of 3</h3>", "Score html is correct.");

    $("#laddress").focus();
    $providedValue = $(":text.form2Input:focus");
    checkLandMarkAnswers($providedValue, expectedValue);
    assert.ok($("#lname").hasClass("correct"), "Text box has the 'correct' class.");
    assert.ok($("#laddress").hasClass("correct"), "Text box has the 'correct' class.");
    assert.deepEqual($("#testScore").html(), "<h3>Total Correct: 1 out of 3</h3>", "Score html is correct.");
    // assert.ok($("#lname").is(":disabled"), "Input box is disabled.");
    // assert.ok($("#laddress").is(":disabled"), "Input box is disabled.");
});

QUnit.test("checkLandMarkAnswers incorrect test", function(assert) {
    var fixture = $("#qunit-fixture");
    fixture.append("<div id='testScore'></div>");
    fixture.append(
        `<div id="1"><input type='text' id='lname' 
        oninput='checkTestAnswers()' placeholder='Apt A: Name' class='form2Input' value='test name'/>
        <input type='text' id='laddress' oninput='checkTestAnswers()' 
        placeholder='Apt A: Address' class='form2Input' value='test address'
        /></div>`);

    markers = [1,2,3];
    numCorrectTextBoxes = 0;

    $("#laddress").focus();
    var $providedValue = $(":text.form2Input:focus");
    var expectedValue = "test name - wrong address";

    checkLandMarkAnswers($providedValue, expectedValue);
    assert.ok($("#laddress").hasClass("incorrect"), "Text box has the 'incorrect' class.");
    assert.deepEqual($("#testScore").html(), "<h3>Total Correct: 0 out of 3</h3>", "Score html is correct.");
});

QUnit.module("openInfoWindow");
QUnit.test("openInfoWindow open close test", function(assert) {
    function info() {
        this.opened = false;
        this.close = function(map,marker) {
            return true;
        };
        this.open = function(map,marker) {
            return true;
        };
    }

    function marker(info) {
        this.info = info;
    }

    currentMarker = 0;
    markers = [];
    markers.push(new marker(new info()));

    var open = sinon.stub(markers[0].info, "open");
    open.returns("open world");
    var close = sinon.stub(markers[0].info, "close");
    close.returns("close worlds");


    openInfoWindow();

    assert.ok(open.calledOnce, "Open was called once.");
    assert.deepEqual(markers[0].info.opened, true, "Info window was opened.");

    openInfoWindow();
    assert.ok(close.calledOnce, "Close was called once.");
    assert.deepEqual(markers[0].info.opened, false, "Info window was closed.");
});