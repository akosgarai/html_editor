<html>
<head>
	<title>{$title}</title>
	<link rel="stylesheet" type="text/css" href="test.css">
	<script type="text/javascript" src="jquery-1.11.1.min.js"></script>
	<script type="text/javascript" src="indexObject.js"></script>
	<cfheader name="X-XSS-Protection" value="0" />
</head>
<body>
	<div id="editor-container">
		<div style="float: left; ">
			<div class="editor-menubar-container">
				<div id="editor-menu" class="menubar">
					<div id="new_page" name="new_page" class="main_page_button" onclick="document.getElementById('select').submit();">{$buttons[0]}
						<form method="post" action="editor_main.php" name="select" id="select">
							<input type="hidden" name="new_page" id="new_page">
						</form>
					</div>
					<div>{$additionalModule}</div>
				</div>
			</div>
			<div id="editor-box" class="editor"></div>
		</div>
		<div id="style-menu" class="editor-left-menu ">
		</div>
	</div>
</body>
</html>


