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
				this.content = $("#editor-box").children();
				this.editorContent = $("#editor-box").children().attr("id");
			}
		}
	}
};
