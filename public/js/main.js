
let year = +window.location.pathname.split("/").pop().slice(0,4);




class Club {        //this is the team object.
    constructor(name, abbr){
        this.name = name
        this.abbr = abbr
        this.sortOrder = []
        this.statsSelector = document.querySelector(`#stats`)
        
    }
    get conference(){   //
        return this.data[0].conference          // this is defined as a getter so we can wait until we have to data to get this info
    }
    get seed(){
        return this.data[0].seed                // same as above
    }

    
    placeSeed() {
        try {
          const seedElement = document.querySelector(`.${this.conference}${this.seed}`);
          if (!seedElement) {
            console.error(`Element not found for team ${this.name} with conference ${this.conference} and seed ${this.seed}`);
            return;
          }
          seedElement.classList.add(`${this.abbr}`);
          seedElement.src = `img/${this.abbr}.png`;
        } catch (error) {
            console.error(`Error placing seed for team ${this.name} with conference ${this.conference} and seed ${this.seed}:`, error);
          }
      }

    addSelectors(){
        document.querySelectorAll(`.${this.abbr}`).forEach(item => {
            item.addEventListener("mouseover", this.showStats)
        })
        document.querySelectorAll(`.${this.abbr}`).forEach(item => {
            item.addEventListener("mouseout", this.showStats)
        })
    }

    getDataFetch = () => {
        fetch(`data/${year}/${this.abbr}/perGame.json`)
        .then((response) => response.json())
        .then((json) => {
            this.data = json})
        .then(() => {
            console.log(this.data)
        })   
    }



    showStats = () => {
        this.statsSelector.classList.toggle('hidden')
        for (let i = 0; i <= 5; i++){
            // document.querySelector('.record').innerText = this.data[0]?.record
            document.querySelector(`.Players .player${i} .playerName`).innerText = this.data[1][i].playerName
            document.querySelector(`.Players .player${i} .gp`).innerText = `GP: ${this.data[1][i].stats.games}`
            document.querySelector(`.Players .player${i} .mpg`).innerText = `MPG: ${this.data[1][i].stats.mpg}`
            document.querySelector(`.Players .player${i} .ppg`).innerText = `PTS: ${this.data[1][i].stats.pts}`
            document.querySelector(`.Players .player${i} .rpg`).innerText = `TRB: ${this.data[1][i].stats.trb}`
            document.querySelector(`.Players .player${i} .apg`).innerText = `AST: ${this.data[1][i].stats.ast}`
            document.querySelector(`.Players .player${i} .spg`).innerText = `STL: ${this.data[1][i].stats.stl}`
            document.querySelector(`.Players .player${i} .bpg`).innerText = `BLK: ${this.data[1][i].stats.blk}`
            document.querySelector(`.Players .player${i} .fg_pct`).innerText = `FG%: ${this.data[1][i].stats.fg_pct}`
            document.querySelector(`.Players .player${i} .three_pct`).innerText = `3P%: ${this.data[1][i].stats.threes_pct}`
            document.querySelector(`.Players .player${i} .ft_pct`).innerText = `FT%: ${this.data[1][i].stats.ft_pct}`
            document.querySelector(`.Players .player${i} .ts_pct`).innerText = `TS%: ${this.data[1][i].stats.ts_pct}`
            document.querySelector(`.Players .player${i} .ws`).innerText = `WS: ${this.data[1][i].stats.ws}`
            document.querySelector(`.Players .player${i} .bpm`).innerText = `BPM: ${this.data[1][i].stats.bpm}`
            document.querySelector(`.Players .player${i} .vorp`).innerText = `VORP: ${this.data[1][i].stats.vorp}`
        }   
    }
}



//advance playoffs       (season object? Not sure it makes sense to add to each team)

document.querySelector('.advance').addEventListener('click', advance)
let clicks = 0

function advance(){
    clicks++
    if (clicks < 8){
        document.querySelectorAll(`.click1 .game${clicks - 1}`).forEach(item => {
            item.classList.toggle('hidden')
        }) 
    }
    else if (clicks < 15){
        document.querySelectorAll(`.click2 .game${clicks - 8}`).forEach(item => {
            item.classList.toggle('hidden')
        }) 
    }
    else if (clicks < 22){
        document.querySelectorAll(`.click3 .game${clicks - 15}`).forEach(item => {
            item.classList.toggle('hidden')
        }) 
    }
    else {
        document.querySelectorAll(`.click4 .game${clicks - 22}`).forEach(item => {
            item.classList.toggle('hidden')
        }) 
    }
}


class Matchup {
    constructor(name, seed1, seed2, conference){
        this.name = name
        this.seed1 = seed1 
        this.seed2 = seed2
        this.conference = conference
        this.team1 = teams.filter(x => x.conference === `${conference}` && x.seed === `${seed1}`)[0].abbr
        this.team2 = teams.filter(x => x.conference === `${conference}` && x.seed === `${seed2}`)[0].abbr
        this.correctData = playoffData[1].filter((x) => (x.team1.toLowerCase() === `${this.team1}` && x.team2.toLowerCase() === `${this.team2}`) || x.team1.toLowerCase() === `${this.team2}` && x.team2.toLowerCase() === `${this.team1}`)
        this.team1Wins = this.team1 === this.correctData[0].team1.toLowerCase() ? this.correctData[0].team1Wins : this.correctData[0].team2Wins     //makes sure 'team1' is always the top
        this.team2Wins = this.team2 === this.correctData[0].team2.toLowerCase() ? this.correctData[0].team2Wins : this.correctData[0].team1Wins
        this.round = this.correctData[0].round
        this.games = this.correctData[0].gameScores
        this.winner = this.team1Wins === '4' ? seed1 : seed2
        if ((seed1 === '1st' && seed2 === '8th') || (seed1 === '2nd' && seed2 === '7th') || (seed1 === '3rd' && seed2 === '6th') || (seed1 === '4th' && seed2 === '5th')) {
            const winnerElement = document.querySelector(`.${conference}${seed1}${seed2}Winner`);
            if (this.team1Wins === '4') {
              winnerElement.classList.add(this.team1);
              winnerElement.src = `img/${this.team1}.png`;
            } else {
              winnerElement.classList.add(this.team2);
              winnerElement.src = `img/${this.team2}.png`;
            }
          }
       
    }
    paintGames = () => {
        let topSeedWins = 0
        let lowSeedWins = 0
        for (let i = 0; i < this.games.length; i++){
            let team1Score 
            let team2Score
            if (+this.seed1.slice(0,1) < +this.seed2.slice(0,1)){
                if (i === 0 || i === 1 || i === 4 || i === 6){
                    team1Score = this.games[i].homeTeam.slice(-3).trim()
                    team2Score = this.games[i].awayTeam.slice(-3).trim()
                } else {
                    team1Score = this.games[i].awayTeam.slice(-3).trim()
                    team2Score = this.games[i].homeTeam.slice(-3).trim()
                }
            } else {
                if (i === 0 || i === 1 || i === 4 || i === 6){
                    team1Score = this.games[i].awayTeam.slice(-3).trim()
                    team2Score = this.games[i].homeTeam.slice(-3).trim()
                } else {
                    team1Score = this.games[i].homeTeam.slice(-3).trim()
                    team2Score = this.games[i].awayTeam.slice(-3).trim()
                }
            }
            
        
            let span = document.createElement('span')
            span.classList.add(`game${i}`, `hidden`, 'game')
            this.conference === 'west' ? span.innerHTML = '&#9654;' : span.innerHTML = '&#9664;'
            
            if (+team1Score > +team2Score){
                topSeedWins += 1
                span.classList.add(`${this.team1}Win`, `topSeedWin${topSeedWins}`)
            } else {
                lowSeedWins += 1
                span.classList.add(`${this.team2}Win`, `lowSeedWin${lowSeedWins}`)
            }

            let tooltip = document.createElement('span')
            tooltip.classList.add('toolTipText')
            tooltip.innerText = `Game ${i+1} ${team1Score} - ${team2Score}`
            span.append(tooltip)
            document.querySelector(`.${this.name}`).prepend(span)
        }
    }
}

class SecondRound extends Matchup {
    constructor(name, seed1, seed2, conference, seedPotential){
        super(name, seed1, seed2, conference)
        if (this.team1Wins == 4){
            document.querySelector(`.${conference}${seedPotential}Winner`).classList.add(`${this.team1}`)
            document.querySelector(`.${conference}${seedPotential}Winner`).src = `img/${this.team1}.png`
        } else {
            document.querySelector(`.${conference}${seedPotential}Winner`).classList.add(`${this.team2}`)
            document.querySelector(`.${conference}${seedPotential}Winner`).src = `img/${this.team2}.png`
        }
    }
}

class Finals{
    constructor(name, westWinner, eastWinner, conference){
        this.name = name
        this.conference = conference
        this.team1 = teams.filter(x => x.conference === `west` && x.seed === `${westWinner}`)[0].abbr
        this.team2 = teams.filter(x => x.conference === `east` && x.seed === `${eastWinner}`)[0].abbr
        this.team1Record = teams.filter(x => x.conference === `west` && x.seed === `${westWinner}`)[0].data[0].record
        this.team2Record = teams.filter(x => x.conference === `east` && x.seed === `${eastWinner}`)[0].data[0].record
        this.correctData = playoffData[1][0]
        this.team1Wins = this.correctData.team1.toLowerCase() === this.team1 ? this.correctData.team1Wins : this.correctData.team2Wins
        this.team2Wins = this.correctData.team2.toLowerCase() === this.team2? this.correctData.team2Wins: this.correctData.team1Wins
        this.round = this.correctData.round
        this.games = this.correctData.gameScores
        this.winner = this.team1Wins === '4' ? this.team1 : this.team2
        if (+this.team1Record.slice(0,2) > +this.team2Record.slice(0,2)){
            this.homeCourt = this.team1
        } else {
            this.homeCourt = this.team2
        }
        if (this.team1Wins === '4'){
            document.querySelector(`.finalsChampion`).classList.add(`${this.team1}`)
            document.querySelector(`.finalsChampion`).src = `img/${this.team1}.png`
        } else {
            document.querySelector(`.finalsChampion`).classList.add(`${this.team2}`)
            document.querySelector(`.finalsChampion`).src = `img/${this.team2}.png`
        }
    }
    paintGames = () => {
        let team1Wins = 0
        let team2Wins = 0
        
        for (let i = 0; i < this.games.length; i++){
            let team1Score 
            let team2Score
            if (this.team1 === this.homeCourt){
                if (i === 0 || i === 1 ||i === 4 || i ===6){
                    team1Score = this.games[i].homeTeam.slice(-3).trim()
                    team2Score = this.games[i].awayTeam.slice(-3).trim()
                } else {
                    team1Score = this.games[i].awayTeam.slice(-3).trim()
                    team2Score = this.games[i].homeTeam.slice(-3).trim()
                }
                
            } else if (this.team2 === this.homeCourt){
                if (i === 0 || i ===1 || i ===4 || i ===6){
                    team2Score = this.games[i].homeTeam.slice(-3).trim()
                    team1Score = this.games[i].awayTeam.slice(-3).trim()
                } else {
                    team2Score = this.games[i].awayTeam.slice(-3).trim()
                    team1Score = this.games[i].homeTeam.slice(-3).trim()
                }
            }
            let spanWest = document.createElement('span')
            spanWest.classList.add(`game${i}`, `hidden`, 'game')
            spanWest.innerHTML = '&#9654;' 
            let spanEast = document.createElement('span')
            spanEast.classList.add(`game${i}`, `hidden`, 'game')
            spanEast.innerHTML = '&#9664;' 
            if (+team1Score > +team2Score){
                team1Wins += 1
                spanWest.classList.add(`${this.team1}Win`, `topSeedWin${team1Wins}`)
                let tooltipWest = document.createElement('span')
                tooltipWest.classList.add('toolTipText')
                tooltipWest.innerText = `Game ${i+1} ${team1Score} - ${team2Score}`
                spanWest.append(tooltipWest)
                document.querySelector(`.finals`).prepend(spanWest)
            } else {
                team2Wins += 1
                spanEast.classList.add(`${this.team2}Win`, `lowSeedWin${team2Wins}`)
                let tooltipEast = document.createElement('span')
                tooltipEast.classList.add('toolTipText')
                tooltipEast.innerText = `Game ${i+1} ${team1Score} - ${team2Score}`
                spanEast.append(tooltipEast)
                document.querySelector('.eastWinner').prepend(spanEast)
            }
        }
    }
}



//create teams
const pho = new Club('Phoenix Suns', 'pho')
const nop = new Club('New Orleans Pelicans', 'nop')
const dal = new Club('Dallas Mavericks', 'dal')
const uta = new Club('Utah Jazz', 'uta')
const mem = new Club('Memphis Grizzlies', 'mem')
const min = new Club('Minnesota Timberwolves', 'min')
const gsw = new Club('Golden State Warriors', 'gsw')
const den = new Club('Denver Nuggets', 'den')
const mia = new Club('Miami Heat', 'mia')
const atl = new Club('Atlanta Hawks', 'atl')
const phi = new Club('Philadelphia 76ers', 'phi')
const tor = new Club('Toronto Raptors', 'tor')
const bos = new Club('Boston Celtics', 'bos')
const brk = new Club('Brooklyn Nets', 'brk')
const mil = new Club('Milwaukee Bucks', 'mil')
const chi = new Club('Chicago Bulls', 'chi')
const cho = new Club('Charlotte Hornets', 'cho')
const lac = new Club('Los Angeles Clippers', 'lac') 
const sas = new Club('San Antonio Spurs', 'sas') 
const lal = new Club('Los Angeles Lakers', 'lal') 
const sac = new Club('Sacramento Kings', 'sac') 
const por = new Club('Portland Trail Blazers', 'por') 
const okc = new Club('Oklahoma City Thunder', 'okc') 
const hou = new Club('Houston Rockets', 'hou') 
const cle = new Club('Cleveland Cavaliers', 'cle')
const nyk = new Club('New York Knicks', 'nyk')
const was = new Club('Washington Wizards', 'was')
const ind = new Club('Indiana Pacers', 'ind')
const det = new Club('Detroit Pistons', 'det')
const orl = new Club('Orlando Magic', 'orl')

const teams = [pho, orl, nop, mia, atl, uta, dal, mem, min, gsw, den, phi, tor, bos, brk, mil, chi, cho, lac, sas, lal, sac, por, okc, hou, cle, nyk, was, ind, det]



// function to initialize team data
async function getDataAndPlaceSeed(team) {
    await team.getDataFetch();  //wait for team data to finish
    await new Promise(resolve => setTimeout(resolve, 100));  //set a timeout to allow it to load
    await team.placeSeed();           //give the team their correct seed on the bracket
  }



//specify which matchups to create
let westOneEight, eastOneEight, westFourFive, eastFourFive, westThreeSix, eastThreeSix, westTwoSeven, eastTwoSeven, westUpper, westLower, eastUpper, eastLower, eastFinals, westFinals, finals
function createMatchup(){
    westOneEight = new Matchup('westOneEight', '1st', '8th', 'west') 
    eastOneEight = new Matchup('eastOneEight', '1st', '8th', 'east')
    westFourFive = new Matchup('westFourFive', '4th', '5th', 'west')
    eastFourFive = new Matchup('eastFourFive', '4th', '5th', 'east')
    westTwoSeven = new Matchup('westTwoSeven', '2nd', '7th', 'west')
    eastTwoSeven = new Matchup('eastTwoSeven', '2nd', '7th', 'east')
    westThreeSix = new Matchup('westThreeSix', '3rd', '6th', 'west')
    eastThreeSix = new Matchup('eastThreeSix', '3rd', '6th', 'east')
    westUpper = new SecondRound('westUpper', `${westOneEight.winner}`, `${westFourFive.winner}`, 'west', '1st8th4th5th')
    westLower = new SecondRound('westLower', `${westTwoSeven.winner}`, `${westThreeSix.winner}`, 'west', '2nd7th3rd6th')
    eastUpper = new SecondRound('eastUpper', `${eastOneEight.winner}`, `${eastFourFive.winner}`, 'east', '1st8th4th5th')
    eastLower = new SecondRound('eastLower', `${eastTwoSeven.winner}`, `${eastThreeSix.winner}`, 'east', '2nd7th3rd6th')
    eastFinals = new SecondRound('eastFinal', `${eastUpper.winner}`, `${eastLower.winner}`, 'east', 'Finalist')
    westFinals = new SecondRound('westFinal', `${westUpper.winner}`, `${westLower.winner}`, 'west', 'Finalist')
    finals = new Finals('finals', `${westFinals.winner}`, `${eastFinals.winner}`, 'finals', 'Champion')
}

// function to initialize matchups
function startTournament() {
    createMatchup();        //create each matchup
    const matchups = [westOneEight, eastOneEight, westFourFive, westTwoSeven, eastFourFive, eastTwoSeven, westThreeSix, eastThreeSix, westUpper, westLower, eastUpper, eastLower, eastFinals, westFinals, finals];  //an array of each match
    matchups.forEach(matchup => matchup.paintGames()); // create each game of each matchup
  }


//get the playoff data for page use
  let playoffData
  fetchPlayoffs = () => {
    return new Promise((resolve, reject) => {
      fetch(`data/${year}/playoffs.json`)
        .then((response) => response.json())
        .then((json) => {
          playoffData = json;
          resolve();
        })
        .catch((error) => {
          reject(error);
        });
    });
  };
//   fetchPlayoffs()
  
//run functions to create team data and playoff matchups
Promise.all([fetchPlayoffs(), ...teams.map((team) => getDataAndPlaceSeed(team))])
  .then(() => startTournament())
  .then(() => teams.forEach((team) => team.addSelectors()))
  .catch((error) => console.error(error));

