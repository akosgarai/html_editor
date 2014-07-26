var allowedEditorStates = ["new", "loaded", "html", "saving", "saved", "error"];
var editor = {
	state : null,
	previousState : null,
	content : null,
	editorContent : null,
	stateValidator : function (st) {
		if (allowedEditorStates.indexOf(st) > -1) {
			return true;
		} else {
			return false;
		}
	},
	prepareToEditor : function (text) {
		if (this.state == "html") {
			convertHtmlTextFormat(text);
		}
	},
	init : function(st, content) {
		if (st == "new") {
			this.state = st;
			menuButtonActivator("tag_cont_menu");
			this.content = $("<div></div>").attr("id", "container").attr("name", "container");
			this.editorContent = "container";
			$("#editor-box").append(this.content);
		} else if(st == "loaded") {
			this.state = st;
			menuButtonActivator("tag_cont_menu");
			if (typeof(content) != "undefined") {
			} else {
				this.content = $("#editor-box div:first-child");
				this.editorContent = $("#editor-box").children().attr("id");
			}
		}
	},
	setToEditor : function (element) {
		if (this.state == "html") {
			if(typeof(element) != "undefined") {
				$(element).attr("name", "selected_element");
				elementInEditor = $("#editor-box").html();
				this.editorContent = $(element).attr("id");
			}
			menuButtonActivator("tag_cont_menu");
			$("#editor-box").html(convertHtmlTextFormat($(element).text()));
			$(".tmp_object").attr("onclick", "editorFunction(this)");
			$("div[id^='clickable']").attr("id", "");
			removeUselessDivs($("#editor-box"));
			var change = $(".replaceToP");
			for (var c = 0; c < change.length; c++) {
				var ch = $("<p></p>");
				ch.attr("name", $(change[c]).attr("href") + $(change[c]).attr("target"));
				ch.addClass("replaceToA").removeClass("replaceToP");
				ch.attr("onclick", "editorFunction(this)");
				ch.html($(change[c]).html());
				$(change[c]).replaceWith(ch);
			}
			this.state = "loaded";
		}
	},
	setToHtml : function () {
		if (this.state == "loaded" || this.state == "new") {
			var toChange = $(".replaceToA");
			for (var j = 0; j < toChange.length; j++) {
				var ch = $("<a></a>");
				ch.html($(toChange[j]).html());
				var href = $(toChange[j]).attr("name");
				if (href.substr(-6) == "_blank") {
					ch.attr("target", "_blank")
					href = href.substr(0, href.length - 6);
				}
				ch.attr("href", href);
				ch.addClass("replaceToP").removeClass("replaceToA");
				$(toChange[j]).replaceWith(ch);
			}
			var text = $("#editor-box").html();
			var result = convertTextHtmlFormat(text);
			if (elementInEditor != null) { 
				$("#editor-box").html(elementInEditor);
				$("[name='selected_element']").html(result).attr("name", "");
				elementInEditor = null;
			} else {
				$("#editor-box").html(result);
			}
			menuButtonActivator("html_menu");
			this.state = "html";
		}
	},
	insertText : function (text) {
		if ($("#editorTextInputField").length > 0) {
			alert("Egyszerre egy mezot szerkeszthetsz!");
			return;
		}
		hiddenMenusOff();
		$('#new-text').addClass("active");
		editMode = false;
		var txt = $("<textarea></textarea>").attr("autofocus", "autofocus").attr("name", "editorTextInputField").attr("id", "editorTextInputField");
		var finished = $("<button></button>").attr("type", "button").attr("onclick", "removeTextArea(document.getElementById(\"editorTextInputField\"))").html("Finished");
		var cancel = $("<button></button>").attr("type", "button").attr("onclick", "removeParent(this)").html("Remove");
		if (typeof (text) == "undefined" && $("#editor-box").children().first().children().last().hasClass("editor-text-container-box")) {
			var pp = $("<p></p>").attr("name", "editor-elem").attr("onclick", "editorFunction(this)");
			pp.attr("id", generateId(pp)).append(txt).append(finished).append(cancel);
			$("#editor-box").children().first().children().last().append(pp);
		} else if (typeof (text) == "undefined") {
			var cont = $("<div></div>").attr("name", "editor-elem").addClass("editor-text-container-box");
			var pp = $("<p></p>").attr("name", "editor-elem").attr("onclick", "editorFunction(this)");
			pp.attr("id", generateId(pp)).append(txt).append(finished).append(cancel);
			cont.attr("id", generateId(cont)).append(pp);
			$("#editor-box").children().first().append(cont);
		} else if(typeof(text) == "object" && $(text).attr("id") == "new-h") {
			var num = text.childNodes[1].childNodes[0].value;
			var pp = $("<h" + num + "></h" + num + ">").attr("name", "editor-elem").attr("onclick", "editorFunction(this)");
			pp.attr("id", generateId(pp)).append(txt).append(finished).append(cancel);
			if ($("#editor-box").children().first().children().last().hasClass("editor-h-container-box")) {
				$("#editor-box").children().first().children().last().append(pp);
			} else {
				var cont = $("<div></div>").attr("name", "editor-elem").addClass("editor-h-container-box");
				cont.attr("id", generateId(cont)).append(pp);
				$("#editor-box").children().first().append(cont);
			}
		} else if (typeof(text) == "object" && $(text).hasClass("addbutton")) {
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
	},
	insertList : function (text) {
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
	},
	destroyMenu : function (element) {
		$("[name='displaymenu']").remove()
		$(element).attr()
	},
	constructMenu : function (element) {
		this.destroyMenu();
		var menu = $("<div></div>").attr("name", "displaymenu").css({"position" : "absolute", "left" : "0px", "bottom" : "5px", "height" : "20px", "width" : "100%", "min-width" : "200px", "background-color" : "#999999"});
		var btn1 = $("<div></div>").attr("name", "btn1").css({"width" : "18px", "height" : "18px", "margin" : "1px", "background-color" : "green", "float" : "left"}).attr("onclick", "editor.destroyMenu(this.parent().parnet())");
		menu.append(btn1);
		$(element).append(menu);
	},
	create : function (elementTag) {
		var element;
		switch (elementTag) {
			case "p" :
				element = $("<p></p>"); 
				break;
		}
		element.attr("name", "editor-elem").attr("onclick", "editorFunction(this)");
		return element;
	},
	generalInserter : function (fnType, tagName, elementToInsert) {
		if ($("#editorTextInputField").length > 0) {
			alert("Egyszerre egy mezot szerkeszthetsz!");
			return;
		}
		hiddenMenusOff();
		$('#new-text').addClass("active");
		editMode = false;
		var txt = $("<textarea></textarea>").attr("autofocus", "autofocus").attr("name", "editorTextInputField").attr("id", "editorTextInputField");
		var finished = $("<button></button>").attr("type", "button").attr("onclick", "removeTextArea(document.getElementById(\"editorTextInputField\"))").html("Finished");
		var cancel = $("<button></button>").attr("type", "button").attr("onclick", "removeParent(this)").html("Remove");
		/* check what we want insert a new element or editing an existing one*/
		if (fnType == "insert") {
			var element = this.create(tagName);
			element.attr("id", generateId(element)).append(txt).append(finished).append(cancel);
			if (typeof (elementToInsert) != "undefined") {						//ha megvan hogy melyik elemhez szurunk be
			} else if ($("#editor-box").children().first().hasClass("editor-" + tagName + "-container-box")) {		//ha az editorban a legfelso kontener nyert
				$("#editor-box").children().first().append(element);
			} else if (!$("#editor-box").children().first().hasClass("editor-container-box")) {				//a legfelso kontener olyan amilyenbe be tudunk szurni
				if ($("#editor-box").children().first().children().last().hasClass("editor-" + tagName + "-container-box")) {			//a legutolso kontener nyero
					$("#editor-box").children().first().children().last().append(element);
				} else {
					var cont = $("<div></div>").attr("name", "editor-elem").addClass("editor-" + tagName + "-container-box").addClass("editor-container-box").css("position", "absolute");
					cont.attr("id", generateId(cont)).append(element).attr("onmouseover", "editor.constructMenu(this)");
					$("#editor-box").children().first().append(cont);
				}
			}
		} else if (fnType == "edit") {
			$(txt).html($(tagName).html());
			$(tagName).html("");
			$(tagName).append(txt);
			$(tagName).append(finished);
			$(tagName).append(cancel);
		}
	}
};
