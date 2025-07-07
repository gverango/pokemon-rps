import React, { useEffect, useState } from 'react';
import DisplayCards from './DisplayCards';
import Modal from './Modal';
import './App.css';

function App() {
  // React re renders component when any of useState values change
  const [allCards, setAllCards] = useState([]);
  const [roundCards, setRoundCards] = useState([]);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [selectedPlayerCard, setSelectedPlayerCard] = useState(null);
  const [selectedComputerCard, setSelectedComputerCard] = useState(null);
  const [battleResult, setBattleResult] = useState(null); // 'player', 'computer', or 'draw'
  const [showBattle, setShowBattle] = useState(false); // battle screen vs card selection

  const [playerCards, setPlayerCards] = useState([]);
  const [computerCards, setComputerCards] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151");
    const list = await res.json();
    console.log(list); //Returns an array of 151 Pokemon objects with their names and URLs
    // Directly manipulate listPokemonUrls with forEach to filter Pokemon
    const filtered = [];

    //For each pokemon, fetch its full data and filter by type
    for (const p of list.results) { // Replace nested async function with direct await and for loop
      const res = await fetch(p.url);
      const full = await res.json();
      const types = full.types.map(t => t.type.name);
      const primary = types[0];
      if (['fire', 'water', 'grass'].includes(primary)) {
        filtered.push({
          name: full.name,
          types,
          sprite: full.sprites.front_default
        });
      }
    }

    setAllCards(filtered);
    setRoundCards(getThreeCardsFromEachType(filtered));
  }

  function getThreeCardsFromEachType(data) {
    // Randomly selects one card from each of the 3 types to display
    // This round will have 3 cards, one of each type
    const types = ['fire', 'water', 'grass'];
    return types.map(type => {
      const matches = data.filter(p => p.types.includes(type));
      return matches[Math.floor(Math.random() * matches.length)];
    });
  }

  function getWinner(playerType, computerType) {
    const beats = {
      fire: 'grass',
      grass: 'water',
      water: 'fire',
    };
    if (playerType === computerType) return 'draw';
    return beats[playerType] === computerType ? 'player' : 'computer';
  }
  function handleCardClick(playerCard) {   //when a user clicks card -> set up battle screen
    const types = ['fire', 'water', 'grass'];
    const opponentType = types[Math.floor(Math.random() * 3)];
    const opponentChoices = allCards.filter(p => p.types.includes(opponentType));
    const computerCard = opponentChoices[Math.floor(Math.random() * opponentChoices.length)]; // int(random()* opponentChoices.length))

    const result = getWinner(playerCard.types[0], computerCard.types[0]); //compare types to determine winner

    setSelectedPlayerCard(playerCard);
    setSelectedComputerCard(computerCard);
    setBattleResult(result);
    setShowBattle(true);
  }

  function handleNextRound() {
    if (battleResult === 'player') {
      setPlayerScore(score => score + 1);
      playerCards.push(selectedPlayerCard);
      setPlayerCards(playerCards);

    } else if (battleResult === 'computer') {
      setComputerScore(score => score + 1);
      computerCards.push(selectedComputerCard);
      setComputerCards(computerCards);
    }

    const nextPlayerScore = battleResult === 'player' ? playerScore + 1 : playerScore;
    const nextComputerScore = battleResult === 'computer' ? computerScore + 1 : computerScore;
//if player points ==2 or above, end game
    if (nextPlayerScore === 2 || nextComputerScore === 2) {
      setGameOver(true);
      setWinner(nextPlayerScore === 2 ? 'player' : 'computer');
    } else {
      setRoundCards(getThreeCardsFromEachType(allCards));
      setShowBattle(false);
    }

    // Clear battle for next round
    setSelectedPlayerCard(null);
    setSelectedComputerCard(null);
    setBattleResult(null);
  }

  /*
  Render logic:
  - Title
  - Modal for instructions
  - If game not over and not in battle mode, show round's cards.
  
  */

  return ( //Render main app: Render logic:
    <div >
        <h1>Pokémon RPS</h1>
        <Modal />

        {!gameOver && !showBattle && roundCards.length > 0 && (
          <DisplayCards cards={roundCards} onCardClick={handleCardClick} />
        )}

        {!gameOver && showBattle && selectedPlayerCard && selectedComputerCard && (
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div>
              <h2>You</h2>
              <DisplayCards cards={[selectedPlayerCard]} />
            </div>
            <div>
              <h2>Computer</h2>
              <DisplayCards cards={[selectedComputerCard]} />
            </div>
          </div>
        )}

        {battleResult && !gameOver && (
          <div style={{ textAlign: 'center' }}>
            <h2>
              {battleResult === 'player' && 'Player +1!'}
              {battleResult === 'computer' && 'Computer +1!'}
              {battleResult === 'draw' && 'Draw, no points!'}
            </h2>
            <button onClick={handleNextRound}>Next Round</button>
          </div>
        )}

        {gameOver && (
          <div>
            <h2>{winner === 'player' ? 'You Win!' : 'Computer Wins!'}</h2>
            <h3>{winner === 'player' ? 'Your Winning Cards' : 'Computer\'s Winning Cards'}:</h3>
            <DisplayCards cards={winner === 'player' ? playerCards : computerCards} />
          </div>
        )}
      </div>
  );
}

export default App;