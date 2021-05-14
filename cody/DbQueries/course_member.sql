create table course_member (
	course_id int not null,
	user_account_id int not null,
	
	role text not null,
	
	primary key (course_id, user_account_id)
);