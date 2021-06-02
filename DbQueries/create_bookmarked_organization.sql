DROP TABLE IF EXISTS bookmarked_organization;

CREATE TABLE bookmarked_organization (
	user_account_id int NOT NULL REFERENCES user_account(id) ON DELETE CASCADE,
	organization_id int NOT NULL REFERENCES organization(id) ON DELETE CASCADE,
	
	PRIMARY KEY (user_account_id, organization_id)
);