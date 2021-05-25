
CREATE TABLE `member` (
  `user_no` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `pwd` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  PRIMARY KEY (`user_no`),
  UNIQUE KEY (`user_id`)
);

select * from member;