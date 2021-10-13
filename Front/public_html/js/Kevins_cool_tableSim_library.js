'use strict';
//globals ...................................
let globalTables = {
  tableConst: [null]
};
//template for created tables
function templateTable() {
  const templateTableStructure = {
    grid: [],
    objLocation: [],
    facing: [],
    tableFacing: [],
    xLengthMax: [],
    yLengthMax: [],
    tableFailed: false
  };
return JSON.parse(JSON.stringify(templateTableStructure))
}
// functions
function newTable(location1, location2, rows, columns, async) {
  const table = {
    rows: rows,
    columns: columns,
    createTable: function() { // use this to create a table
      let gridArray = [this.rows]; //populates the grid
      for (let x = 0; x < this.rows; x++) {//populates the grid
        gridArray[x] = [this.columns];//populates the grid
        for (let y = 0; y < this.columns; y++) {//populates the grid
          gridArray[x][y] = x + '_' + y;//populates the grid
        }
      }
      if (globalTables.tableConst[0] == null) { // checks for existing tables and assigns a new table number
        globalTables.tableConst[0] = templateTable();
        this.tableNumTemp = globalTables.tableConst.length - 1;
      } else if (this.tableNumTemp != null && this.tableNumTemp <= globalTables.tableConst.length - 1) {
        console.log("Table is already created !");
      } else {
        globalTables.tableConst[globalTables.tableConst.length] = templateTable();
        this.tableNumTemp = globalTables.tableConst.length - 1;
      };
      this.grid = gridArray; //saves the grid array
      //assigns the new table to its template --------------------------------
      globalTables.tableConst[this.tableNumTemp].grid = gridArray;
      this.tablePieceLocation = gridArray[location1][location2];
      globalTables.tableConst[this.tableNumTemp].objLocation = gridArray[location1][location2];
      globalTables.tableConst[this.tableNumTemp].facing = 0;
      globalTables.tableConst[this.tableNumTemp].tableFacing = 0;
      globalTables.tableConst[this.tableNumTemp].xLengthMax = this.rows;
      globalTables.tableConst[this.tableNumTemp].yLengthMax = this.columns;
      globalTables.tableConst[this.tableNumTemp].tableFailed = false;
      return gridArray;
    },
    tableNumTemp: null,
    grid: [],
    clockWiseRotate: function() { // rotates entire table clockwise
      let dataPost = {
        'request': 'clockWise',
        'facing': globalTables.tableConst[this.tableNumTemp].facing,
        'grid': globalTables.tableConst[this.tableNumTemp].grid,
        'tableFace': globalTables.tableConst[this.tableNumTemp].tableFacing
      };
      let returnData = phpAJAXRotate(dataPost, this.tableNumTemp, async);
      return "rotated";
    },
    counterClockWiseRotate: function() { // rotates entire table counter clockwise
      let dataPost = {
        'request': 'cClockWise',
        'facing': globalTables.tableConst[this.tableNumTemp].facing,
        'grid': globalTables.tableConst[this.tableNumTemp].grid,
        'tableFace': globalTables.tableConst[this.tableNumTemp].tableFacing
      };
      let returnData = phpAJAXRotate(dataPost, this.tableNumTemp, async);
      return "rotated";
    },
    tablePieceMoveForward: function() { // moves the object forward one space
      let dataPost = {
        'request': 'moveForward',
        'facing': globalTables.tableConst[this.tableNumTemp].facing,
        'location': globalTables.tableConst[this.tableNumTemp].objLocation,
        'tableFace': globalTables.tableConst[this.tableNumTemp].tableFacing,
        'xMax': globalTables.tableConst[this.tableNumTemp].xLengthMax,
        'yMax': globalTables.tableConst[this.tableNumTemp].xLengthMax
      };
      phpAJAXMove(dataPost, this.tableNumTemp, async);
      return "Moved Forward";
    },
    tablePieceMoveBackward: function() { // moves the object backwards one space
      let dataPost = {
        'request': 'moveBackward',
        'facing': globalTables.tableConst[this.tableNumTemp].facing,
        'location': globalTables.tableConst[this.tableNumTemp].objLocation,
        'tableFace': globalTables.tableConst[this.tableNumTemp].tableFacing,
        'xMax': globalTables.tableConst[this.tableNumTemp].xLengthMax,
        'yMax': globalTables.tableConst[this.tableNumTemp].xLengthMax
      };
      phpAJAXMove(dataPost, this.tableNumTemp, async);
      return "Moved Backward";
    },
    tablePieceFaceClockWise: function() { //turns the object clockwise
      let dataPost = {
        'request': 'clockWiseFace',
        'facing': globalTables.tableConst[this.tableNumTemp].facing
      };
      phpAJAXChangeFace(dataPost, this.tableNumTemp, async);
      return "obj Rotated";
    },
    tablePieceFaceCounterClockWise: function() { //turns the object counter clockwise
      let dataPost = {
        'request': 'cClockWiseFace',
        'facing': globalTables.tableConst[this.tableNumTemp].facing
      };
      phpAJAXChangeFace(dataPost, this.tableNumTemp, async);
      return "obj Rotated";
    },
    restartTable: function() { //resets the table to default settings
      let gridArray = [this.rows];
      for (let x = 0; x < this.rows; x++) {
        gridArray[x] = [this.columns];
        for (let y = 0; y < this.columns; y++) {
          gridArray[x][y] = x + '_' + y;
        }
      }
      this.grid = gridArray;
      globalTables.tableConst[this.tableNumTemp].grid = gridArray;
      this.tablePieceLocation = gridArray[location1][location2];
      globalTables.tableConst[this.tableNumTemp].objLocation = gridArray[location1][location2];
      globalTables.tableConst[this.tableNumTemp].facing = 0;
      globalTables.tableConst[this.tableNumTemp].tableFacing = 0;
      globalTables.tableConst[this.tableNumTemp].xLengthMax = this.rows;
      globalTables.tableConst[this.tableNumTemp].yLengthMax = this.columns;
      globalTables.tableConst[this.tableNumTemp].tableFailed = false;
      return gridArray;
    }

  }
  return table;
}
// send ajax call to PHP,
function phpAJAXRotate(dataObject, tableNum, async) { //sends an ajax call to PHP backend to get entire table rotational values
  let dataPost = dataObject;
  dataPost = JSON.stringify(dataPost);
  dataPost.replace('/\\/g', '');
  return $.ajax({
    url: '../../../PHP_Calculator/public_html/PHP/phpRecieve.php/',
    type: 'post',
    data: {
      JSONstring: dataPost
    },
    async : async,
    success: function(data) { // returns relevant data for table facing, object facing and new grid
      data = JSON.parse(data);
      globalTables.tableConst[tableNum].tableFacing = data[2];
      globalTables.tableConst[tableNum].facing = data[0];
      globalTables.tableConst[tableNum].grid = data[1];
      let newY = globalTables.tableConst[tableNum].xLengthMax;
      let newX = globalTables.tableConst[tableNum].yLengthMax;
      globalTables.tableConst[tableNum].xLengthMax = newX;
      globalTables.tableConst[tableNum].yLengthMax = newY;
    },
  }).responseText;
}

function phpAJAXChangeFace(dataObject, tableNum, async) { // sends ajax call to php backend to calculate change of facing.
  let dataPost = dataObject;
  dataPost = JSON.stringify(dataPost);
  dataPost.replace('/\\/g', '');
  return $.ajax({
    url: '../../../PHP_Calculator/public_html/PHP/phpRecieve.php/',
    type: 'post',
    data: {
      JSONstring: dataPost
    },
    async : async,
    success: function(data) { // returns new facing data
      data = JSON.parse(data);
      globalTables.tableConst[tableNum].facing = data[0];
    },
  }).responseText;
}

function phpAJAXMove(dataObject, tableNum, async) { //send ajax call to php backend to calculate movement of object
  let dataPost = dataObject;
  dataPost = JSON.stringify(dataPost);
  dataPost.replace('/\\/g', '');
  return $.ajax({
    url: '../../../PHP_Calculator/public_html/PHP/phpRecieve.php/',
    type: 'post',
    data: {
      JSONstring: dataPost
    },
    async : async,
    success: function(data) { //returns relevant data for movement and assigns it
      data = JSON.parse(data);
      globalTables.tableConst[tableNum].objLocation = data;
      if (data == "-1_-1") {
        globalTables.tableConst[tableNum].tableFailed = true;
      }
    },
  }).responseText;
}
