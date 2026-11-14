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

-- Dropdown support (group -> name -> link). Group codes: noiva_familia, noivo_familia,
-- noiva_amigos, noivo_amigos, outros. Values for group_code were loaded with the guest data.
ALTER TABLE public.invites ADD COLUMN IF NOT EXISTS group_code TEXT NOT NULL DEFAULT 'outros';

CREATE OR REPLACE FUNCTION public.list_invites_by_group(g TEXT)
RETURNS TABLE (id UUID, invite_name TEXT)
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE
AS $$
  SELECT i.id, i.invite_name FROM public.invites i WHERE i.group_code = g ORDER BY i.invite_name;
$$;

CREATE OR REPLACE FUNCTION public.get_invite_link(p_id UUID)
RETURNS TABLE (invite_name TEXT, rsvp_url TEXT)
LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE
AS $$
  SELECT i.invite_name, i.rsvp_url FROM public.invites i WHERE i.id = p_id;
$$;

REVOKE ALL ON FUNCTION public.list_invites_by_group(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.get_invite_link(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.list_invites_by_group(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_invite_link(UUID) TO anon, authenticated;
