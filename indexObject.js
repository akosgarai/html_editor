var index = {
	preview : function() {
		var selected = $("#saved_pages option:selected");
		var mydata = {"preview" : "1", "saved_pages" : $(selected).attr("name")};
		$.ajax({
			url : "editor_main.php",
			type : "POST",
			data : mydata,
			data_type: "json",
			success : function (data) {
				var resp = data.page_content;
				$("#editor-box").html(resp);
			},
			error : function (response) {
				alert("para");
			}
		});
	}
}
