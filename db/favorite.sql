SELECT * FROM happyhouse.housedeal;

create table favorite(
	fav_no int not null auto_increment,
    user_no int not null,
    housedeal_no int not null,
    primary key (fav_no),
    foreign key(user_no) references member(user_no) on update cascade on delete cascade,
    foreign key(housedeal_no) references housedeal(no) on update cascade on delete cascade
);

select h.no, h.dong, h.AptName, h.dealAmount, h.buildYear, h.dealYear, h.dealMonth, h.dealDay, h.floor
from favorite f, housedeal h
where h.no in (select housedeal_no from favorite where user_no = 1);

insert into favorite(user_no, housedeal_no) value(1, 2);