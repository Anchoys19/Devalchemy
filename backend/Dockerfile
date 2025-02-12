# Використовуємо офіційний Python-образ
FROM python:3.10

# Встановлюємо робочу директорію
WORKDIR /app

COPY requirements.txt .

# Встановлюємо залежності
RUN pip install --no-cache-dir -r requirements.txt

# Копіюємо файли проєкту в контейнер
COPY . .

# Проксіюємо порт Flask
EXPOSE 5000

# Запускаємо сервер Flask
CMD ["python", "app.py"]
