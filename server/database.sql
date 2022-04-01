CREATE DATABASE FUEL_QUOTE;

CREATE TABLE prices(
    user varchar(255),
    price varchar(10),
    location varchar(255)
);

CREATE TABLE UserCredentials(
    username varchar(50),
    password varchar(250)


);


CREATE TABLE ClientInformation(
    full_name varchar(50),
    address1 varchar(100),
    address2 varchar(100),
    city varchar(100),
    state varchar(2),
    zipcode varchar(9)
    
    );