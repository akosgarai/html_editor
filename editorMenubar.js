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
//szuksegtelen divek torlese
function removeUselessDivs(element) {
	var result = document.createElement("div");
	if (typeof(element) == "undefined") { return 3; }
	//Ha ures es div, akkor visszater 1-el, ha div es nincs id, akkor visszater 2-vel, egyebkent pedig rekurzivan megy a gyerkekre
	if (element.tagName == "DIV" && element.innerHTML == "") {
		return 1;
	} else if (element.tagName == "DIV" && element.id == "") {
		return 2;
	} else if (!element.childNodes[0]) {
		return 3;
	} else {
		while (element.childNodes[0]) {
			var retVal = removeUselessDivs(element.childNodes[0]);
			if (retVal == 3) {
				result.appendChild(element.childNodes[0]);
			} else if (retVal == 2) {
				while (element.childNodes[0].childNodes[0]) {
					result.appendChild(element.childNodes[0].childNodes[0]); 
				}
				while(element.childNodes[1]) {
					result.appendChild(element.childNodes[1]); 
				}
				element.innerHTML = "";
				while (result.childNodes[0]) {
					element.appendChild(result.childNodes[0]);
				}
				return 4;
			} else if(retVal == 4) {
				while (retVal != 3) {
					retVal = removeUselessDivs(element.childNodes[0]);
					if (retVal == 3) result.appendChild(element.childNodes[0]);
				}
			}
		}
	}
	element.innerHTML = "";
	while(result.childNodes[0]) {
		element.appendChild(result.childNodes[0]);
	}
	return 3;
}

function clickableElementsIdNull(element) {
	if(element.tagName == "DIV" && element.id != "" && element.id.substring(0, 9) == "clickable") {
		element.setAttribute("id", "");
	}
	if(!element.childNodes[0]) {
		return 1;
	}
	for (var cntr = 0; cntr < element.childNodes.length; cntr++) {
		clickableElementsIdNull(element.childNodes[cntr]);
	}
}
//HTML nezetre valtas - a nyomogomb lenyomasa
function showHtml(pageContent) {
	if(typeof(pageContent) != "undefined" && pageContent != ""){
		alert(typeof(pageContent));
		var	text = pageContent;
	} else {
			var text = document.getElementById('editor-box').innerHTML;
	}
	var result = convertTextHtmlFormat(text);
	if (document.getElementById('html_menu').getAttribute("name") != "active") {
		htmlView();
		if(elementInEditor != null) {
			document.getElementById('editor-box').innerHTML = elementInEditor;
			document.getElementsByName('selected_element')[0].innerHTML = result;
			document.getElementsByName('selected_element')[0].setAttribute("name", "");
			elementInEditor = null;
		} else {
			document.getElementById('editor-box').innerHTML = result;
		}
		removeUselessDivs(document.getElementById('editor-box'));
	}
}
//uj szovegdoboz beszurasa es arra fokuszalas, hogy lehessen bele irni. Az iras addig tart, amig ki nem kattintunk belole.
//Az uj szoveg beszurasa gomb lenyomasa
function insertText(text) {
	//egyszerre csak egy szovegmezot lehet szerkeszteni
	if(document.getElementById("editorTextInputField")) {
		alert("Egyszerre egy mezot szerkeszthetsz!");
		return;
	}
	hiddenMenusOff();
	document.getElementById('new-text').style.backgroundColor="green";
	editMode = false;
	var txt = document.createElement("textarea");
	var finished = document.createElement("button");
	var cancel = document.createElement("button");
	txt.setAttribute("autofocus", "autofocus");
	txt.setAttribute("name", "editorTextInputField");
	txt.setAttribute("id", "editorTextInputField");
	finished.innerText = "Finished"
	finished.setAttribute("type", "button");
	finished.setAttribute("onclick", "removeTextArea(document.getElementById(\"editorTextInputField\"))");
	cancel.innerText = "Remove";
	cancel.setAttribute("type", "button");
	cancel.setAttribute("onclick", "removeParent(this)");
	if (typeof(text) == "undefined") {
		var pp = document.createElement("p");
		pp.setAttribute("name", "editor-elem");
		pp.setAttribute("onclick", "editorFunction(this)");
		pp.setAttribute("id", generateId(pp));
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
	} else if(typeof(text) == "object" && text.id == "new-h") {
		var pp = document.createElement("h1");
		pp.setAttribute("name", "editor-elem");
		pp.setAttribute("onclick", "editorFunction(this)");
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
	} else {
		if (typeof(text) != "undefined" && text != "") { txt.innerHTML = text.innerHTML; }
		text.innerHTML = "";
		text.appendChild(txt);
		text.appendChild(finished);
		text.appendChild(cancel);
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
	document.getElementById("editor-box").firstChild.style.backgroundColor = color.value;
	//alert(color.value);
}

function changeColor(element) {
	var color =  element.options[element.selectedIndex];
	document.getElementById("editor-box").firstChild.style.color = color.value;
}

function getSelectedOption(select) {
	for (var a = 0; a < select.childNodes.length; a++) {
		if (select.childNodes[a].selected) return select.childNodes[a];
	}
}
function setBgImage(select) {
	var element = getSelectedOption(select);
	var src = element.value;
	var meta = getMeta(src);
	document.getElementById("editor-box").firstChild.style.backgroundImage = "url(" + src + ")";
	document.getElementById("editor-box").firstChild.style.backgroundRepeat = "no-repeat";
	document.getElementById("editor-box").firstChild.style.minWidth = meta.imageWidth;
	document.getElementById("editor-box").firstChild.style.minHeight = meta.imageHeight;
	document.getElementById("bg-image-modul").style.display = block;
}
function insertImage(select) {
	var element = getSelectedOption(select);
	var src = element.value;
	var imgCont = document.createElement("div");
	imgCont.setAttribute("name", "editor-element");
	var img = document.createElement("img");
	img.setAttribute("src", src);
	imgCont.appendChild(img);
	document.getElementById("editor-box").firstChild.appendChild(imgCont);
}
function uploadImage(element) {
	if (document.getElementById("html_menu").getAttribute("name") == "active") {
		clickableElementsIdNull(document.getElementById('editor-box'));
		removeUselessDivs(document.getElementById('editor-box'));
		var page = document.getElementById("editor-box").innerHTML;
		document.getElementById("saveEditorContent").value = preSaveFormat(page);
		var form = document.getElementById("u-i-form");
		alert (form.innerHTML);
		form.submit();
	}
}

function changeVisibility(element) {
	if(element.style.display == "none" || element.style.display == "") {
		element.style.display = "block";
	} else {
		element.style.display = "none";
	}
}
function setStyleValueSelect(element) {
	var property = element.id;
	var value = getSelectedOption(element);
	var fs = document.getElementById("editor-box").firstChild.style;
	fs[property] = value.value;
}
function updateFontSize(element) {
	var property = element.id;
	var num = element.childNodes[0].childNodes[0].value;
	var ext = getSelectedOption(element.childNodes[1].childNodes[0]);
	var fs = document.getElementById("editor-box").firstChild.style;
	var value = num.toString();
	value = value.concat(ext);
	fs[property] = num + ext.value;
}
