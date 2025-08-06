#!/bin/bash

echo "Starting Kip Backend..."

# Wait a moment for any setup
sleep 2

# Run migrations
echo "Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Create superuser if it doesn't exist
echo "Creating superuser if needed..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()

if not User.objects.filter(is_superuser=True).exists():
    User.objects.create_superuser(
        username='admin',
        email='admin@kip.com',
        password='admin123',
        first_name='Admin',
        last_name='User'
    )
    print("Superuser created: admin@kip.com / admin123")
else:
    print("Superuser already exists")
EOF

# Start Django development server
echo "Starting Django server..."
python manage.py runserver 0.0.0.0:8000