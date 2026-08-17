-- =============================================================================
-- HirePilot Database Schema & Migrations
-- Supabase PostgreSQL with Strict Row-Level Security (RLS)
-- =============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. Profiles Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT UNIQUE,
    avatar_url TEXT,
    target_role TEXT DEFAULT 'Software Engineer',
    experience_level TEXT DEFAULT 'Fresher',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Trigger for auto-updating updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, email, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
        NEW.email,
        NEW.raw_user_meta_data->>'avatar_url'
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- -----------------------------------------------------------------------------
-- 2. Interviews Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.interviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    role TEXT NOT NULL,
    interview_type TEXT NOT NULL,
    difficulty TEXT NOT NULL,
    total_questions INTEGER NOT NULL DEFAULT 10,
    current_question INTEGER NOT NULL DEFAULT 1,
    score NUMERIC(5,2),
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned')),
    started_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    completed_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_interviews_user_id ON public.interviews(user_id);
CREATE INDEX IF NOT EXISTS idx_interviews_started_at ON public.interviews(started_at DESC);

-- -----------------------------------------------------------------------------
-- 3. Questions Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
    question_number INTEGER NOT NULL,
    question_text TEXT NOT NULL,
    category TEXT,
    difficulty TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_questions_interview_id ON public.questions(interview_id);

-- -----------------------------------------------------------------------------
-- 4. Answers Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.answers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_id UUID NOT NULL REFERENCES public.questions(id) ON DELETE CASCADE,
    interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    user_answer TEXT NOT NULL,
    relevance_score NUMERIC(4,2),
    accuracy_score NUMERIC(4,2),
    completeness_score NUMERIC(4,2),
    clarity_score NUMERIC(4,2),
    feedback TEXT,
    missing_points JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_answers_interview_id ON public.answers(interview_id);
CREATE INDEX IF NOT EXISTS idx_answers_question_id ON public.answers(question_id);
CREATE INDEX IF NOT EXISTS idx_answers_user_id ON public.answers(user_id);

-- -----------------------------------------------------------------------------
-- 5. Interview Reports Table
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.interview_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    interview_id UUID NOT NULL REFERENCES public.interviews(id) ON DELETE CASCADE UNIQUE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    overall_score NUMERIC(5,2) NOT NULL,
    technical_score NUMERIC(5,2),
    problem_solving_score NUMERIC(5,2),
    communication_score NUMERIC(5,2),
    answer_quality_score NUMERIC(5,2),
    strengths JSONB DEFAULT '[]'::jsonb,
    weaknesses JSONB DEFAULT '[]'::jsonb,
    recommendations JSONB DEFAULT '[]'::jsonb,
    ai_summary TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_reports_user_id ON public.interview_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_interview_id ON public.interview_reports(interview_id);

-- =============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_reports ENABLE ROW LEVEL SECURITY;

-- 1. Profiles RLS
CREATE POLICY "Users can view own profile"
    ON public.profiles FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

-- 2. Interviews RLS
CREATE POLICY "Users can view own interviews"
    ON public.interviews FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interviews"
    ON public.interviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own interviews"
    ON public.interviews FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own interviews"
    ON public.interviews FOR DELETE
    USING (auth.uid() = user_id);

-- 3. Questions RLS
CREATE POLICY "Users can view questions of own interviews"
    ON public.questions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.interviews
            WHERE interviews.id = questions.interview_id
            AND interviews.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can insert questions into own interviews"
    ON public.questions FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM public.interviews
            WHERE interviews.id = questions.interview_id
            AND interviews.user_id = auth.uid()
        )
    );

-- 4. Answers RLS
CREATE POLICY "Users can view own answers"
    ON public.answers FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own answers"
    ON public.answers FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own answers"
    ON public.answers FOR UPDATE
    USING (auth.uid() = user_id);

-- 5. Interview Reports RLS
CREATE POLICY "Users can view own interview reports"
    ON public.interview_reports FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interview reports"
    ON public.interview_reports FOR INSERT
    WITH CHECK (auth.uid() = user_id);
