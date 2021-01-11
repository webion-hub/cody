DROP TABLE IF EXISTS user_profile_picture;

CREATE TABLE user_profile_picture 
(
	id 		  int  NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	file_path text NOT NULL,
	
	account_detail_id int NOT NULL,
	
	CONSTRAINT account_detail_fk
		FOREIGN KEY(account_detail_id)
		REFERENCES user_account_detail(id)
);