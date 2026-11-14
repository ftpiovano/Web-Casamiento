-- Personal RSVP links (Assessoria VIP). Guest data is NOT stored in this repo:
-- rows were loaded from the exported guest spreadsheet directly into Supabase.
CREATE TABLE IF NOT EXISTS public.invites (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invite_name TEXT NOT NULL,
  rsvp_url TEXT NOT NULL,
  -- normalized lookup keys: full names (lowercase, no accents) and phone digits (with/without country code)
  search_keys TEXT[] NOT NULL DEFAULT '{}'
);

-- RLS on with NO policies: anon cannot read or write the table directly.
ALTER TABLE public.invites ENABLE ROW LEVEL SECURITY;

-- Only way to read: exact match on a key (or same last 8 digits for phones).
CREATE OR REPLACE FUNCTION public.find_invite(q TEXT)
RETURNS TABLE (invite_name TEXT, rsvp_url TEXT)
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE
AS $$
  SELECT i.invite_name, i.rsvp_url
  FROM public.invites i
  WHERE length(q) >= 6
    AND (
      q = ANY (i.search_keys)
      OR (
        q ~ '^[0-9]+$' AND length(q) >= 8
        AND EXISTS (
          SELECT 1 FROM unnest(i.search_keys) k
          WHERE k ~ '^[0-9]+$' AND right(k, 8) = right(q, 8)
        )
      )
    )
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.find_invite(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.find_invite(TEXT) TO anon, authenticated;
