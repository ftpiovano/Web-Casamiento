-- Create the gift_messages table
CREATE TABLE gift_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  note TEXT,
  amount NUMERIC NOT NULL,
  items TEXT,
  payment_method TEXT,
  region TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE gift_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public gift form)
CREATE POLICY "Allow public inserts" ON gift_messages
  FOR INSERT WITH CHECK (true);

-- Allow admin reads (we will use this for the admin dashboard later)
CREATE POLICY "Allow admin read" ON gift_messages
  FOR SELECT USING (true);
