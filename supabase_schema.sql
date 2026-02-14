-- Create the RSVPs table
CREATE TABLE rsvps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending TEXT NOT NULL, -- 'yes' or 'no'
  adults INTEGER DEFAULT 1,
  kids INTEGER DEFAULT 0,
  notes TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (for the public RSVP form)
CREATE POLICY "Allow public inserts" ON rsvps
  FOR INSERT WITH CHECK (true);

-- Allow authenticated/admin reads (we will use the service role or a specific policy if needed, 
-- but for simplicity in this prototype, we'll fetch via a server action or specific key)
CREATE POLICY "Allow admin read" ON rsvps
  FOR SELECT USING (true); -- Note: In production, restrict this to admin users!
