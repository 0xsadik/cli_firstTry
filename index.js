#!/usr/bin/env node

import * as p from '@clack/prompts';
import { setTimeout } from 'node:timers/promises';
import color from 'picocolors';

let correct = 0

async function askQuestion(question, answers, correctAns) {
	const options = []
	answers.forEach((answer) => {
		options.push({value: answer, label: answer})
	})

	const answer = await p.select({
		message: question,
		initialValue: '1',
		options: options,
	})

	const s = p.spinner();
	s.start();
	await setTimeout(1000);
	s.stop();

	if (answer == answers[correctAns]) {
		correct++
	}
}

class Question {
	constructor(question, answersArray, correctAns) {
		this.question = question;
		this.answersArray = answersArray;
		this.correctAns = correctAns;
	}
}

async function main() {
	console.clear();

	await setTimeout(1000);

	p.intro(`${color.bgGreen(color.black(`  Welcome!! 😇 let's see you are competitive programmer or not!!  `))}`);

	const ques1 = new Question(
		"1:- Do you know Computer Fundamentals?",
		[
		"Yes",
		"No"],
		0,
	)
    
    const ques2 = new Question(
        "2:- Do you know touch typing?",
        [
            "Yes bro!",
            "Naaah bro!"
        ],
        0,
    )

    const ques3= new Question(
        "3:- Do you know C++ programming language?",
        [
            "Yes, Broo!! ",
            "Naah, Broo!!"
        ],
        0
    )

    const ques4 = new Question(
        "4:- Do you have codeforces account? ",
        [
            "Oh yeaah!",
            "Damn, nooo! ",
        ],
        0
    )

    const ques5 = new Question(
        "5:- Do you enojoy solving new problems every single day? ",
        [
            "Yeaah bro!",
            "Naa, i don't "
        ],
        0
    )






	const allQuestions = [ques1, ques2, ques3, ques4, ques5];

	// Ask if the player is ready
	const readyToPlay = await p.select({
		message: "  5 questions here. Results at the end. Ready to play?  ",
		initialValue: "Yes",
		options: [
			{value: "Yes", label: "Yes"},
			{value: "No", label: "No"}],
	})

	if (readyToPlay == "Yes") {
		// Begin trivia game
		for (const question of allQuestions) {
			await askQuestion(question.question, question.answersArray, question.correctAns)
		}

		// Decide what ending screen to show based on how many questions user answered correctly
		p.outro(`${color.bgGreen(color.black(`  You got ${correct} questions correct!  `))}`);
	
		if (correct > 3) {
			const s = p.spinner();
			s.start("Generating secret message...");
			await setTimeout(5000);
			s.stop();
			p.outro(`${color.bgGreen(color.black(`  Oh yeaaah!!! 🔥 Seems you are really a competitive programmer 🤩  `))}`);
		} else {
			const s = p.spinner();
			s.start();
			await setTimeout(3000);
			s.stop();
			p.outro(`${color.bgGreen(color.black(`  Damn!! 🥲 probably you are not a competitive programmer.  `))}`);
		}
	} else {
		p.outro(`${color.bgGreen(color.black(`  Ok. tADaaa!  `))}`);
	}

}

main().catch(console.error);