-- =====================================================
-- SUPABASE MIGRATION: sapa_ayah_cms
-- Converted from MySQL to PostgreSQL
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLES
-- =====================================================

CREATE TABLE IF NOT EXISTS roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS permissions (
    id SERIAL PRIMARY KEY,
    permission_key VARCHAR(100) NOT NULL UNIQUE,
    label VARCHAR(150) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS role_permissions (
    id BIGSERIAL PRIMARY KEY,
    role_id INT NOT NULL REFERENCES roles(id) ON DELETE CASCADE,
    permission_id INT NOT NULL REFERENCES permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE (role_id, permission_id)
);

CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role_id INT NOT NULL DEFAULT 2 REFERENCES roles(id),
    full_name VARCHAR(150) NOT NULL DEFAULT '',
    username VARCHAR(100) UNIQUE,
    email VARCHAR(150),
    phone VARCHAR(30) DEFAULT NULL,
    gender VARCHAR(10) DEFAULT NULL CHECK (gender IN ('male', 'female')),
    birth_place VARCHAR(100) DEFAULT NULL,
    birth_date DATE DEFAULT NULL,
    address TEXT DEFAULT NULL,
    profile_photo VARCHAR(255) DEFAULT NULL,
    bio TEXT DEFAULT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'blocked')),
    last_login_at TIMESTAMPTZ DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS categories (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS articles (
    id BIGSERIAL PRIMARY KEY,
    category_id BIGINT DEFAULT NULL REFERENCES categories(id) ON DELETE SET NULL,
    author_id UUID DEFAULT NULL REFERENCES profiles(id) ON DELETE SET NULL,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    thumbnail VARCHAR(255) DEFAULT NULL,
    excerpt TEXT DEFAULT NULL,
    content TEXT NOT NULL DEFAULT '',
    tags VARCHAR(255) DEFAULT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
    published_at TIMESTAMPTZ DEFAULT NULL,
    views INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS programs (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    slug VARCHAR(150) NOT NULL UNIQUE,
    thumbnail VARCHAR(255) DEFAULT NULL,
    short_description TEXT DEFAULT NULL,
    description TEXT DEFAULT NULL,
    schedule_info TEXT DEFAULT NULL,
    gallery_json TEXT DEFAULT NULL,
    registration_link VARCHAR(255) DEFAULT NULL,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS program_registrations (
    id BIGSERIAL PRIMARY KEY,
    program_id BIGINT NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) DEFAULT NULL,
    phone VARCHAR(30) NOT NULL,
    city VARCHAR(120) DEFAULT NULL,
    motivation TEXT DEFAULT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'accepted', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(180) NOT NULL,
    slug VARCHAR(190) NOT NULL UNIQUE,
    thumbnail VARCHAR(255) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    event_date DATE NOT NULL DEFAULT CURRENT_DATE,
    event_time VARCHAR(50) DEFAULT NULL,
    location VARCHAR(255) DEFAULT NULL,
    gmap_embed TEXT DEFAULT NULL,
    video_url VARCHAR(255) DEFAULT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'completed', 'cancelled')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS galleries (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(180) NOT NULL,
    media_type VARCHAR(10) NOT NULL DEFAULT 'photo' CHECK (media_type IN ('photo', 'video')),
    file_path VARCHAR(255) DEFAULT NULL,
    video_url VARCHAR(255) DEFAULT NULL,
    category VARCHAR(100) DEFAULT NULL,
    description TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS testimonials (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    role_or_job VARCHAR(150) DEFAULT NULL,
    photo VARCHAR(255) DEFAULT NULL,
    testimonial TEXT NOT NULL,
    rating SMALLINT NOT NULL DEFAULT 5,
    is_featured BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS donations (
    id BIGSERIAL PRIMARY KEY,
    donor_name VARCHAR(150) NOT NULL,
    donor_email VARCHAR(150) DEFAULT NULL,
    donor_phone VARCHAR(30) DEFAULT NULL,
    amount DECIMAL(15,2) NOT NULL DEFAULT 0,
    transfer_date DATE DEFAULT NULL,
    bank_name VARCHAR(120) DEFAULT NULL,
    message TEXT DEFAULT NULL,
    proof_file VARCHAR(255) DEFAULT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contacts (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) DEFAULT NULL,
    phone VARCHAR(30) DEFAULT NULL,
    subject VARCHAR(200) DEFAULT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS comments (
    id BIGSERIAL PRIMARY KEY,
    article_id BIGINT NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
    user_id UUID DEFAULT NULL REFERENCES profiles(id) ON DELETE SET NULL,
    name VARCHAR(150) DEFAULT NULL,
    email VARCHAR(150) DEFAULT NULL,
    comment TEXT NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS settings (
    id BIGSERIAL PRIMARY KEY,
    setting_key VARCHAR(120) NOT NULL UNIQUE,
    setting_value TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS activity_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID DEFAULT NULL REFERENCES profiles(id) ON DELETE SET NULL,
    action VARCHAR(120) NOT NULL,
    entity VARCHAR(120) DEFAULT NULL,
    entity_id BIGINT DEFAULT NULL,
    meta TEXT DEFAULT NULL,
    ip_address VARCHAR(64) DEFAULT NULL,
    user_agent TEXT DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT now()
);

-- =====================================================
-- INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_programs_slug ON programs(slug);
CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);
CREATE INDEX IF NOT EXISTS idx_program_registrations_program ON program_registrations(program_id);
CREATE INDEX IF NOT EXISTS idx_program_registrations_status ON program_registrations(status);
CREATE INDEX IF NOT EXISTS idx_comments_article ON comments(article_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);

-- =====================================================
-- SEED DATA
-- =====================================================

INSERT INTO roles (id, name, description) VALUES
(1, 'admin', 'Akses penuh seluruh sistem'),
(2, 'user', 'Akses terbatas sesuai permission')
ON CONFLICT (name) DO NOTHING;

-- Reset sequence
SELECT setval('roles_id_seq', (SELECT COALESCE(MAX(id), 0) FROM roles));

INSERT INTO permissions (permission_key, label) VALUES
('dashboard.view', 'Lihat Dashboard'),
('users.view', 'Lihat User'),
('users.create', 'Tambah User'),
('users.edit', 'Edit User'),
('users.delete', 'Hapus User'),
('articles.view', 'Lihat Artikel'),
('articles.create', 'Tambah Artikel'),
('articles.edit', 'Edit Artikel'),
('articles.delete', 'Hapus Artikel'),
('events.view', 'Lihat Event'),
('events.create', 'Tambah Event'),
('events.edit', 'Edit Event'),
('events.delete', 'Hapus Event'),
('programs.view', 'Lihat Program'),
('programs.create', 'Tambah Program'),
('programs.edit', 'Edit Program'),
('programs.delete', 'Hapus Program'),
('galleries.view', 'Lihat Galeri'),
('galleries.create', 'Tambah Galeri'),
('galleries.edit', 'Edit Galeri'),
('galleries.delete', 'Hapus Galeri'),
('testimonials.view', 'Lihat Testimoni'),
('testimonials.create', 'Tambah Testimoni'),
('testimonials.edit', 'Edit Testimoni'),
('testimonials.delete', 'Hapus Testimoni'),
('donations.view', 'Lihat Donasi'),
('donations.edit', 'Verifikasi Donasi'),
('settings.manage', 'Kelola Pengaturan')
ON CONFLICT (permission_key) DO NOTHING;

-- Role permissions for 'user' role
INSERT INTO role_permissions (role_id, permission_id)
SELECT 2, p.id FROM permissions p WHERE p.permission_key IN (
    'dashboard.view',
    'articles.view','articles.create','articles.edit',
    'events.view','events.create','events.edit',
    'programs.view','programs.create','programs.edit',
    'galleries.view','galleries.create','galleries.edit',
    'testimonials.view','testimonials.create','testimonials.edit',
    'donations.view'
)
ON CONFLICT (role_id, permission_id) DO NOTHING;

INSERT INTO categories (name, slug, description) VALUES
('Pengasuhan', 'pengasuhan', 'Tips dan wawasan pengasuhan ayah'),
('Keluarga', 'keluarga', 'Relasi hangat dalam keluarga'),
('Kesehatan Mental', 'kesehatan-mental', 'Pemulihan dan ketahanan emosi')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO programs (title, slug, short_description, description, schedule_info, registration_link, is_featured, status) VALUES
('SAPA Journey', 'sapa-journey', 'Perjalanan belajar ayah bertahap dan terstruktur.', 'Program pembinaan berkelanjutan untuk meningkatkan kapasitas ayah dalam pengasuhan, komunikasi, dan kepemimpinan keluarga.', 'Setiap Sabtu, 09.00 - 11.00 WIB', '#', true, 'active'),
('SAPA Start', 'sapa-start', 'Program awal untuk ayah muda.', 'Pengenalan dasar pengasuhan ayah berbasis empati, kedekatan, dan komunikasi efektif.', 'Minggu ke-2 setiap bulan', '#', true, 'active'),
('SAPA Grow', 'sapa-grow', 'Pendampingan peningkatan kualitas relasi keluarga.', 'Fokus pada pertumbuhan karakter ayah, manajemen emosi, dan disiplin positif.', 'Setiap Rabu, 19.30 WIB', '#', true, 'active'),
('SAPA Lead', 'sapa-lead', 'Kepemimpinan ayah dalam keluarga dan komunitas.', 'Pelatihan leadership untuk ayah agar menjadi teladan positif di rumah dan lingkungan.', 'Bulanan', '#', false, 'active'),
('SAPA Mentor', 'sapa-mentor', 'Program mentoring antar ayah.', 'Sesi mentoring peer-to-peer untuk saling menguatkan dan berbagi praktik baik.', 'Dua minggu sekali', '#', false, 'active'),
('SAPA Class', 'sapa-class', 'Kelas tematik pengasuhan.', 'Kelas topikal: komunikasi, kedisiplinan, pendidikan karakter, dan manajemen konflik.', 'Sesuai kalender', '#', true, 'active'),
('SAPA Camp', 'sapa-camp', 'Family camp untuk ayah dan anak.', 'Aktivitas experiential learning untuk mempererat bonding ayah-anak.', 'Triwulanan', '#', true, 'active'),
('SAPA Stories', 'sapa-stories', 'Cerita inspiratif ayah.', 'Kanal berbagi kisah transformasi dan pembelajaran nyata para ayah.', 'Konten mingguan', '#', false, 'active'),
('SAPA Talk', 'sapa-talk', 'Talkshow bersama narasumber ahli.', 'Diskusi interaktif bersama praktisi keluarga, psikolog, dan komunitas ayah.', 'Bulanan', '#', false, 'active'),
('SAPA Bond', 'sapa-bond', 'Penguatan ikatan ayah-anak.', 'Program aktivitas sederhana namun berdampak untuk membangun kelekatan.', 'Mingguan', '#', false, 'active'),
('SAPA Hobby', 'sapa-hobby', 'Komunitas hobi ayah.', 'Ruang bertemu, berjejaring, dan membangun komunitas sehat lewat hobi positif.', 'Sesuai komunitas', '#', false, 'active'),
('SAPA Recovery', 'sapa-recovery', 'Pemulihan ayah pasca krisis.', 'Pendampingan emosional dan spiritual untuk ayah yang sedang memulihkan diri.', 'Sesuai kebutuhan', '#', true, 'active')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO testimonials (name, role_or_job, testimonial, rating, is_featured) VALUES
('Fadli Rahman', 'Peserta SAPA Class', 'Program SAPA Ayah membuat saya lebih dekat dengan anak dan lebih sabar dalam mengasuh.', 5, true),
('Rizki Maulana', 'Peserta SAPA Journey', 'Materi praktis dan mentor sangat suportif. Perubahan terasa di rumah.', 5, true),
('Hendra Saputra', 'Relawan Komunitas', 'Komunitas yang hangat, profesional, dan benar-benar membangun kualitas ayah.', 5, true)
ON CONFLICT DO NOTHING;

INSERT INTO settings (setting_key, setting_value) VALUES
('site_name', 'Yayasan SAPA Ayah'),
('site_tagline', 'Menyapa untuk Tumbuh, Tumbuh untuk Menyapa'),
('site_email', 'info@sapaayah.or.id'),
('site_phone', '+62 812-3456-7890'),
('site_address', 'Jakarta, Indonesia'),
('hero_video_url', 'https://www.youtube.com/embed/dQw4w9WgXcQ'),
('bank_account', 'BCA 1234567890 a.n Yayasan SAPA Ayah'),
('qris_image', ''),
('whatsapp_number', '6281234567890'),
('instagram_url', 'https://instagram.com'),
('facebook_url', 'https://facebook.com'),
('youtube_url', 'https://youtube.com')
ON CONFLICT (setting_key) DO NOTHING;

-- =====================================================
-- TRIGGER: auto-update updated_at
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ 
DECLARE
    tbl TEXT;
BEGIN
    FOR tbl IN SELECT unnest(ARRAY[
        'profiles', 'categories', 'articles', 'programs', 
        'program_registrations', 'events', 'galleries', 
        'testimonials', 'donations', 'comments', 'settings', 'roles'
    ])
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS update_%s_updated_at ON %s', tbl, tbl);
        EXECUTE format(
            'CREATE TRIGGER update_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION update_updated_at_column()',
            tbl, tbl
        );
    END LOOP;
END $$;

-- =====================================================
-- RLS POLICIES
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE galleries ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_registrations ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ policies (for frontend)
CREATE POLICY "Public can read published articles" ON articles FOR SELECT USING (status = 'published');
CREATE POLICY "Public can read active programs" ON programs FOR SELECT USING (status = 'active');
CREATE POLICY "Public can read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can read galleries" ON galleries FOR SELECT USING (true);
CREATE POLICY "Public can read featured testimonials" ON testimonials FOR SELECT USING (is_featured = true);
CREATE POLICY "Public can read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public can read settings" ON settings FOR SELECT USING (true);
CREATE POLICY "Public can read approved comments" ON comments FOR SELECT USING (status = 'approved');
CREATE POLICY "Public can read roles" ON roles FOR SELECT USING (true);
CREATE POLICY "Public can read permissions" ON permissions FOR SELECT USING (true);
CREATE POLICY "Public can read role_permissions" ON role_permissions FOR SELECT USING (true);

-- PUBLIC INSERT policies (for forms)
CREATE POLICY "Public can submit contacts" ON contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit donations" ON donations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can submit comments" ON comments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can register programs" ON program_registrations FOR INSERT WITH CHECK (true);

-- AUTHENTICATED user policies
CREATE POLICY "Authenticated users can read own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Authenticated users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Authenticated users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- ADMIN policies (role_id = 1)
CREATE POLICY "Admin full access articles" ON articles FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access programs" ON programs FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access events" ON events FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access galleries" ON galleries FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access testimonials" ON testimonials FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access donations" ON donations FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access contacts" ON contacts FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access comments" ON comments FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access categories" ON categories FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access settings" ON settings FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access activity_logs" ON activity_logs FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin read all profiles" ON profiles FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);
CREATE POLICY "Admin full access program_registrations" ON program_registrations FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role_id = 1)
);

-- =====================================================
-- FUNCTION: Auto-create profile on user signup
-- =====================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role_id)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
        2
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
