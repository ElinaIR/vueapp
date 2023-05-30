import DeckList from './card_views/DeckList'
import Deck from './card_views/Deck'
import CreateDeck from './card_views/CreateDeck'
import EditDeck from './card_views/EditDeck'
import CreateCard from './card_views/CreateCard'
import EditCard from './card_views/EditCard'
import MyDecks from './card_views/MyDecks'
import Review from './card_views/Review'
import Tests from './card_views/Tests'
import MyTests from './card_views/MyTests'
import MyTest from './card_views/MyTest'
import Test from './card_views/Test'
import Results from './card_views/Results'


const card_routes = [
    {
        path: '/cards/decks',
        name: 'decks',
        component: DeckList
    },
    {
        path: '/cards/decks/:slug',
        name: 'deck',
        component: Deck
    },
    {
        path: '/cards/decks/create-deck',
        name: 'create-deck',
        component: CreateDeck
    },
    {
        path: '/cards/decks/edit-deck/:slug',
        name: 'edit-deck',
        component: EditDeck
    },
    {
        path: '/cards/decks/:slug/create-card',
        name: 'create-card',
        component: CreateCard
    },
    {
        path: '/cards/decks/:slug/edit-card/:id',
        name: 'edit-card',
        component: EditCard
    },
    {
        path: '/cards/my-decks',
        name: 'my-decks',
        component: MyDecks
    },
    {
        path: '/cards/:slug/review',
        name: 'review',
        component: Review
    },
    {
        path: '/cards/tests',
        name: 'tests',
        component: Tests
    },
    {
        path: '/cards/my-tests',
        name: 'my-tests',
        component: MyTests
    },
    {
        path: '/cards/my-tests/:slug',
        name: 'my-test',
        component: MyTest
    },
    {
        path: '/cards/tests/:id',
        name: 'test',
        component: Test
    },
    {
        path: '/cards/results/:id',
        name: 'results',
        component: Results
    },
]

export default card_routes