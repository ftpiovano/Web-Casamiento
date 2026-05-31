-- Create the guestbook_messages table
CREATE TABLE guestbook_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  text TEXT NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE guestbook_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public guestbook form)
CREATE POLICY "Allow public inserts" ON guestbook_messages
  FOR INSERT WITH CHECK (true);

-- Allow anyone to read the wall of messages
CREATE POLICY "Allow public read" ON guestbook_messages
  FOR SELECT USING (true);
