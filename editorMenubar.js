//menusorban a megfelelo gombok szinezese
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

function hiddenMenusOff() {
	var hiddenMenus = document.getElementsByClassName("hidden-menuitem");
	for(var a = 0; a < hiddenMenus.length; a++) {
		hiddenMenus[a].style.backgroundColor = "#123456";
	}
}

//HTML nezetre valtas - a nyomogomb lenyomasa
function showHtml() {
	htmlView();
	var	text = '<div id=\'dn1\'><h1 id=\'hn1\' name=\'editor-elem\'>TTT</h1><p id=\'pn1\' name=\'editor-elem\'>szovegesmezo</p></div>';
	var result = convertTextHtmlFormat(text);
	document.getElementById('editor-box').innerHTML = result;
}
//uj szovegdoboz beszurasa es arra fokuszalas, hogy lehessen bele irni. Az iras addig tart, amig ki nem kattintunk belole.
//Az uj szoveg beszurasa gomb lenyomasa
function insertText() {
	//egyszerre csak egy szovegmezot lehet szerkeszteni
	if(document.getElementById("editorTextInputField")) {
		alert("Egyszerre egy mezot szerkeszthetsz!");
		return;
	}
	hiddenMenusOff();
	document.getElementById('new-text').style.backgroundColor="green";
	editMode = false;
	var pp = document.createElement("p");
	var txt = document.createElement("textarea");
	var finished = document.createElement("button");
	var cancel = document.createElement("button");
	pp.setAttribute("name", "editor-elem");
	pp.setAttribute("onclick", "editorFunction(this)");
	txt.setAttribute("autofocus", "autofocus");
	txt.setAttribute("name", "editorTextInputField");
	txt.setAttribute("id", "editorTextInputField");
	finished.innerText = "Finished"
	finished.setAttribute("type", "button");
	finished.setAttribute("onclick", "removeTextArea(document.getElementById(\"editorTextInputField\"))");
	cancel.innerText = "Remove";
	cancel.setAttribute("type", "button");
	cancel.setAttribute("onclick", "removeParent(this)");
	pp.appendChild(txt);
	pp.appendChild(finished);
	pp.appendChild(cancel);
	var element = document.getElementById("editor-box");
	element.appendChild(pp);
}

//felpakolja az onclick esemenyt a p, h* tagekre, ha edit modba valtunk
function onclickToTexts() {
	if(editMode) {
		var tmp = document.getElementsByName("editor-elem");
		for (var i = 0; i < tmp.length; i++) {
			tmp[i].setAttribute("onclick", "editorFunction(this)");
		}
	}
}

//editor modba valtas, az edit gomb lenyomasa
function editModeOn() {
	if(document.getElementById("editorTextInputField")){
		alert("Egyszerre egy mezot szerkeszthetsz!");
		return;
	}
	hiddenMenusOff();
	if(!editMode) {
		document.getElementById('edit-mode').style.backgroundColor="green";
		editMode = true;
		onclickToTexts();
	} else {
		if(document.getElementById("editorTextInputField")){
			alert("Fejezd be a szerkesztest mielott kilepsz a szerkesztesmodbol!");
			return;
		}
		hiddenMenusOff();
		editMode = false;
	}
}
