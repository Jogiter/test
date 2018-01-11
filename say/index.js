const say = require('say')

// Use default system voice and speed
// say.speak('Hello! nice to meet you, fuck you ha')

// Stop the text currently being spoken
// say.stop()

// More complex example (with an OS X voice) and slow speed
say.speak("What's up, dog?", 'john', 0.5)
//
// // Fire a callback once the text has completed being spoken
// say.speak("What's up, dog?", 'Good News', 1.0, (err) => {
//   if (err) {
//     return console.error(err)
//   }
//
//   console.log('Text has been spoken.')
// });

// Export spoken audio to a WAV file
// say.export("I'm sorry, Dave.", 'Cellos', 0.75, 'hal.wav', (err) => {
//   if (err) {
//     return console.error(err)
//   }
//
//   console.log('Text has been saved to hal.wav.')
// })
