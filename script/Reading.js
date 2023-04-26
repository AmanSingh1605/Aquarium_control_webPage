import {
  getDatabase,
  ref,
  onValue,
  update,
} from "https://www.gstatic.com/firebasejs/9.19.1/firebase-database.js";

const db = getDatabase();

//current values
const curTemp = document.getElementById("cur-temp");
const curLev = document.getElementById("cur-lev");
const curOxy = document.getElementById("cur-oxy");
const curTurb = document.getElementById("cur-turb");

//Previous Values
const prevTemp = document.getElementById("prev-temp");
const prevLev = document.getElementById("prev-lev");
const prevOxy = document.getElementById("prev-oxy");
const prevTurb = document.getElementById("prev-turb");

//button status
const statusTemp = document.querySelector(".temp-status");
const statusOxygen = document.querySelector(".oxygen-status");
const statusFeeder = document.querySelector(".feeder-status");
const statusLight = document.querySelector(".light-status");

//firebase reference paths for values
const refLevel = ref(db, "board1/outputs/User/level");
const refTemp = ref(db, "board1/outputs/User/temperature");
const refOxygen = ref(db, "board1/outputs/User/oxygen");
const refTurbidity = ref(db, "board1/outputs/User/turbidity");

//firebase switch state references
const refswitch = ref(db, "board1/outputs/digital");

let ptemp = 0,
  plev = 0,
  poxy = 0,
  pturb = 0;

//current and previous value functions
onValue(refTemp, (snapshot) => {
  curTemp.innerText = snapshot.val().toFixed(2);
  if (snapshot.val() >= 57) {
    statusTemp.innerText = " High";
    statusTemp.style.color = "#D32E2E";
  } else if (snapshot.val() <= 30) {
    statusTemp.innerText = " Low";
    statusTemp.style.color = "#1A72E9";
  } else {
    statusTemp.innerText = " Normal";
    statusTemp.style.color = "green";
  }
  if (ptemp != snapshot.val()) {
    prevTemp.innerText = ptemp;
  }
  ptemp = snapshot.val();
});

onValue(refLevel, (snapshot) => {
  curLev.innerText = snapshot.val().toFixed(2);
  if (plev != snapshot.val()) {
    prevLev.innerText = plev;
  }
  plev = snapshot.val();
});
onValue(refOxygen, (snapshot) => {
  curOxy.innerText = snapshot.val().toFixed(2);
  if (snapshot.val() >= 57) {
    statusOxygen.innerText = " High";
    statusOxygen.style.color = "#D32E2E";
  } else if (snapshot.val() <= 30) {
    statusOxygen.innerText = " Low";
    statusOxygen.style.color = "#1A72E9";
  } else {
    statusOxygen.innerText = " Normal";
    statusOxygen.style.color = "green";
  }
  if (poxy != snapshot.val()) {
    prevOxy.innerText = poxy;
  }
  poxy = snapshot.val().toFixed(2);
});
onValue(refTurbidity, (snapshot) => {
  curTurb.innerText = snapshot.val().toFixed(2);
  if (pturb != snapshot.val()) {
    prevTurb.innerText = pturb;
  }
  pturb = snapshot.val();
});

//button function
window.tempbtn = () => {
  let temp = document.querySelector("#temp");
  if (temp.innerText == "Switch On") {
    temp.innerText = "Switch Off";
    update(refswitch, {
      25: 0,
    });
  } else {
    temp.innerText = "Switch On";
    update(refswitch, {
      25: 1,
    });
  }
};

window.oxybtn = () => {
  let temp = document.querySelector("#oxygen");
  if (temp.innerText == "Switch On") {
    temp.innerText = "Switch Off";
    update(refswitch, {
      26: 0,
    });
  } else {
    update(refswitch, {
      26: 1,
    });
    temp.innerText = "Switch On";
  }
};
window.feederbtn = () => {
  let temp = document.querySelector("#feeder");
  if (temp.innerText == "Switch On") {
    temp.innerText = "Switch Off";

    update(refswitch, {
      27: 0,
    });
    statusFeeder.innerText = "ON";
    statusFeeder.style.color = "green";
  } else {
    update(refswitch, {
      27: 1,
    });
    temp.innerText = "Switch On";
    statusFeeder.innerText = "OFF";
    statusFeeder.style.color = "#D32E2E";
  }
};
window.lightbtn = () => {
  let temp = document.querySelector("#light");
  if (temp.innerText == "Switch On") {
    temp.innerText = "Switch Off";
    update(refswitch, {
      33: 0,
    });
    statusLight.innerText = "ON";
    statusLight.style.color = "green";
  } else {
    temp.innerText = "Switch On";
    update(refswitch, {
      33: 1,
    });
    statusLight.innerText = "OFF";
    statusLight.style.color = "#D32E2E";
  }
};
