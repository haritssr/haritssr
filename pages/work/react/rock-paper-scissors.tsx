import { SubTitle, Topic } from '@/components/DesignSystem';
import LayoutSubWorkToTopic from '@/components/LayoutSubWorkToTopic';
import { Rock, Scissors, Paper } from '@/components/react/paper-rock-scissors-icons';
import { useEffect, useState } from 'react';

const choices = [
  { id: '1', name: 'rock', component: Rock, losesTo: 2 },
  { id: '2', name: 'paper', component: Paper, losesTo: 3 },
  { id: '3', name: 'scissors', component: Scissors, losesTo: 1 },
];

//1. Handle wins and losses
//2, Determine the winner based on choices
//3. Reset the game

export default function RockPaperScissors() {
  const buttonStyle =
    'p-2 bg-white hover:bg-blue-50 active:ring-1 active:ring-blue-500 focus:ring-1 focus:ring-blue-500 active:translate-y-0.5 rounded-full shadow hover:shadow-md';

  const gameStateStyle = 'rounded-full bg-gray-200 p-2 border border-gray-400 w-auto';

  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const [userChoice, setUserChoice] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);

  const [gameState, setGameState] = useState(null); //win, loss, draw

  useEffect(() => {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(randomChoice);
  }, []);

  function handleUserChoice(choice) {
    const randomChoice = choices[Math.floor(Math.random() * choices.length)];

    const chosenChoice = choices.find(c => c.id == choice);
    setUserChoice(chosenChoice);
    setComputerChoice(randomChoice);
    console.log('-----------------');
    console.log('chosenChoice.id = ' + chosenChoice.id);
    console.log('chosenChoice.losesTo = ' + chosenChoice.losesTo);
    console.log('computerChoice.id = ' + computerChoice.id);
    console.log('computerChoice.losesTo = ' + computerChoice.losesTo);

    if (chosenChoice.losesTo == computerChoice.id) {
      //loss
      setLosses(losses => losses + 1);
      setGameState('Lose');
    } else if (computerChoice.losesTo == chosenChoice.id) {
      //win
      setWins(wins => wins + 1);
      setGameState('Win');
    } else if (computerChoice.id == chosenChoice.id) {
      //draw
      setGameState('Draw');
    }
  }

  function renderComponent(choice) {
    const Components = choice.component;
    return <Components />;
  }

  return (
    <LayoutSubWorkToTopic title='Rock Paper Scissors' href='/work/react' hrefName='React'>
      <SubTitle>From Better Dev</SubTitle>
      <div className='space-y-5'>
        <div>
          <Topic name='Statistic' />
          <div className='flex items-center justify-start space-x-4'>
            <div className='flex items-center justify-center px-3 py-1 space-x-2 font-semibold border-2 rounded text-emerald-500 border-emerald-500'>
              <div>{wins}</div>
              <div>{wins == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 9 ? 'Win' : 'Wins'}</div>
            </div>
            <div className='flex items-center justify-center px-3 py-1 space-x-2 font-semibold border-2 rounded text-rose-500 border-rose-500'>
              <div>{losses}</div>
              <div>{losses == 1 || 2 || 3 || 4 || 5 || 6 || 7 || 9 ? 'Loss' : 'Losses'}</div>
            </div>
          </div>
        </div>
        <div>
          <Topic name='Your Choice' />
          <div className='flex space-x-3'>
            <button className={buttonStyle} onClick={() => handleUserChoice(1)}>
              <Rock />
            </button>
            <button className={buttonStyle} onClick={() => handleUserChoice(2)}>
              <Paper />
            </button>
            <button className={buttonStyle} onClick={() => handleUserChoice(3)}>
              <Scissors />
            </button>
            <div className='flex items-center'>{`=>`}</div>
            <div className='flex items-center space-x-2'>
              {gameState && <div className={gameStateStyle}>{renderComponent(userChoice)}</div>}
            </div>
          </div>
        </div>
        <div>
          <Topic name='Computer Choice' />
          <div className='flex items-center space-x-2'>
            {gameState && <div className={gameStateStyle}>{renderComponent(computerChoice)}</div>}
          </div>
        </div>

        <div>
          <Topic name='Your Status' />
          {gameState && <div>{gameState}</div>}
        </div>
      </div>

      {/* {gameState && (
        
      )} */}
    </LayoutSubWorkToTopic>
  );
}
