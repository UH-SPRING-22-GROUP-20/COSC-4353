

DROP TABLE IF EXISTS `COSC4353`.`order_history` CASCADE;

DROP TABLE IF EXISTS `COSC4353`.`fuelquote` CASCADE;

DROP TABLE IF EXISTS `COSC4353`.`client_information` CASCADE;

DROP TABLE IF EXISTS `COSC4353`.`UserCredentials` CASCADE;

DROP TABLE IF EXISTS `COSC4353`.`state_price` CASCADE;


CREATE TABLE `COSC4353`.`state_price` (
  `state` VARCHAR(45) NOT NULL,
  `price` VARCHAR(45) NOT NULL);

-- ALTER TABLE `COSC4353`.`state_price` 
-- ADD COLUMN `stateID` INT NOT NULL AFTER `price`,
-- CHANGE COLUMN `price` `price` INT NOT NULL ,
-- ADD PRIMARY KEY (`stateID`);
-- ;


CREATE TABLE `COSC4353`.`UserCredentials` (
  `userID` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`userID`, `username`));


CREATE TABLE `COSC4353`.`client_information` (
  `userID` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `street` VARCHAR(45) NOT NULL,
  `street2` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `state` VARCHAR(45) NOT NULL,
  `zipcode` VARCHAR(45) NOT NULL,
  `client_profile_id` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`client_profile_id`),
  INDEX `username_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `username`
    FOREIGN KEY (`userID`)
    REFERENCES `COSC4353`.`UserCredentials` (`userID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `COSC4353`.`fuelquote` (
  `reqID` INT NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `gallons_req` VARCHAR(45) NOT NULL,
  `delivery_street` VARCHAR(45) NOT NULL,
  `delivery_state` VARCHAR(45) NOT NULL,
  `delivery_zipcode` VARCHAR(45) NOT NULL,
  `suggest_quote` VARCHAR(45) NOT NULL,
  `total_amount_due` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`reqID`));

CREATE TABLE `COSC4353`.`order_history` (
  `orderID` INT NOT NULL,
  `reqID` INT NOT NULL,
  `gallons` INT NOT NULL,
  `quote` INT NOT NULL,
  `status` TINYINT NOT NULL,
  PRIMARY KEY (`orderID`),
  INDEX `reqID_idx` (`reqID` ASC) VISIBLE,
  CONSTRAINT `reqID`
    FOREIGN KEY (`reqID`)
    REFERENCES `COSC4353`.`fuelquote` (`reqID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
