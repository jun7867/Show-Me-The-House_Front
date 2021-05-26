SELECT * FROM happyhouse.housedeal;

create table favorite(
	fav_no int not null auto_increment,
    user_no int not null,
    housedeal_no int not null,
    primary key (fav_no),
    foreign key(user_no) references member(user_no) on update cascade on delete cascade,
    foreign key(housedeal_no) references housedeal(no) on update cascade on delete cascade
);

select no, dong, AptName, dealAmount, buildYear, dealYear, dealMonth, dealDay, floor
from housedeal
where no in (select housedeal_no from favorite where user_no = 1);

insert into favorite(user_no, housedeal_no) value(1, 2);

select * from favorite;

select no, dong, AptName, dealAmount, buildYear, concat(dealYear, ".", dealMonth, ".", dealDay) as dealDate, floor
from housedeal
order by dealDate desc
limit 10;