DROP TABLE IF EXISTS user_profile_picture;

CREATE TABLE user_profile_picture 
(
	id 		  int  NOT NULL PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	file_path text NOT NULL
);