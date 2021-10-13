var numTables = 0; // this variable keeps track of the amount of generated tables
function createTableContainer() {
  //When a table is created this populates the first set of HTML
  $("#tableContainers").append("<div class='container' id='tableNum" + numTables + "'><div id='removeAfterCreation" + numTables + "'><div class='row'><div class='col-sm-3'>Tbl Wdth</div><div class='col-sm-3'>Tbl Lnth</div><div class='col-sm-3'>Obj Lction Y</div><div class='col-sm-3'>Obj Lction X</div><div class='row'><div class='col-sm-12'><input class='col-sm-3' id='inputGridWidth" + numTables + "' type='text'></input><input class='col-sm-3' id='inputGridLength" + numTables + "' type='text'></input><input class='col-sm-3' id='inputObjX" + numTables + "' type='text'></input><input class='col-sm-3' id='inputObjY" + numTables + "' type='text'></input><button class='col-sm-12' id='GenerateButton" + numTables + "' onclick='createNewGenTable(" + numTables + ")'>Generate This Table</button></div></div></div></div><div class='row'><div class='col-sm-12'><input id='cmdInput" + numTables + "' type='text'></input><button id='cmd" + numTables + "' onclick='inputCmd(" + numTables + ")'>Input Cmd</button></div></div>");
  $("#tableContainers").append('<div class="row"><div class="col-sm-12" id="bigBox' + numTables + '"><div id="generatedStuff' + numTables + '" class="row"><div class="col-sm-6" id="outputBox' + numTables + '" style="overflow-y: scroll;height:270px;"></div><div class="col-sm-6" id="gridGen' + numTables + '"></div></div></div>');
  var currentNum = numTables;
  $("#inputGridWidth" + currentNum).val("5");
  $("#inputGridLength" + currentNum).val("5");
  $("#inputObjX" + currentNum).val("1");
  $("#inputObjY" + currentNum).val("1");
  setUpGlobs(currentNum); //sets Up Global variables needed for the cmd line functions
  //the following allows for the cmdline input button to use the "enter" key to submit
  $("#cmdInput" + numTables).keypress(function(e) {
    if (e.which == 13) {
      inputCmd(currentNum);
    }
  });
  numTables = numTables + 1; //adds one to the number of tables that exist
};
// this function allows a user to generate a new table with a button instead of the cmd line
function createNewGenTable(num) {
  //check the values for table creation
  let gridWidth = $("#inputGridWidth" + num).val();
  let gridLength = $("#inputGridLength" + num).val();
  let objX = $("#inputObjX" + num).val();
  let objY = $("#inputObjY" + num).val();
  // the following if statement ensures the boxes are not empty
  if (gridWidth == "" | gridLength == "" | objX == "" | objY == "") {
    //do nothing
  } else {
    //the following adds the values for table initiation to the cmd input box
    $("#cmdInput" + num).val("stdin " + gridWidth + "," + gridLength + "," + objX + "," + objY)
    //inputs the cmd
    inputCmd(num);
  }
};

function objF(num) { //function for button forward
  $("#cmdInput" + num).val("stdin 1")
  inputCmd(num);
};

function objBack(num) {
  $("#cmdInput" + num).val("stdin 2") //function for button backwards
  inputCmd(num);
};

function objCCW(num) {
  $("#cmdInput" + num).val("stdin 4") //function for button rotate object counter clockWise
  inputCmd(num);
};

function objCW(num) { // function for button rotate object clockWise
  $("#cmdInput" + num).val("stdin 3")
  inputCmd(num);
};

function rotCW(num) { // function for button rotate table clockwise
  $("#cmdInput" + num).val("stdin 5")
  inputCmd(num);
};

function rotCCW(num) { // function for button rotate table counter clockwise
  $("#cmdInput" + num).val("stdin 6")
  inputCmd(num);
};

function rstTbl(num) { //function for button reset table
  $("#cmdInput" + num).val("stdin 7")
  inputCmd(num);
};

function outPutLcl(num) { //function for button that outputs the object location to cmd output box
  $("#cmdInput" + num).val("stdin 0")
  inputCmd(num);
};
