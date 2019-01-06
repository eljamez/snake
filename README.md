# Snake

### Getting started
First, install dependencies (yarn required)

`yarn install`

to play, simply run:

`yarn start`

This runs the game locally at `localhost:1234`

For a production build run:

`yarn build`

If built, game can be played from `index.html` in the `dist` folder

### Tools
Bulma.io for quick styling

Parcel for quick bundling

### Bugs
- need a better way to reset the game
- user can turn faster than speed of tick, make only one direction change per tick possible

### TODOs:
- create better intro screen
- create better end screen
- move individual game logic into it's own component (game.js?)
- consider refactoring components to be iifes
- move game logic / variables to state
- create state methods for updating state
- keep score
- add to score per each eating
- make the snake move faster the longer he gets
- create leaderboard
- add unit tests