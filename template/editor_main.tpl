<html>
<head>
	<title>{$title}</title>
	<link rel="stylesheet" type="text/css" href="test.css">
	<script type="text/javascript" src="common.js"></script>
	<script type="text/javascript" src="editorMenubar.js"></script>
	<script type="text/javascript" src="test.js"></script>
</head>
<body style="background-color: #1a1a1a;">
	<div id="editor-container">
		<div style="float: left;">
			<div id="editor-menu" class="menubar">
				<div class="clickable-menuitem" id="html_menu"  onclick="showHtml('{$pageContent}')">{$menus[0]}</div>
				<div class="clickable-menuitem" id="tag_cont_menu" onclick="">{$menus[1]}</div>
			</div>
			<div id="hidden-menu" class="hidden-menubar">
				<div class="hidden-menuitem" id="new-text" onclick="insertText()">P</div>
				<div class="hidden-menuitem" id="edit-mode" onclick="editModeOn()">Edit</div>
			</div>
			<div id="editor-box" class="editor">{$main_screen}</div>
		</div>
		<div id="style-menu">
		{$bgColorSelectorModule}<br />
		{$fontColorSelectorModule}
		</div>
		<script type="text/javascript">
			{$initScript}
		</script>
	</div>
</body>
</html>
