CREATE TABLE IF NOT EXISTS sites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  logo_url TEXT,
  theme JSONB NOT NULL DEFAULT '{}',
  contact_email TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active','paused','archived')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  display_name TEXT,
  roles TEXT[] NOT NULL DEFAULT '{supporter}',
  auth_provider TEXT,
  avatar_url TEXT,
  phone TEXT,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE RESTRICT,
  creator_id UUID REFERENCES users(id) ON DELETE SET NULL,
  listing_application_id UUID REFERENCES listing_applications(id) ON DELETE SET NULL,
  ai_generation_id UUID REFERENCES ai_generations(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  summary TEXT,
  story TEXT,
  main_image_url TEXT,
  video_url TEXT,
  genre_tags TEXT[] NOT NULL DEFAULT '{}',
  goal_amount BIGINT NOT NULL,
  project_type TEXT CHECK (project_type IN ('goal','commit')),
  start_at TIMESTAMPTZ,
  end_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','submitted','reviewing','rejected','upcoming','live','completed','cancelled')),
  collected_amount BIGINT NOT NULL DEFAULT 0,
  supporter_count INT NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_end_at ON projects(end_at);
CREATE INDEX IF NOT EXISTS idx_projects_genre_tags ON projects USING gin(genre_tags);
CREATE TABLE IF NOT EXISTS rewards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  price INT NOT NULL,
  quantity_limit INT,
  claimed_count INT NOT NULL DEFAULT 0,
  delivery_estimate TEXT,
  position INT NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_rewards_project_id ON rewards(project_id);
CREATE TABLE IF NOT EXISTS pledges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE RESTRICT,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE RESTRICT,
  reward_id UUID REFERENCES rewards(id) ON DELETE SET NULL,
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  supporter_name TEXT,
  supporter_email TEXT,
  amount INT NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','paid','cancelled','refunded','failed')),
  payment_method TEXT,
  payment_ref TEXT,
  referrer_source TEXT,
  partner_referral_code TEXT,
  message TEXT,
  is_anonymous BOOLEAN NOT NULL DEFAULT false,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_pledges_project_id ON pledges(project_id);
CREATE INDEX IF NOT EXISTS idx_pledges_status ON pledges(status);
CREATE INDEX IF NOT EXISTS idx_pledges_email ON pledges(supporter_email);
CREATE TABLE IF NOT EXISTS site_memberships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_id UUID NOT NULL REFERENCES sites(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'creator' CHECK (role IN ('creator','admin')),
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(site_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_projects_site_id ON projects(site_id);
