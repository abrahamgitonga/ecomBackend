CREATE PROCEDURE getProduct(@id VARCHAR(100))
AS
BEGIN
    SELECT *
    FROM ProductsTable
    WHERE id= @id

END