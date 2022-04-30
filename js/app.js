// Getting all required elements
const info_box = document.querySelector(".info-box");
const quiz_box = document.querySelector(".quiz-box");
const result_box = document.querySelector('.result-box');
const start_btn = document.querySelector(".start-btn button");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const option_list = document.querySelector(".option-list");
const timeCount = quiz_box.querySelector(".timer-sec");
const timeLine = quiz_box.querySelector(".time-line");
const next_btn = quiz_box.querySelector('.next-btn');
const score_quiz = result_box.querySelector('.score-text');
const restart_quiz = result_box.querySelector('.restart');
const quit_quiz = result_box.querySelector('.quit');


let que_count = 0;
let counter;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;
const fps = 50;


let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

// If Start Quiz Button Clicked
start_btn.onclick = () => {
	info_box.classList.add("activeInfo"); // Show the Info box
}

// If Exit Button Clicked
exit_btn.onclick = () => {
	info_box.classList.remove("activeInfo"); // Hide the Info box
}

// If Continue Button Clicked
continue_btn.onclick = () => {
	info_box.classList.remove("activeInfo"); // Hide the Info box
	quiz_box.classList.add("activeQuiz"); // Show the Quiz box
	showQuestions(que_count);
	queCounter(que_count);
	startTimer(timeValue);
	startTimerLine(timeValue, fps);
}

// If Next Button Clicked
next_btn.onclick = () => {
	if (que_count < questions.length - 1) {
		que_count++;
		showQuestions(que_count);
		queCounter(que_count);
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(timeValue, fps);
	} else {
		showResultBox();
	}

	next_btn.classList.add("disabled");
}

// Getting questions and options from array
function showQuestions(index) {
	const que_text = document.querySelector(".que-text");
	let que_tag = `<span>${que_count + 1}. ${questions[index].question}</span>`;
	let option_tag = `<li class="option"><span>${questions[index].options[0]}</span></li>` +
		`<li class="option"><span>${questions[index].options[1]}</span></li>` +
		`<li class="option"><span>${questions[index].options[2]}</span></li>` +
		`<li class="option"><span>${questions[index].options[3]}</span></li>`;

	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;

	const option = option_list.querySelectorAll('.option');

	for (let key of option) {
		key.setAttribute("onclick", "optionSelected(this)")
	}

	next_btn.classList.add("disabled");
};

function optionSelected(answer) {
	clearInterval(counter);
	clearInterval(counterLine);
	let userAns = answer.textContent;
	let correctAns = questions[que_count].answer;

	if (userAns === correctAns) {
		answer.classList.add("correct");
		answer.insertAdjacentHTML("beforeend", tickIcon);
		userScore++;
	} else {
		answer.classList.add("incorrect");
		answer.insertAdjacentHTML("beforeend", crossIcon);

		// if answer is incorrect then automatically selected the correct answer
		for (let key of option_list.children) {
			// if (key.textContent === correctAns) key.setAttribute("class", "option correct")
			if (key.textContent === correctAns) {
				key.classList.add("correct");
				key.insertAdjacentHTML("beforeend", tickIcon);
			}
		}
	}

	// Once user selected disabled all options
	for (let key of option_list.children) {
		key.classList.add('disabled')
	}

	next_btn.classList.remove("disabled");
};

function startTimer(time) {
	timer();
	counter = setInterval(timer, 1000);

	function timer() {
		if (time >= 0) {
			timeCount.textContent = time;

			if (time < 10) {
				timeCount.textContent = '0' + timeCount.textContent
			}

			time--;
		} else {
			clearInterval(counter);
		}
	}
};

function startTimerLine(time, fps) {
	timeLine.style.width = '0%';
	counterLine = setInterval(timer, 1000 / fps);
	let lineWidth = 0;

	function timer() {
		lineWidth += 100 / ((time + 0) * fps);
		timeLine.style.width = lineWidth + '%';
		if (lineWidth > 100) {
			clearInterval(counterLine);
			timeLine.style.width = `100%`;
		}
	}
};

function queCounter(index) {
	const total_que = quiz_box.querySelector('.total-que');
	let total_tag = `<span>
		<p>${index + 1}</p>of<p>${questions.length}</p>Questions
	</span>`
	total_que.innerHTML = total_tag;
};

function showResultBox() {
	quiz_box.classList.remove("activeQuiz");
	result_box.classList.add("activeResult");

	let score;
	if (userScore == 0) {
		score = `<span>И, к сожалению, Вы ответили неправильно на все вопросы.</span>`
	}
	else if (userScore < 3) {
		score = `<span>И, к сожалению, вы набрали всего <span>${userScore}</span> из <span>5</span>.</span>`;
	}
	else if (userScore < 5) {
		score = `<span>И набрали целых <span>${userScore}</span> из <span>5</span>!</span>`;
	}
	else {
		score = `<span>И ответили на все <span>${userScore}</span> вопросов верно!</span>`;
	}

	score_quiz.innerHTML = score;
};