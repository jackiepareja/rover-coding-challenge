'use strict';
/* globals _, engine */
window.initGame = function () {
  console.log('initgame');

  const command =
    '5 3 \n 1 1 s\n ffffff\n 2 1 w \n flfffffrrfffffff\n 0 3 w\n LLFFFLFLFL';

  const parseInput = (input) => {

    class Rover {
      constructor(x, y, o, command) {
        this.x = x;
        this.y = y;
        this.o = o;
        this.command = command;
      }
    }

    const commandsArray = input.split('\n ');
    // commandsArray = ['5 3' ,' 1 1 s', 'ffffff',' 2 1 w' , 'flfffffrrfffffff', '0 3 w', 'LLFFFLFLFL']
    // 1, 1, S => 'ffffff' => 1, -5, s || 2, 1, w => 'flfffffrrfffffff' => 1, 3 N || 0, 3, w => LLFFFLFLFL
    let instructions;
    let coordinates;

    let robos = [];
    let parsed = {};


    for (let i = 1; i < commandsArray.length; i++) {
      let bounds = commandsArray[0];
      if (i % 2 == 0) {
        // instructions ffffff
        // instructions flfffffrrfffffff
        // instructions LLFFFLFLFL
        instructions = commandsArray[i];
      } else if (i % 2 == 0 + 1) {
        coordinates = commandsArray[i].split(' ');
        // (3)['1', '1', 's']
        // (4)['2', '1', 'w', '']
        // (3)['0', '3', 'w']
        // FIXME: roverObj[0].command is missing the third element and the first object.command is undefined.
        let roverObj = new Rover(coordinates[0], coordinates[1], coordinates[2], instructions);

        robos.push(roverObj)


        parsed = Object.assign({}, robos)
        parsed = { ...parsed, bounds }

      }

    }

    //console.log(parsed)

    //replace this with a correct object
    parsed = {
      bounds: [5, 3],
      robos: [{
        x: 1,
        y: 1,
        o: 's',
        command: 'ffffff'
      },
      {
        x: 2,
        y: 1,
        o: 'w',
        command: 'flfffffrrfffffff'
      }, {
        x: 0,
        y: 3,
        o: 'w',
        command: 'LLFFFLFLFL'
      }
      ]
    };



    return parsed;
  };

  // this function replaces the robos after they complete one instruction
  // from their commandset
  const tickRobos = (robos) => {
    console.log('tickrobos');
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

    // write robot logic here

    let currentPos;
    let i;
    let commandStack;

    // FIXME: Optimize Cardinal changes
    // const cardinalDirections = ['N', 'E', 'S', 'W'];
    // cardinalDirections.map(cardinal => console.log(cardinal));

    for (i = 0; i < robos.length; i++) {
      let xCoord = robos[i].x;
      let yCoord = robos[i].y;
      let orientation = robos[i].o;
      let command = robos[i].command;
      currentPos = `Robot ${i} Status: (${xCoord}, ${yCoord}, ${orientation}). Commands: ${command}.`;
      commandStack = robos[i].command.split('');

      console.log(command)



    }

    // detect orientation first,
    // based on orientation move
    // based on orientation, turn and update orientation.




    function detectOrientation(cardinal) {
      if (cardinal.toUpperCase() == 'N') {
        robos[i].y += 1;
      } else if (cardinal.toUpperCase() == 'E') {
        robos[i].x += 1;
      } else if (cardinal.toUpperCase() == 'S') {
        robos[i].y -= 1;
      } else if (cardinal.toUpperCase() == 'W') {
        robos[i].x -= 1;
      }
    }

    function moveLocation() {
      if (instruction.toUpperCase() == 'F') {
        // move forward
      } else if (instruction.toUpperCase() == 'L') {
        // turn left
      } else if (instruction.toUpperCase() == 'R') {
        // turn right
      }
    }



    console.log('is it updated here?', robos)



    // return the mutated robos object from the input to match the new state
    // return ???;
  };
  // mission summary function
  const missionSummary = (robos) => {
    //
    // task #3
    //
    // summarize the mission and inject the results into the DOM elements referenced in readme.md
    //
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

