/**
 * a06:s01
 * Synchronous solution to the maze
 */


/**
 * Runs when the page loads
 */
document.body.onload = async function () {
  // Create a basic maze
  const maze = new Maze();

  // Add a token to the maze
  const token = new Token(maze);

  // Attach the maze to the dom
  document.getElementById('root').appendChild(maze.dom);

  // Code to solve the maze
  token.moveSync('north');
  token.moveSync('east');
  token.moveSync('east');
  token.moveSync('north');


}
