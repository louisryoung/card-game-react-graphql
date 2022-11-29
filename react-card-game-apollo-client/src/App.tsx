import React from 'react'
import { usePlayMutation } from './graphql/generated'
import { Card as CardItem } from './components/Card'
import { CountBoard } from './components/CountBoard'

export enum Suit {
  Diamond = 'diamond',
  Heart = 'heart',
  Spade = 'spade',
  Clover = 'clover',
}

export type Card = {
  suit: Suit
  number: string
}

function App() {
  const [counts, setCounts] = React.useState({
    cardsLeft: 52,
    acesLeft: 4,
  })

  const [play, { data }] = usePlayMutation()

  React.useEffect(() => {
    play({ variables: { type: 'reset' } })
  }, [play])

  React.useEffect(() => {
    if (data) {
      const {
        play: { cardsLeft, acesLeft },
      } = data
      setCounts({ cardsLeft, acesLeft })
    }
  }, [data])

  const isGameEnded = data?.play.cardsLeft === 0
  const isWinner =
    isGameEnded && data.play.dealtCards.some((card) => card?.number === 'A')

  return (
    <main className="bg-green-800 h-screen py-[8vh] min-w-[768px] min-h-[768px] relative font-courier">
      {isWinner && (
        <img
          src="../assets/winner.svg"
          className="absolute top-[160px] right-[calc(50vw-514px)] animate-bounce"
          alt="Winner"
        ></img>
      )}
      <div className="flex justify-center">
        <CountBoard type="Card" count={counts.cardsLeft}></CountBoard>
        <CountBoard type="Ace" count={counts.acesLeft}></CountBoard>
      </div>
      <div className="flex justify-center gap-10 mt-[12vh]">
        {data?.play.dealtCards.map(
          (card, i) =>
            card && (
              <CardItem
                card={card}
                index={i}
                key={card.suit + card.number}
                isFinal={isGameEnded}
              ></CardItem>
            )
        )}
      </div>
      {!isGameEnded ? (
        <>
          <div className="absolute bottom-[15vh] left-[calc(50vw-156px)]">
            <button
              className="bg-[color:var(--button-color)] uppercase px-[60px] py-[10px] text-[64px]
                font-alfa rounded-button hover:opacity-80 active:opacity-60"
              onClick={() => play({ variables: { type: 'deal' } })}
            >
              Deal
            </button>
          </div>
          <div className="absolute bottom-[7vh] right-[5vw]">
            <button
              onClick={() => play({ variables: { type: 'reset' } })}
              className="border-[3px] border-[color:var(--button-color)] px-[30px] py-[10px] text-[24px] text-[color:var(--button-color)]
                bg-transparent font-alfa rounded-button hover:opacity-80 active:opacity-60"
            >
              Reset
            </button>
          </div>
        </>
      ) : (
        <>
          {!isWinner && (
            <div className="absolute bottom-[22vh] left-[calc(50vw-237px)] text-[36px] text-center text-white">
              You lose.
              <br />
              Better luck next time!
            </div>
          )}
          <div
            className={`absolute ${
              isWinner ? 'bottom-[20vh]' : 'bottom-[10vh]'
            } right-[calc(50vw-102px)]`}
          >
            <button
              onClick={() => play({ variables: { type: 'reset' } })}
              className="border-[3px] border-[color:var(--button-color)] px-[30px] py-[10px] text-[24px] text-[color:var(--button-color)]
                bg-transparent font-alfa rounded-14px hover:opacity-80 active:opacity-60"
            >
              Play Again
            </button>
          </div>
        </>
      )}
    </main>
  )
}

export { App }
