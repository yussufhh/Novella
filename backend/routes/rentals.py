from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from models import Property, Booking, User
import json
from datetime import datetime

rentals_bp = Blueprint('rentals', __name__)


# ==================== Property Routes ====================

@rentals_bp.route('/properties', methods=['GET'])
def get_properties():
    """Get all available properties with optional filters"""
    try:
        # Get query parameters for filtering
        city = request.args.get('city')
        property_type = request.args.get('property_type')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        bedrooms = request.args.get('bedrooms', type=int)
        
        # Build query
        query = Property.query.filter_by(is_available=True)
        
        if city:
            query = query.filter(Property.city.ilike(f'%{city}%'))
        if property_type:
            query = query.filter_by(property_type=property_type)
        if min_price:
            query = query.filter(Property.price_per_month >= min_price)
        if max_price:
            query = query.filter(Property.price_per_month <= max_price)
        if bedrooms:
            query = query.filter(Property.bedrooms >= bedrooms)
        
        properties = query.all()
        
        return jsonify({
            'properties': [prop.to_dict() for prop in properties],
            'count': len(properties)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@rentals_bp.route('/properties/<int:property_id>', methods=['GET'])
def get_property(property_id):
    """Get a specific property by ID"""
    try:
        property = Property.query.get(property_id)
        
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        # Include owner information
        owner = User.query.get(property.owner_id)
        property_data = property.to_dict()
        property_data['owner'] = {
            'name': f"{owner.first_name} {owner.last_name}",
            'phone': owner.phone
        } if owner else None
        
        return jsonify({'property': property_data}), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@rentals_bp.route('/properties', methods=['POST'])
@jwt_required()
def create_property():
    """Create a new property listing (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.user_type != 'owner':
            return jsonify({'error': 'Only owners can create property listings'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'description', 'address', 'city', 'state', 
                          'zip_code', 'property_type', 'bedrooms', 'bathrooms', 'price_per_month']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Create new property
        new_property = Property(
            owner_id=current_user_id,
            title=data['title'],
            description=data['description'],
            address=data['address'],
            city=data['city'],
            state=data['state'],
            zip_code=data['zip_code'],
            property_type=data['property_type'],
            bedrooms=data['bedrooms'],
            bathrooms=data['bathrooms'],
            square_feet=data.get('square_feet'),
            price_per_month=data['price_per_month'],
            amenities=json.dumps(data.get('amenities', [])),
            images=json.dumps(data.get('images', []))
        )
        
        db.session.add(new_property)
        db.session.commit()
        
        return jsonify({
            'message': 'Property created successfully',
            'property': new_property.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@rentals_bp.route('/properties/<int:property_id>', methods=['PUT'])
@jwt_required()
def update_property(property_id):
    """Update a property listing (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        property = Property.query.get(property_id)
        
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        if property.owner_id != current_user_id:
            return jsonify({'error': 'You can only update your own properties'}), 403
        
        data = request.get_json()
        
        # Update fields
        updatable_fields = ['title', 'description', 'address', 'city', 'state', 
                           'zip_code', 'property_type', 'bedrooms', 'bathrooms', 
                           'square_feet', 'price_per_month', 'is_available']
        
        for field in updatable_fields:
            if field in data:
                setattr(property, field, data[field])
        
        if 'amenities' in data:
            property.amenities = json.dumps(data['amenities'])
        if 'images' in data:
            property.images = json.dumps(data['images'])
        
        db.session.commit()
        
        return jsonify({
            'message': 'Property updated successfully',
            'property': property.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@rentals_bp.route('/properties/<int:property_id>', methods=['DELETE'])
@jwt_required()
def delete_property(property_id):
    """Delete a property listing (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        property = Property.query.get(property_id)
        
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        if property.owner_id != current_user_id:
            return jsonify({'error': 'You can only delete your own properties'}), 403
        
        db.session.delete(property)
        db.session.commit()
        
        return jsonify({'message': 'Property deleted successfully'}), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@rentals_bp.route('/my-properties', methods=['GET'])
@jwt_required()
def get_my_properties():
    """Get all properties owned by the current user"""
    try:
        current_user_id = get_jwt_identity()
        properties = Property.query.filter_by(owner_id=current_user_id).all()
        
        return jsonify({
            'properties': [prop.to_dict() for prop in properties],
            'count': len(properties)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500


# ==================== Booking Routes ====================

@rentals_bp.route('/bookings', methods=['POST'])
@jwt_required()
def create_booking():
    """Create a new booking request (renter only)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.user_type != 'renter':
            return jsonify({'error': 'Only renters can create bookings'}), 403
        
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['property_id', 'start_date', 'end_date']
        for field in required_fields:
            if field not in data:
                return jsonify({'error': f'{field} is required'}), 400
        
        # Check if property exists and is available
        property = Property.query.get(data['property_id'])
        if not property:
            return jsonify({'error': 'Property not found'}), 404
        
        if not property.is_available:
            return jsonify({'error': 'Property is not available'}), 400
        
        # Parse dates
        start_date = datetime.strptime(data['start_date'], '%Y-%m-%d').date()
        end_date = datetime.strptime(data['end_date'], '%Y-%m-%d').date()
        
        if start_date >= end_date:
            return jsonify({'error': 'End date must be after start date'}), 400
        
        # Calculate total price (simple calculation based on months)
        days = (end_date - start_date).days
        months = days / 30
        total_price = property.price_per_month * months
        
        # Create new booking
        new_booking = Booking(
            property_id=data['property_id'],
            renter_id=current_user_id,
            start_date=start_date,
            end_date=end_date,
            total_price=total_price,
            message=data.get('message')
        )
        
        db.session.add(new_booking)
        db.session.commit()
        
        return jsonify({
            'message': 'Booking request created successfully',
            'booking': new_booking.to_dict()
        }), 201
        
    except ValueError as e:
        return jsonify({'error': f'Invalid date format. Use YYYY-MM-DD'}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@rentals_bp.route('/my-bookings', methods=['GET'])
@jwt_required()
def get_my_bookings():
    """Get all bookings made by the current user (renter)"""
    try:
        current_user_id = get_jwt_identity()
        bookings = Booking.query.filter_by(renter_id=current_user_id).all()
        
        # Include property details
        bookings_data = []
        for booking in bookings:
            booking_dict = booking.to_dict()
            property = Property.query.get(booking.property_id)
            booking_dict['property'] = property.to_dict() if property else None
            bookings_data.append(booking_dict)
        
        return jsonify({
            'bookings': bookings_data,
            'count': len(bookings)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@rentals_bp.route('/property-bookings', methods=['GET'])
@jwt_required()
def get_property_bookings():
    """Get all bookings for properties owned by the current user (owner)"""
    try:
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        
        if not user or user.user_type != 'owner':
            return jsonify({'error': 'Only owners can view property bookings'}), 403
        
        # Get all properties owned by the user
        properties = Property.query.filter_by(owner_id=current_user_id).all()
        property_ids = [prop.id for prop in properties]
        
        # Get all bookings for these properties
        bookings = Booking.query.filter(Booking.property_id.in_(property_ids)).all()
        
        # Include property and renter details
        bookings_data = []
        for booking in bookings:
            booking_dict = booking.to_dict()
            property = Property.query.get(booking.property_id)
            renter = User.query.get(booking.renter_id)
            
            booking_dict['property'] = property.to_dict() if property else None
            booking_dict['renter'] = {
                'name': f"{renter.first_name} {renter.last_name}",
                'email': renter.email,
                'phone': renter.phone
            } if renter else None
            
            bookings_data.append(booking_dict)
        
        return jsonify({
            'bookings': bookings_data,
            'count': len(bookings)
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Server error: {str(e)}'}), 500


@rentals_bp.route('/bookings/<int:booking_id>/status', methods=['PUT'])
@jwt_required()
def update_booking_status(booking_id):
    """Update booking status (owner only)"""
    try:
        current_user_id = get_jwt_identity()
        booking = Booking.query.get(booking_id)
        
        if not booking:
            return jsonify({'error': 'Booking not found'}), 404
        
        # Check if current user owns the property
        property = Property.query.get(booking.property_id)
        if not property or property.owner_id != current_user_id:
            return jsonify({'error': 'You can only update bookings for your own properties'}), 403
        
        data = request.get_json()
        
        if 'status' not in data:
            return jsonify({'error': 'Status is required'}), 400
        
        if data['status'] not in ['pending', 'approved', 'rejected', 'cancelled']:
            return jsonify({'error': 'Invalid status'}), 400
        
        booking.status = data['status']
        db.session.commit()
        
        return jsonify({
            'message': 'Booking status updated successfully',
            'booking': booking.to_dict()
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Server error: {str(e)}'}), 500
