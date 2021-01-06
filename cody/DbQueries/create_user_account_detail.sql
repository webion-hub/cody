DROP TABLE IF EXISTS user_account_detail;

CREATE TABLE user_account_detail 
(
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	name 	   text NOT NULL,
	surname    text NOT NULL,
	birth_date date NOT NULL,
	
	user_account_id int UNIQUE NOT NULL,
	school_id  		int,
	
	CONSTRAINT user_account_fk
		FOREIGN KEY(user_account_id)
		REFERENCES user_account(id),
	
	CONSTRAINT school_id_fk
		FOREIGN KEY(school_id)
		REFERENCES school_account(id)
);