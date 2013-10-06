<html>
<head>
	<title>{$title}</title>
	<link rel="stylesheet" type="text/css" href="test.css">
	<script type="text/javascript" src="test.js"></script>
</head>
<body>
	<div id="editor-container">
		<div id="editor-menu" class="menubar">
			<div class="clickable-menuitem" id="html_menu"  onclick="showHtml(this)">{$menus[0]}</div>
			<div class="clickable-menuitem" id="tag_cont_menu" onclick="">{$menus[1]}</div>
		</div>
		<div id="hidden-menu" class="hidden-menubar">
			<div class="hidden-menuitem" id="new-text" onclick="insertText()">P</div>
		</div>
		<div id="editor-box" class="editor">{$main_screen}</div>
	</div>
</body>
</html>
