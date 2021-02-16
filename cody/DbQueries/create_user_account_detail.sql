DROP TABLE IF EXISTS user_account_detail;

CREATE TABLE user_account_detail 
(
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	name 	   	      text NOT NULL,
	surname    		  text NOT NULL,
	birth_date 		  date NOT NULL,
	registration_date date NOT NULL,
	
	user_account_id   int UNIQUE NOT NULL REFERENCES user_account(id),
	school_id  	      int REFERENCES school_account(id),
);