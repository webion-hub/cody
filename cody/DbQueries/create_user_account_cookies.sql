DROP TABLE IF EXISTS user_account_persistent_login_cookie;

CREATE TABLE user_account_persistent_login_cookie
(
	id 				int NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	user_account_id int NOT NULL,
	
	cookie bytea,
	salt   bytea,
	
	CONSTRAINT user_account_fk
		FOREIGN KEY (user_account_id)
		REFERENCES user_account(id)
);