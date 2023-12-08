const narmodels = {
    getAll: `SELECT 
                * 
            FROM 
                clientes
                `,
    getByID:` SELECT
                *
            FROM
                clientes
                    WHERE
                        id=?
    
    `,
    addRow:`
            INSERT INTO
            clientes (
                id,
                nombre,
                apellido,
                activo,
                servicio
            )
            VALUES(
                ?,?,?,?,?
            )`,
    updateRow:`
            UPDATE
                clientes 
            SET
                nombre=?,
                apellido=?,
                activo=?,
                servicio=?
               
            WHERE
                id=?
            `,
            getByName: `
                SELECT
                    *
                FROM
                    clientes
                WHERE 
                    nombre = ?
    `,
    deleteRow: `
    DELETE FROM 
    clientes
    WHERE 
    id=?
    `,
};

module.exports = narmodels;