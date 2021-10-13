# Kevins_Cool_Table_Sim_Demo
A small demonstration of a table matrix and table 'object' library and its ascociated application.

# Kevin's cool object and grid table simulator
This project is a demo project that showcases a variety of my coding knowledge.
It could have been done easier with less technologies but as it is a demo extra steps were taken.
This project took approximately 26 hours not including documentation and a small amount of research.
More time can be spent on the user interface but the intention was to show functionality and demonstrate
the successful use of various technologies.

## Technologies
PhP 8
javascript
jquery
d3.js
Bootstrap
HTML

## Installation  
This project will run on any Apache server that is set up to display hypertext and has PhP 8 installed.

## How it works
Either by using the GUI or the cmd box on the application a user can manipulate both an object and the table itself.
In addition it will detect if the object leaves the table bounds.

### Commands
In order to input commands a user must write "stdin" for the app to recognize the command.
Commands can either be entered one at a time or all together by seperating each command with a ","

First four cmds entered:
The first 4 cmds entered generate the table for example    stdin 4,5,0,1   will produce a 4x5 table with the object starting on position 0x1.
All further commands manipulate the object and table.

Use stdin x,x,x,x,etc, to run commands
--first to initiate the table use stdin x,x,x,x (x,y,startPositionX,startPositionY)
--0 = print results to stdout
--1 = move forward one step
--2 = move backwards one step
--3 = rotate clockwise 90 degrees (eg north to east)
--4 = rotate counterclockwise 90 degrees (eg west to south)
--5 = rotates entire table clockwise
--6 = rotates entire table counter clockwise
--7 = resets table to initial settings

If the program gets 4,4,2,2 as input, the table is initiated to size 4 x 4 with the object in
position [2, 2]. Then, commands 1,4,1,3,2,3,2,4,1,0 are read
from stdin and executed. The final output would then be the end position of the object,
in this case [0, 1].

You could run this as stdin 4,4,2,2,1,4,1,3,2,3,2,4,1,0 or even as completely independent inputs.

## Link
The running application can be found at this url [kdalli.com](http://kdalli.com/Front/public_html/)

## What This Demonstrates
This project demonstrates the use of javascript to create a library that communicates with a PhP backend for calculations.
It further demonstrates the use of object oriented programing in order to develop a library that can generate tables,
positions of objects on tables, movement of objects and rotation of the table itself. It can generate multiple matrix.

Furthermore, the calculations are done server side using PhP, the library interacts with the PhP by using AJAX calls.
The library is capabible of doing this asynchronous however this was not activated for this application because I wanted
to be able to call a string of commands all together. Done asynchronous some calculations would return from the PhP server
out of order.

Finally, this project shows how the library can be used in conjunction with a graphics library or even plain javascript to
represent a table to an end user. In this case I make use of d3.js to display the matrix and the object.

## Kevins_cool_tableSim_library
To use the library alone just take Kevins_cool_tableSim_library.js, phpRecieve.php and functions.php. Include the Kevins_cool_tableSim_library.js file
in a script tag on your main HTML page and point the AJAX calls from the library at where ever you want to host the PhP.

The first step is creating your initial table. To do this simply

#### var myNewTable = newTable([Object Location X],[Object Location Y],[Number of Rows] [Number of Columns], [Asynchronous]);
Object Locations are a grid address for example : 0 or 3
Number of Rows and Columns can be any number : 1 or 30
Asynchronous can be set to true or false.

After initialization the table must be populated do this with
myNewTable.createTable()

once the table is created you can send the following commands to manipulate
the object or matrix

#### myNewTable.tableNumTemp
  Displays identifying number for the matrix you generated.

#### myNewTable.rows
  Displays the number of rows in the matrix.

#### myNewTable.columns
  Displays the number of columns in the matrix.

#### myNewTable.grid
  Stores the data that makes up the original matrix.

#### myNewTable.clockWiseRotate
  Rotates the entire matrix data clockwise.

#### myNewTable.counterClockWiseRotate
  Rotates the entire matrix data counter clockwise.

#### myNewTable.tablePieceMoveForward
  Moves the object one space forward.

#### myNewTable.tablePieceMoveBackward
  Moves the object one space backwards.

#### myNewTable.tablePieceFaceClockWise
  Faces the object 90degrees clockwise.

#### myNewTable.tablePieceFaceCounterClockWise
  Face the object 90degrees counter clockwise.

#### myNewTable.restartTable
  Resets the table to it's initial settings. The matrix will rotate back
  to its original settings and the object will return to its initial location
  facing up.


The data and current grid, location and facings are stored in the
globalTables object.

to access this use the following globalTables.tableConst[tableNumTemp()]

#### globalTables[0] 
  for example

The object has the following properties which are updated after every function:

#### globalTables.tableConst[x].grid
  Stores the current matrix data, including after rotations.

#### globalTables.tableConst[x].objLocation
  Stores the current location of the object.

#### globalTables.tableConst[x].facing
  Stores the current facing of the object. 0 = up , 1 = right , 2 = down , 3 = left

#### globalTables.tableConst[x].tableFacing
  Stores the current facing of the entire table matrix. 0 = up , 1 = right , 2 = down , 3 = left

#### globalTables.tableConst[x].xLengthMax
  Stores the current number of rows in the matrix.

#### globalTables.tableConst[x].yLengthMax
  Stores the current number of columns in the matrix.

#### globalTables.tableConst[x].tableFailed
  Stores whether or not the object has gone off the edge of the table.
