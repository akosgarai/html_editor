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
	$(".hidden-menuitem").removeClass("active");
}
//szuksegtelen divek torlese
function removeUselessDivs(element) {
	var result = $("<div></div>");
	if (typeof(element) == "undefined") { return 3; }
	//Ha ures es div, akkor visszater 1-el, ha div es nincs id, akkor visszater 2-vel, egyebkent pedig rekurzivan megy a gyerkekre
	if ($(element).prop("tagName") == "DIV" && $(element).html() == "" && $(element).attr("id") == "") {
		return 1;
	} else if ($(element).prop("tagName") == "DIV" && $(element).attr("id") == "") {
		return 2;
	} else if ($(element).children().length < 1) {
		return 3;
	} else {
		while ($(element).children().length > 0) {
			var retVal = removeUselessDivs($(element).children().first());
			if (retVal == 3) {
				result.append($(element).children().first());
			} else if (retVal == 2) {
				while ($(element).children().first().children().length > 0) {
					result.append($(element).children().first().children().first()); 
				}
				while($(element).children().length > 1) {
					result.append($(element + ":nth-child(2)")); 
				}
				$(element).html("");
				while (result.children().length > 0) {
					$(element).append(result.children().first());
				}
				return 4;
			} else if(retVal == 4) {
				while (retVal != 3) {
					retVal = removeUselessDivs($(element).children().first());
					if (retVal == 3) result.append($(element).children().first());
				}
			}
		}
	}
	$(element).html("");
	while(result.children().length > 0) {
		$(element).append(result.children().first());
	}
	return 3;
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
	$('#new-text').addClass("active");
	editMode = false;
	var txt = $("<textarea></textarea>").attr("autofocus", "autofocus").attr("name", "editorTextInputField").attr("id", "editorTextInputField");
	var finished = $("<button></button>").attr("type", "button").attr("onclick", "removeTextArea(document.getElementById(\"editorTextInputField\"))").html("Finished");
	var cancel = $("<button></button>").attr("type", "button").attr("onclick", "removeParent(this)").html("Remove");
	if (typeof(text) == "undefined") {
		var pp = $("<p></p>").attr("name", "editor-elem").attr("onclick", "editorFunction(this)");
		pp.attr("id", generateId(pp)).append(txt).append(finished).append(cancel);
		$("#editor-box div").first().append(pp);
	} else if(typeof(text) == "object" && text.id == "new-h") {
		var num = text.childNodes[1].childNodes[0].value;
		var pp = $("<h" + num + "></h" + num + ">").attr("name", "editor-elem").attr("onclick", "editorFunction(this)");
		pp.attr("id", generateId(pp)).append(txt).append(finished).append(cancel);
		$("#editor-box div").first().append(pp);
	} else if (typeof(text) == "object" && text.className == "addbutton") {
		$(text).replaceWith(txt);
		$("#editorTextInputField").parent().attr("onclick", "editorFunction(this)").append(finished).append(cancel);
		var next = createListAdd();
		txt.parent().parent().append(next);
	} else if (typeof(text) == "object" && text.className == "replaceToA") {
		insertUrl(text);
	} else {
		if (typeof(text) != "undefined" && text != "") { $(txt).html($(text).html()); }
		$(text).html("");
		$(text).append(txt);
		$(text).append(finished);
		$(text).append(cancel);
	}
}
function createListAdd() {
	var add = $("<div></div>").attr("id", "list-add-button").attr("onclick", "insertText(this)").addClass("addbutton").html("+1");
	var result = $("<li></li>");
	result.append(add);
	return result;
}
function createList(element) {
	var type = getSelectedOption(element.childNodes[1]);
	var list;
	var cssRule = element.childNodes[0].value;
	if (type.innerHTML == "ol") {
		list = $("<ol></ol>");
	} else if (type.innerHTML == "ul") {
		list = $("<ul></ul>");
	}
	list.addClass( "list");
	switch (cssRule) {
		case "1": 
			list.addClass("list-one");
			break;
		case "2": 
			list.addClass("list-two");
			break;
		case "3": 
			list.addClass("list-three");
			break;
		case "4": 
			list.addClass("list-four");
			break;
		case "5": 
			list.addClass("list-five");
			break;
		case "6": 
			list.addClass("list-six");
			break;
		case "7": 
			list.addClass("list-seven");
			break;
		case "8": 
			list.addClass("list-eight");
			break;
		case "9": 
			list.addClass("list-nine");
			break;
	}
	var lie = createListAdd();
	list.append(lie);
	$(element).replaceWith(list);
}
function createOption(value, text) {
	var option = $("<option></option>").attr("name", "editor-elem").attr("value", value).html(text);
	return option;
}
function insertList(element) {
	//egyszerre csak egy szovegmezot lehet szerkeszteni
	if(document.getElementById("editorTextInputField")) {
		alert("Egyszerre egy mezot szerkeszthetsz!");
		return;
	}
	hiddenMenusOff();
	$('#new-text').addClass("active");
	editMode = false;
	var listForm = $("<div></div>").attr("name", "editor-elem").attr("id", "editorTextInputField").addClass("listform");
	var cssRule = element.childNodes[1].childNodes[0].value;
	var hinput = $("<input></input>").attr("type", "hidden").attr("value", cssRule);
	listForm.append(hinput);
	var listType = $("<select></select>")
	var options = createOption("ol", "ol");
	listType.append(options);
	var options2 = createOption("ul", "ul");
	listType.append(options2);
	listForm.append(listType);
	var okbtn = $("<button></button>").attr("type", "button").attr("onclick", "createList(this.parentNode)").html("Ok");
	var removebtn = $("<button></button>").attr("type", "button").attr("onclick", "removeParent(this)").html("Cancel");
	listForm.append(okbtn);
	listForm.append(removebtn);
	$("#editor-box div:first-child").append(listForm);
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
	$('#new-a').removeClass("active");
}
function insertUrl(element) {
	//egyszerre csak egy szovegmezot lehet szerkeszteni
	if(document.getElementById("editorTextInputField")) {
		alert("Egyszerre egy mezot szerkeszthetsz!");
		return;
	}
	hiddenMenusOff();
	$('#new-a').addClass("active");
	editMode = false;
	var urlForm = $("<div></div>").attr("name", "editor-elem").attr("id", "editorTextInputField").addClass("urlform");
	var labelText = $("<label></label>").attr("for", "displayText").html("Text: ");
	var displayText = $("<input></input>").attr("name", "displayText").attr("type", "text").attr("id", "displayText").css("width", "200px");
	urlForm.append(labelText);
	urlForm.append(displayText);
	var labelUrl = $("<label></label>").attr("for", "urlText").html("URL: ");
	var urlText = $("<input></input>").attr("name", "urlText").attr("id", "urlText").attr("type", "text").css("width", "200px");
	urlForm.append(labelUrl);
	urlForm.append(urlText);
	var labelnt = $("<label></label>").attr("for", "newtab").html("New tab: ");
	var newtab = $("<input></input>").attr("name", "newtab").attr("id", "newtab").attr("type", "checkbox");
	urlForm.append(labelnt);
	urlForm.append(newtab);
	var okbtn = $("<button></button>").attr("type", "button").attr("onclick", "constructUrl(this.parentNode)").html("Ok");
	var removebtn = $("<button></button>").attr("type", "button").attr("onclick", "removeParent(this)").html("Cancel"); 
	urlForm.append(removebtn);	
	urlForm.append(okbtn);	
	if (typeof (element) != "undefined") {
		displayText.val($(element).html());
		var url = $(element).attr("name");
		if (url.substr(-6) == "_blank") {
			newtab.attr("checked", "true");
			url = url.substr(0, url.length - 6);
		}
		urlText.val(url);
		$(element).replaceWith(urlForm);
	} else {
		$("#editor-box div:first-child").append(urlForm);
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
		$('#edit-mode').addClass("active");
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
		//clickableElementsIdNull(document.getElementById('editor-box'));
		$("div[id^='clickable']").attr("id", "");
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

