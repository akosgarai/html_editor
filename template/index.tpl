<html>
<head>
	<title>{$title}</title>
	<link rel="stylesheet" type="text/css" href="test.css">
</head>
<body>
	<div id="index-container">
		<form method="post" action="editor_main.php" name="select" id="select">
			<input type="submit" id="new_page" name="new_page" class="main_page_button" value="{$buttons[0]}">
		</form>
		<form method="post" action="index.php" name="load" id="load">
			<input type="submit" id="load_page" name="load_page" class="main_page_button" value="{$buttons[1]}">
		</form>
		<form method="post" action="index.php" name="realease" id="realease">
			<input type="submit" id="realease_page" name="realease_page" class="main_page_button" value="{$buttons[2]}">
		</form>
		<div id="module" class="module">{$additionalModule}</div>
		<div id="messages-box">{$messages}</div>
	</div>
	<div style="">
		<div style="width:50%; float:left;">Modern browsers have Array#indexOf, which does exactly that; this is in the new(ish) ECMAScript 5th edition specification, but it has been in several browsers for years. Older browsers can be supported using the code listed in the "compatibility" section at the bottom of that page.
		
		</div>
		<div style="width:50%; float:left;">Modern browsers have Array#indexOf, which does exactly that; this is in the new(ish) ECMAScript 5th edition specification, but it has been in several browsers for years. Older browsers can be supported using the code listed in the "compatibility" section at the bottom of that page.
		
		</div>
		<div>{$tmp}</div>
	</div>
</body>
</html>

