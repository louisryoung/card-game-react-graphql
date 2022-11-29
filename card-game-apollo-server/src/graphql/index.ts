import { extendType, objectType, enumType, nonNull, stringArg } from 'nexus'

import { NexusGenObjects } from '../../nexus-typegen'
import { initialCards } from './constants'

function getRandomInteger(integer: number) {
  return Math.floor(Math.random() * integer)
}

const Suit = enumType({
  name: 'Suit',
  members: {
    diamond: 'diamond',
    heart: 'heart',
    spade: 'spade',
    clover: 'clover',
  },
})

export const Card = objectType({
  name: 'Card',
  definition(t) {
    t.nonNull.field('suit', { type: Suit })
    t.nonNull.string('number')
  },
})

let cards: NexusGenObjects['Card'][] = [...initialCards]
let cardsLeft = 52
let acesLeft = 4

export const Play = objectType({
  name: 'Play',
  definition(t) {
    t.nonNull.list.field('dealtCards', { type: Card })
    t.nonNull.int('cardsLeft')
    t.nonNull.int('acesLeft')
  },
})

export const CardMutation = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('play', {
      type: 'Play',
      args: {
        type: nonNull(stringArg()),
      },
      resolve(parent, args, context) {
        const { type } = args
        if (type === 'reset') {
          cards = [...initialCards]
          cardsLeft = 52
          acesLeft = 4

          return {
            cardsLeft,
            acesLeft,
            dealtCards: [],
          }
        }

        const dealtCards = []
        for (let i = 0; i < 5; i++) {
          if (cardsLeft < 1) break

          const randomIndex = getRandomInteger(cardsLeft)
          const dealtCard = cards.splice(randomIndex, 1)[0]
          cardsLeft--
          dealtCards.push(dealtCard)
          if (dealtCard.number === 'A') {
            acesLeft--
          }
        }

        return {
          dealtCards,
          cardsLeft,
          acesLeft,
        }
      },
    })
  },
})
