-- Admin reads. The public SELECT policies on rsvps / gift_messages are removed;
-- the server reads them through these functions, which only answer to a secret.
-- The secret itself (ADMIN_DB_TOKEN) lives ONLY in Vercel env vars; the DB keeps its SHA-256 hash.
-- To (re)create: generate a random token, store its sha256 hex below, set ADMIN_DB_TOKEN in Vercel.
CREATE TABLE IF NOT EXISTS public.admin_secret (
  id BOOLEAN PRIMARY KEY DEFAULT true CHECK (id),
  token_hash TEXT NOT NULL
);
ALTER TABLE public.admin_secret ENABLE ROW LEVEL SECURITY; -- no policies: unreadable by anon
-- INSERT INTO public.admin_secret (id, token_hash) VALUES (true, '<sha256 hex of the token>');

CREATE OR REPLACE FUNCTION public.admin_token_ok(p_token TEXT)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_secret
    WHERE token_hash = encode(sha256(convert_to(coalesce(p_token, ''), 'utf8')), 'hex')
  );
$$;

CREATE OR REPLACE FUNCTION public.admin_list_rsvps(p_token TEXT)
RETURNS SETOF public.rsvps LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE
AS $$ SELECT r.* FROM public.rsvps r WHERE public.admin_token_ok(p_token) ORDER BY r.created_at DESC; $$;

CREATE OR REPLACE FUNCTION public.admin_list_gifts(p_token TEXT)
RETURNS SETOF public.gift_messages LANGUAGE sql SECURITY DEFINER SET search_path = public STABLE
AS $$ SELECT g.* FROM public.gift_messages g WHERE public.admin_token_ok(p_token) ORDER BY g.created_at DESC; $$;

REVOKE ALL ON FUNCTION public.admin_token_ok(TEXT) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.admin_list_rsvps(TEXT) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.admin_list_gifts(TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.admin_list_rsvps(TEXT) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.admin_list_gifts(TEXT) TO anon, authenticated;

-- Lock public reads (guestbook_messages stays public: the site shows those messages).
DROP POLICY IF EXISTS "Allow admin read" ON public.rsvps;
DROP POLICY IF EXISTS "Allow admin read" ON public.gift_messages;
