-- Create the recipes table
CREATE TABLE IF NOT EXISTS recipes (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT[] NOT NULL DEFAULT '{}',
  instructions TEXT[] NOT NULL DEFAULT '{}',
  cook_time VARCHAR(50),
  servings INTEGER NOT NULL DEFAULT 1,
  category VARCHAR(100),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create an index on title for faster searching
CREATE INDEX IF NOT EXISTS idx_recipes_title ON recipes(title);

-- Create an index on category for faster filtering
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);

-- Create an index on created_at for ordering
CREATE INDEX IF NOT EXISTS idx_recipes_created_at ON recipes(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE recipes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can restrict this later)
CREATE POLICY "Allow all operations on recipes" ON recipes
  FOR ALL USING (true);

-- Create email_signups table
CREATE TABLE email_signups (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'active',
    source VARCHAR(100) DEFAULT 'landing_page'
);

-- Create index on email for faster lookups
CREATE INDEX idx_email_signups_email ON email_signups(email);
CREATE INDEX idx_email_signups_created_at ON email_signups(created_at);

-- Enable RLS for email_signups
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Create policy for email_signups (allow insert for anyone, select for authenticated users)
CREATE POLICY "Allow public email signup" ON email_signups
    FOR INSERT TO anon
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to view signups" ON email_signups
    FOR SELECT TO authenticated
    USING (true);

-- Insert some sample data
INSERT INTO recipes (title, description, ingredients, instructions, cook_time, servings, category) VALUES
(
  'Classic Spaghetti Carbonara',
  'A traditional Italian pasta dish with eggs, cheese, and pancetta',
  ARRAY['400g spaghetti', '200g pancetta or guanciale', '4 large eggs', '100g Pecorino Romano cheese', 'Black pepper', 'Salt'],
  ARRAY['Bring a large pot of salted water to boil and cook spaghetti', 'Fry pancetta in a large pan until crispy', 'Beat eggs with grated cheese and black pepper', 'Drain pasta and add to pancetta pan', 'Remove from heat and quickly mix in egg mixture', 'Serve immediately with extra cheese'],
  '20 mins',
  4,
  'Italian'
),
(
  'Vietnamese Pho',
  'Aromatic Vietnamese noodle soup with beef and herbs',
  ARRAY['200g rice noodles', '300g beef slices', '1L beef broth', 'Bean sprouts', 'Fresh herbs (cilantro, mint, basil)', 'Lime wedges', 'Fish sauce', 'Hoisin sauce'],
  ARRAY['Prepare rice noodles according to package instructions', 'Heat beef broth and season with fish sauce', 'Place noodles in bowls', 'Top with raw beef slices', 'Pour hot broth over to cook the beef', 'Serve with herbs, bean sprouts, and sauces'],
  '30 mins',
  2,
  'Vietnamese'
),
('Classic Pasta Carbonara', 'A traditional Italian pasta dish with eggs, cheese, and pancetta.', 
 ARRAY['400g spaghetti', '200g pancetta', '4 large eggs', '100g Pecorino Romano', 'Black pepper', 'Salt'], 
 ARRAY['Cook pasta in salted water', 'Fry pancetta until crispy', 'Whisk eggs with cheese', 'Combine hot pasta with pancetta', 'Add egg mixture off heat', 'Toss quickly and serve'], 
 '20 minutes', 4, 'Italian'),

('Chicken Tikka Masala', 'Creamy and flavorful Indian curry with tender chicken pieces.', 
 ARRAY['500g chicken breast', '200ml heavy cream', '400g canned tomatoes', '2 onions', '4 cloves garlic', '2 tsp garam masala', '1 tsp turmeric', 'Basmati rice'], 
 ARRAY['Marinate chicken in yogurt and spices', 'Cook chicken until golden', 'Sauté onions and garlic', 'Add tomatoes and spices', 'Simmer with cream', 'Serve with rice'], 
 '45 minutes', 4, 'Indian'),

('Chocolate Chip Cookies', 'Soft and chewy homemade chocolate chip cookies.', 
 ARRAY['2 cups flour', '1 cup butter', '3/4 cup brown sugar', '1/2 cup white sugar', '2 eggs', '2 cups chocolate chips', '1 tsp vanilla', '1 tsp baking soda'], 
 ARRAY['Cream butter and sugars', 'Add eggs and vanilla', 'Mix in dry ingredients', 'Fold in chocolate chips', 'Drop on baking sheet', 'Bake at 375°F for 10 minutes'], 
 '25 minutes', 24, 'Dessert');
