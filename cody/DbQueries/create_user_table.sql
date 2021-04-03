DROP TABLE IF EXISTS user_account;

CREATE TABLE user_account
(
	id 		 int  NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	username text UNIQUE NOT NULL,
	email    text UNIQUE NOT NULL,
	role     text NOT NULL,
	
	CONSTRAINT username_length CHECK (
		length(username) >= 4 AND
		length(username) <= 28
	)
);