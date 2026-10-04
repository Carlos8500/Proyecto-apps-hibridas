# Usamos Node.js versión 24 para coincidir con tu CI.yml
FROM node:24-alpine

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos los archivos de configuración de paquetes primero (optimiza el caché)
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto de los archivos del proyecto (incluyendo tu index.tsx)
COPY . .

# Exponemos el puerto 8081 que utiliza Expo y Metro Bundler
EXPOSE 8081

# Comando por defecto para iniciar la aplicación enfocada en la web para fácil prueba
CMD ["npx", "expo", "start", "--web"]