-- Retorna TRUE si la contraseña coincide
SELECT EXISTS (
    SELECT 1 
    FROM public.usuario 
    WHERE email = 'maria@ejemplo.com'
    AND clave = crypt('SuContraseñaSecreta123', clave)
) AS clave_valida;