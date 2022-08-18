// import Swal from 'sweetalert2'
const mainBox = document.querySelector(".main-box");
const myBox = document.getElementsByClassName("box");
let a = [];
let statusBox = true;
const createBox = () => {
  a = [];
  let innerMainBox = "";
  for (let i = 0; i < 9; i++) {
    a.push(0);
    innerMainBox += `<div onclick='change(${i})' class="box"></div>`;
  }
  mainBox.innerHTML = innerMainBox;
};

const modal = (type) => {
  Swal.fire({
    position: "bottom",
    title: "win : " + type,
    // showDenyButton: true,
    // showCancelButton: true,
    confirmButtonText: "OK",
  }).then((result) => {
    createBox();
  });
  if (type == "you") {
    statusBox = false;
  }
};
// createBox()
window.addEventListener("load", createBox);

function checkWin(value, type) {
  let target = a[value];
  let b = [a.slice(0, 3), a.slice(3, 6), a.slice(6, 9)];
  x = Math.floor(value / 3);
  y = value % 3;

  // for axis  x
  let countX = 0;
  for (let i = 0; i < 3; i++) {
    if (b[x][i] == target) {
      countX += 1;
    }
  }
  if (countX == 3) {
    console.log("countX");
    modal(type);
  }
  // for axis  y
  let countY = 0;
  for (let j = 0; j < 3; j++) {
    if (b[j][y] == target) {
      countY += 1;
    }
  }
  if (countY == 3) {
    console.log("countY");
    modal(type);
  }

  // main diameter
  let countM = 0;
  if (x == y) {
    for (let i = 0; i < 3; i++) {
      if (b[i][i] == target) {
        countM += 1;
      }
    }
  }
  if (countM == 3) {
    console.log("countM");
    modal(type);
  }

  // Subdiameter

  if ((x == 0 && y == 2) || (x == 1 && y == 1) || (x == 2 && y == 0)) {
    if (b[0][2] == target && b[1][1] == target && b[2][0] == target) {
      console.log("Subdiameter");
      modal(type);
    }
  }
}
function checkComputer(value) {
  let zeroNumbers = [];
  a.forEach((item, index) => {
    if (item === 0) {
      zeroNumbers.push(index);
    }
  });
  if (statusBox) {
    if (zeroNumbers.length > 0) {
      let randomComputer = Math.floor(Math.random() * zeroNumbers.length);
      // new
      let target = a[value];
      let b = [a.slice(0, 3), a.slice(3, 6), a.slice(6, 9)];
      x = Math.floor(value / 3);
      y = value % 3;
      // for axis  x
      let selectComputer = -1;
      let countX = 0;
      for (let i = 0; i < 3; i++) {
        console.log(b[x][i]);
        if (b[x][i] == target) {
          countX += 1;
        } else if (b[x][i] == 0) {
          selectComputer = x * 3 + i;
        }
      }
      if (countX == 2) {
        if (a[selectComputer] == 0) {
          randomComputer = zeroNumbers.findIndex((x) => x == selectComputer);
        }
      }
      // for axis  y
      let countY = 0;
      for (let i = 0; i < 3; i++) {
        console.log(b[i][y]);
        if (b[i][y] == target) {
          countY += 1;
        } else if (b[i][y] == 0) {
          selectComputer = i * 3 + y;
        }
      }
      if (countY == 2) {
        if (a[selectComputer] == 0) {
          randomComputer = zeroNumbers.findIndex((x) => x == selectComputer);
        }
      }

      // main diameter
      let countM = 0;
      if (x == y) {
        for (let i = 0; i < 3; i++) {
          if (b[i][i] == target) {
            countM += 1;
          } else if (b[i][i] == 0) {
            selectComputer = i * 3 + i;
          }
        }
      }
      if (countM == 2) {
        if (a[selectComputer] == 0) {
          randomComputer = zeroNumbers.findIndex((x) => x == selectComputer);
        }
      }
      // Subdiameter
      let countS = 0;
      for (let i = 2; i <= 6; i += 2) {
        if (a[i] == target) {
          countS += 1;
        } else if (a[i] == 0) {
          selectComputer = i;
        }
      }
      if (countS == 2) {
        if (a[selectComputer] == 0) {
          randomComputer = zeroNumbers.findIndex((x) => x == selectComputer);
        }
      }
      // end new

      myBox[zeroNumbers[randomComputer]].innerHTML =
        '<i class="far fa-circle  font-bold text-red-500 text-4xl"></i>';
      a[zeroNumbers[randomComputer]] = 2;
      checkWin(zeroNumbers[randomComputer], "computer");
    } else {
      modal("No body");
    }
  } else {
    statusBox = true;
  }
}

function change(x) {
  if (a[x] == 0) {
    a[x] = 1;
    myBox[x].innerHTML =
      '<i class="fas fa-close  font-bold text-green-700 text-4xl"></i>';
    checkWin(x, "you");
    checkComputer(x);
  }
}
