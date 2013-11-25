function savePage() {
	var form = document.createElement("form");
	form.setAttribute("method", "post");
	form.setAttribute("action", "editor_main.php");
	form.setAttribute("name", "save");
	form.setAttribute("id", "save");
	var form_text = document.createElement("textarea");
	form_text.setAttribute("name", "savepage");
	form_text.setAttribute("id", "savepage");
	var page = document.getElementById("editor-box").innerHTML;
	form_text.innerHTML = preSaveFormat(page);
	form.appendChild(form_text);
	form.submit();
}
