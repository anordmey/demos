// Negtracker Ipad
// Overview: (i) Helper Functions (ii) Parameters (iii) Control Flow

// ---------------- HELPER FUNCTIONS ------------------

// show slide function
function showSlide(id) {
	$(".slide").hide(); //jquery - all elements with class of slide - hide
	$("#" + id).show(); //jquery - element with given id - show
}

//array shuffle function
function shuffle(array) {
	for (var i = array.length - 1; i > 0; i--) {
		var j = Math.floor(Math.random() * (i + 1));
		var temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
	return array;
}

//preload images: 
var myimages = new Array();

function preloading() {
	for (x = 0; x < preloading.arguments.length; x++) {
		myimages[x] = new Image();
		myimages[x].src = preloading.arguments[x];
	}
}

function loadAudio(uri) {
	var audio = new Audio();
	audio.src = uri;
	return audio;
}

preloading("images/Abby.png", "images/Bert.png", "images/BigBird.png", "images/Elmo.png", "images/Ernie.png", "images/Grover.png", "images/Rosita.png", "images/Zoe.png", "images/apple.png", "images/banana.png", "images/bear.png", "images/boat.png", "images/bowl.png", "images/bunny.png", "images/bus.png", "images/car.png", "images/cat.png", "images/cookie.png", "images/cow.png", "images/cup.png", "images/cupcake.png", "images/dog.png", "images/empty.png", "images/fork.png", "images/horse.png", "images/orange.png", "images/plate.png", "images/spoon.png", "images/stanford.png", "images/starOff.png", "images/starOn.png", "images/truck.png", "images/Zoe.png");
//For training:
function createDot(dotx, doty, i) {
	var dots = [1, 2, 3, 4, 5];

	var dot = document.createElement("img");
	dot.setAttribute("class", "dot");
	dot.id = "dot_" + dots[i];
	dot.src = "dots/dot_" + dots[i] + ".jpg";

	var x = Math.floor(Math.random() * 950);
	var y = Math.floor(Math.random() * 550);

	var invalid = "true";
	//make sure dots do not overlap
	while (true) {
		invalid = "true";
		for (j = 0; j < dotx.length; j++) {
			if (Math.abs(dotx[j] - x) + Math.abs(doty[j] - y) < 200) {
				var invalid = "false";
				break;
			}
		}
		if (invalid === "true") {
			dotx.push(x);
			doty.push(y);
			break;
		}
		x = Math.floor(Math.random() * 400);
		y = Math.floor(Math.random() * 400);
	}

	dot.setAttribute("style", "position:absolute;left:" + x + "px;top:" + y + "px;");

	training.appendChild(dot);
}

// ---------------- PARAMETERS ------------------
var password = "Negpad"

var characters = ["Abby", "BigBird", "Bert", "Elmo", "Ernie", "Grover", "Rosita", "Zoe"];

//-----PRACTICE VARIABLES-----
var practiceCounter = 0;
//Total number of practice trials:
var practiceNumber = 4;

//Practice items (None for adults)
var practiceItems = [
	["bunny", "balloon"],
	["cupcake", "bird"],
	["cup", "elephant"],
	["bear", "broccoli"]
];

//Trial conditions: 
//Does elmo have the target item or not?
//Is the sentence positive or negative?
var practiceConds = [
	[1, "positive", "target"],
	[0, "positive", "none"],
	[0, "positive", "target"],
	[1, "positive", "none"]
]

//-----EXPERIMENT VARIABLES-----
var trialCounter = 0;
//total number of test trials:
var number = 16;

//The first item is the actual trial item, the second item is the alternative (for "something" trials)
var trialItems = shuffle([
	["apple", "cat"],
	["banana", "dog"],
	["boat", "orange"],
	["bowl", "truck"],
	["bus", "cookie"],
	["car", "plate"],
	["cat", "apple"],
	["cookie", "bus"],
	["cow", "spoon"],
	["dog", "banana"],
	["fork", "horse"],
	["horse", "fork"],
	["orange", "boat"],
	["plate", "car"],
	["spoon", "cow"],
	["truck", "bowl"]
]);

//Trial conditions: 
//Does elmo have the target item or not?
//Is the sentence positive or negative?
//what context condition?

var trialConds = shuffle([
	[1, "positive", "none"], //True positive
	[1, "positive", "none"], //True positive
	[1, "positive", "target"], //True positive
	[1, "positive", "target"], //True positive
	[1, "negative", "none"], //False negative
	[1, "negative", "target"], //False negative
	[0, "positive", "none"], //False positive
	[0, "positive", "target"], //False positive
	[0, "negative", "none"], //True negative, 
	[0, "negative", "none"], //True negative, 
	[0, "negative", "none"], //True negative, 
	[0, "negative", "none"], //True negative, 
	[0, "negative", "target"], //True negative, 
	[0, "negative", "target"], //True negative, 
	[0, "negative", "target"], //True negative, 
	[0, "negative", "target"] //True negative, 
]);

// ---------------- MAIN EXPERIMENT ------------------
//Show the first instructions slide (this is where you enter pswd and subid on ipad study)
showSlide("instructions");

//The button is disabled until all of the images are preloaded
//Button is also disabled if turk is in preview mode
$("#startButton").attr("disabled", true);
$("#pleaseWait").html("Please wait...");
$(window).load(function() {
	$("#startButton").attr("disabled", false);
	$("#pleaseWait").html("");
})

//Start the experiment
var experiment = {

	//No subid/password for demo experiment
	check: function() {
		//Make sure a subid and a password were entered
			subjectID = "demo"
		// if (document.getElementById("pswd").value != password) {
		// 	alert("Wrong Password")
		// 	return
		// } else if (document.getElementById("subjectID").value.length < 1) {
		// 	alert("Please enter a subject ID")
		// 	return
		// } else {
			experiment.condition()
		// 	document.getElementById("pswd").value == ""
		// 	document.getElementById("subjectID").value == ""
		// }
	},

	start: function() {
		//build scale
		showSlide("startPractice")
	},

	//We start with a training game to make sure children know how to use the iPad
	training: function() {
		var xcounter = 0
		var dotCount = 5

		var dotx = []
		var doty = []

		for (i = 0; i < dotCount; i++) {
			createDot(dotx, doty, i)
		}
		showSlide("training")
		$('.dot').one('touchstart', function(event) {
			var dotID = $(event.currentTarget).attr('id')
			document.getElementById(dotID).src = "dots/x.jpg"
			xcounter++
			if (xcounter === dotCount) {
				training.removeChild(dot_1)
				training.removeChild(dot_2)
				training.removeChild(dot_3)
				training.removeChild(dot_4)
				training.removeChild(dot_5)
				setTimeout(function() {
					$("#training").hide()
					setTimeout(function() {
						experiment.start()
					}, 1000)
				}, 500)
			}
		})
	},

	practiceScale: function() {
		showSlide("practiceScale");
	},

	practiceTrue: function() {
		showSlide("practiceTrue");
		$("#practicePlane").css("background-image", 'url("images/Elmo.png")');
	},

	practiceFalse: function() {
		showSlide("practiceFalse");
		$("#practiceBike").css("background-image", 'url("images/Abby.png")');
	},

	//Build the progress bar
	initStars: function(starNumber) {
		$("#progress").html("");
		for (i = 0; i < starNumber; i++) {
			$("#progress").append("<img class='star' src = 'images/starOff.png' id='star" + i + "'/>");
		}
	},

	condition: function() {
		showSlide("condition")
		$(".conditionButton").one("touchstart", function(event) {
			testCondition = $(this).attr('id')
		})

	},

	blank: function(count, max, trialType) {
		showSlide("blankSlide");

		//Check if the practice trials are completed, and go to experiment.start if they are
		if (count === max) {
			if (trialType === "Practice trial") {
				showSlide("startGame");
			} else {
				return experiment.end();
			}
		} else {
			if (trialType === "Practice trial") {
				setTimeout(function() {
					experiment.next(practiceItems, practiceConds, practiceCounter, practiceNumber, "Practice trial");
				}, 2000)
			} else {
				setTimeout(function() {
					experiment.next(trialItems, trialConds, trialCounter, number, "Test trial");
				}, 2000)
			}

		}

	},

	//The actual trials
	next: function(items, trialCond, counter, max, trialType) {

		showSlide("stage");
		// $("#listenDiv").hide();

		// $("#nextTrialButton").hide();

		//show pics
		$(".pic").show();
		$(".spic").show();

		//Determine which context pictures will be used.  
		if (testCondition == "none") {
			var contextPictures = "empty";
		} else if (testCondition == "target") {
			var contextPictures = items[counter][0];
		}

		//Should the target have the target item or the alternate item?
		if (trialCond[counter][0]) {
			var trialPicture = items[counter][0];
		} else {
			var trialPicture = items[counter][1];
		}

		//create characters
		characters = shuffle(characters);

		var charName1 = "images/" + characters[0] + ".png";
		var charName2 = "images/" + characters[1] + ".png";
		var charName3 = "images/" + characters[2] + ".png";
		var charNameTarget = "images/" + characters[3] + ".png";

		var targetChar = characters[3];


		//create sentence, which will appear later
		if (items[counter][0][0] == "a" | items[counter][0][0] == "e" | items[counter][0][0] == "i" | items[counter][0][0] == "o" | items[counter][0][0] == "u") {
			var det = " an ";
		} else {
			var det = " a ";
		}

		if (trialCond[counter][1] == "positive") {
			var sentence_text = targetChar + " has" + det + items[counter][0] + ".";
		} else if (trialCond[counter][1] == "negative") {
			var sentence_text = targetChar + " doesn't have" + det + items[counter][0] + ".";
		}

		$("#sentenceText").html(sentence_text);

		//shuffle the order that pictures appear in the array
		var picOrder = shuffle(["context1", "context2", "context3", "target"]);
		$("#c1").attr("name", picOrder[0]);
		$("#c2").attr("name", picOrder[1]);
		$("#c3").attr("name", picOrder[2]);
		$("#c4").attr("name", picOrder[3]);

		//build scale
		$("#1").attr("src", 'images/verybadface.png');
		$("#2").attr("src", 'images/badface.png');
		$("#3").attr("src", 'images/neutralface.png');
		$("#4").attr("src", 'images/goodface.png');
		$("#5").attr("src", 'images/verygoodface.png');

		//Place the images
		var context1 = "images/" + contextPictures + ".png";
		$('[name=context1] .pic').attr("src", context1);

		var context2 = "images/" + contextPictures + ".png";
		$('[name=context2] .pic').attr("src", context2);

		var context3 = "images/" + contextPictures + ".png";
		$('[name=context3] .pic').attr("src", context3);

		$('[name=target] .pic').attr("src", "images/" + trialPicture + ".png");

		// //This is a counter that tells us when all context images have been clicked
		// var ccounter = 0;
		// var ctotal = 4;

		// //When images are clicked, replace with new images and play the "bloop" noise
		// $('.pic').one('click', function(event) {
		// 	var cpicID = $(event.currentTarget).attr('id');

		// 	// $("#bloop_player")[0].play();
		// 	if (cpicID == "context1") {
		$("[name=context1]").css("background-image", 'url(' + charName1 + ')');
		// 	} else if (cpicID == "context2") {
		$("[name=context2]").css("background-image", 'url(' + charName2 + ')');
		// 	} else if (cpicID == "context3") {
		$("[name=context3]").css("background-image", 'url(' + charName3 + ')');
		// 	} else if (cpicID == "target") {
		$("[name=target]").css("background-image", 'url(' + charNameTarget + ')');
		// 	}

		// 	ccounter++;

		// 	if (ccounter === ctotal) {
		// setTimeout(function() {

		//show listen button
		// $("#listenDiv").show();
		// $("#listenText").show();

		// //When button is clickped, play sentence
		// $('#listenButton').one('click', function() {

		// 	//load sound
		// 	$("#sound_player")[0].load();

		// 	//change listen button image
		// 	$('#listenButton').attr("src", "images/listening.jpg");
		// 	$("#listenText").text("Listen! Then click Elmo's Plate!");

		// 	$("#sound_player")[0].play();

		// 	$('#sound_player').one('ended', function() {
		// 		$(".value").show();
		// 		$("#slider").show();
		// 		$(function() { //loads the slider when the sentence has ended.
		// 			$("#slider").slider({
		// 				min: 1,
		// 				max: 7,
		// 				value: 1,
		// 				start: function(event, ui) {
		// 					$("#nextTrialButton").show();
		// 				}
		// 			});
		// 		});
		// 	});

		//red box appears around target
		$("[name=target]").attr('class', 'selectedPic');

		$(".spic").off('touchstart').one('touchstart', function(event) {
				// $(".scaleChoice").attr('class', 'spic');
				$(this).attr('class', 'scaleChoice');
				$(".spic").attr("src", "images/empty.png");
				// $("#nextTrialButton").show();

				//collect data
				var trialNum = counter + 1;

				var response = $(".scaleChoice").attr("id");

				if ((trialCond[counter][0] & trialCond[counter][1] == "positive") | (!trialCond[counter][0] & trialCond[counter][1] == "negative")) {
					var truthVal = "True";
				} else {
					var truthVal = "False";
				}

				//this is: subid, context condition, trial number, item, sentence type, truth value, response(what the participant chose)
				var result_string = subjectID + "," + testCondition + "," + trialNum + "," + items[counter][0] + "," + trialCond[counter][1] + "," + truthVal + "," + response + "\n";

				//no data collection for demo experiment
				// if (subjectID == "debug") {
				// 	alert(result_string); // debug mode 
				// } else {
				// 	$.post("http://langcog.stanford.edu/cgi-bin/AEN2/NEGPAD_felicity_kids/negpad_process.php", {
				// 		postresult_string: result_string
				// 	})
				// }

				//update progress bar
				$("#star" + (counter)).attr("src", "images/starOn.png");

				//update counter
				counter++;
				if (trialType == "Practice trial") { //increment the appropriate counter
					practiceCounter++;
				} else {
					trialCounter++;
				}

				//clear everything
				setTimeout(function() {
					// $("#listenDiv").hide();
					// $("#nextTrialButton").hide();
					$("#sentenceText").html("");
					$(".selectedPic").attr('class', 'cdiv');
					$(".cdiv").css("background-image", 'none');
					$(".pic").hide();
					$(".scaleChoice").attr('class', 'spic');
					// $("#listenText").text("(Click me!)");
					// $("#listenButton").attr("src", "images/listen.jpg");

					// reset div names
					$("[name=context1]").attr("name", "");
					$("[name=context2]").attr("name", "");
					$("[name=context3]").attr("name", "");
					$("[name=target]").attr("name", "");


					//next trial
					experiment.blank(counter, max, trialType);
				}, 1000)
			})
			// }, 0)
			// }
			// })
	},

	end: function() {
		showSlide("finished");
	}
}