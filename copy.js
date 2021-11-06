'use strict';
/* globals _, engine */
window.initGame = function () {
  console.log('initgame');

  const command =
    '5 3 \n 1 1 s\n ffffff\n 2 1 w \n flfffffrrfffffff\n 0 3 w\n LLFFFLFLFL';

  const parseInput = (input) => {
    //
    // task #1 
    //
    // replace the 'parsed' variable below to be the string 'command' parsed into an object we can pass to genworld();
    // genworld expects an input object in the form { 'bounds': [3, 8], 'robos': [{x: 2, y: 1, o: 'W', command: 'rlrlff'}]}
    // where bounds represents the southeast corner of the plane and each robos object represents the
    // x,y coordinates of a robot and o is a string representing their orientation. a sample object is provided below
    //

    const allRobots = [];

    class Rover {
      constructor(x, y, o, command) {
        this.x = x; // maybe create a method?
        this.y = y;
        this.o = o;
        this.command = command;
      }
    }


    const destructure = (command) => {
      const commandArray = command.split('\n ');
      //console.log(commandArray);

      for (let idx = 1; idx < commandArray.length; idx++) {

        if (idx % 2 === 0) {
          //console.log(commandArray[idx])
          // store these in the rover object
          // ffffff
          //flfffffrrfffffff
          //LLFFFLFLFL

          // Robot = new Rover(3, 0, 'N', commandArray[idx]);
          // allRobots.push(Robot);

          const robotInstructions = commandArray[idx].split(' ');
          //return robotInstructions;
          //console.log(robotInstructions)


        } else if (idx % 2 === 0 + 1) {
          //console.log(commandArray[idx])
          // store these in the rover object
          //1 1 s
          //2 1 w 
          // 0 3 w
          //let newArray = { ...allRobots, x: 1, y: 1, o: 'S' }
          //console.log(Robot)


        }
      }
    }

    destructure(command);

    // const createRovers = () => {

    // }

    //const arrayInstructions = ['5 3 ', '1 1 s', 'ffffff', '2 1 w ', 'flfffffrrfffffff', '0 3 w', 'LLFFFLFLFL'];

    //replace this with a correct object
    let parsed = {
      bounds: [20, 20],
      robos: [{
        x: 2,
        y: 1,
        o: 'W',
        command: 'rlrlrff'
      }, {
        x: 12,
        y: 10,
        o: 'E',
        command: 'fffffffffff'
      }, {
        x: 18,
        y: 8,
        o: 'N',
        command: 'frlrlrlr'
      }]
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
    function moveRover(parsed) {

      //console.log(parsed);



    }

    moveRover(robos);

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

