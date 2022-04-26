// Getting all required elements
const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const quiz_box = document.querySelector(".quiz-box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const option_list = document.querySelector(".option-list");
const timeCount = quiz_box.querySelector(".timer-sec");
const timeLine = quiz_box.querySelector(".time-line");

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
	startTimer(15);
	startTimerLine(0);
}

let que_count = 0;
let counter;
let timeValue = 15;
let widthValue = 0;

const next_btn = quiz_box.querySelector('.next-btn');


// If Next Button Clicked
next_btn.onclick = () => {
	if (que_count < questions.length - 1) {
		que_count++;
		showQuestions(que_count);
		queCounter(que_count);
		clearInterval(counter);
		startTimer(timeValue);
		clearInterval(counterLine);
		startTimerLine(widthValue);
	} else {
		console.log('Questions completed');
	}
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
}

let tickIcon = '<div class="icon tick"><i class="fa-solid fa-check"></i></div>';
let crossIcon = '<div class="icon cross"><i class="fa-solid fa-xmark"></i></div>';

function optionSelected(answer) {
	clearInterval(counter);
	clearInterval(counterLine);
	let userAns = answer.textContent;
	let correctAns = questions[que_count].answer;

	if (userAns === correctAns) {
		answer.classList.add("correct");
		answer.insertAdjacentHTML("beforeend", tickIcon);
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
}

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
}

function startTimerLine(time) {
	counterLine = setInterval(timer, 29);
	function timer() {
		time++;
		timeLine.style.width = time + 'px';
		if (time > 549) clearInterval(counterLine);
	}
}

function queCounter(index) {
	const total_que = quiz_box.querySelector('.total-que');
	let total_tag = `<span>
		<p>${index + 1}</p>of<p>${questions.length}</p>Questions
	</span>`
	total_que.innerHTML = total_tag;
}