//ha befejeztuk az irast, akkor atvalt a szovegmezo bekezdesse
function removeTextArea(element) {
	var string = element.value;
	element.parentNode.innerHTML = string;
		document.getElementById('new-text').style.backgroundColor="#123456";
}
//ha szerkesztunk egy bekezdest, akkor megjelenik a szovegmezo
/*function editTextArea(element) {
	var string = element.innerText;
	var txt = document.createElement("textarea");
	txt.setAttribute("autofocus", "autofocus");
	txt.setAttribute("onblur", "removeTextArea(this)");
	txt.value = string;
	element.innerHTML = "";
	document.getElementById('new-text').style.backgroundColor="green";
	element.appendChild(txt);
}*/
function editorFunction(element) {
	if(editMode) {
		//alert("editor");
		insertText(element);
	}
}
//A megkezdett, de meg be nem fejezett szovegbeviteli mezok szama, de masra is hasznalhato lesz
/*function numOfActiveInputFields(name) {
	var tmp = getElementsByName(name);
	var result = tmp.length;
	return result;
}*/

function changescript(text, element) {
	if(document.getElementById('tag_cont_menu').getAttribute("name") != "active") {
		
			if(typeof(element) != "undefined") { 
				element.setAttribute("name", "selected_element"); 
				elementInEditor = document.getElementById('editor-box').innerHTML;
			}
			text = convertHtmlTextFormat(text);
			menuButtonActivator("tag_cont_menu");
			document.getElementById('editor-box').innerHTML = text;
			var changeOnClickInTmp_Object = getElementByClassName("tmp_object");
			for (var a = 0; a < changeOnClickInTmp_Object.length; a++) {
				changeOnClickInTmp_Object[a].onclick = function(e) { editorFunctione(e)};
			}
			 clickableElementsIdNull(document.getElementById('editor-box'));
			 removeUselessDivs(document.getElementById('editor-box'));
			var change = document.getElementsByClassName("replaceToP"); 
			for (var c = 0; c < change.length; c++) {
				var ch = document.createElement("p");
				ch.setAttribute("name", change[c].href + change[c].target);
				ch.setAttribute("class", "replaceToA");
				ch.setAttribute("onclick", "editorFunction(this)");
				ch.innerHTML = change[c].innerHTML;
				change[c].parentNode.replaceChild(ch, change[c]);
			}
	}
}
function convertHtmlTextFormat(text) {
	var myInput = text;
	var myOutput = '';
	for (i = 0; i < myInput.length; i++) {
		var curChar = (myInput.charAt(i));
		if (curChar == '&') {
			var nextChars = (myInput.charAt(i)) + (myInput.charAt(i+1)) + (myInput.charAt(i+2)) + (myInput.charAt(i+3));
			if (nextChars == '&lt;') {
				myOutput += '<';
				i +=3;
			}
			if (nextChars == '&gt;') {
				myOutput += '>';
				i += 3;
			}
		} else {
			myOutput += curChar;
		}
	}
	return myOutput;
}
function convertTextHtmlFormat(text) {
	var myInput = text;
	var myOutput = '';
	var newLine = false;
	var indent = 0;
	var divNewLine = false;
	for (i = 0; i < myInput.length; i++) {
		var curChar = (myInput.charAt(i));
		var nextChars =(myInput.charAt(i+1)) + (myInput.charAt(i+2)) + (myInput.charAt(i+3)); 
		var id = generateId(document.createElement("div"));
		var spanStart = '<div id=\"clickable_' + id + '\" class=\"tmp_object\" style=\"padding-left: ' + 10*indent + 'px;\" onClick=\"changescript(this.innerText, this)\">';
		var spanEnd = '</div>';
		if (curChar == '<') {
			if(myInput.charAt(i+1) == '/') {
				newLine = true;
				indent--;
			} else {
				if(!divNewLine)
				myOutput += spanStart;
				indent++;
			}
			if(nextChars == 'div') {
				divNewLine = true;
			}
			charCode = 'lt';
			myOutput +=  '&' + charCode + ';';
		}
		if (curChar == '>') {
			charCode = 'gt';
			myOutput += '&' + charCode + ';';
			if(newLine) {
				myOutput += spanEnd;
				newLine = false;
			}
			if(divNewLine) {
				divNewLine = false;
			}
		}
		if ((curChar != '<') && (curChar != '>')) {
			charCode = curChar;
			myOutput += charCode;
		}
	}
	return myOutput;
}
function preSaveFormat(text) {
	var myInput = text;
	var myOutput = '';
	for (i = 0; i < myInput.length; i++) {
		var curChar = (myInput.charAt(i));
		if (curChar == '<') {
			charCode = 'lt';
			myOutput +=  '&' + charCode + ';';
		}
		if (curChar == '>') {
			charCode = 'gt';
			myOutput += '&' + charCode + ';';
		}
		if ((curChar != '<') && (curChar != '>')) {
			charCode = curChar;
			myOutput += charCode;
		}
	}
	return myOutput;
}
function createDivs() {
	var number = document.getElementById("num-of-divs").value;
	if (typeof(number) != "undefined" && number > 0) {
		var containerDiv = document.createElement("div");
		containerDiv.setAttribute("name", "editor-element");
		containerDiv.setAttribute("class", "marginedchildren divcontainer");
		containerDiv.setAttribute("id", generateId(containerDiv));
		for (var a = 0; a < number; a++) {
			var child = document.createElement("div");
			var dec = (number/5);
			child.setAttribute("name", "editor-element");
			child.setAttribute("id", generateId(child));
			child.style.minWidth = (100-dec)/number + "%";
			child.style.maxWidth = (100-dec)/number + "%";
			containerDiv.appendChild(child);
		}
		var editorBox = document.getElementById("editor-box");
		if (editorBox.childNodes[0]) {
			editorBox.getElementsByTagName("DIV")[0].appendChild(containerDiv);
		} else {
			editorBox.appendChild(document.createElement("div"));
			editorBox.childNodes[0].setAttribute("id", generateId(editorBox.childNodes[0]));
			editorBox.childNodes[0].setAttribute("name", "editor-element");
			editorBox.childNodes[0].appendChild(containerDiv);
		}
	}
}
