# Novella Backend API

Flask-based REST API for the Novella rental platform with SQLite database.

## Features

- User authentication (signup/login) with JWT tokens
- Property management (CRUD operations)
- Booking system with status tracking
- Role-based access (Owner/Renter)
- Email validation
- Password hashing with bcrypt

## Installation

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install all dependencies:
```bash
pip install -r requirements.txt
```

4. Create environment file:
```bash
cp .env.example .env
```

5. Edit `.env` and update the secret keys with your own values.

## Running the Application

```bash
python app.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication (`/api/auth`)

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login and get JWT token
- `GET /api/auth/me` - Get current user info (requires JWT)
- `PUT /api/auth/update-profile` - Update user profile (requires JWT)
- `PUT /api/auth/change-password` - Change password (requires JWT)

### Properties & Bookings (`/api/rentals`)

- `GET /api/rentals/properties` - Get all available properties (with filters)
- `GET /api/rentals/properties/<id>` - Get specific property
- `POST /api/rentals/properties` - Create property (owner only)
- `PUT /api/rentals/properties/<id>` - Update property (owner only)
- `DELETE /api/rentals/properties/<id>` - Delete property (owner only)
- `GET /api/rentals/my-properties` - Get user's properties (owner only)
- `POST /api/rentals/bookings` - Create booking (renter only)
- `GET /api/rentals/my-bookings` - Get user's bookings (renter only)
- `GET /api/rentals/property-bookings` - Get bookings for owned properties (owner only)
- `PUT /api/rentals/bookings/<id>/status` - Update booking status (owner only)

## Database Schema

### Users
- id, email, password_hash, first_name, last_name, phone, user_type, created_at, updated_at

### Properties
- id, owner_id, title, description, address, city, state, zip_code, property_type, bedrooms, bathrooms, square_feet, price_per_month, is_available, amenities, images, created_at, updated_at

### Bookings
- id, property_id, renter_id, start_date, end_date, total_price, status, message, created_at, updated_at

## Authentication

Include JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Development

The application uses:
- Flask 3.0.0 - Web framework
- SQLAlchemy - ORM
- Flask-JWT-Extended - JWT authentication
- Flask-Bcrypt - Password hashing
- Flask-CORS - Cross-origin resource sharing
- SQLite3 - Database
