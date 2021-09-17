create database `prisma-test`;

use `prisma-test`;

create table User
(
    id                  int(10) auto_increment primary key,
    firstName           varchar(400) not null,
    lastName            varchar(400) not null,
    email               varchar(400) not null,
    createdAt           datetime default current_timestamp() null,
    updatedAt           datetime null
);

create table Post
(
    id              int(10) auto_increment primary key,
    postedBy        int not null,
    title           varchar(400) not null,
    content         longtext null,
    isPublished     tinyint(1) default 0 not null,
    postedAt        datetime default current_timestamp(),
    updatedAt       datetime null,
    constraint post_user_fk
        foreign key (postedBy) references User (id)
            on delete cascade
);

create table Comment
(
    id          int(10) auto_increment primary key,
    postId      int(10) null,
    commenterId int(10),
    content     mediumtext not null,
    commentedAt datetime default current_timestamp(),
    constraint comment_post_fk
        foreign key (postId) references Post (id)
            on delete set null,
    constraint comment_user_fk
        foreign key (commenterId) references User (id)
            on delete set null
);