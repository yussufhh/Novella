# 🚀 Quick Start Guide - Novella Backend

## Start the Server

```bash
cd backend
./start.sh
```

Server runs at: **http://localhost:5000**

## Test the API

```bash
cd backend
source venv/bin/activate
python3 test_api.py
```

## API Endpoints Quick Reference

### Base URL
```
http://localhost:5000/api
```

### Authentication (No token required)
- `POST /auth/signup` - Register (owner/renter)
- `POST /auth/login` - Get JWT token

### Protected Routes (Requires JWT)
- `GET /auth/me` - Current user info
- `PUT /auth/update-profile` - Update profile
- `PUT /auth/change-password` - Change password

### Properties
- `GET /rentals/properties` - List all (public)
- `GET /rentals/properties/<id>` - Get one (public)
- `POST /rentals/properties` - Create (owner only)
- `PUT /rentals/properties/<id>` - Update (owner only)
- `DELETE /rentals/properties/<id>` - Delete (owner only)
- `GET /rentals/my-properties` - Your properties (owner only)

### Bookings
- `POST /rentals/bookings` - Create (renter only)
- `GET /rentals/my-bookings` - Your bookings (renter)
- `GET /rentals/property-bookings` - Property bookings (owner)
- `PUT /rentals/bookings/<id>/status` - Update status (owner)

## Authorization Header Format

```javascript
{
  "Authorization": "Bearer YOUR_JWT_TOKEN_HERE"
}
```

## User Types
- **owner** - Can create/manage properties, view/approve bookings
- **renter** - Can create bookings, view their bookings

## Sample Signup Data

**Owner:**
```json
{
  "email": "owner@example.com",
  "password": "password123",
  "first_name": "John",
  "last_name": "Doe",
  "user_type": "owner",
  "phone": "555-1234"
}
```

**Renter:**
```json
{
  "email": "renter@example.com",
  "password": "password123",
  "first_name": "Jane",
  "last_name": "Smith",
  "user_type": "renter",
  "phone": "555-5678"
}
```

## Property Data Example

```json
{
  "title": "Beautiful Downtown Apartment",
  "description": "Spacious 2-bedroom apartment",
  "address": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip_code": "10001",
  "property_type": "apartment",
  "bedrooms": 2,
  "bathrooms": 1.5,
  "square_feet": 1200,
  "price_per_month": 2500,
  "amenities": ["parking", "gym", "pool"],
  "images": ["https://example.com/image1.jpg"]
}
```

## Booking Data Example

```json
{
  "property_id": 1,
  "start_date": "2025-02-01",
  "end_date": "2025-08-01",
  "message": "I would love to rent this property!"
}
```

## Troubleshooting

**Server won't start?**
```bash
cd backend
source venv/bin/activate
pip install -r requirements.txt
python app.py
```

**Database issues?**
- Delete `novella.db` file and restart server
- Database will be recreated automatically

**JWT token expired?**
- Login again to get a fresh token
- Tokens expire after 24 hours

## Files Structure

```
backend/
├── app.py              # Main app
├── config.py           # Settings
├── models.py           # Database models
├── requirements.txt    # Dependencies
├── start.sh           # Startup script
├── test_api.py        # API tests
└── routes/
    ├── auth.py        # Auth endpoints
    └── rentals.py     # Property/booking endpoints
```

---

✅ **Backend is ready!** Start the server and begin development!
