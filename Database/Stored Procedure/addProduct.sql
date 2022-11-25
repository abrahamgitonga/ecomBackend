CREATE PROCEDURE addProduct(@id VARCHAR(100) ,
    @name VARCHAR(150) ,
    @description VARCHAR(300) ,
    @price INT,
    @imageurl VARCHAR(300),
    @discount INT)
AS
BEGIN

    INSERT INTO ProductsTable
        (id, name,description,price,imageurl,discount)
    VALUES(@id, @name, @description, @price, @imageurl, @discount)
END