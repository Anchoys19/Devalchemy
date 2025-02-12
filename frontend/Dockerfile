# Використовуємо Node.js для зборки
FROM node:18

# Встановлюємо робочу директорію
WORKDIR /app

# Копіюємо package.json і package-lock.json
COPY package.json package-lock.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо всі файли проєкту
COPY . .

# Збираємо React-застосунок
RUN npm run build

# Використовуємо Nginx для запуску
# FROM nginx:alpine
# COPY --from=0 /app/build /usr/share/nginx/html

# Проксіюємо порт
EXPOSE 3000

#CMD ["nginx", "-g", "daemon off;"]

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
