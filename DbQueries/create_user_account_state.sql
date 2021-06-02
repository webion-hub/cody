DROP TABLE IF EXISTS user_account_state;

CREATE TABLE user_account_state 
(
	id 				int PRIMARY KEY NOT NULL GENERATED ALWAYS AS IDENTITY,
	user_account_id int NOT NULL,
	
	validation_key uuid NOT NULL,
	is_email_valid bool NOT NULL DEFAULT false,
	
	CONSTRAINT user_account_id_fk
		FOREIGN KEY(user_account_id)
		REFERENCES user_account(id)
);
