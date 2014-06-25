function savePage() {
	var form = $("<form></form>").attr("method", "post").attr("action", "editor_main.php").attr("name", "save").attr("id", "save");
	var form_text = $("<textarea></textarea>").attr("name", "savepage").attr("id", "savepage");
	if ($("#tag_cont_menu").attr("name") == "active") {
		form_text.html(preSaveFormat($("#editor-box").html()));
		form.append(form_text);
		form.submit();
	}
}
