DROP TABLE IF EXISTS school_account;

CREATE TABLE school_account 
(
	id 	 	int  NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name 	text NOT NULL,
	city 	text NOT NULL,
	country text NOT NULL,
	
	redirect_url text,
	
	UNIQUE (name, city, country)
);