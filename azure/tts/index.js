// pull in the required packages.
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import * as readline from "readline";
import dotenv from "dotenv";
import { writeFileSync, readFileSync } from 'fs'
import OSS from 'ali-oss';

const client = new OSS({
	region: 'oss-cn-shenzhen',
	accessKeyId: 'LTAI5tJQPpm3RUYoNbBNM2oD',
	accessKeySecret: 'c8XyVLvBMGVyDRdyQZFKE2hHXvqTfw',
	bucket: 'img-jogiter',
	secure: true,
})

dotenv.config();

// replace with your own subscription key,
// service region (e.g., "westus"), and
// the name of the file you save the synthesized audio.
var subscriptionKey = process.env.SPEECH_KEY;
var serviceRegion = process.env.SPEECH_REGION; // e.g., "westus"
// var filename = "./output/tts.mp3";
var filename = "libai-jiangjinjiu.wav";

// create output.wav file
writeFileSync(filename, "");


// we are done with the setup

// now create the audio-config pointing to our stream and
// the speech config specifying the language.
var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
var speechConfig = sdk.SpeechConfig.fromSubscription(
	subscriptionKey,
	serviceRegion
);
speechConfig.speechSynthesisVoiceName = "zh-CN-YunxiNeural"; // e.g., "en-US-GuyRUS"

// create the speech synthesizer.
var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

var rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

// rl.question("Type some text that you want to speak...\n> ", function (text) {
	// rl.close();
	let text = `
	李白《将进酒》

	君不见，黄河之水天上来，奔流到海不复回。

	君不见，高堂明镜悲白发，朝如青丝暮成雪。

	人生得意须尽欢，莫使金樽空对月。

	天生我材必有用，千金散尽还复来。

	烹羊宰牛且为乐，会须一饮三百杯。

	岑夫子，丹丘生，将进酒，杯莫停。

	与君歌一曲，请君为我倾耳听。

	钟鼓馔玉何足贵，但愿长醉不复醒。

	古来圣贤皆寂寞，唯有饮者留其名。

	陈王昔时宴平乐，斗酒十千恣欢谑。

	主人何为言少钱，径须沽取对君酌。

	五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。
	`

	// start the synthesizer and wait for a result.
	synthesizer.speakTextAsync(
		text,
		function (result) {
			if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
				console.log("synthesis finished.");

				// client.put(filename, readFileSync(filename)).then(result => {
				// 	console.log(result);
				// 	process.exit(0)
				// });

			} else {
				console.error(
					"Speech synthesis canceled, " +
						result.errorDetails +
						"\nDid you update the subscription info?"
				);
			}
			synthesizer.close();
			synthesizer = undefined;
		},
		function (err) {
			console.trace("err - " + err);
			synthesizer.close();
			synthesizer = undefined;
		}
	);
	console.log("Now synthesizing to: " + filename);

// });
