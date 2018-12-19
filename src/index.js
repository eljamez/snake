import 'bulma/css/bulma.css'
import CONSTANTS from './constants'
import background from './components/background'
import snake from './components/snake'
import state from './state'
import food from './components/food'

// TODO: move into init function

/**
 * Set up Canvas
 */
const battleGround = document.getElementById("battleGround")
const context = battleGround.getContext("2d")

/**
 * get the direction from arrow key map
 * @param {*} keycode 
 */
const getDirection = (keycode) => {
	return CONSTANTS.KEY_MAP.find(val => val.key === keycode).direction
}

/**
 * function called on keydown event
 * @param {*} e 
 */
const keyPress = (e) => {
  if (e.keyCode === 32 && !state.game.inProgress) { startGame() }
  if (state.game.inProgress) {snake.setDirection(getDirection(e.keyCode)) }
}

background.refresh(context, CONSTANTS.BG_COLOR, battleGround)
document.addEventListener('keydown', keyPress)

/**
 * Main function to kick off the game
 * TODO: Create module of game controls
 * TODO: Create more consistant reset
 */
const startGame = () => {
  state.game.inProgress = true
  snake.init(CONSTANTS.SNAKE_START)
  food.dropped = false

  /**
   * Sets up a new game / intervals for frames
   */
  const newGame = setInterval(() => {
    if( !food.dropped ) {food.drop(battleGround) }
    background.refresh(context, CONSTANTS.BG_COLOR, battleGround)
    food.draw(context, CONSTANTS.FOOD_COLOR)
    food.wasEaten(snake.isEating(food))
    snake.move(snake.isEating(food))
    snake.draw(context, CONSTANTS.SNAKE_COLOR)
    if( snake.isDead(battleGround) ) {endGame()}
  }, CONSTANTS.SPEED)

  /**
   * Initiates the end of the game. 
   */
  const endGame = () => {
    clearInterval(newGame)
    alert('game over')
    state.game.inProgress = false
  }
}



