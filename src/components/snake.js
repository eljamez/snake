const snake = {
  /**
   * Function to initiate the snake
   * @param {Array} parts - the parts of the snake to set
   */
  init (parts) {
    this.parts = parts
    this.direction = 'right'
  },

  /**
   * Function to check if new direction is opposite current
   * @param {String} newDirection - the direction to check against
   * @return {Bool} true if trying to go the opposite direction 
   */
  isOppositeDirection (newDirection) {
    switch (newDirection) {
      case 'up': return this.direction === 'down'
      case 'down': return this.direction === 'up'
      case 'right': return this.direction === 'left'
      case 'left': return this.direction === 'right'
    }
  },

  /**
   * Sets the direction of the snake
   * @param {String} newDirection 
   */
  setDirection (newDirection) {
    if (this.isOppositeDirection(newDirection)) { return false } 
    this.direction = newDirection
  },

  /**
   * Moves the snake in the proper direction by adjusting the parts
   * @param {Bool} justAte - flag to check if the snake just ate, and to add to it's length
   */
  move (justAte) {
    switch (this.direction) {
      case 'up':
        this.parts.unshift({
          x: this.parts[0].x,
          y: this.parts[0].y - 10
        })
        break
      case 'right':
        this.parts.unshift({
          x: this.parts[0].x + 10,
          y: this.parts[0].y
        })
        break
      case 'down':
        this.parts.unshift({
          x: this.parts[0].x,
          y: this.parts[0].y + 10
        })
        break
      case 'left':
        this.parts.unshift({
          x: this.parts[0].x - 10,
          y: this.parts[0].y
        })
      break
    }
    
    if (!justAte) { this.parts.pop() }
  },

  /**
   * Draws the snake on the canvas in the proper position
   * @param {Object} context - the context of the canvas
   * @param {String} color - the color of the snake
   */
  draw (context, color) {
    context.fillStyle = color
    this.parts.forEach(part => context.fillRect(part.x, part.y, 10, 10))
  },

  /**
   * Checks to see if snake is out of bounds or has hit itself
   * @param {Object} { width, height } - getting the width and height from the canvas size 
   * @return {Bool} 
   */
  isDead ({ width, height }) {
    if (
      this.parts[0].x >= width ||
      this.parts[0].y >= height ||
      this.parts[0].x < 0 ||
      this.parts[0].y < 0) {
        return true
      }
    return this.parts.find((val, index) => {
      if (index !== 0) {
        return val.x === this.parts[0].x && val.y === this.parts[0].y
      } else {
        return false
      }
    })
  },

  /**
   * Checks if snake has found the food and is currently eating
   * @param {Object} { currentX, currentY } - check if snake is currently eating the food
   * @return {Bool}
   */
  isEating ({ currentX, currentY }) {
    if (currentX === this.parts[0].x && currentY === this.parts[0].y ) { return true }
    return false
  }
}

export default snake