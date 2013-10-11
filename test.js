//ha befejeztuk az irast, akkor atvalt a szovegmezo bekezdesse
function removeTextArea(element) {
	var string = element.value;
	element.parentNode.innerHTML = string;
	document.getElementById('new-text').style.backgroundColor="#123456";
}
//ha szerkesztunk egy bekezdest, akkor megjelenik a szovegmezo
function editTextArea(element) {
	var string = element.innerText;
	var txt = document.createElement("textarea");
	txt.setAttribute("autofocus", "autofocus");
	txt.setAttribute("onblur", "removeTextArea(this)");
	txt.value = string;
	element.innerHTML = "";
	document.getElementById('new-text').style.backgroundColor="green";
	element.appendChild(txt);
}
function editorFunction(element) {
	if(editMode) {
		alert("editor");
	}
}
//A megkezdett, de meg be nem fejezett szovegbeviteli mezok szama, de masra is hasznalhato lesz
function numOfActiveInputFields(name) {
	var tmp = getElementsByName(name);
	var result = tmp.length;
	return result;
}

function changescript(text, element) {
	if(typeof(text) == 'undefined') {
		text = '<div id=\'dn1\'>\n\t<h1 id=\'hn1\'>TTT</h1>\n\t<p id=\'pn1\'>szovegesmezo</p>\n</div>';
	}
	if(document.getElementById('tag_cont_menu').getAttribute("name") != "active") {
			text = convertHtmlTextFormat(text);
			TagContView();
			document.getElementById('editor-box').innerHTML = text;
			var changeOnClickInTmp_Object = getElementByClassName("tmp_object");
			for (var a = 0; a < changeOnClickInTmp_Object.length; a++) {
				changeOnClickInTmp_Object[a].onclick = function(e) { editorFunctione(e)};
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
		var spanStart = '<div class=\"tmp_object\" style=\"padding-left: ' + 10*indent + 'px;\" onClick=\"changescript(this.innerHTML, this)\">';
		var spanEnd = '</div>';
		if (curChar == '<') {
			if(myInput.charAt(i+1) == '/') {
				newLine = true;
				indent--;
			} else {
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
