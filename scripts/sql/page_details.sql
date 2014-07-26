CREATE TABLE IF NOT EXISTS page_details (
	page_id INTEGER PRIMARY KEY NOT NULL,
	page_name VARCHAR(100),
	page_title VARCHAR(100),
	header_id INTEGER DEFAULT NULL,
	footer_id INTEGER DEFAULT NULL,
	has_scripts BOOLEAN DEFAULT false,
	has_css BOOLEAN DEFAULT false,
	has_xiti BOOLEAN DEFAULT false,
	CONSTRAINT FOREIGN KEY fk_pid REFERENCES pages(page_id)
);
