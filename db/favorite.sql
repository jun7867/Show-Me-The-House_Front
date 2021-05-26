create table favorite(
	fav_no int not null auto_increment,
    user_no int not null,
    housedeal_no int not null,
    primary key (fav_no),
    foreign key(user_no) references member(user_no) on update cascade on delete cascade,
    foreign key(housedeal_no) references housedeal(no) on update cascade on delete cascade
);