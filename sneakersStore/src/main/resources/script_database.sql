create sequence hibernate_sequence;

create table clients
(
    id         integer not null
        primary key,
    email      varchar(255),
    first_name varchar(255),
    last_name  varchar(255),
    password   varchar(255)
);

create table cart
(
    id bigint not null
        primary key
);

create table brands
(
    id   bigint not null
        primary key,
    name varchar(255)
);

create table categories
(
    id   bigint not null
        primary key,
    name varchar(255)
);

create table suppliers
(
    id   bigint not null
        constraint supliers_pkey
            primary key,
    name varchar(255)
);

create table products
(
    id                   integer not null
        primary key,
    description_color    varchar(255),
    description_interior varchar(255),
    description_material varchar(255),
    description_sole     varchar(255),
    discount             real    not null,
    image                varchar(255),
    product_name         varchar(255),
    purchase_date        timestamp,
    purchase_price       real    not null,
    reference_code       varchar(255),
    selling_price        real    not null,
    size                 varchar(255),
    total_stock          integer not null,
    brand_id             bigint
        constraint fka3a4mpsfdf4d2y6r8ra3sc8mv
            references brands,
    category_id          bigint
        constraint fkog2rp4qthbtt2lfyhfo32lsw9
            references categories,
    supplier_id          bigint
        constraint fkjdai2qtctghgk6mbn88bgrbqn
            references suppliers
);

create table cart_items
(
    id         bigint not null
        primary key,
    quantity   integer,
    total      real,
    cart_id    bigint
        constraint fk99e0am9jpriwxcm6is7xfedy3
            references cart,
    product_id integer
        constraint fk1re40cjegsfvw58xrkdp6bac6
            references products
);


