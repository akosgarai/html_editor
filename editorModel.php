<?php 
class editorModel {
	private $db_host = "localhost";
	private $db_user = "editorcommand";
	private $db_password = "editorcommand";
	private $db = "htmlEditor";
	private $cid;
	public function connectdb($db, $host, $user, $pw) {
		 $connect_id = mysql_connect($host,$user,$pw);
		if (!$connect_id) {
			return "ERROR_CONNECT_ID_ERROR, host: ".$host." user: ".$user." pw: ".$pw." errormsg: ".mysql_error();
		}
		$dbconn = mysql_select_db($db, $connect_id);
		if(!$dbconn) {
			return "ERROR_DBCONN_ERROR, db: ".$db." connect_id: ".$connect_id." errormsg: ".mysql_error();
		}
		return $connect_id;
	}
	public function connect() {
		$this->cid = $this->connectdb($this->db, $this->db_host, $this->db_user, $this->db_password);
		if (substr($this->cid, 0, 5) == "ERROR") {
			return $this->cid;
		} else {
			return "OK";
		}
	}
	function savePage($page) {
		$page1 = '"'.str_replace('"', '\"', htmlspecialchars($page)).'"';
		$saveCommand = "INSERT INTO pages (page_content) VALUES (".$page1.")";
		$result = mysql_query($saveCommand, $this->cid);
		if(!$result) {
			return "ERROR_QUERY_ERROR, query: ".$saveCommand." cid: ".$cid." errormsg: ".mysql_error();
		} else {
			return "OK";
		}
	}
	function getSavedPages() {
		$query = "SELECT * FROM pages";
		$result = mysql_query($query, $this->cid);
		if (!$result) {
			return "ERROR_GETSAVEDPAGES_ERROR, query: ".$query." cid: ".$cid." errormsg: ".mysql_error();
		} else {
			return $result;
		}
	}
	function loadPage($page_id) {
		$query = "SELECT page_content FROM pages WHERE page_id = ".$page_id;
		$result = mysql_query($query, $this->cid);
		if (!$result) {
			return "ERROR_LOADPAGE_ERROR, query: ".$query." page_id: ".$page_id." errormsg: ".mysql_error();
		} else {
			return $result;
		}
	}
	function uploadImage($imageName) {
		$query = "INSERT INTO images (name, src) VALUES ('".$imageName."', 'upload/".$imageName."')";
		$result = mysql_query($query, $this->cid);
		if (!$result) {
			return "ERROR_IMAGE_UPLOAD_ERROR, query: ".$query." errormsd: ".mysql_error();
		} else {
			return $result;
		}
	}
	function listImages() {
		$query = "SELECT * FROM images";
		$result = mysql_query($query, $this->cid);
		if (!$result) {
			return "ERROR_IMAGE_LIST_ERROR, query: ".$query." errormsd: ".mysql_error();
		} else {
			return $result;
		}
	}
	function loadHeaderFooter() {
		$query = "SELECT content, name FROM predefined_elements WHERE name IN ('header', 'footer')";
		$result = mysql_query($query, $this->cid);
		if (!$result) {
			return "ERROR_LOADING_HEADER_FOOTER, query: ".$query." errormsg: ".mysql_error();
		} else {
			return $result;
		}
	}
	function releasePage($page_id) {
		$page_content = $this->loadPage($page_id);
		$footer_header = $this->loadHeaderFooter();
		$final_page = "<html><head><link rel=\"stylesheet\" type=\"text/css\" href=\"../test2.css\"></head><body>";
		$url = "released/page.html";
		$footer;
		$header;
		if (substr($footer_header, 0, 5) == "ERROR") {
			return $footer_header;
		} else {
			while ($row = mysql_fetch_assoc($footer_header)) {
				if ($row["name"] == "header") {
					$header = htmlspecialchars_decode($row["content"]);
				}
				if ($row["name"] == "footer") {
					$footer = htmlspecialchars_decode($row["content"]);
				}
			}
		}
		$final_page .= $header."<br />";
		if (substr($page_content, 0, 5) == "ERROR") {
			return $page_content;
		} else if (sizeof($page_content) == 1){
			while ($row = mysql_fetch_assoc($page_content)){
				$final_page .= htmlspecialchars_decode($row["page_content"]);
			}
		} else {
			return "ERROR_PARA_VAN";
		}
		$final_page .= "<br />".$footer."</body></html>";
		file_put_contents($url, $final_page);
		$url = "localhost/smarty_stuff/".$url;
		return $url;
	}
}
?>
