const food = {
  /**
   * food properties
   * TODO: create init function for setting these props
   */
  dropped: false,
  currentX: 0,
  currentY: 0,

  /**
   * function to drop the food
   * @param {Object} { width, height } - getting the width and height from the canvas size 
   */
  drop ({ width, height }) {
    this.currentX = this.getRandomPosition(height)
    this.currentY = this.getRandomPosition(width)
    this.dropped = true
  },

  /**
   * function to draw the food on frame
   * @param {Object} context - the canvas context
   * @param {string} color - the food color
   */
  draw (context, color) {
    context.fillStyle = color
    context.fillRect(this.currentX, this.currentY, 10, 10)
  },

  /**
   * creates a random number
   * @param {Number} max - the maximum number for random value
   * @return {Number} a random number for random food placement
   */
  getRandomPosition (max) {
    return Math.round(Math.random() * (max / 10) + 0) * 10
  },

  /**
   * function to call when food is eaten
   * @param {Bool} eaten - if the food was eaten, then it is no longer dropped
   */
  wasEaten (eaten) {
    this.dropped = !eaten
  }
}

export default food