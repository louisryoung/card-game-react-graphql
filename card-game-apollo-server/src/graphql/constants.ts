enum Suit {
  Diamond = 'diamond',
  Heart = 'heart',
  Spade = 'spade',
  Clover = 'clover',
}

type Card = {
  suit: Suit
  number: string
}

export const suits = [Suit.Clover, Suit.Diamond, Suit.Heart, Suit.Spade]
export const numbers = [
  'A',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'J',
  'Q',
  'K',
]

function generateCards() {
  const cards: Card[] = []
  suits.forEach((suit) => {
    numbers.forEach((number) => {
      cards.push({ suit, number })
    })
  })

  return cards
}

export const initialCards = generateCards()
