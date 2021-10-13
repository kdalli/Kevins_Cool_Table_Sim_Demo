function makeGrid(table, assignedNum, num) { //this function builds the visual grid in d3.js
  $('#gridGen' + num).append('<div id="gridd3' + num + '"></div><div class="row"><div class="col-sm-6" id="objFace' + assignedNum + '">Object Facing : ^</div><div class="col-sm-6" id="tableFace' + assignedNum + '">Table Facing : ^</div></div>');
  var margin = {
      top: 15,
      right: 15,
      bottom: 15,
      left: 15
    },
    width = 250,
    height = 250;

  var svg = d3.select("#gridd3" + num).append("svg")
    .attr("id", "svg_" + assignedNum)
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .style("margin-left", -margin.left + "px")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);
  //checks the variables from the library to determine how many rows and collumns are needed
  var numrows = globalTables.tableConst[assignedNum].xLengthMax;
  var numcols = globalTables.tableConst[assignedNum].yLengthMax;

  var matrix = new Array(numrows);
  for (var i = 0; i < numrows; i++) {
    matrix[i] = new Array(numcols);
    for (var j = 0; j < numcols; j++) {
      matrix[i][j] = Math.random() * 2 - 1;
    }
  }

  var x = d3.scale.ordinal()
    .domain(d3.range(numcols))
    .rangeBands([0, width]);

  var y = d3.scale.ordinal()
    .domain(d3.range(numrows))
    .rangeBands([0, height]);

  var rowLabels = new Array(numrows);
  for (var i = 0; i < numrows; i++) {
    rowLabels[i] = (i);
  }

  var columnLabels = new Array(numrows);
  for (var i = 0; i < numcols; i++) {
    columnLabels[i] = (i);
  }

  var colorMap = d3.scale.linear()
    .domain([-1, 0, 1])
    .range(["white", "grey", "white"]);
  //.range(["red", "black", "green"]);
  //.range(["brown", "#ddd", "darkgreen"]);

  var row = svg.selectAll(".row")
    .data(matrix)
    .enter().append("g")
    .attr("class", "row")
    .attr("transform", function(d, i) {
      return "translate(0," + y(i) + ")";
    });

  row.selectAll(".cell")
    .data(function(d) {
      return d;
    })
    .enter().append("rect")
    .attr("class", "cell")
    .attr("x", function(d, i) {
      return x(i);
    })
    .attr("width", x.rangeBand())
    .attr("height", y.rangeBand())
    .attr("id", function(d, i, j) {
      return "rect_" + assignedNum + "_" + globalTables.tableConst[assignedNum].grid[j][i];
    }) //this function creates an ID for each svg rect by inputing x and y and asking the library for the relevant ID
    .style("stroke-width", 0);

  row.append("line")
    .attr("x2", width);

  var column = svg.selectAll(".column")
    .data(columnLabels)
    .enter().append("g")
    .attr("class", "column")
    .attr("transform", function(d, i) {
      return "translate(" + x(i) + ")rotate(-90)";
    });

  column.append("line")
    .attr("x1", -width);

  row.selectAll(".cell")
    .data(function(d, i) {
      return matrix[i];
    })
    .style("fill", colorMap);
}
