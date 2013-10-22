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

//ket divnek nem lenne szabad egymas utan allnia
function removeMultipleTempDivsV2(element){
	if(!element.childNodes[0]) {
		return 1;
	}
	var notDivElements;
	if(element.tagName == "DIV" && element.id != "") {
		for (var cnum = 0; cnum < element.childNodes.length; cnum++) {
			if(element.childNodes[cnum].tagName == "DIV" && element.childNodes[cnum].id == "" ) {
				var removethis = element.childNodes[cnum];
				var tmpdiv = document.createElement("div");
				for (var tmpcnum = cnum; tmpcnum < element.childNodes.length; tmpcnum++) {
					tmpdiv.appendChild(element.childNodes[tmpcnum]);
				}
				if(!removethis.childNodes[0]) {
					for (var ret = 0; ret < tmpdiv.childNodes.length; ret++) {
						removeMultipleTempDivsV2(element.childNodes[ret]);
						element.appendChild(tmpdiv.childNodes[ret]);
					}
				} else {
					for (var ret = 0; ret < removethis.childNodes.length; ret++) {
						removeMultipleTempDivsV2(removethis.childNodes[ret]);
						element.appendChild(removethis.childNodes[ret]);
					}
					for (var ret = 0; ret < tmpdiv.childNodes.length; ret++) {
						removeMultipleTempDivsV2(element.childNodes[ret]);
						element.appendChild(tmpdiv.childNodes[ret]);
					}
				}
			}
			//removeMultipleTempDivsV2(element);
		}
	}
	for (var cnum = 0; cnum < element.childNodes.length; cnum++) {
		removeMultipleTempDivsV2(element.childNodes[cnum]);
	}
}

function removeClickableElements(element) {
	if(!element.childNodes[0]) {
		return 1;
	}
	if(element.tagName == "DIV" && element.id != "" && element.id.substring(0, 9) == "clickable") {
		element.setAttribute("id", "");
	}
	for (var cnum = 0; cnum < element.childNodes.length; cnum++) {
		if(element.childNodes[cnum].tagName == "DIV" && element.childNodes[cnum].id != "" && element.childNodes[cnum].id.substring(0, 9) == "clickable") {
			var removethis = element.childNodes[cnum];
			var tmpdiv = document.createElement("div");
			if(removethis.childNodes[0]) {
				for (var cntr = 0; cntr < removethis.childNodes.length; cntr++) {
					tmpdiv.appendChild(removethis.childNodes[cntr]);
				}
			}
			for (var tmpcnum = cnum; tmpcnum < element.childNodes.length; tmpcnum++) {
				tmpdiv.appendChild(element.childNodes[tmpcnum]);
				//alert(element.id);
			}
			for (var cntr = 0; cntr < tmpdiv.childNodes.length; cntr++) {
				//a temp tombot vegigkikeresni beloluk a diveket.
				removeClickableElements(tmpdiv.childNodes[cntr]);
			}
			for (var cntr = 0; cntr < tmpdiv.childNodes.length; cntr++) {
				element.appendChild(tmpdiv.childNodes[cntr]);
			}
		}		
	}
	for (var cnum = 0; cnum < element.childNodes.length; cnum++) {
		removeClickableElements(element.childNodes[cnum]);
	}
}
//HTML nezetre valtas - a nyomogomb lenyomasa
function showHtml(pageContent) {
	if(typeof(pageContent) != "undefined" && pageContent != ""){
		alert(typeof(pageContent));
		var	text = pageContent;
	} else {
		if (!document.getElementById('DIV_nr_0')) {
			var	text = "<div id=\"dn1\" name=\"editor-element\">" + document.getElementById('editor-box').innerHTML + "</div>";
		} else var text = document.getElementById('editor-box').innerHTML;
	}
	var result = convertTextHtmlFormat(text);
	if (document.getElementById('html_menu').getAttribute("name") != "active") {
		htmlView();
		if(elementInEditor != null) {
			document.getElementById('editor-box').innerHTML = elementInEditor;
			document.getElementById('selected_element').innerHTML = result;
			document.getElementById('selected_element').setAttribute("id", "");
			elementInEditor = null;
		} else {
			//if(typeof(result) != 'undefined')
			document.getElementById('editor-box').innerHTML = result;
		}
		removeMultipleTempDivsV2(document.getElementById('editor-box'));
	}
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
	if(element.firstChild) {
		element.firstChild.appendChild(pp);
	} else {
		var dn1 = document.createElement("div");
		var divId = generateId(dn1);
		dn1.setAttribute("id", divId);
		element.appendChild(dn1);
		element.firstChild.appendChild(pp);
	}
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

function changeBgColor(element) {
	var color =  element.options[element.selectedIndex];
	alert(color.value);
}
