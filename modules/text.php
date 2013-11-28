<?php 
class textModule {

function fontSize() {
	$values = array('pt', 'px', '%');
	$module = "<div id=\"font-size-submodule\"><div class=\"triple\"><label>FontSize</label></div><div id=\"fontSize\" class=\"doubletriple\"><div class=\"double\"><input type=\"number\" name=\"size\" id=\"size\" style=\"max-width:50px;\"/></div><div class=\"double\"><select id=\"font-size-value\" onchange=\"updateFontSize(this.parentNode.parentNode)\">";
	foreach ($values as $v) {
		$module .= "<option value=\"$v\">$v</option>";
	}
	$module .= "</select></div></div></div>";
	return $module;
}
	function createTextModule() {
		$module = generateModuleContainer("textModule", "Szoveg");
		$fsize = $this->fontSize();
		$module .= $fsize;
		$fstyle = createSelectSubmodule(array('normal', 'italic', 'oblique'), "font-style", "FontStyle", "fontStyle", "double", "double");
		$module .= $fstyle;
		$fweight = createSelectSubmodule(array('normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'inherit'), "font-weight", "Font Weight", "fontWeight", "double", "double");
		$module .= $fweight;
		$talign = createSelectSubmodule(array('left', 'right', 'center', 'justify', 'inherit'), "text-align", "Text align", "textAlign", "double", "double");
		$module .= $talign;
		$tdecoration = createSelectSubmodule(array('none', 'underline', 'overline', 'line-through', 'inherit'), "text-decoration", "Text decoration", "textDecoration", "double", "double");
		$module .= $tdecoration;
		$module .= "</div></div>";
		return $module;
	}

}
?>
