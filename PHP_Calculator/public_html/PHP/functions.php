<?php

// function counter clock
function counterClockW($facing, $grid, $tFacing)
{
  //reverse the collumns of the array
  $arrLength = count($grid);
  for ($i = 0; $i < $arrLength ; $i++){
      $grid[$i] = array_reverse($grid[$i]);
  };
  //transpose the array
  $grid = transpose($grid);
  $data = $grid; //result is the table shifting counter clockwise
// address new facing
  if ($facing == 0){
    $facing = 3;
  }else{
    $facing = $facing -1;
  };

  if ($tFacing == 0){
    $tFacing = 3;
  }else{
    $tFacing = $tFacing -1;
  };
  $json = array($facing,$data,$tFacing);
  $json = json_encode($json); // prepare data to send

 return $json;
};

function clockW($facing,$grid,$tFacing)
{
  //transpose array
  $grid = transpose($grid);
  //reverse collumns of the array
  $arrLength = count($grid);
  for ($i = 0; $i < $arrLength ; $i++){
      $grid[$i] = array_reverse($grid[$i]);
  };
  $data = $grid; //result is an table shifted clockwise
//adress new facing
  if ($facing == 3){
    $facing = 0;
  }else{
    $facing = $facing +1;
  };

  if ($tFacing == 3){
    $tFacing = 0;
  }else{
    $tFacing = $tFacing +1;
  };

  $json = array($facing,$data,$tFacing);
  $json = json_encode($json); //prepare data to send

 return $json;
};

function transpose($array_one) { //transpose function for use with table rotations
    $array_two = [];
    foreach ($array_one as $key => $item) {
        foreach ($item as $subkey => $subitem) {
            $array_two[$subkey][$key] = $subitem;
        }
    }
    return $array_two;
}

function clockWF($facing)
{
  //change facing value
  if ($facing == 3){
    $facing = 0;
  }else{
    $facing = $facing +1;
  };
  $json = array($facing);
  $json = json_encode($json);

 return $json;
};
function cClockWF($facing)
{
  //change facing value
  if ($facing == 0){
    $facing = 3;
  }else{
    $facing = $facing -1;
  };
  $json = array($facing);
  $json = json_encode($json);

 return $json;
};
function moveF($facing, $location, $tFacing, $xMax, $yMax)
{
   $location = explode("_",$location); //seperate string into just the two values
   //assign the values
   $location[0] = (int)$location[0];
   $location[1] = (int)$location[1];

  if ($tFacing == 0){ // check entire table facing
    if ($facing == 0){ //check object facing and then calculate correct move
      $location[0] = $location[0] - 1;
    }elseif($facing == 2){
      $location[0] = $location[0] + 1;
    }elseif($facing == 1){
      $location[1] = $location[1] + 1;
  }elseif($facing == 3){
      $location[1] = $location[1] - 1;
  }
}elseif($tFacing == 2){
  if ($facing == 0){
    $location[0] = $location[0] + 1;
  }elseif($facing == 2){
    $location[0] = $location[0] - 1;
  }elseif($facing == 1){
    $location[1] = $location[1] - 1;
}elseif($facing == 3){
    $location[1] = $location[1] + 1;
  }
}elseif($tFacing == 1){
  if ($facing == 0){
    $location[1] = $location[1] - 1;
  }elseif($facing == 2){
    $location[1] = $location[1] + 1;
  }elseif($facing == 1){
    $location[0] = $location[0] - 1;
}elseif($facing == 3){
    $location[0] = $location[0] + 1;
  }
}elseif($tFacing == 3){
  if ($facing == 0){
    $location[1] = $location[1] + 1;
  }elseif($facing == 2){
    $location[1] = $location[1] - 1;
  }elseif($facing == 1){
    $location[0] = $location[0] + 1;
}elseif($facing == 3){
    $location[0] = $location[0] - 1;
}
}
//check to see if any values excede table limits
if ($location[0] == -1 || $location[0] > $xMax - 1){
  $location[0] = -1;
  $location[1] = -1;
};
if ($location[1] == -1 || $location[1] > $yMax - 1){
  $location[0] = -1;
  $location[1] = -1;
};
$location = strval($location[0]) . "_" . strval($location[1]); //rebuild string
  $json = $location;
  $json = json_encode($json); // prepare data to send

 return $json;
};
function moveB($facing, $location, $tFacing, $xMax, $yMax)
{
   $location = explode("_",$location);
   $location[0] = (int)$location[0];
   $location[1] = (int)$location[1];

  if ($tFacing == 0){
    if ($facing == 0){
      $location[0] = $location[0] + 1;
    }elseif($facing == 2){
      $location[0] = $location[0] - 1;
    }elseif($facing == 1){
      $location[1] = $location[1] - 1;
  }elseif($facing == 3){
      $location[1] = $location[1] + 1;
  }
}elseif($tFacing == 2){
  if ($facing == 0){
    $location[0] = $location[0] - 1;
  }elseif($facing == 2){
    $location[0] = $location[0] + 1;
  }elseif($facing == 1){
    $location[1] = $location[1] + 1;
}elseif($facing == 3){
    $location[1] = $location[1] - 1;
  }
}elseif($tFacing == 1){
  if ($facing == 0){
    $location[1] = $location[1] + 1;
  }elseif($facing == 2){
    $location[1] = $location[1] - 1;
  }elseif($facing == 1){
    $location[0] = $location[0] + 1;
}elseif($facing == 3){
    $location[0] = $location[0] - 1;
  }
}elseif($tFacing == 3){
  if ($facing == 0){
    $location[1] = $location[1] - 1;
  }elseif($facing == 2){
    $location[1] = $location[1] + 1;
  }elseif($facing == 1){
    $location[0] = $location[0] - 1;
}elseif($facing == 3){
    $location[0] = $location[0] + 1;
}
}

if ($location[0] == -1 || $location[0] > $xMax - 1){
  $location[0] = -1;
  $location[1] = -1;
};
if ($location[1] == -1 || $location[1] > $yMax - 1){
  $location[0] = -1;
  $location[1] = -1;
};
$location = strval($location[0]) . "_" . strval($location[1]);
  $json = $location;
  $json = json_encode($json);

 return $json;
};
?>
