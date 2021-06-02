DROP TABLE IF EXISTS user_biography;

CREATE TABLE user_biography
(
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	account_detail_id int 
		UNIQUE NOT NULL 
		REFERENCES user_account_detail(id) 
		ON DELETE CASCADE,
	
	contents text 
		CONSTRAINT contents_length 
		CHECK (char_length(contents) <= 64)
)