<?php
require("functions.php");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $allData = $_POST["JSONstring"];
    $allData = json_decode($allData);
    if ($allData->request == 'cClockWise'){ //sends to entire table counter clockwise function

       print counterClockW($allData->facing, $allData->grid, $allData->tableFace);
    }elseif ($allData->request == 'clockWise'){ //sends to entire table clockwise function

          print clockW($allData->facing, $allData->grid, $allData->tableFace);
    }elseif ($allData->request == 'clockWiseFace'){ //sends to object facing clockwise function

         print clockWF($allData->facing);
    }elseif ($allData->request == 'cClockWiseFace'){ //sends to object facing counter clockwise function

        print cClockWF($allData->facing);
    }elseif ($allData->request == 'moveForward'){ // move forward function

       print moveF($allData->facing, $allData->location, $allData->tableFace,$allData->xMax,$allData->yMax);
    }elseif ($allData->request == 'moveBackward'){ // move backward function

       print moveB($allData->facing, $allData->location, $allData->tableFace,$allData->xMax,$allData->yMax);
};
}
?>
