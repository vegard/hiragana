var characterDiv;
var characterSpan;
var input;
var tableSelect;

var hiraganaChoices = [];
hiraganaChoices['vowels'] = ["a", "i", "u", "e", "o"];
hiraganaChoices['k'] = ["ka", "ki", "ku", "ke", "ko"];
hiraganaChoices['s'] = ["sa", "shi", "su", "se", "so"];
hiraganaChoices['t'] = ["ta", "chi", "tsu", "te", "to"];
hiraganaChoices['n'] = ["na", "ni", "nu", "ne", "no"];
hiraganaChoices['h'] = ["ha", "hi", "fu", "he", "ho"];
hiraganaChoices['m'] = ["ma", "mi", "mu", "me", "mo"];
hiraganaChoices['y'] = ["ya", "yu", "yo"];
hiraganaChoices['r'] = ["ra", "ri", "ru", "re", "ro"];
hiraganaChoices['w'] = ["wa", "wi", "we", "wo"];
hiraganaChoices['n-'] = ["n"];
hiraganaChoices['g'] = ["ga", "gi", "gu", "ge", "go"];
hiraganaChoices['z'] = ["za", "ji", "zu", "ze", "zo"];
hiraganaChoices['d'] = ["da", "de", "do"];
hiraganaChoices['b'] = ["ba", "bi", "bu", "be", "bo"];
hiraganaChoices['p'] = ["pa", "pi", "pu", "pe", "po"];
hiraganaChoices['v'] = ["vu"];

var youonChoices = [];
youonChoices['k'] = ["kya", "kyu", "kyo"];
youonChoices['s'] = ["sha", "shu", "sho"];
youonChoices['t'] = ["cha", "chu", "cho"];
youonChoices['n'] = ["nya", "nyu", "nyo"];
youonChoices['h'] = ["hya", "hyu", "hyo"];
youonChoices['m'] = ["mya", "myu", "myo"];
youonChoices['r'] = ["rya", "ryu", "ryo"];
youonChoices['g'] = ["gya", "gyu", "gyo"];
youonChoices['j'] = ["ja",  "ju",  "jo"];
youonChoices['b'] = ["bya", "byu", "byo"];
youonChoices['p'] = ["pya", "pyu", "pyo"];

var table = [];

var current_character;

function pick_new_character()
{
	if (table.length === 0) {
		characterSpan.className = '';
		input.value = '';
		return;
	}

	/* Ensure that we always get a different character from the one
	 * we already had. */
	if (table.length == 1) {
		current_character = 0;
	} else {
		var new_character;

		do {
			new_character = Math.floor(table.length * Math.random());
		} while (new_character == current_character);

		current_character = new_character;
	}

	/* Update user interface */
	characterSpan.className = table[current_character];
	input.value = "";
}

function keyDown(e)
{
	if (table.length === 0) {
		return;
	}

	var keynum;
	if (window.event) {
		keynum = e.keyCode;
	} else {
		keynum = e.which;
	}

	if (keynum == 13) {
		if (input.value === "") {
			input.value = table[current_character];
		} else if (input.value == table[current_character]) {
			input.value = "";
			pick_new_character();
		}
	}
}

function keyUp(e)
{
	if (table.length === 0) {
		return;
	}

	var keynum;
	if (window.event) {
		keynum = e.keyCode;
	} else {
		keynum = e.which;
	}

	if (keynum != 13) {
		if (input.value == table[current_character]) {
			input.value = "";
			pick_new_character();
		}
	}
}

function rebuild_pool()
{
	table = [];

	var checkboxes = document.forms['hiragana'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		if (checkboxes[i].checked) {
			table = table.concat(hiraganaChoices[checkboxes[i].name]);
		}
	}

	var checkboxes = document.forms['youon'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		if (checkboxes[i].checked) {
			table = table.concat(youonChoices[checkboxes[i].name]);
		}
	}

	pick_new_character();
}

function selectAll() {
	var checkboxes = document.forms['hiragana'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		checkboxes[i].checked = true;
	}

	var checkboxes = document.forms['youon'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		checkboxes[i].checked = true;
	}

	rebuild_pool();
	return false;
}

function selectNone() {
	var checkboxes = document.forms['hiragana'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		checkboxes[i].checked = false;
	}

	var checkboxes = document.forms['youon'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		checkboxes[i].checked = false;
	}

	rebuild_pool();
	return false;
}

function selectRandom() {
	var checkboxes = document.forms['hiragana'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		checkboxes[i].checked = Math.random() < 0.5;
	}

	var checkboxes = document.forms['youon'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		checkboxes[i].checked = Math.random() < 0.5;
	}

	rebuild_pool();
	return false;
}

function init()
{
	characterDiv = document.getElementById('character-div');
	characterSpan = document.getElementById('character-span');
	input = document.getElementById('input');

	var checkboxes = document.forms['hiragana'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		checkboxes[i].onclick = rebuild_pool;
	}

	var checkboxes = document.forms['youon'].elements;
	for (var i = 0; i < checkboxes.length; ++i) {
		checkboxes[i].onclick = rebuild_pool;
	}

	document.forms['menuForm'].all.onclick = selectAll;
	document.forms['menuForm'].none.onclick = selectNone;
	//document.forms['menuForm'].random.onclick = selectRandom;

	selectAll();
	input.focus();
}
