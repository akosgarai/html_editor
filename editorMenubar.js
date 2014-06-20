/*menuButtonActiveHandler function 
*	lekezeli, hogy melyik gombot nyomtuk meg, azt aktivva teszi, a tobbirol pedig leveszi az aktiv classt illetve kirakja vagy eltunteti a hidden-menusort.
*/
function menuButtonActivator(id) {
	$(".clickable-menuitem").removeClass("active").attr("name","");
	$("#" + id).addClass("active").attr("name", "active");
	switch (id) {
		case "tag_cont_menu" :
			$("#hidden-menu").show();
			break;
		default :
			$("#hidden-menu").hide();
	}
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
	if (element.tagName == "DIV" && element.innerHTML == "" && element.id == "") {
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
		var toChange = document.getElementsByClassName("replaceToA");
		for (var j = 0; j < toChange.length; j++) {
			var ch = document.createElement("a");
			ch.innerHTML = toChange[j].innerHTML;
			var href = toChange[j].getAttribute("name");
			if (href.substr(-6) == "_blank") {
				ch.target = "_blank";
				href = href.substr(0, href.length - 6);
			}
			ch.href = href;
			ch.setAttribute("class", "replaceToP");
			//toChange[j].setAttribute("tagName", "a");
			toChange[j].parentNode.replaceChild(ch, toChange[j]);
		}
			var text = document.getElementById('editor-box').innerHTML;
	}
	var result = convertTextHtmlFormat(text);
	if (document.getElementById('html_menu').getAttribute("name") != "active") {
		menuButtonActivator("html_menu");
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
		var num = text.childNodes[1].childNodes[0].value;
		var pp = document.createElement("h" + num);
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
	} else if (typeof(text) == "object" && text.className == "addbutton") {
		text.parentNode.replaceChild(txt, text);
		txt.parentNode.appendChild(finished);
		txt.parentNode.appendChild(cancel);
		txt.parentNode.setAttribute("onclick", "editorFunction(this)");
		var next = createListAdd();
		txt.parentNode.parentNode.appendChild(next);
	} else if (typeof(text) == "object" && text.className == "replaceToA") {
		insertUrl(text);
	} else {
		if (typeof(text) != "undefined" && text != "") { txt.innerHTML = text.innerHTML; }
		text.innerHTML = "";
		text.appendChild(txt);
		text.appendChild(finished);
		text.appendChild(cancel);
	}
}
function createListAdd() {
	var add = document.createElement("div");
	add.setAttribute("class", "addbutton");
	add.setAttribute("id", "list-add-button");
	add.setAttribute("onclick", "insertText(this)");
	add.innerHTML = "+1";
	var result = document.createElement("li");
	result.appendChild(add);
	return result;
}
function createList(element) {
	var type = getSelectedOption(element.childNodes[1]);
	var list;
	var cssRule = element.childNodes[0].value;
	if (type.innerHTML == "ol") {
		list = document.createElement("ol");
	} else if (type.innerHTML == "ul") {
		list = document.createElement("ul");
	}
	list.setAttribute("class", "list");
	switch (cssRule) {
		case "1": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-one");
			break;
		case "2": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-two");
			break;
		case "3": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-three");
			break;
		case "4": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-four");
			break;
		case "5": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-five");
			break;
		case "6": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-six");
			break;
		case "7": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-seven");
			break;
		case "8": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-eight");
			break;
		case "9": 
			list.setAttribute("class", list.getAttribute("class") + " " + "list-nine");
			break;
	}
	var lie = createListAdd();
	list.appendChild(lie);
	element.parentNode.replaceChild(list, element);
}
function createOption(value, text) {
	var option = document.createElement("option");
	option.setAttribute("name", "editor-elem");
	option.setAttribute("value", value);
	option.innerHTML = text;
	return option;
}
function insertList(element) {
	//egyszerre csak egy szovegmezot lehet szerkeszteni
	if(document.getElementById("editorTextInputField")) {
		alert("Egyszerre egy mezot szerkeszthetsz!");
		return;
	}
	hiddenMenusOff();
	document.getElementById('new-text').style.backgroundColor="green";
	editMode = false;
	var listForm = document.createElement("div");
	listForm.setAttribute("name", "editor-elem");
	listForm.setAttribute("id", "editorTextInputField");
	listForm.setAttribute("class", "listform");
	var cssRule = element.childNodes[1].childNodes[0].value;
	var hinput = document.createElement("input");
	hinput.setAttribute("type", "hidden");
	hinput.setAttribute("value", cssRule);
	listForm.appendChild(hinput);
	var listType = document.createElement("select");
	var options = createOption("ol", "ol");
	listType.appendChild(options);
	options = createOption("ul", "ul");
	listType.appendChild(options);
	listForm.appendChild(listType);
	var okbtn = document.createElement("button");
	okbtn.setAttribute("type", "button");
	okbtn.innerHTML = "Ok";
	okbtn.setAttribute("onclick", "createList(this.parentNode)");
	var removebtn = document.createElement("button");
	removebtn.setAttribute("type", "button");
	removebtn.innerHTML = "Cancel";
	removebtn.setAttribute("onclick", "removeParent(this)");
	listForm.appendChild(okbtn);
	listForm.appendChild(removebtn);
	document.getElementById("editor-box").firstChild.appendChild(listForm);
}
//uj url beszurasa modul
function constructUrl(element) {
	var text = element.childNodes[1].value;
	var url = element.childNodes[3].value;
	if (text == "" || url == "") {
		return;
	}
	var result = document.createElement("p");
	result.setAttribute("name", url);
	if (element.childNodes[5].checked) {
		result.setAttribute("name", url + "_blank");
	}
	result.setAttribute("class", "replaceToA");
	result.setAttribute("onclick", "editorFunction(this)");
	result.innerHTML = text;
	element.parentNode.replaceChild(result, element);
}
function insertUrl(element) {
	//egyszerre csak egy szovegmezot lehet szerkeszteni
	if(document.getElementById("editorTextInputField")) {
		alert("Egyszerre egy mezot szerkeszthetsz!");
		return;
	}
	hiddenMenusOff();
	document.getElementById('new-text').style.backgroundColor="green";
	editMode = false;
	var urlForm = document.createElement("div");
	urlForm.setAttribute("name", "editor-elem");
	urlForm.setAttribute("id", "editorTextInputField");
	urlForm.setAttribute("class", "urlform");
	var labelText = document.createElement("label")
	labelText.setAttribute("for", "displayText");
	labelText.innerHTML = "Text: ";
	var displayText = document.createElement("input");
	displayText.setAttribute("name", "displayText");
	displayText.setAttribute("id", "displayText");
	displayText.style.width = "200px";
	urlForm.appendChild(labelText);
	urlForm.appendChild(displayText);
	var labelUrl = document.createElement("label")
	labelUrl.setAttribute("for", "urlText");
	labelUrl.innerHTML = "URL:"
	var urlText = document.createElement("input");
	urlText.setAttribute("name", "urlText");
	urlText.setAttribute("id", "urlText");
	urlText.setAttribute("type", "text");
	urlText.style.width = "200px";
	urlForm.appendChild(labelUrl);
	urlForm.appendChild(urlText);
	var labelnt = document.createElement("label");
	labelnt.setAttribute("for", "newtab");
	labelnt.innerHTML = "New tab:";
	var newtab = document.createElement("input");
	newtab.setAttribute("type", "checkbox");
	newtab.setAttribute("name", "newtab");
	newtab.setAttribute("id", "newtab");
	urlForm.appendChild(labelnt);
	urlForm.appendChild(newtab);
	var okbtn = document.createElement("button");
	okbtn.setAttribute("type", "button");
	okbtn.innerHTML = "Ok";
	okbtn.setAttribute("onclick", "constructUrl(this.parentNode)");
	var removebtn = document.createElement("button");
	removebtn.setAttribute("type", "button");
	removebtn.innerHTML = "Cancel";
	removebtn.setAttribute("onclick", "removeParent(this)");
	urlForm.appendChild(removebtn);	
	urlForm.appendChild(okbtn);	
	if (typeof (element) != "undefined") {
		displayText.setAttribute("value", element.innerHTML);
		var url = element.getAttribute("name");
		if (url.substr(-6) == "_blank") {
			newtab.checked = "true";
			url = url.substr(0, url.length - 6);
		}
		urlText.setAttribute("value", url);
		element.parentNode.replaceChild(urlForm, element);
	} else {
		document.getElementById("editor-box").firstChild.appendChild(urlForm);
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

/*function changeBgColor(element) {
	var color =  element.options[element.selectedIndex];
	document.getElementById("editor-box").firstChild.style.backgroundColor = color.value;
	//alert(color.value);
}*/

function changeColor(element) {
	var property = element.childNodes[0].id;
	var color =  element.childNodes[1].childNodes[1].value;
	var fs = document.getElementById("editor-box").firstChild.style; 
	fs[property] = "#" + color;
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
//	document.getElementById("bg-image-modul").style.display = block;
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
/*function setStyleValueSelect(element) {
	var property = element.id;
	var value = getSelectedOption(element);
	var fs = document.getElementById("editor-box").firstChild.style;
	fs[property] = value.value;
}*/
/*function updateFontSize(element) {
	var property = element.id;
	var num = element.childNodes[0].childNodes[0].value;
	var ext = getSelectedOption(element.childNodes[1].childNodes[0]);
	var fs = document.getElementById("editor-box").firstChild.style;
	var value = num.toString();
	value = value.concat(ext);
	fs[property] = num + ext.value;
}*/
function setStyleValueNumeric(element) {
	var value = element.childNodes[1].childNodes[0].childNodes[0].value;
	var select = getSelectedOption(element.childNodes[1].childNodes[1].childNodes[0]);
	var property = element.childNodes[1].childNodes[1].childNodes[0].id;
	var fs = document.getElementById("editor-box").firstChild.style;
	fs[property] = value + select.value;
	if (property == "width" || property == "height") {
		fs["min-" + property] = "";
		fs["max-" + property] = "";
	}
}
function textShadow(element) {
	var property = element.childNodes[0].id;
	var sh = element.childNodes[1].childNodes[1].value + "px";
	var sv = element.childNodes[2].childNodes[1].value + "px";
	var sb = element.childNodes[3].childNodes[1].value + "px";
	var sc = "#" + element.childNodes[4].childNodes[1].value;
	var fs = document.getElementById("editor-box").firstChild.style;
	fs[property] = sh + " " + sv + " " + sb + " " + sc;
}
function multipleNumeric(element) {
	var property = element.childNodes[0].id;
	var sh = element.childNodes[1].childNodes[1].value + "px";
	var sv = element.childNodes[2].childNodes[1].value + "px";
	var sb = element.childNodes[3].childNodes[1].value + "px";
	var sc = element.childNodes[4].childNodes[1].value + "px";
	var fs = document.getElementById("editor-box").firstChild.style;
	fs[property] = sh + " " + sv + " " + sb + " " + sc;
}
/*function colorSelector(element) {
	var property =element.childNodes[0].id;
	var color = element.childNodes[1].childNodes[1].value;
	var fs = document.getElementById("editor-box").firstChild.style;
	if (typeof (color) == "undefined" || color == "") {
		fs[property] = "transparent";
	} else {
		fs[property] = "#" + color;
	}
}*/
function changeSelectValue(element) {
	var property = element.childNodes[1].childNodes[0].id;
	var selected = getSelectedOption(element.childNodes[1].childNodes[0]);
	var fs = document.getElementById("editor-box").firstChild.style;
	fs[property] = selected.value;
}

