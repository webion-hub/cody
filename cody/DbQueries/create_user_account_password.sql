DROP TABLE IF EXISTS user_account_password CASCADE;

CREATE TABLE user_account_password (
	id 				int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_account_id int NOT NULL REFERENCES user_account(id),
	
	hash bytea NOT NULL,
	salt bytea NOT NULL
);