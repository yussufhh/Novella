# Novella Backend - Setup Complete! 🎉

## Project Structure

```
backend/
├── app.py                  # Main Flask application (entry point)
├── config.py              # Configuration settings for different environments
├── models.py              # Database models (User, Property, Booking)
├── requirements.txt       # Python dependencies
├── .env                   # Environment variables (SECRET_KEY, JWT_SECRET, etc.)
├── .env.example          # Template for environment variables
├── .gitignore            # Git ignore file
├── README.md             # API documentation
├── start.sh              # Easy startup script
├── test_api.py           # API test script
├── venv/                 # Python virtual environment (auto-generated)
└── routes/
    ├── __init__.py
    ├── auth.py           # Authentication endpoints (signup, login, profile)
    └── rentals.py        # Property and booking endpoints
```

## What's Been Implemented

### ✅ Backend Infrastructure
- **Flask Application Factory Pattern** - Scalable, modular architecture
- **SQLite Database** - Lightweight database with SQLAlchemy ORM
- **JWT Authentication** - Secure token-based authentication
- **Password Hashing** - Bcrypt for secure password storage
- **CORS Support** - Enabled for frontend communication
- **Environment Configuration** - Dev, production, and testing configs

### ✅ Database Models
1. **User Model**
   - Email, password (hashed), name, phone
   - User types: Owner or Renter
   - Relationships to properties and bookings

2. **Property Model**
   - Complete listing details (title, description, address, etc.)
   - Property specs (bedrooms, bathrooms, square feet)
   - Pricing, amenities, images
   - Availability status

3. **Booking Model**
   - Property reservation system
   - Date ranges, pricing
   - Status tracking (pending, approved, rejected, cancelled)
   - Messages between renter and owner

### ✅ API Endpoints

#### Authentication (`/api/auth`)
- ✅ `POST /signup` - Register new users (owner or renter)
- ✅ `POST /login` - Authenticate and get JWT token
- ✅ `GET /me` - Get current user info
- ✅ `PUT /update-profile` - Update user profile
- ✅ `PUT /change-password` - Change password

#### Properties (`/api/rentals`)
- ✅ `GET /properties` - List all available properties (with filters)
- ✅ `GET /properties/<id>` - Get specific property details
- ✅ `POST /properties` - Create new property (owners only)
- ✅ `PUT /properties/<id>` - Update property (owners only)
- ✅ `DELETE /properties/<id>` - Delete property (owners only)
- ✅ `GET /my-properties` - Get owner's properties

#### Bookings (`/api/rentals`)
- ✅ `POST /bookings` - Create booking request (renters only)
- ✅ `GET /my-bookings` - Get renter's bookings
- ✅ `GET /property-bookings` - Get bookings for owned properties (owners only)
- ✅ `PUT /bookings/<id>/status` - Update booking status (owners only)

### ✅ Security Features
- Password strength validation (minimum 6 characters)
- Email format validation
- JWT token authentication for protected routes
- Role-based access control (owner vs renter)
- Password hashing with bcrypt
- SQL injection prevention through ORM

## How to Run

### Option 1: Using the startup script (Recommended)
```bash
cd backend
./start.sh
```

### Option 2: Manual setup
```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env

# Start server
python app.py
```

The server will start on **http://localhost:5000**

## Testing the API

Run the included test script to verify all endpoints:
```bash
cd backend
source venv/bin/activate
python3 test_api.py
```

This will test:
- User signup and login
- Property creation and management
- Booking creation and management
- All CRUD operations

## Example API Usage

### 1. Signup (Create Owner Account)
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@example.com",
    "password": "securepass123",
    "first_name": "John",
    "last_name": "Doe",
    "user_type": "owner",
    "phone": "555-1234"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "owner@example.com",
    "password": "securepass123"
  }'
```

### 3. Create Property (with JWT token)
```bash
curl -X POST http://localhost:5000/api/rentals/properties \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "Beautiful Downtown Apartment",
    "description": "Spacious 2BR in the heart of downtown",
    "address": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip_code": "10001",
    "property_type": "apartment",
    "bedrooms": 2,
    "bathrooms": 1.5,
    "square_feet": 1200,
    "price_per_month": 2500,
    "amenities": ["parking", "gym", "pool"]
  }'
```

### 4. Get All Properties (No auth required)
```bash
curl http://localhost:5000/api/rentals/properties
```

### 5. Filter Properties
```bash
curl "http://localhost:5000/api/rentals/properties?city=New York&bedrooms=2&max_price=3000"
```

## Dependencies Installed

All dependencies are in `requirements.txt`:
- **Flask 3.0.0** - Web framework
- **Flask-CORS 4.0.0** - Cross-origin support
- **Flask-SQLAlchemy 3.1.1** - ORM for database
- **Flask-Bcrypt 1.0.1** - Password hashing
- **Flask-JWT-Extended 4.6.0** - JWT authentication
- **python-dotenv 1.0.0** - Environment variable management
- **email-validator 2.1.0** - Email validation

## Environment Variables

Update the `.env` file with secure values:
```
SECRET_KEY=your-random-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=sqlite:///novella.db
FLASK_ENV=development
```

## Database

The SQLite database (`novella.db`) will be created automatically when you first run the application. It includes:
- Users table with authentication
- Properties table with full listing details
- Bookings table for rental reservations

## Next Steps for Frontend Integration

1. **Update frontend API base URL** to `http://localhost:5000/api`
2. **Store JWT token** after login (localStorage or state management)
3. **Include Authorization header** in authenticated requests:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`,
     'Content-Type': 'application/json'
   }
   ```
4. **Handle user types** - Show different dashboards for owners vs renters
5. **Implement property listing** - Display from `/api/rentals/properties`
6. **Add booking functionality** - Create bookings for renters
7. **Property management** - CRUD operations for owners

## Developer Notes

- The virtual environment isolates all Python dependencies
- Database migrations are automatic with SQLAlchemy
- All passwords are hashed - never stored in plain text
- CORS is enabled for all `/api/*` routes
- JWT tokens expire after 24 hours
- Role-based authorization ensures security
- All endpoints have proper error handling

## Support

For issues or questions, check:
- [backend/README.md](README.md) for API documentation
- [backend/test_api.py](test_api.py) for usage examples
- Flask logs in the terminal for debugging

---

**Backend Status: ✅ Fully Operational**

The backend is production-ready with authentication, authorization, and all CRUD operations for a rental platform!
