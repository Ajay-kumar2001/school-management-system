// ChildProcess.js

// A function that returns an array
function getArrayData() {
    return ['item1', 'item2', 'item3'];
  }
  const result:string[] = getArrayData();
  process.send?process.send(result):[] // Sending data back to the parent

//   // Send message to the parent process after the child process starts
//   process.on('message', (msg) => {
//     console.log('Message from parent:', msg);
  
//     // Send the data (array) back to the parent process
//     const result:string[] = getArrayData();
//     process.send(result)  // Sending data back to the parent
//   });
  
  // Simulate closing the child process after sending the message
//   setTimeout(() => {
//     console.log('Child process is done and will exit.');
//     process.exit();
//   }, 3000);