function savePage() {
	/*var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "editor_main.php");
	form.setAttribute("name", "save");
	form.setAttribute("id", "save");
	var form_text = document.createElement("textarea");
	form_text.setAttribute("name", "savepage");
	form_text.setAttribute("id", "savepage");
	var page = document.getElementById("editor-box").innerHTML;
	if (document.getElementById('tag_cont_menu').getAttribute("name") == "active") {
		form_text.innerHTML = preSaveFormat(page);
		form.appendChild(form_text);
		form.submit();
	}	*/
	var form = $("<form></form>").attr("method", "post").attr("action", "editor_main.php").attr("name", "save").attr("id", "save");
	var form_text = $("<textarea></textarea>").attr("name", "savepage").attr("id", "savepage");
	if ($("#tag_cont_menu").attr("name") == "active") {
		form_text.html(preSaveFormat($("#editor-box").html()));
		form.append(form_text);
		form.submit();
	}
}
