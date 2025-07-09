-- Seed data for SmartCart e-commerce platform

-- Insert categories
INSERT INTO categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Apparel and fashion items'),
('Home & Kitchen', 'Home appliances and kitchen tools'),
('Books', 'Books and educational materials'),
('Sports & Outdoors', 'Sports equipment and outdoor gear'),
('Beauty & Health', 'Beauty products and health supplements');

-- Insert sample users
INSERT INTO users (email, name, password_hash, role) VALUES
('admin@smartcart.com', 'Admin User', '$2b$10$hash', 'admin'),
('john.doe@example.com', 'John Doe', '$2b$10$hash', 'customer'),
('jane.smith@example.com', 'Jane Smith', '$2b$10$hash', 'customer'),
('bob.johnson@example.com', 'Bob Johnson', '$2b$10$hash', 'customer'),
('alice.wilson@example.com', 'Alice Wilson', '$2b$10$hash', 'customer');

-- Insert sample products
INSERT INTO products (name, description, price, category_id, stock_quantity, image_url, status) VALUES
('Wireless Bluetooth Headphones', 'Premium noise-cancelling headphones with 30-hour battery life', 199.99, 1, 45, '/placeholder.svg?height=200&width=200', 'active'),
('Smart Fitness Watch', 'Track your health and fitness with this advanced smartwatch', 299.99, 1, 23, '/placeholder.svg?height=200&width=200', 'active'),
('Organic Cotton T-Shirt', 'Comfortable and sustainable cotton t-shirt in various colors', 29.99, 2, 100, '/placeholder.svg?height=200&width=200', 'active'),
('Professional Coffee Maker', 'Brew perfect coffee every time with this premium coffee maker', 149.99, 3, 15, '/placeholder.svg?height=200&width=200', 'active'),
('Ergonomic Office Chair', 'Comfortable office chair with lumbar support and adjustable height', 399.99, 3, 8, '/placeholder.svg?height=200&width=200', 'active'),
('Portable Power Bank', '20000mAh power bank with fast charging and multiple ports', 49.99, 1, 67, '/placeholder.svg?height=200&width=200', 'active'),
('Running Shoes', 'Lightweight running shoes with advanced cushioning technology', 129.99, 5, 34, '/placeholder.svg?height=200&width=200', 'active'),
('Skincare Set', 'Complete skincare routine with natural ingredients', 89.99, 6, 22, '/placeholder.svg?height=200&width=200', 'active');

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status, shipping_address, created_at) VALUES
(2, 249.98, 'delivered', '123 Main St, City, State 12345', '2024-01-01 10:00:00'),
(3, 299.99, 'shipped', '456 Oak Ave, City, State 12345', '2024-01-05 14:30:00'),
(4, 179.98, 'processing', '789 Pine Rd, City, State 12345', '2024-01-10 09:15:00'),
(5, 429.98, 'delivered', '321 Elm St, City, State 12345', '2024-01-12 16:45:00'),
(2, 89.99, 'processing', '123 Main St, City, State 12345', '2024-01-15 11:20:00');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 199.99),
(1, 6, 1, 49.99),
(2, 2, 1, 299.99),
(3, 3, 2, 29.99),
(3, 4, 1, 149.99),
(4, 5, 1, 399.99),
(4, 3, 1, 29.99),
(5, 8, 1, 89.99);

-- Initialize customer analytics
INSERT INTO customer_analytics (user_id, total_orders, total_spent, last_order_date, customer_lifetime_value, churn_risk_score) VALUES
(2, 2, 339.97, '2024-01-15 11:20:00', 400.00, 0.15),
(3, 1, 299.99, '2024-01-05 14:30:00', 350.00, 0.25),
(4, 1, 179.98, '2024-01-10 09:15:00', 200.00, 0.30),
(5, 1, 429.98, '2024-01-12 16:45:00', 500.00, 0.10);

-- Initialize product analytics
INSERT INTO product_analytics (product_id, total_sold, total_revenue, avg_rating, view_count) VALUES
(1, 1, 199.99, 4.5, 234),
(2, 1, 299.99, 4.3, 189),
(3, 3, 89.97, 4.7, 456),
(4, 1, 149.99, 4.4, 123),
(5, 1, 399.99, 4.6, 89),
(6, 1, 49.99, 4.2, 345),
(7, 0, 0, 4.8, 67),
(8, 1, 89.99, 4.1, 98);
