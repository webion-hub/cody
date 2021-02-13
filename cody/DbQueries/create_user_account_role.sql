DROP TABLE IF EXISTS user_account_role;

CREATE TABLE user_account_role (
	id 				int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_account_id int NOT NULL REFERENCES user_account(id),
	
	name text NOT NULL
);