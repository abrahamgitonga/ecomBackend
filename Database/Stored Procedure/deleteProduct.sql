CREATE PROCEDURE deleteProduct(@id VARCHAR(100))
AS
BEGIN
    DELETE FROM ProductsTable WHERE id =@id
END


EXEC getProducts