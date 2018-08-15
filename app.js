var state = {
	scoreInfo: {
		correct: 0,
		incorrect: 0,
		question: 1
	},
	questions: [
	{
		id: "Question1",
		text: "Question 1",
		a: "Correct",
		b: "Incorrect",
		c: "Incorrect",
		d: "Incorrect",
		rightAnswer: "Correct",
		hidden: false
	},
	{
		id: "Question2",
		text: "Question 2",
		a: "Correct",
		b: "Incorrect",
		c: "Incorrect",
		d: "Incorrect",
		rightAnswer: "Correct",
		hidden: true
	},
	{
		id: "Question3",
		text: "Question 3",
		a: "Correct",
		b: "Incorrect",
		c: "Incorrect",
		d: "Incorrect",
		rightAnswer: "Correct",
		hidden: true
	},
	{
		id: "Question4",
		text: "Question 4",
		a: "Correct",
		b: "Incorrect",
		c: "Incorrect",
		d: "Incorrect",
		rightAnswer: "Correct",
		hidden: true
	},
	{
		id: "Question5",
		text: "Question 5",
		a: "Correct",
		b: "Incorrect",
		c: "Incorrect",
		d: "Incorrect",
		rightAnswer: "Correct",
		hidden: true
	}
	]
};

//functions that modify state
var noSkippy = function(answer) {
	if (!answer) {
		alert ("please select an answer to continue");
		return false;
	} else {
		return true;
	}
};

var answerAlert = function(wasItRight, checkAgainst){
	if (wasItRight === true) {
		alert("Congrats! That was the correct answer");
	} else {
		alert("Sorry! The right answer was " +checkAgainst);
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

var questionValidate = function(answer, divId, state){
	for(var i = 0; i < state.questions.length; i++){
			if (state.questions[i].id === divId){
				var checkAgainst = state.questions[i].rightAnswer;
				var wasItRight = updateCorrectTotals(checkAgainst, answer, state);
				answerAlert(wasItRight, checkAgainst);
				state.scoreInfo.question += 1;
				console.log(state);
			}

		}
};


//functions that render state
var renderQuestions = function(state, element){
	var itemsHTML = state.questions.map(function(question) {
        return '<div class="row col-12 question" id=' + question.id +'>\
       			<fieldset id=' + question.id + '>\
				<h3>' + question.text + ' Text</h3>\
					<input type="radio" name='+question.id+' value='+question.a+'>Correct<br>\
					<input type="radio" name='+question.id+' value='+question.b+'>Incorrect<br>\
					<input type="radio" name='+question.id+' value='+question.c+'>Incorrect<br>\
					<input type="radio" name='+question.id+' value='+question.d+'>Incorrect<br>\
					<button type="submit" class="js-check-answer">Check Answer</button>\
				</fieldset>\
				</div>';
    });
    element.html(itemsHTML);
};

var hideRemaining = function(state){
	state.questions.map(function(question){
		if (question.hidden === true) {
			$('#'+question.id).addClass('hidden');
		}
	});
}

var updateHiddenClass = function(divId, state){
	for(var i = 0; i < state.questions.length-1; i++){
			if (state.questions[i].id === divId){
			state.questions[i+1].hidden = false;
			}
		};
}

var nextQuestionAppear = function(answer, divId, state){
	var checkIt = noSkippy(answer);
	if (checkIt === true) {
		questionValidate(answer, divId, state);
		updateHiddenClass(divId, state);
		renderQuestions(state, $('#drakeQuestions'));
		hideRemaining(state);
	}
};

var footerInfo = function (state, element) {
		var numCorrect = state.scoreInfo.correct; 
		var numIncorrect = state.scoreInfo.incorrect; 
		var numQuestion = state.scoreInfo.question;
		//add numQuestion < 6 validation 
		var scoreHTML = '<h4>'+ numCorrect + ' Correct | ' + numIncorrect + ' Incorrect</h4>\
						<h4>Question '+ numQuestion + ' out of 5</h4>';
    element.html(scoreHTML);
};

//event listeners
function checkAnswer(){
	$(document).on('click', 'button.js-check-answer', function(){
		event.preventDefault();
		var answer = $(this).closest("fieldset").find(":radio:checked").val();
		var divId = $(this).closest("div").attr("id");
		nextQuestionAppear(answer, divId, state);
		footerInfo(state, $('footer'));
				//disable button so cannot resubmit- fix this
		$(this).addClass("hidden");
	});
}

$(function(){
	renderQuestions(state, $('#drakeQuestions'));
})

$(function(){
	hideRemaining(state);
})

$(function(){
	var x = 0;
	footerInfo(state, $('footer'));
})

$(function(){
	checkAnswer();
})