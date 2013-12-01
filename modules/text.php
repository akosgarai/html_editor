<?php 
class textModule {

	function textShadowSubmodule() {
		$module = "<div id=\"text-shadow-submodule\"><div id=\"textShadow\" class=\"pointer longbutton\" onclick=\"textShadow(this.parentNode)\"><p>Shadow<p></div><div class=\"double\"><div class=\"triple\"><label>H</label></div><input type=\"number\" name=\"h-numeric\" id=\"\" style=\"max-width:50px;\"/></div><div class=\"double\"><div class=\"triple\"><label>V</label></div><input type=\"number\" name=\"v-numeric\" id=\"v-numeric\" style=\"max-width:50px;\"/></div><div class=\"double\"><div class=\"triple\"><label>Blur</label></div><input type=\"number\" name=\"v-numeric\" id=\"v-numeric\" style=\"max-width:50px;\"/></div><div class=\"double\"><div class=\"triple\"><label>#</label></div><input type=\"text\" name=\"numeric\" id=\"c-numeric\" style=\"max-width:50px;\"/></div></div>";
		return $module;
	}
	
	function createTextModule() {
		$module = generateModuleContainer("textModule", "Szoveg");
		//$fsize = $this->fontSize();
		$fsize = createNumericSubmodule("font-size", "Size", "fontSize", array('pt', 'px', '%'));
		$module .= $fsize;
		$fstyle = createSelectSubmodule(array('normal', 'italic', 'oblique'), "font-style", "FontStyle", "fontStyle", "double", "double");
		$module .= $fstyle;
		$fweight = createSelectSubmodule(array('normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900', 'inherit'), "font-weight", "Font Weight", "fontWeight", "double", "double");
		$module .= $fweight;
		$talign = createSelectSubmodule(array('left', 'right', 'center', 'justify', 'inherit'), "text-align", "Text align", "textAlign", "double", "double");
		$module .= $talign;
		$tdecoration = createSelectSubmodule(array('none', 'underline', 'overline', 'line-through', 'inherit'), "text-decoration", "decoration", "textDecoration", "double", "double");
		$module .= $tdecoration;
		$ttransform = createSelectSubmodule(array('none', 'capitalize', 'uppercase', 'lowercase', 'inherit'), "text-transform", "Transform", "textTransform", "double", "double");
		$module .= $ttransform;
		$tindent = createNumericSubmodule("text-indent", "Indent", "textIndent", array('px', '%'));
		$module .= $tindent;
		$wspacing = createNumericSubmodule("word-spacing", "Space", "wordSpacing", array('px', 'pt'));
		$module .= $wspacing;
		$tshadow = $this->textShadowSubmodule();
		$module .= $tshadow;
		$module .= "</div></div>";
		return $module;
	}

}
?>
