DROP TABLE IF EXISTS user_account_detail;

CREATE TABLE user_account_detail 
(
	id 		        int PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_account_id int UNIQUE NOT NULL,
	
	name 	   text NOT NULL,
	surname    text NOT NULL,
	birth_date date NOT NULL,
	
	school_id int,
	
	CONSTRAINT user_account_fk
		FOREIGN KEY(user_account_id)
		REFERENCES user_account(id)
);