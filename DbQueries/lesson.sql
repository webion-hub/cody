create table course_lesson (
	id int primary key not null,
	
	title text not null check(length(title) <= 256),
	description text check(length(description) <= 512),
	
	kind text not null,
	
	course_id int not null references course(id)
);