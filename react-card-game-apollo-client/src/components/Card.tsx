import classNames from 'classnames'
import { Card as CardType, Suit } from '../App'
import '../styles/card.css'

interface Props {
  card: CardType
  index?: number
  isFinal?: boolean
}

function Card({ card: { suit, number }, index, isFinal }: Props) {
  function isRedSuit(suit: Suit) {
    return suit === Suit.Diamond || suit === Suit.Heart
  }

  return (
    <div
      className={classNames(
        'inline-block w-[192px] h-[264px] p-5 rounded-[24px] bg-white',
        `${
          Number(index) + 1
            ? isFinal
              ? `final-card-${index}`
              : `card-${index}`
            : ''
        }`,
        {
          'text-red-500': isRedSuit(suit),
        }
      )}
    >
      <div className="text-[90px] font-bold mt-[-15px]">{number}</div>
      <img
        className="ml-3 mt-[-30px]"
        src={`../assets/${suit}.svg`}
        width={36}
        alt={suit}
      ></img>
      <img
        className="ml-auto"
        src={`../assets/${suit}.svg`}
        width={90}
        alt={suit}
      ></img>
    </div>
  )
}

export { Card }
