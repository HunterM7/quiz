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
	showQuestions();
}


let que_count = 0;

// Getting questions and options from array
function showQuestions() {
	const que_text = document.querySelector(".que-text");
	let que_tag = `<span>${questions[0].question}</span>`;
	que_text.innerHTML = que_tag;
}