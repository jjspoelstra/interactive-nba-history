      let year = +window.location.pathname.split("/").pop().slice(0,4);


        document.querySelectorAll(`img`).forEach(image => {
            const src = image.getAttribute('src').slice(12, 15);
            image.addEventListener("mouseover", () => showStats(src))
            image.addEventListener("mouseout", () => showStats(src))
        })

        async function showStats(src) {
            const stats = `${src.toUpperCase()}Stats`;
            console.log(stats)
            try {
              const response = await fetch(`/getData${year}/${stats}`);
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

        




