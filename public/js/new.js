
      

      let year = +window.location.pathname.split("/").pop().slice(0,4);

    document.querySelectorAll('.game').forEach(game => {
      game.classList.toggle('hidden')
    })


        document.querySelectorAll(`img`).forEach(image => {
            const src = image.getAttribute('src').slice(-7, -4);
            image.addEventListener("mouseover", () => showStats(src))
            image.addEventListener("mouseout", () => showStats(src))
        })

        async function showStats(src) {
            const stats = `${src.toUpperCase()}Stats`;
            console.log(stats)
            try {
              const response = await fetch(`/getData/${year}/${stats}`);
              if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
              }
              const data = await response.json();
              const filteredData = data.filter(d => d.stats);
              const sortedData = filteredData.sort((a, b) => b.stats.ws - a.stats.ws);
              
              for (let i = 0; i <= 5; i++){
                //document.querySelector('.record').innerText = this.data[0]?.record
                document.querySelector(`.Players .player${i} .playerName`).innerText = sortedData[i].playerName
                document.querySelector(`.Players .player${i} .gp`).innerText = `GP: ${sortedData[i].stats.games}`
                document.querySelector(`.Players .player${i} .mpg`).innerText = `MPG: ${sortedData[i].stats.mpg}`
                document.querySelector(`.Players .player${i} .ppg`).innerText = `PTS: ${sortedData[i].stats.pts}`
                document.querySelector(`.Players .player${i} .rpg`).innerText = `TRB: ${sortedData[i].stats.trb}`
                document.querySelector(`.Players .player${i} .apg`).innerText = `AST: ${sortedData[i].stats.ast}`
                document.querySelector(`.Players .player${i} .spg`).innerText = `STL: ${sortedData[i].stats.stl}`
                document.querySelector(`.Players .player${i} .bpg`).innerText = `BLK: ${sortedData[i].stats.blk}`
                document.querySelector(`.Players .player${i} .fg_pct`).innerText = `FG%: ${sortedData[i].stats.fg_pct}`
                document.querySelector(`.Players .player${i} .three_pct`).innerText = `3P%: ${sortedData[i].stats.threes_pct}`
                document.querySelector(`.Players .player${i} .ft_pct`).innerText = `FT%: ${sortedData[i].stats.ft_pct}`
                document.querySelector(`.Players .player${i} .ts_pct`).innerText = `TS%: ${sortedData[i].stats.ts_pct}`
                document.querySelector(`.Players .player${i} .ws`).innerText = `WS: ${sortedData[i].stats.ws}`
                document.querySelector(`.Players .player${i} .bpm`).innerText = `BPM: ${sortedData[i].stats.bpm}`
                document.querySelector(`.Players .player${i} .vorp`).innerText = `VORP: ${sortedData[i].stats.vorp}`
              }   
            } catch (error) {
              console.error(error);
            }

            document.querySelector('#stats').classList.toggle('hidden')
          }

         


// dropdown menu

function filterFunction() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  div = document.getElementById("myDropdown");
  a = div.getElementsByTagName("a");
  for (i = 0; i < a.length; i++) {
    txtValue = a[i].textContent || a[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      a[i].style.display = "";
    } else {
      a[i].style.display = "none";
    }
  }
}

document.querySelector(".dropbtn").onclick = function() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}



          
        


document.querySelector('.advance').addEventListener('click', advance)
let clicks = 0

function advance(){
    clicks++
    if (clicks < 8){
        document.querySelectorAll(`.firstRound .game${clicks }`).forEach(item => {
            item.classList.toggle('hidden')
        }) 
    }
    else if (clicks < 15){
        document.querySelectorAll(`.click2 .game${clicks - 7}`).forEach(item => {
            item.classList.toggle('hidden')
        }) 
    }
    else if (clicks < 22){
        document.querySelectorAll(`.click3 .game${clicks - 14}`).forEach(item => {
            item.classList.toggle('hidden')
        }) 
    }
    else {
        document.querySelectorAll(`.click4 .game${clicks - 22}`).forEach(item => {
            item.classList.toggle('hidden')
        }) 
    }
}

