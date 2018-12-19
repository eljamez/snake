const background = {
  /**
   * Draws the background
   * @param {Object} context - the canvas context
   * @param {String} color - the background color
   * @param {Object} { width, height } - the size of the canvas
   */
  refresh (context, color, { width, height }) {
    context.clearRect(0, 0, width, height)
    context.fillStyle = color
    context.fillRect(0, 0, width, height)
  }
}

export default background