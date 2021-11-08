'use strict';
// constructor
class Rover {
  constructor(x, y, o, command) {
    this.x = x;
    this.y = y;
    this.o = o;
    this.command = command;
  }
}

/**
 * Helper Function
 * @param {string, number, number} robot - rover's object's orientation, x-axis, y-axis
 * @returns {number, number} newPosition - updated x-axis, y-axis
 */
function moveForward(robot) {
  const { o, x, y } = robot;

  const newPosition = { x, y };

  switch (o.toUpperCase()) {
    case 'N': newPosition.y -= 1; break;
    case 'E': newPosition.x += 1; break;
    case 'S': newPosition.y += 1; break;
    case 'W': newPosition.x -= 1; break;
  }
  return newPosition;
}

/**
 * Helper Function
 * @param robot 
 * @param {string} direction - R or L (right or left)
 * @returns direction - updated direction
 */
function rotate(robot, direction) {
  switch (robot.o.toUpperCase()) {
    case 'N':
      return direction === 'R' ? 'E' : 'W';
    case 'E':
      return direction === 'R' ? 'S' : 'N';
    case 'S':
      return direction === 'R' ? 'W' : 'E';
    case 'W':
      return direction === 'R' ? 'N' : 'S';
  }
}

/* globals _, engine */
window.initGame = function () {
  const limits = [];
  const command =
    '5 3 \n 1 1 s\n ffffff\n 2 1 w \n flfffffrrfffffff\n 0 3 w\n LLFFFLFLFL';
  let parsed;

  /**
   * @param input - accepts string commands
   * @returns parsed - parsed input into an object
   */
  const parseInput = (input) => {
    const commandsArray = input.split('\n ');
    const bounds = commandsArray[0].trim().split(' ');
    const robos = [];

    for (let i = 1; i < commandsArray.length; i++) {
      const instructions = commandsArray[i + 1];

      if (i % 2 == 0 + 1) {
        const [x, y, o] = commandsArray[i].split(' ');
        let roverObj = new Rover(Number(x), Number(y), o, instructions);

        robos.push(roverObj)
      }
    }

    parsed = { robos, bounds };

    return parsed;
  };


  /**
   * 
   * @param {array} robos - robos array object
   * @returns robos - updating robos array objects
   */
  const tickRobos = (robos) => {

    for (let i = 0; i < robos.length; i++) {
      const robot = robos[i];

      if (!robot.command) {
        continue;
      }

      let command = robot.command[0].toUpperCase();

      if (command === 'F') {

        let scent = false
        limits.forEach(limit => {
          if (robot.x == limit.x && robot.y == limit.y) {
            scent = true;
          }
        })

        const prevPos = { x: robot.x, y: robot.y };


        // Check if out of bounds
        const [limitX, limitY] = parsed.bounds;

        const newPosition = moveForward(robot);

        const outOfBoundaries = (
          newPosition.x > limitX ||
          newPosition.y > limitY ||
          newPosition.x < 0 ||
          newPosition.y < 0
        );

        if (outOfBoundaries && scent) {
          // FIXME: Add out of boundaries & scent logic 
        } else {
          // Move robot
          robot.x = newPosition.x;
          robot.y = newPosition.y;

          if (outOfBoundaries) {
            limits.push(prevPos);
            robot.died = prevPos;
          }
        }
      } else {
        robot.o = rotate(robot, command);
      }

      robot.command = robot.command.slice(1);
    }
    return robos;

  };

  /**
   * @param robos - most current robos object array 
   */
  const missionSummary = (robos) => {

    robos.forEach((robot, idx) => {

      const survived = !robot.died;

      const li = document.createElement('li');
      if (survived) {
        li.innerHTML = `Robot ${idx} Position: ${robot.x}, ${robot.y} | Orientation: ${robot.o}`;
        document.querySelector('#robots').appendChild(li);
      } else {
        li.innerHTML = `Robot ${idx} I died going ${robot.o} from coordinates: ${robot.died.x}, ${robot.died.y}`;
        document.querySelector('#lostRobots').appendChild(li);
      }
    });
    return;
  };

  // leave this alone please
  return {
    parse: parseInput,
    tick: tickRobos,
    summary: missionSummary,
    command: command
  };
};
