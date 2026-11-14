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

-- Type-to-filter dropdown: all invites. `aliases` = guest full names only (never phones).
CREATE OR REPLACE FUNCTION public.list_invites()
RETURNS TABLE (id UUID, invite_name TEXT, aliases TEXT[])
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE
AS $$
  SELECT i.id, i.invite_name,
         ARRAY(SELECT k FROM unnest(i.search_keys) k WHERE k !~ '^[0-9]+$')
  FROM public.invites i ORDER BY i.invite_name;
$$;

CREATE OR REPLACE FUNCTION public.get_invite_link(p_id UUID)
RETURNS TABLE (invite_name TEXT, rsvp_url TEXT)
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE
AS $$
  SELECT i.invite_name, i.rsvp_url FROM public.invites i WHERE i.id = p_id;
$$;

REVOKE ALL ON FUNCTION public.list_invites() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_invite_link(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_invites() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_invite_link(UUID) TO anon, authenticated;
