DROP TABLE IF EXISTS favorite_organization;

CREATE TABLE favorite_organization (
	user_account_id int NOT NULL REFERENCES user_account(id) ON DELETE CASCADE,
	organization_id int NOT NULL REFERENCES organization(id) ON DELETE CASCADE,
	
	PRIMARY KEY (user_account_id, organization_id)
);