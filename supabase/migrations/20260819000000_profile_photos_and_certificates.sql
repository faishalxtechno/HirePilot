-- =============================================================================
-- HirePilot Migration: Profile Photos, Certificate IDs, & Storage Security
-- =============================================================================

-- 1. Ensure columns exist on public.interview_reports
ALTER TABLE public.interview_reports 
    ADD COLUMN IF NOT EXISTS certificate_id TEXT UNIQUE,
    ADD COLUMN IF NOT EXISTS confidence_score NUMERIC(5,2);

CREATE INDEX IF NOT EXISTS idx_interview_reports_certificate_id 
    ON public.interview_reports(certificate_id);

-- 2. Ensure avatar_url exists on public.profiles
ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS avatar_url TEXT;

-- -----------------------------------------------------------------------------
-- 3. Storage Bucket: profile-photos
-- -----------------------------------------------------------------------------
-- Create the storage bucket for user profile photos if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'profile-photos',
    'profile-photos',
    true,
    5242880, -- 5MB file limit
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET 
    public = true,
    file_size_limit = 5242880,
    allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];

-- -----------------------------------------------------------------------------
-- 4. Storage Row Level Security (RLS) Policies for profile-photos
-- -----------------------------------------------------------------------------
-- Enable RLS on storage.objects if not already enabled
-- Supabase-managed table: RLS enablement skipped

-- 4.1 Allow public read access to profile photos
DROP POLICY IF EXISTS "Public can view profile photos" ON storage.objects;
CREATE POLICY "Public can view profile photos"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'profile-photos');

-- 4.2 Allow authenticated users to upload only to their own directory: profile-photos/{user_id}/*
DROP POLICY IF EXISTS "Users can upload their own profile photo" ON storage.objects;
CREATE POLICY "Users can upload their own profile photo"
    ON storage.objects FOR INSERT
    TO authenticated
    WITH CHECK (
        bucket_id = 'profile-photos' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- 4.3 Allow authenticated users to update only their own profile photo
DROP POLICY IF EXISTS "Users can update their own profile photo" ON storage.objects;
CREATE POLICY "Users can update their own profile photo"
    ON storage.objects FOR UPDATE
    TO authenticated
    USING (
        bucket_id = 'profile-photos' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- 4.4 Allow authenticated users to delete only their own profile photo
DROP POLICY IF EXISTS "Users can delete their own profile photo" ON storage.objects;
CREATE POLICY "Users can delete their own profile photo"
    ON storage.objects FOR DELETE
    TO authenticated
    USING (
        bucket_id = 'profile-photos' AND
        (storage.foldername(name))[1] = auth.uid()::text
    );

-- -----------------------------------------------------------------------------
-- 5. Ensure Strict Row Level Security on Data Tables
-- -----------------------------------------------------------------------------
-- Profiles: Ensure users cannot view/update other users' private settings
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Interview Reports: Ensure users cannot view other users' reports or certificates
ALTER TABLE public.interview_reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own interview reports" ON public.interview_reports;
CREATE POLICY "Users can view own interview reports"
    ON public.interview_reports FOR SELECT
    USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own interview reports" ON public.interview_reports;
CREATE POLICY "Users can update own interview reports"
    ON public.interview_reports FOR UPDATE
    USING (auth.uid() = user_id);
