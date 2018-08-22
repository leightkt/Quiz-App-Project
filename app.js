var state = {
	scoreInfo: {
		correct: 0,
		incorrect: 0,
	},
	questions: [
	{
		text: "What is Drake's real name?",
		answers: {
		a: "Trevor George Smith Jr.",
		b: "Clifford Joseph Harris Jr.",
		c: "Aubrey Graham",
		d: "Andre Romelle Young"
		},
		rightAnswer: "Aubrey Graham"
	},
	{
		text: "What teen drama television series did Drake appear in during the early 2000s?",
		answers: {
		a: "Degrassi: The Next Generation",
		b: "The O.C.",
		c: "Gossip Girl",
		d: "One Tree Hill"
		},
		rightAnswer: "Degrassi: The Next Generation"
	},
	{
		text: "What is the name of Drake's debut studio album?",
		answers: {
		a: "Pay Me Yesterday",
		b: "Ask me Now",
		c: "Call Me Sometime",
		d: "Thank Me Later"
		},
		rightAnswer: "Thank Me Later"
	},
	{
		text: "Where was Drake born?",
		answers: {
		a: "Québec City, Québec",
		b: "Vancouver, British Columbia",
		c: "Toronto, Ontario",
		d: "Oakland, California"
		},
		rightAnswer: "Toronto, Ontario"
	},
	{
		text: "What is Drake's Instagram handle?",
		answers: {
		a: "theRealDrake",
		b: "champagnepapi",
		c: "Drizzy4Rizzy",
		d: "drake"
		},
		rightAnswer: "champagnepapi"
	}
	]
};

var noSkippy = function(answer) {
	if (!answer) {
		$("#js-answer-alert").empty().append(
			"<h4>Please select an answer to continue</h4>"
			);

		return false;
	} else {
		return true;
	}
};

var answerAlert = function(wasItRight, checkAgainst){
	$("#js-answer-alert").empty();
	if (wasItRight === true) {
		$("#js-answer-alert").append(
			"<h4>Congrats! That was the correct answer!</h4>"
			);
	} else {

		$("#js-answer-alert").append(
			"<h4>Sorry! The correct answer is "+checkAgainst+"</h4>"
			);
	}
}

var updateCorrectTotals = function(checkAgainst, answer, state){
	if (answer === checkAgainst) {
		var wasItRight = true;
		state.scoreInfo.correct += 1; 
	} else {
		var wasItRight = false;
		state.scoreInfo.incorrect += 1;
	}
	return wasItRight;
};

var questionValidate = function(answer, divId, state, i){
	var checkAgainst = state.questions[i].rightAnswer;
	var wasItRight = updateCorrectTotals(checkAgainst, answer, state);
	answerAlert(wasItRight, checkAgainst);
	console.log(state);
};


var startDaQuiz = function(){
	$(".js-start").addClass("hidden");
	$("main").removeClass("hidden");
	$("#js-quiz-main").removeClass("hidden");
}

var restartQuiz = function(){
	$(".js-start").removeClass("hidden");
	$("#js-quiz-main").addClass("hidden");
	$("main").addClass("hidden");
	$(".js-restart").addClass("hidden");
	$("#js-answer-alert").empty();
	$("footer").empty();
}

var renderQuestions = function(state, element, i){
	if (i < state.questions.length){
	var itemsHTML = 
			'<div class="col-12 question" id=' + i +'>\
       			<fieldset id=' + i + '>\
       			<h3>'+ state.questions[i].text + '</h3>\
       			<input type="radio" name="currentQuestion" value="'+state.questions[i].answers.a+'">\
				<label for="a">'+state.questions[i].answers.a+'</label><br>\
				<input type="radio" name="currentQuestion" value="'+state.questions[i].answers.b+'">\
				<label for="b">'+state.questions[i].answers.b+'</label><br>\
				<input type="radio" name="currentQuestion" value="'+state.questions[i].answers.c+'">\
				<label for="c">'+state.questions[i].answers.c+'</label><br>\
				<input type="radio" name="currentQuestion" value="'+state.questions[i].answers.d+'">\
				<label for="d">'+state.questions[i].answers.d+'</label><br>\
       			<button type="submit" class="js-check-answer check-answer">Check Answer</button>\
				</fieldset>\
				</div>';
    element.html(itemsHTML);
	} else {
		$("#drakeQuestions").empty();
		$(".js-restart").removeClass("hidden");
	}
};

var nextQuestionAppear = function(answer, divId, state, i){
	var checkIt = noSkippy(answer);
	if (checkIt === true) {
		questionValidate(answer, divId, state, i);
		i += 1; 
		renderQuestions(state, $('#drakeQuestions'), i);
		footerInfo(state, $('footer'), (i+1));
	}
};

var footerInfo = function (state, element, i) {
		var numCorrect = state.scoreInfo.correct; 
		var numIncorrect = state.scoreInfo.incorrect; 
		var numQuestion = i; 
		if (i <= state.questions.length) {
			var numQuestion = i;
			var scoreHTML = '<h4>Question '+ numQuestion + ' out of '+state.questions.length+'</h4>\
					<h4>'+ numCorrect + ' Correct | ' + numIncorrect + ' Incorrect</h4>';
		} else {
			var scoreHTML = '<h4>Your Final Score Is:\
							<h4>'+ numCorrect + ' Correct | ' + numIncorrect + ' Incorrect</h4>';
		};
		element.html(scoreHTML);
};


//event listeners
function startQuiz(){
	$(document).on('click', 'button.js-start', function(){
		event.preventDefault();
		startDaQuiz();
		var i = 0; 
		renderQuestions(state, $('#drakeQuestions'), i);
		footerInfo(state, $('footer'), (i+1));
	});		
}

function checkAnswer(){
	$(document).on('click', 'button.js-check-answer', function(){
		event.preventDefault();
		var answer = $(this).closest("fieldset").find(":radio:checked").val();
		console.log(answer);
		var divId = $(this).closest("div").attr("id");
		console.log(divId);
		var i = parseInt($(this).closest("div").attr("id"));
		nextQuestionAppear(answer, divId, state, i);
	});
}

function restartIt () {
	$(document).on('click', 'button.js-restart-button', function(){
		event.preventDefault();
		restartQuiz();
	});
}


startQuiz();
checkAnswer();
restartIt();



