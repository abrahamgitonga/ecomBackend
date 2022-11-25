CREATE PROCEDURE updateProduct(
    @id VARCHAR(300),
    @name VARCHAR(150) ,
    @description VARCHAR(300) ,
    @price INT,
    @imageurl VARCHAR(300),
    @discount INT)
AS
BEGIN

    UPDATE ProductsTable SET  id=@id, name=@name,description=@description, price=@price, discount=@discount, imageurl=@imageurl
END
