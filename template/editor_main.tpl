<html>
<head>
	<title>{$title}</title>
	<link rel="stylesheet" type="text/css" href="test.css">
	<script type="text/javascript" src="common.js"></script>
	<script type="text/javascript" src="editorMenubar.js"></script>
	<script type="text/javascript" src="test.js"></script>
	<script type="text/javascript" src="save.js"></script>
	<cfheader name="X-XSS-Protection" value="0">
</head>
<body style="background-color: #1a1a1a;">
	<div id="editor-container">
		<div style="float: left;">
			<div class="editor-menubar-container">
				<div id="editor-menu" class="menubar">
					<div class="clickable-menuitem" id="html_menu"  onclick="showHtml()">{$menus[0]}</div>
					<div class="clickable-menuitem" id="tag_cont_menu" onclick="">{$menus[1]}</div>
					<div class="clickable-menuitem" id="save_page" onclick="savePage()">{$menus[2]}</div>
				</div>
				<div id="hidden-menu" class="hidden-menubar">
					<div class="hidden-menuitem bigmenu" id="new-text" onclick="insertText()">P</div>
					<div class="hidden-menuitem bigmenu" id="new-h" onclick="insertText(this)">H</div>
					<div class="hidden-menuitem bigmenu" id="edit-mode" onclick="editModeOn()">Edit</div>
					<button class="hidden-menuitem smallmenu" id="new-b" onclick="getSelectionHtml('bold')">B</button>
					<button class="hidden-menuitem smallmenu" id="new-i" onclick="getSelectionHtml('italic')">I</button>
				</div>
			</div>
			<div id="editor-box" class="editor">{$pageContent}</div>
		</div>
		<div id="style-menu">
		{$bgColorSelectorModule}<br />
		{$fontColorSelectorModule}
		</div>
		<script type="text/javascript">
			{$initScript}
		</script>
		<div id="error-box">{$errors}</div>
	</div>
</body>
</html>
