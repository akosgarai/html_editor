<?php 
class boxModule {
	function createDivHiddenMenu() {
		$hiddenMenu = "<div class=\"hidden-menuitem numericmenu\" id=\"new-divs\"><div class=\"double\" onclick=\"createDivs()\">Div</div><div class=\"double\"><input type=\"number\" name=\"num-of-divs\" id=\"num-of-divs\" style=\"width:35px;\" / ></div></div>";
		return $hiddenMenu;
	}

	function createBoxModule() {
		$module = generateModuleContainer("boxModule", "Div");
		$margin = multipleNumericSubmodule("margin", "Margin", "M-top", "M-right", "M-bottom", "M-left", "margin");
		$module .= $margin;
		$padding = multipleNumericSubmodule("padding", "Padding", "P-top", "P-right", "P-bottom", "P-left", "padding");
		$module .= $padding;
		$bwidth = multipleNumericSubmodule("border-width", "Border-width", "Bw-top", "Bw-right", "Bw-bottom", "Bw-left", "border-width");
		$module .= $bwidth;
		$col = colorSelectorSubmodule("border-color", "B-color", "borderColor");
		$module .= $col;
		$bstyle = createSelectSubmodule(array('none', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'), "border-style", "B-style", "borderStyle", "double", "double");
		$module .= $bstyle;
		$width = createNumericSubmodule("width", "Width", "width", array( 'px', '%'));
		$module .= $width;
		$height = createNumericSubmodule("height", "Height", "height", array( 'px', '%'));
		$module .= $height;
		return $module;
	}
}
?>
