// Getting all required elements
const start_btn = document.querySelector(".start-btn button");
const info_box = document.querySelector(".info-box");
const quiz_box = document.querySelector(".quiz-box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");

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
	showQuestions(0);
}

let que_count = 0;

const next_btn = quiz_box.querySelector('.next-btn');


// If Next Button Clicked
next_btn.onclick = () => {
	if (que_count < questions.length - 1) {
		que_count++;
		showQuestions(que_count)
	} else {
		console.log('Questions completed');
	}
}

// Getting questions and options from array
function showQuestions(index) {
	const que_text = document.querySelector(".que-text");
	const option_list = document.querySelector(".option-list");
	const total_que = quiz_box.querySelector('.total-que');
	let que_tag = `<span>${que_count + 1}. ${questions[index].question}</span>`;
	let option_tag = `<li class="option">
								<span>${questions[index].options[0]}</span>
							</li>
							<li class="option">
								<span>${questions[index].options[1]}</span>
							</li>
							<li class="option">
								<span>${questions[index].options[2]}</span>
							</li>
							<li class="option">
								<span>${questions[index].options[3]}</span>
							</li>`;
	let total_tag = `<span>
								<p>${que_count + 1}</p>of<p>5</p>Questions
							</span>`
	que_text.innerHTML = que_tag;
	option_list.innerHTML = option_tag;
	total_que.innerHTML = total_tag;
}