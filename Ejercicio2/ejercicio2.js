import fs from 'fs';
const rounds = fs.readFileSync('./ejercicio2.txt', 'utf8')[0]
const playerRounds = fs.readFileSync('./ejercicio2.txt', 'utf8').split('\n').splice(1, rounds).map(round => round.split(' ').map(Number))

const winner = (playerRounds) => {
  let player1 = 0
  let player2 = 0
  let winner = 0
  let max = 0

  playerRounds.forEach(round => {
    player1 += round[0]
    player2 += round[1]
    if (Math.abs(player1 - player2) > max) {
      max = Math.abs(player1 - player2)
      if (player1 > player2) {
        winner = 1
      } else {
        winner = 2
      }
    }
  })
  return `${winner} ${max}`
}

const playerWon = winner(playerRounds)

if (fs.existsSync('./player1-win.txt')) {
  fs.unlinkSync('./player1-win.txt')
}
if (fs.existsSync('./player2-win.txt')) {
  fs.unlinkSync('./player2-win.txt')
}

if (playerWon.split(' ')[0] === '1') {
    fs.writeFileSync('./player1-win.txt', winner(playerRounds))
} else {
    fs.writeFileSync('./player2-win.txt', winner(playerRounds))
}
