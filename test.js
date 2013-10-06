function getElementByClassName(classname)	{	
	var els = document.getElementsByTagName('*');
	var elsLen = els.length;
	var tmp = new Array();
	var pattern = new RegExp("(^|\\s)"+classname+"(\\s|$)");
	for (i = 0, j = 0; i < elsLen; i++) {
		if ( pattern.test(els[i].className) ) {
			tmp[j] = els[i];
			j++;
		}
	}
	return tmp;	
}

function TagContView() {
	document.getElementById('html_menu').setAttribute("name", "");
	document.getElementById('html_menu').style.backgroundColor="#123456";
	document.getElementById('tag_cont_menu').style.backgroundColor="green";
	document.getElementById('tag_cont_menu').setAttribute("name", "active");
	document.getElementById('hidden-menu').style.display = "block";
}

function htmlView(){
	document.getElementById('html_menu').setAttribute("name", "active");
	document.getElementById('html_menu').style.backgroundColor="green";
	document.getElementById('tag_cont_menu').style.backgroundColor="#123456";
	document.getElementById('tag_cont_menu').setAttribute("name", "");
	document.getElementById('hidden-menu').style.display = "none";
}
function removeTextArea(element) {
	var string = element.value;
	element.parentNode.innerHTML = string;
}
function editorFunction() {alert("editor");}
function insertText() {
	var pp = document.createElement("p");
	var txt = document.createElement("textarea");
	txt.setAttribute("autofocus", "autofocus");
	txt.setAttribute("onblur", "removeTextArea(this)");
	pp.appendChild(txt);
	var element = document.getElementById("editor-box");
	element.appendChild(pp);
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
			changeOnClickInTmp_Object[a].onclick = function() { editorFunction()};
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
			//	myOutput+= '<br class=\"remove\" />';
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

function showHtml(element) {
	htmlView();
	var	text = '<div id=\'dn1\'><h1 id=\'hn1\'>TTT</h1><p id=\'pn1\'>szovegesmezo</p></div>';
	var result = convertTextHtmlFormat(text);
	document.getElementById('editor-box').innerHTML = result;
}
