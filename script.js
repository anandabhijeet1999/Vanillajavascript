let inputBar = document.querySelector(".inputbar");
let addbt = document.querySelector(".addbtn");
let cont = document.querySelector(".cont");

let taskArray = [];

let oldertask = localStorage.getItem("task");

if(oldertask){
    let passarr = JSON.parse(oldertask);
    taskArray = [...passarr];
    taskArrayUi(taskArray);
}

addbt.addEventListener("click", function () {
  let value = inputBar.value;
  inputBar.value = "";

  if (value.length == 0) {
    return;
  }

  let taskObj = {
    id: Date.now(),
    task: value,
  };

  taskArray.push(taskObj);
  taskArrayUi(taskArray);
  localStorage.setItem("task", JSON.stringify(taskArray));
});

function taskArrayUi(arr) {
  cont.innerHTML = "";
  arr.forEach(function (taskObj) {
    let id = taskObj.id;
    let taskEle = document.createElement("div");
    taskEle.classList.add("Task");
    taskEle.innerHTML = `<p>${taskObj.task}</p>
                  <div class="dlt">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" d="M7 6V3a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v3h5v2h-2v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V8H2V6zm2-2v2h6V4z"/></svg>
                  </div>`;
    let delicon = taskEle.querySelector(".dlt");
    delicon.addEventListener("click", function () {
      cont.removeChild(taskEle);
      let filterarry = taskArray.filter(function (taskObj) {
        return taskObj.id != id;
      });
      taskArray = filterarry;
      localStorage.setItem("task", JSON.stringify(taskArray));
    });
    cont.appendChild(taskEle);
  });
}
