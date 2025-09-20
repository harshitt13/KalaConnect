import os
from app import create_app

# Create the Flask app instance using the app factory
app = create_app(os.getenv('FLASK_CONFIG') or 'default')

if __name__ == '__main__':
    # The app.run() is suitable for development.
    # For production, use a WSGI server like Gunicorn or uWSGI.
    # Example: gunicorn --bind 0.0.0.0:5000 "run:app"
    app.run(debug=True)

