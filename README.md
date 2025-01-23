```bash
npm init -y
npm -D typescript tsx @types/node
npm tsc --init

npm i express
npm i -D @types/express

npm i -D @swc/cli @swc/core
npm i prisma @prisma/client
# Recomendable instalar la extension prisma


npm i jsonwebtoken @types/jsonwebtoken


```
## Arquitectura
En proyectos muy muy grandes hay quer usar hexagonal
No usamos carpeta dtos y models porque usasmos prisma
Auth Controlers y Routes es tipico de estas aplicaciones y luego usamos carpetas por entidades. Se podria poner carpetas por entidad y luego dentro controler services...
Clean code-> alta cohexion bajo acoplamiento. Estamos acoplados porque usamos en las funciones prisma.user.findUser... y eso es acoplarse. Tenemos lata cohexion porque cada archivo hace solamente 1 cosa.

# Logica del proyecto
Estamos usando un Servidor sin estado, no trackea el usuario sino que usa un token para poder acceder a diferentes paginas.

# Middleware
del /profile--> Middleware(validar usuario, etc...) --> Controlador





