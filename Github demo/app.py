from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_sqlalchemy import SQLAlchemy
import os

app = Flask(__name__)
app.secret_key = 'your-secret-key'  # Change this to a secure secret key
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shop.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Product Model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    description = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    image_url = db.Column(db.String(200), nullable=False)
    stock = db.Column(db.Integer, default=10)

# Dummy Products Data
dummy_products = [
    {
        'name': 'Classic White T-Shirt',
        'price': 29.99,
        'description': 'Comfortable cotton t-shirt perfect for everyday wear',
        'category': 'T-Shirts',
        'gender': 'Men',
        'image_url': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        'name': 'Floral Summer Dress',
        'price': 59.99,
        'description': 'Beautiful floral dress perfect for summer days',
        'category': 'Dresses',
        'gender': 'Women',
        'image_url': 'https://images.unsplash.com/photo-1515372039744-b8f87a3f3b00?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        'name': 'Slim Fit Jeans',
        'price': 79.99,
        'description': 'Modern slim fit jeans with stretch comfort',
        'category': 'Jeans',
        'gender': 'Men',
        'image_url': 'https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        'name': 'Casual Blazer',
        'price': 89.99,
        'description': 'Versatile blazer for both casual and formal occasions',
        'category': 'Jackets',
        'gender': 'Women',
        'image_url': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        'name': 'Striped Polo Shirt',
        'price': 39.99,
        'description': 'Classic striped polo shirt for a preppy look',
        'category': 'Shirts',
        'gender': 'Men',
        'image_url': 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    {
        'name': 'High-Waisted Skirt',
        'price': 49.99,
        'description': 'Elegant high-waisted skirt for a sophisticated look',
        'category': 'Skirts',
        'gender': 'Women',
        'image_url': 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }
]

# Initialize database and add dummy products
def init_db():
    with app.app_context():
        # Create the database directory if it doesn't exist
        db_path = os.path.dirname(app.config['SQLALCHEMY_DATABASE_URI'].replace('sqlite:///', ''))
        if not os.path.exists(db_path):
            os.makedirs(db_path)
        
        db.create_all()
        # Check if products already exist
        if Product.query.first() is None:
            for product in dummy_products:
                new_product = Product(**product)
                db.session.add(new_product)
            db.session.commit()

@app.route('/')
def home():
    try:
        gender = request.args.get('gender', 'all')
        category = request.args.get('category', 'all')
        
        query = Product.query
        if gender != 'all':
            query = query.filter_by(gender=gender)
        if category != 'all':
            query = query.filter_by(category=category)
        
        products = query.all()
        categories = db.session.query(Product.category).distinct().all()
        categories = [cat[0] for cat in categories]
        
        return render_template('index.html', 
                             products=products, 
                             categories=categories,
                             selected_gender=gender,
                             selected_category=category)
    except Exception as e:
        flash(f'An error occurred: {str(e)}', 'error')
        return render_template('index.html', products=[], categories=[], selected_gender='all', selected_category='all')

@app.route('/add_to_cart/<int:product_id>')
def add_to_cart(product_id):
    try:
        if 'cart' not in session:
            session['cart'] = {}
        
        cart = session['cart']
        cart[str(product_id)] = cart.get(str(product_id), 0) + 1
        session['cart'] = cart
        
        flash('Item added to cart successfully!', 'success')
        return redirect(url_for('home'))
    except Exception as e:
        flash(f'Error adding to cart: {str(e)}', 'error')
        return redirect(url_for('home'))

@app.route('/cart')
def cart():
    try:
        if 'cart' not in session:
            session['cart'] = {}
        
        cart_items = []
        total = 0
        
        for product_id, quantity in session['cart'].items():
            product = Product.query.get(int(product_id))
            if product:
                subtotal = product.price * quantity
                total += subtotal
                cart_items.append({
                    'product': product,
                    'quantity': quantity,
                    'subtotal': subtotal
                })
        
        return render_template('cart.html', cart_items=cart_items, total=total)
    except Exception as e:
        flash(f'Error loading cart: {str(e)}', 'error')
        return render_template('cart.html', cart_items=[], total=0)

if __name__ == '__main__':
    init_db()
    app.run(debug=True) 