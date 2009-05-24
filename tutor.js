var characterDiv;
var characterSpan;
var input;
var tableSelect;

var vowelsTable = new Array("a", "i", "u", "e", "o");
var kTable = new Array("ka", "ki", "ku", "ke", "ko", "kya", "kyu", "kyo");
var sTable = new Array("sa", "shi", "su", "se", "so", "sha", "shu", "sho");
var tTable = new Array("ta", "chi", "tsu", "te", "to", "cha", "chu", "cho");
var nTable = new Array("na", "ni", "nu", "ne", "no", "nya", "nyu", "nyo");
var hTable = new Array("ha", "hi", "fu", "he", "ho", "hya", "hyu", "hyo");
var mTable = new Array("ma", "mi", "mu", "me", "mo", "mya", "myu", "myo");
var yTable = new Array("ya", "yu", "yo");
var rTable = new Array("ra", "ri", "ru", "re", "ro", "rya", "ryu", "ryo");
var wTable = new Array("wa", "wi", "we", "wo");
var gTable = new Array("ga", "gi", "gu", "ge", "go", "gya", "gyu", "gyo");
var zTable = new Array("za", "ji", "zu", "ze", "zo", "ja", "ju", "jo");
var dTable = new Array("da", "de", "do");
var bTable = new Array("ba", "bi", "bu", "be", "bo", "bya", "byu", "byo");
var pTable = new Array("pa", "pi", "pu", "pe", "po", "pya", "pyu", "pyo");
var vTable = new Array("vu");

var allTable = vowelsTable.concat(kTable).concat(sTable).concat(tTable).concat(nTable).concat(hTable).concat(mTable).concat(yTable).concat(rTable).concat(wTable).concat(gTable).concat(zTable).concat(dTable).concat(bTable).concat(pTable).concat(vTable).concat(new Array("n"));

var choices = new Array();
choices['All'] = allTable;
choices['Vowels'] = vowelsTable;
choices['K series'] = kTable;
choices['S series'] = sTable;
choices['T series'] = tTable;
choices['N series'] = nTable;
choices['H series'] = hTable;
choices['M series'] = mTable;
choices['Y series'] = yTable;
choices['R series'] = rTable;
choices['W series'] = wTable;
choices['G series'] = gTable;
choices['Z series'] = zTable;
choices['D series'] = dTable;
choices['B series'] = bTable;
choices['P series'] = pTable;

var table = allTable;

var current_character;

function pick_new_character()
{
	/* Ensure that we always get a different character from the one
	 * we already had. */
	var new_character;

	do {
		new_character = Math.floor(table.length * Math.random());
	} while (new_character == current_character);

	current_character = new_character;

	/* Update user interface */
	characterSpan.className = table[current_character];
	input.value = "";
}

function keyDown(e)
{
	var keynum;
	if (window.event)
		keynum = e.keyCode;
	else
		keynum = e.which;

	if (keynum == 13) {
		if (input.value == "") {
			input.value = table[current_character];
		} else if (input.value == table[current_character]) {
			input.value = "";
			pick_new_character();
		}
	}
}

function keyUp(e)
{
	var keynum;
	if (window.event)
		keynum = e.keyCode;
	else
		keynum = e.which;

	if (keynum != 13) {
		if (input.value == table[current_character]) {
			input.value = "";
			pick_new_character();
		}
	}
}

function change()
{
	for (var i = 0; i < tableSelect.options.length; ++i) {
		if (tableSelect.options[i].selected) {
			table = choices[tableSelect.options[i].text];
		}
	}

	pick_new_character();
}

function init()
{
	characterDiv = document.getElementById('character-div');
	characterSpan = document.getElementById('character-span');
	input = document.getElementById('input');
	tableSelect = document.getElementById('table-select');

	/* NOTE: The <select> needs to contain at least one <option>. So we
	 * remove it here before adding what we really want to put there. */
	tableSelect.remove(0);
	for (key in choices) {
		tableSelect.add(new Option(key), null);
	}

	input.focus();
	pick_new_character();
}
