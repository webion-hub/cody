DROP TABLE IF EXISTS user_refresh_token;

CREATE TABLE user_refresh_token (
	id int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	
	token bytea NOT NULL,
	salt  bytea NOT NULL,
	
	user_account_id int NOT NULL REFERENCES user_account(id)
);