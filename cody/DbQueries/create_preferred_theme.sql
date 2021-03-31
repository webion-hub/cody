DROP TABLE IF EXISTS user_preferred_theme;

CREATE TABLE user_preferred_theme (
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	color text NOT NULL,
	
	account_detail_id int NOT NULL 
		REFERENCES user_account_detail(id) 
		ON DELETE CASCADE
);