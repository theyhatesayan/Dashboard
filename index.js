let sidebarItems = document.querySelectorAll(".sidebar li");
let searchInput = document.querySelector(".search");
let tableBody = document.getElementById("tableBody");
let chartCanvas = document.getElementById("chart");

let chart;

sidebarItems.forEach(function(item){
  item.addEventListener("click", function(){
    sidebarItems.forEach(function(i){
      i.classList.remove("active");
    });
    item.classList.add("active");
  });
});

function filterTable(value){
  let rows = tableBody.querySelectorAll("tr");
  let text = value.toLowerCase();

  rows.forEach(function(row){
    let rowText = row.innerText.toLowerCase();

    if(rowText.includes(text)){
      row.style.display = "";
    }else{
      row.style.display = "none";
    }
  });
}

if(searchInput){
  searchInput.addEventListener("input", function(e){
    filterTable(e.target.value);
  });
}

function toggleTheme(){
  document.body.classList.toggle("dark");

  let theme = document.body.classList.contains("dark") ? "dark" : "light";
  localStorage.setItem("theme", theme);
}

(function(){
  let saved = localStorage.getItem("theme");
  if(saved === "dark"){
    document.body.classList.add("dark");
  }
})();

function initChart(){
  if(!chartCanvas) return;

  chart = new Chart(chartCanvas, {
    type: "bar",
    data: {
      labels: ["Jan","Feb","Mar","Apr","May"],
      datasets: [{
        label: "Revenue",
        data: [1200,1900,800,1500,2200]
      }]
    },
    options: {
      responsive: true
    }
  });
}

function updateChart(){
  if(!chart) return;

  let arr = [];

  for(let i = 0; i < 5; i++){
    arr.push(Math.floor(Math.random() * 3000));
  }

  chart.data.datasets[0].data = arr;
  chart.update();

  let cards = document.querySelectorAll(".card h2");

  if(cards.length){
    cards[0].innerText = "$" + arr[0];
    cards[1].innerText = arr[1];
    cards[2].innerText = arr[2];
    cards[3].innerText = (arr[3] / 100).toFixed(1) + "%";
  }
}

window.addEventListener("load", function(){
  let loader = document.getElementById("loader");
  if(loader){
    loader.style.display = "none";
  }
});

let sidebar = document.querySelector(".sidebar");
let overlay = document.querySelector(".overlay");

function toggleSidebar(){
  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");
}

function closeSidebar(){
  sidebar.classList.remove("active");
  overlay.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", function(){
  initChart();
});