var state = {
	scoreInfo: {
		correct: 0,
		incorrect: 0,
	},
	questions: [
	{
		text: "What is Drake's real name?",
		answers: ["Trevor George Smith Jr." , "Clifford Joseph Harris Jr." , "Aubrey Graham" , "Andre Romelle Young"],
		rightAnswer: "Aubrey Graham"
	},
	{
		text: "What teen drama television series did Drake appear in during the early 2000s?",
		answers: ["Degrassi: The Next Generation" , "The O.C." , "Gossip Girl" , "One Tree Hill"],
		rightAnswer: "Degrassi: The Next Generation"
	},
	{
		text: "What is the name of Drake's debut studio album?",
		answers: ["Pay Me Yesterday" , "Ask me Now" , "Call Me Sometime" , "Thank Me Later"],
		rightAnswer: "Thank Me Later"
	},
	{
		text: "Where was Drake born?",
		answers: ["Québec City, Québec" , "Vancouver, British Columbia" , "Toronto, Ontario" , "Oakland, California"],
		rightAnswer: "Toronto, Ontario"
	},
	{
		text: "What is Drake's Instagram handle?",
		answers: ["theRealDrake" , "champagnepapi" , "Drizzy4Rizzy" , "drake"],
		rightAnswer: "champagnepapi"
	}
	]
}

function renderAnswers(state, i){
	var inputHTML = "";
	state.questions[i].answers.forEach(function(answer) {
		inputHTML += '<input type="radio" name="currentQuestion" value="'+answer+'" required><label>'+answer+'</label><br>';
	});
	return inputHTML;
}

function renderQuestions(state, element, i){
	if (i < state.questions.length){
		answerHTML = renderAnswers(state, i);
	var itemsHTML = 
       			'<fieldset class="col-12 question" id=' + i + '>\
       			<legend>'+ state.questions[i].text + '</legend>'
       			+answerHTML+
       			'<input type="submit" class="js-check-answer check-answer" value="Check Answer">\
				</fieldset>';
    element.html(itemsHTML);
	} else {
		$("#drakeQuestions").empty();
	}
}

function footerInfo(state, element, i) {
		var numCorrect = state.scoreInfo.correct; 
		var numIncorrect = state.scoreInfo.incorrect; 
		var numQuestion = i; 
		if (i <= state.questions.length) {
			var numQuestion = i;
			var scoreHTML = '<h4>Question '+ numQuestion + ' out of '+state.questions.length+'</h4>\
					<h4>'+ numCorrect + ' Correct | ' + numIncorrect + ' Incorrect</h4>';
		} else {
			var scoreHTML = '<h4>Your Final Score Is:\
							<h4>'+ numCorrect + ' Correct | ' + numIncorrect + ' Incorrect</h4>\
							<button role="button" class="js-restart-button restart-button">Take the Quiz Again!</button>';
		};
		element.html(scoreHTML);
}

function answerButton(state, i){
	if (i < state.questions.length-1) {
			var buttonHTML = '<button role="button" class="js-continue">Next Question</button>';
		} else {
			var buttonHTML = '<button role="button" class="js-final-score final-score">See Your Final Score</button>';
		};
	return buttonHTML;
}

function answerAlert(wasItRight, checkAgainst, state, i){
	$("#js-answer-alert").empty();
	$("#js-answer-alert").removeClass("hidden");
	$("#js-quiz-main").addClass("hidden");
	$("footer").addClass("hidden");
	var buttonHTML = answerButton(state, i);
	if (wasItRight === true) {
		$("#js-answer-alert").append(
			'<h4>Congrats! That was the correct answer!</h4>'
			+buttonHTML);
	} else {
		$("#js-answer-alert").append(
			'<h4>Sorry! The correct answer is '+checkAgainst+'</h4>'
			+buttonHTML);
	}
}


function updateCorrectTotals(checkAgainst, answer, state){
	if (answer === checkAgainst) {
		var wasItRight = true;
		state.scoreInfo.correct += 1; 
	} else {
		var wasItRight = false;
		state.scoreInfo.incorrect += 1;
	}
	return wasItRight;
}

function questionValidate(answer, divId, state, i){
	var checkAgainst = state.questions[i].rightAnswer;
	var wasItRight = updateCorrectTotals(checkAgainst, answer, state);
	answerAlert(wasItRight, checkAgainst, state, i);
}


function startDaQuiz(){
	$(".js-start").addClass("hidden");
	$("main").removeClass("hidden");
}

function restartQuiz(){
	$("footer").removeClass("final");
	$(".js-start").removeClass("hidden");
	$("#js-quiz-main").removeClass("hidden");
	$("#js-answer-alert").empty();
	$("footer").empty();
	state.scoreInfo.correct = 0;
	state.scoreInfo.incorrect = 0;
}

function nextQuestionAppear(answer, divId, state, i){
		questionValidate(answer, divId, state, i);
		i += 1; 
		renderQuestions(state, $('#drakeQuestions'), i);
		footerInfo(state, $('footer'), (i+1));
}

//event listeners
function startQuiz(){
	$('header').on('click', 'button.js-start', function(){
		event.preventDefault();
		startDaQuiz();
		var i = 0; 
		renderQuestions(state, $('#drakeQuestions'), i);
		footerInfo(state, $('footer'), (i+1));
	});		
}

function checkAnswer(){
	$('form').submit(function(event) {
		event.preventDefault();
		var answer = $('fieldset').find(":radio:checked").val();
		var divId = $('fieldset').attr("id");
		var i = parseInt(divId);
		nextQuestionAppear(answer, divId, state, i);
	});
}

function continueIt () {
	$('main').on('click', 'button.js-continue', function(){
		event.preventDefault();
		$("#js-answer-alert").addClass("hidden");
		$("#js-quiz-main").removeClass("hidden");
		$('footer').removeClass("hidden");
	});
}

function viewFinalScore () {
	$('main').on('click', 'button.js-final-score', function(){
		event.preventDefault();
		$("#js-answer-alert").empty();
		$('footer').addClass("final");
		$('footer').removeClass("hidden");
		$('main').addClass("hidden");
	});
}

function restartIt () {
	$('footer').on('click', 'button.js-restart-button', function(){
		event.preventDefault();
		restartQuiz();
	});
}

function masterFunction () {
startQuiz();
checkAnswer();
continueIt();
viewFinalScore();
restartIt();
};

masterFunction();



