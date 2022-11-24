const tiles = document.querySelectorAll(".grid-item");
const moves = document.querySelector("#moves");
const round = document.querySelector("#r_no");
const new_btn = document.querySelector("#new");
const nxt = document.querySelector("#continue");
const history = document.getElementById("history");
const modal = document.querySelector('.modal');
const mdb = document.querySelector('#md_btn');

let blocks = [];
let r_count = 1;
let count = 0;
// win_count = 0;


//populatng the divs with numbers
for (let i = 1; i <= 3 * 3; i++) blocks.push(i);

function random_handler(array) {
  let tmp,
    current,
    n = array.length;
  if (n)
    while (--n) {
      current = Math.floor(Math.random() * (n + 1));

      tmp = array[current];

      array[current] = array[n];
      array[n] = tmp;
    }
  return array;
}

function randomize() {
  let arr = random_handler(blocks);
  for (let i = 0, j = 0; i < tiles.length; i++, j++) {
    if (i < 9) {
      if (arr[j] == 9) {
        tiles[i].innerHTML = "";
      } else {
        tiles[i].innerHTML = arr[j];
      }
    }
  }
  console.log(tiles[1].innerHTML);
}
randomize();

const get_Empty = () => {
  for (let i = 0; i <= tiles.length; i++) {
    if (tiles[i].innerHTML == "") return i + 1;
  }
};

const HandleClickInput = () => {
  document.addEventListener("click", HandleClick);
};

const HandleClick = (e) => {
  const arr = Array.from(tiles);

  let empty = get_Empty();

  let target_item = arr.indexOf(e.target) + 1;
  let t_value = e.target.innerHTML;

  if (
    target_item == empty - 3 ||
    target_item == empty + 3 ||
    target_item == empty + 1 ||
    (target_item == empty - 1 &&
      e.target.getAttribute("class").includes("grid-item"))
  ) {
    let temp = t_value;
    e.target.innerHTML = "";
    tiles[empty - 1].innerHTML = temp;
    count++;
    console.log(count);
    moves.innerHTML = count;

    win();
  }
};
HandleClickInput();



// Timer
//
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}
setInterval(setTime, 1000);

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}




// Keyboard \


const up_value = () => {
  if (get_Empty() > 3) return tiles[get_Empty() - 4].innerHTML;
  else return null;
};
const up_item = () => {
  return get_Empty() - 3;
};



const down_value = () => {
  if (get_Empty() < 7) return tiles[get_Empty() + 2].innerHTML;
  else return null;
};
const down_item = () => {
  return get_Empty() + 3;
};


const left_value = () => {
  if (get_Empty() != 1 && get_Empty() != 4 && get_Empty() != 7)
    return tiles[get_Empty() - 2].innerHTML;
  else return null;
};
const left_item = () => {
  return get_Empty() - 1;
};


const right_value = () => {
  if (get_Empty() != 3 && get_Empty() != 6 && get_Empty() != 9)
    return tiles[get_Empty()].innerHTML;
  else return null;
};
const right_item = () => {
  return get_Empty() + 1;
};


function Key_Input() {
  document.addEventListener("keydown", keyPress);
}
function keyPress(e) {
  let emptyitem = get_Empty();
  switch (e.key) {
    case "ArrowUp":

      let aboveitemValue = up_value();
      let aboveitem = up_item();
      if (aboveitemValue != null) {
        tiles[aboveitem - 1].innerHTML = "";
        tiles[emptyitem - 1].innerHTML = aboveitemValue;
      }
      win();
      count++;
      moves.innerHTML = count;
      break;
    case "ArrowDown":
      
      let belowitemValue = down_value();
      let belowitem = down_item();
      if (belowitemValue != null) {
        tiles[belowitem - 1].innerHTML = "";
        tiles[emptyitem - 1].innerHTML = belowitemValue;
      }
      win();
      count++;
      moves.innerHTML = count;
      break;
    case "ArrowLeft":
      let leftitemValue = left_value();
      let leftitem = left_item();
      if (leftitemValue != null) {
        tiles[leftitem - 1].innerHTML = "";
        tiles[emptyitem - 1].innerHTML = leftitemValue;
      }
      win();
      count++;
      moves.innerHTML = count;
      break;
    case "ArrowRight":
      let rightitemValue = right_value();
      let rightitem = right_item();
      if (rightitemValue != null) {
        tiles[rightitem - 1].innerHTML = "";
        tiles[emptyitem - 1].innerHTML = rightitemValue;
      }
      win();
      count++;
      moves.innerHTML = count;
      break;
  }
}

Key_Input();



const win = () => {
  let won = false;
  for (let i = 0, j = 1; i < tiles.length - 1; i++, j++) {
    if (tiles[i].innerHTML == j) {
      won = true;
      continue;
    } else {
      won = false;
      break;
    }
  }
  if (won == true) {
    // win_count++;
    modal.style.display = "block";
    // alert("You Win");
  }
};


// Local Storage queries

const getData = () => {
  let newDiv = `<div class="data">
                  <h2>Moves:<span id="moves">${localStorage.getItem(
                    "moves"
                  )}</span></h2>
                  <h2>Time:<span id="time">
                  <label id="minutes">${localStorage.getItem("minutes")}</label>
                  <label id="colon">:</label>
                  <label id="seconds">${localStorage.getItem("seconds")}</label>
                  </span></h2>
                  <h2>Round:<span id="r_no">${localStorage.getItem(
                    "r_no"
                  )}</span></h2>
                  </div>`;
  return newDiv;
};


mdb.addEventListener("click", () => {
  modal.style.display = "none";
  r_count++;
  store();
  totalSeconds = 0;
  secondsLabel.innerHTML = 0;
  minutesLabel.innerHTML = 0;
  count = 0;
  moves.innerHTML = count;
  history.innerHTML = getData();
  randomize();
  
})


nxt.addEventListener("click", () => {
  location.reload();
});
new_btn.addEventListener("click", () => {
  r_count++;
  store();
  totalSeconds = 0;
  secondsLabel.innerHTML = 0;
  minutesLabel.innerHTML = 0;
  round.innerHTML = r_count;
  history.innerHTML = getData();
  count = 0;
  moves.innerHTML = count;


});


function store() {
  localStorage.setItem("moves", moves.innerHTML);
  localStorage.setItem("minutes", minutesLabel.innerHTML);
  localStorage.setItem("seconds", secondsLabel.innerHTML);
  localStorage.setItem("r_no", round.innerHTML);
}




document.getElementById("continue").onclick = store;
document.getElementById("new").onclick = randomize;

  
