function inputCmd(num){ //recieves the commands from the cmd line
  var command = $("#cmdInput" + num).val();
  $("#cmdInput" + num).val("")
  $("#outputBox" + num).append(command +"</br>");
  $("#outputBox" + num).animate({ scrollTop: $("#outputBox" + num).prop("scrollHeight")}, 1000);
  prepareCmd(command, num); //prepares the cmds proper for the Kevins_cool_tableSim_library
};
function prepareCmd(command, num){ //prepares the cmds proper for the Kevins_cool_tableSim_library
  // the following seperates multiple commands so they can be sequentually executed
  command = command.replace(/,/g, ' ');
  command = command.replace(/  /g, ' ');
  splitCommandArray = command.split(" ");
  if (splitCommandArray[0] == "stdin"){ //checks to see if the user used the correct cmd
    // sends each cmd one by one
    for (let i=0; i < splitCommandArray.length ; i++){
      if (splitCommandArray[i] == "stdin"){
      }else{
        executeCmd(splitCommandArray[i], num); //executs the cmd
      }
    }
  }else if (splitCommandArray[0] == "help"){ //activates help cmd
    $("#outputBox" + num).append("stdout--use stdin x, x, x, x, etc, to run commands < /br>--first to initiate the table use stdin x,x,x,x (x,y,startPositionX,startPositionY) </br > --0 = quit simulation and print results to stdout < /br>--1 = move forward one step</br > --2 = move backwards one step < /br>--3 = rotate clockwise 90 degrees (eg north to east)</br > --4 = rotate counterclockwise 90 degrees(eg west to south) < /br>--5 = rotates entire table clockwise</br > --6 = rotates entire table counter clockwise < /br>--7 = resets table to initial settings</br >");
    $("#outputBox" + num).animate({ scrollTop: $("#outputBox" + num).prop("scrollHeight")}, 1000);
  }else{ //if an unrecognized cmd is entered this happens
    $("#outputBox" + num).append("stdout please use stdin or help</br>");
    $("#outputBox" + num).animate({ scrollTop: $("#outputBox" + num).prop("scrollHeight")}, 1000);
  }
};
// the following global variables are declared for use in the next set of functions
let myTable = [];
let numberOfCmds = [];
let initCmds = [];
let assignedGlobalTable = [];
function setUpGlobs(num){ //this function sets up these global bariables for use in the following functions
  numberOfCmds[num] = 0;
  initCmds[num] = [];
  assignedGlobalTable[num] = [];
}
function executeCmd(command, num){ //executes the commands
  //first checks for the first 4 inputs as they will be used for table generation
  if (numberOfCmds[num] == 0 || numberOfCmds[num] == 1 || numberOfCmds[num] == 2){
    initCmds[num][numberOfCmds[num]] = command;
    numberOfCmds[num] = numberOfCmds[num] + 1;
  }else if(numberOfCmds[num] == 3){ //the fourth number is the last number before table generation
    initCmds[num][numberOfCmds[num]] = command;
    myTable[num] = newTable(initCmds[num][3] ,initCmds[num][2], initCmds[num][0], initCmds[num][1], false); //uses Kevins_cool_tableSim_library to generate a new table
    numberOfCmds[num] = numberOfCmds[num] + 1;
    myTable[num].createTable(); //uses the library to populate the new table
    assignedGlobalTable[num] = globalTables.tableConst.length - 1;
    makeGrid(globalTables,assignedGlobalTable[num],num); // this function uses d3 to create the graphical grid
    executeD3Changes(assignedGlobalTable[num]); //activates the initial table settings on the graphical grid
    $("#removeAfterCreation"+num).html(""); //removes creation buttons
    //the following adds control buttons
    $("#removeAfterCreation"+num).html("<div class='row'><button class='col-sm-3' id='objF"+ num +"' onclick='objF("+ num +")'>Obj Forwrd</button><button class='col-sm-3' id='objBack"+ num +"' onclick='objBack("+ num +")'>Obj Back</button><button class='col-sm-3' id='objCCW"+ num +"' onclick='objCCW("+ num +")'>Obj C-Clockwise</button><button class='col-sm-3' id='objCW"+ num +"' onclick='objCW("+ num +")'>Obj ClockWise</button></div><div class='row'><button class='col-sm-3' id='rotCW"+ num +"' onclick='rotCW("+ num +")'>Rotate Tbl Clockwise</button><button class='col-sm-3' id='rotCCW"+ num +"' onclick='rotCCW("+ num +")'>Rotate Tbl C-Clckwise</button><button class='col-sm-3' id='rstTbl"+ num +"' onclick='rstTbl("+ num +")'>Reset Table</button><button class='col-sm-3' id='outPutLcl"+ num +"' onclick='outPutLcl("+ num +")'>Output Location</button></div>");
  }else{
    // after the initial generation of the table the following controls the object and table
    if (command == 0){ //command 0 out puts the current location into the cmd output box
      let output = globalTables.tableConst[assignedGlobalTable[num]].objLocation.split("_");
      $("#outputBox" + num).append("stdout "+output[1]+","+output[0]+"</br>");
      $("#outputBox" + num).animate({ scrollTop: $("#outputBox" + num).prop("scrollHeight")}, 1000);
    }else if(command == 1){ // command 1 moves the object on the table one space forward
      myTable[num].tablePieceMoveForward();
      executeD3Changes(assignedGlobalTable[num]);
    }else if(command == 2){ // command 2 moves the object on the table one space backwards
      myTable[num].tablePieceMoveBackward();
      executeD3Changes(assignedGlobalTable[num]);
    }else if(command == 3){ // command 3 rotates the object 90degrees clockwise
      myTable[num].tablePieceFaceClockWise();
      executeD3Changes(assignedGlobalTable[num]);
    }else if(command == 4){ // command 4 rotates the object 90degrees counter clockwise
      myTable[num].tablePieceFaceCounterClockWise();
      executeD3Changes(assignedGlobalTable[num]);
    }else if(command == 5){ // command 5 rotates the entire table clockwise
      myTable[num].clockWiseRotate();
      executeD3Reset(assignedGlobalTable[num],num);
    }else if(command == 6){ // command 6 rotates the entire table counter clockwise
      myTable[num].counterClockWiseRotate();
      executeD3Reset(assignedGlobalTable[num],num);
    }else if(command == 7){ // command 7 resets the table to the initial settings
      myTable[num].restartTable();
      executeD3Reset(assignedGlobalTable[num],num);
    }
  }
};
function executeD3Changes(assignedNumD3Change){ // this function triggers changes to the d3 grid
  if (globalTables.tableConst[assignedNumD3Change].tableFailed == true){ //checks to see if the object fell of the table
    var colorMapDead = d3.scale.linear() //sets the table to various red colours
        .domain([-1, 0, 1])
        .range(["red","black","red"]);
        //the following code goes through each rectangle in the SVG and changes it's colour
    for (let a = 0; a < globalTables.tableConst[assignedNumD3Change].xLengthMax ; a++){
      for (let b = 0; b < globalTables.tableConst[assignedNumD3Change].yLengthMax ; b++){
        let id = "#"+ "rect_" + assignedNumD3Change +"_"+ a + "_" + b ;
        d3.select(id).transition().style("fill", colorMapDead);
      }
    }
  }else{
    // the following code resets the grid to various greys
    var colorMapReset = d3.scale.linear()
        .domain([-1, 0, 1])
        .range(["white","grey","white"]);
    for (let a = 0; a < globalTables.tableConst[assignedNumD3Change].xLengthMax ; a++){
      for (let b = 0; b < globalTables.tableConst[assignedNumD3Change].yLengthMax ; b++){
        id = "#"+ "rect_" + assignedNumD3Change +"_"+ a + "_" + b ;
        d3.select(id).transition().style("fill", colorMapReset);
      }
    };
    //next it highlights the location of the object in blue
    let id2 = "#"+ "rect_" + assignedNumD3Change +"_"+ globalTables.tableConst[assignedNumD3Change].objLocation ;
    d3.select(id2).transition().style("fill", "#00FFFF");
    // the following displays which direction the object is facing
        let idObjF = "#"+"objFace"+assignedNumD3Change;
    if (globalTables.tableConst[assignedNumD3Change].facing == 0){
      $( idObjF ).html("Object Facing : ^");
    }else if (globalTables.tableConst[assignedNumD3Change].facing == 1){
      $( idObjF ).html("Object Facing : >");
    }else if (globalTables.tableConst[assignedNumD3Change].facing == 2){
      $( idObjF ).html("Object Facing : v");
    }else if (globalTables.tableConst[assignedNumD3Change].facing == 3){
      $( idObjF ).html("Object Facing : <");
    }
  }
};
function executeD3Reset(assignedNumD3Change,d3num){
  let id = "#"+ "svg_" + assignedNumD3Change;
  d3.select(id).remove(); //removes the current graphics
  let idGridGen = '#gridGen'+ d3num
  $(idGridGen).html(""); //erases the current html that shows the table and object facings
  makeGrid(globalTables,assignedNumD3Change,d3num); //recreates the graphical grid
  executeD3Changes(assignedNumD3Change); //initial grid settings
  //the following displays the direction the table is facing
  let idTblF = "#"+"tableFace"+assignedNumD3Change;
  if (globalTables.tableConst[assignedNumD3Change].tableFacing == 0){
    $( idTblF ).html("Table Facing : ^");
  }else if (globalTables.tableConst[assignedNumD3Change].tableFacing == 1){
    $( idTblF ).html("Table Facing : >");
  }else if (globalTables.tableConst[assignedNumD3Change].tableFacing == 2){
    $( idTblF ).html("Table Facing : v");
  }else if (globalTables.tableConst[assignedNumD3Change].tableFacing == 3){
    $( idTblF ).html("Table Facing : <");
  }
};
