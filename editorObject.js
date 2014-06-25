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
				//toChange[j].setAttribute("tagName", "a");
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
			//removeUselessDivs($("#editor-box"));
			menuButtonActivator("html_menu");
			this.state = "html";
		}
	}
};
