#!/usr/bin/env python3
"""
Test script for the Novella API
Run this to verify all endpoints are working correctly
"""

import requests
import json

BASE_URL = "http://localhost:5000/api"

def print_response(title, response):
    """Pretty print API response"""
    print(f"\n{'='*60}")
    print(f"{title}")
    print(f"{'='*60}")
    print(f"Status Code: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response: {response.text}")


def test_auth_endpoints():
    """Test authentication endpoints"""
    print("\n" + "="*60)
    print("TESTING AUTHENTICATION ENDPOINTS")
    print("="*60)
    
    # Test signup - Owner
    owner_data = {
        "email": "owner@test.com",
        "password": "password123",
        "first_name": "John",
        "last_name": "Doe",
        "phone": "555-1234",
        "user_type": "owner"
    }
    response = requests.post(f"{BASE_URL}/auth/signup", json=owner_data)
    print_response("1. Owner Signup", response)
    
    if response.status_code == 201:
        owner_token = response.json()['access_token']
    else:
        owner_token = None
    
    # Test signup - Renter
    renter_data = {
        "email": "renter@test.com",
        "password": "password123",
        "first_name": "Jane",
        "last_name": "Smith",
        "phone": "555-5678",
        "user_type": "renter"
    }
    response = requests.post(f"{BASE_URL}/auth/signup", json=renter_data)
    print_response("2. Renter Signup", response)
    
    if response.status_code == 201:
        renter_token = response.json()['access_token']
    else:
        renter_token = None
    
    # Test login
    login_data = {
        "email": "owner@test.com",
        "password": "password123"
    }
    response = requests.post(f"{BASE_URL}/auth/login", json=login_data)
    print_response("3. Login", response)
    
    # Test get current user
    if owner_token:
        headers = {"Authorization": f"Bearer {owner_token}"}
        response = requests.get(f"{BASE_URL}/auth/me", headers=headers)
        print_response("4. Get Current User", response)
    
    return owner_token, renter_token


def test_property_endpoints(owner_token, renter_token):
    """Test property endpoints"""
    print("\n" + "="*60)
    print("TESTING PROPERTY ENDPOINTS")
    print("="*60)
    
    if not owner_token:
        print("Skipping property tests - no owner token")
        return None
    
    headers = {"Authorization": f"Bearer {owner_token}"}
    
    # Create a property
    property_data = {
        "title": "Beautiful Downtown Apartment",
        "description": "Spacious 2-bedroom apartment in the heart of downtown",
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
    response = requests.post(f"{BASE_URL}/rentals/properties", json=property_data, headers=headers)
    print_response("1. Create Property", response)
    
    property_id = None
    if response.status_code == 201:
        property_id = response.json()['property']['id']
    
    # Get all properties
    response = requests.get(f"{BASE_URL}/rentals/properties")
    print_response("2. Get All Properties", response)
    
    # Get specific property
    if property_id:
        response = requests.get(f"{BASE_URL}/rentals/properties/{property_id}")
        print_response("3. Get Specific Property", response)
    
    # Get my properties
    response = requests.get(f"{BASE_URL}/rentals/my-properties", headers=headers)
    print_response("4. Get My Properties", response)
    
    return property_id


def test_booking_endpoints(property_id, owner_token, renter_token):
    """Test booking endpoints"""
    print("\n" + "="*60)
    print("TESTING BOOKING ENDPOINTS")
    print("="*60)
    
    if not property_id or not renter_token:
        print("Skipping booking tests - missing property or renter token")
        return
    
    renter_headers = {"Authorization": f"Bearer {renter_token}"}
    owner_headers = {"Authorization": f"Bearer {owner_token}"}
    
    # Create a booking
    booking_data = {
        "property_id": property_id,
        "start_date": "2025-02-01",
        "end_date": "2025-08-01",
        "message": "I would love to rent this property!"
    }
    response = requests.post(f"{BASE_URL}/rentals/bookings", json=booking_data, headers=renter_headers)
    print_response("1. Create Booking", response)
    
    booking_id = None
    if response.status_code == 201:
        booking_id = response.json()['booking']['id']
    
    # Get renter's bookings
    response = requests.get(f"{BASE_URL}/rentals/my-bookings", headers=renter_headers)
    print_response("2. Get Renter's Bookings", response)
    
    # Get owner's property bookings
    response = requests.get(f"{BASE_URL}/rentals/property-bookings", headers=owner_headers)
    print_response("3. Get Owner's Property Bookings", response)
    
    # Update booking status
    if booking_id:
        status_data = {"status": "approved"}
        response = requests.put(f"{BASE_URL}/rentals/bookings/{booking_id}/status", 
                               json=status_data, headers=owner_headers)
        print_response("4. Update Booking Status", response)


if __name__ == "__main__":
    print("\n" + "🚀 Starting Novella API Tests 🚀\n")
    
    try:
        # Test authentication
        owner_token, renter_token = test_auth_endpoints()
        
        # Test properties
        property_id = test_property_endpoints(owner_token, renter_token)
        
        # Test bookings
        test_booking_endpoints(property_id, owner_token, renter_token)
        
        print("\n" + "="*60)
        print("✅ All tests completed!")
        print("="*60 + "\n")
        
    except requests.exceptions.ConnectionError:
        print("\n❌ Error: Could not connect to the API server.")
        print("Make sure the Flask server is running on http://localhost:5000\n")
    except Exception as e:
        print(f"\n❌ Error during testing: {str(e)}\n")
