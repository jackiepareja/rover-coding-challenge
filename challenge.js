'use strict';

/**
   * Remaining To Dos:
   * 1. Add logic where remaining robos can't pass through 'dead grids'.
   * 2. Display robo command changes on browser. (canvas api?)
   * 3. Fix parseInput - returned parsed object.robos isn't being accepted by the tickRobos() method.
   * 4. Error on line 236: robo is being read as undefined. Fixed
   */

class Rover {
  constructor(x, y, o, command) {
    this.x = x;
    this.y = y;
    this.o = o;
    this.command = command;
  }
}

function moveForward(robot) {
  const { o, x, y } = robot;

  const newPosition = { x, y };

  switch (o.toUpperCase()) {
    case 'N': newPosition.y += 1; break;
    case 'E': newPosition.x += 1; break;
    case 'S': newPosition.y -= 1; break;
    case 'W': newPosition.x -= 1; break;
  }

  return newPosition;
}

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
  //console.log('initgame');
  const limits = [];
  const command =
    '5 3 \n 1 1 s\n ffffff\n 2 1 w \n flfffffrrfffffff\n 0 3 w\n LLFFFLFLFL';
  let parsed;

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
    console.log('checking parsed obj', parsed)

    return parsed;
  };



  const tickRobos = (robos) => {
    console.log('robos', robos)
    //console.log('tickrobos');
    // 
    // task #2
    //
    // in this function, write business logic to move robots around the playfield
    // the 'robos' input is an array of objects; each object has 4 parameters.
    // This function needs to edit each robot in the array so that its x/y coordinates
    // and orientation parameters match the robot state after 1 command has been completed. 
    // Also, you need to remove the command the robot just completed from the command list.
    // example input:
    //
    // robos[0] = {x: 2, y: 2, o: 'N', command: 'frlrlrl'}
    //
    //                   - becomes -
    // 
    // robos[0] = {x: 2, y: 1, o: 'N', command: 'rlrlrl'} 
    //
    // if a robot leaves the bounds of the playfield, it should be removed from the robos
    // array. It should leave a 'scent' in it's place. If another robot–for the duration
    // of its commandset–encounters this 'scent', it should refuse any commands that would
    // cause it to leave the playfield.

    //console.log({ parsed })

    for (let i = 0; i < robos.length; i++) {
      const robot = robos[i];

      console.log('Initial state', robot);

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
          // ...
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

      console.log(robot);
    }

    return robos;
  };

  const missionSummary = (robos) => {
    console.log('undefined robos', robos)
    //
    // task #3
    //
    // summarize the mission and inject the results into the DOM elements referenced in readme.md
    //

    robos.forEach((robot, idx) => {

      const survived = !robot.died;

      const li = document.createElement('li');
      console.log('robot.died', robot)
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
