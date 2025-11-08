begin;

-- Users
create table if not exists public.users (
  id uuid primary key,
  email text not null unique,
  nickname text,
  phone text,
  avatar_url text,
  bio text,
  location text,
  level integer not null default 1,
  points integer not null default 0,
  is_verified boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Travel Products (minimal, referenced by group_buyings and orders)
create table if not exists public.travel_products (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  destination text not null,
  duration integer not null,
  price numeric(12,2) not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Group Buyings
create table if not exists public.group_buyings (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.travel_products(id) on delete cascade,
  creator_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  description text,
  target_participants integer not null,
  current_participants integer not null default 0,
  min_participants integer not null default 1,
  price_per_person numeric(12,2) not null,
  start_date timestamptz not null,
  end_date timestamptz not null,
  deadline timestamptz not null,
  status text not null check (status in ('active','full','completed','expired','cancelled')),
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Group Participants
create table if not exists public.group_participants (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.group_buyings(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  role text not null check (role in ('creator','participant')),
  joined_at timestamptz not null default now(),
  status text not null default 'active' check (status in ('active','cancelled')),
  unique (group_id, user_id)
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  group_id uuid references public.group_buyings(id) on delete set null,
  product_id uuid not null references public.travel_products(id) on delete cascade,
  order_no text not null unique,
  total_amount numeric(12,2) not null,
  participants_count integer not null default 1,
  status text not null check (status in ('pending','paid','confirmed','cancelled','refunded')),
  contact_name text not null,
  contact_phone text not null,
  contact_email text,
  travel_date timestamptz not null,
  notes text,
  paid_at timestamptz,
  confirmed_at timestamptz,
  cancelled_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Chat Messages
create table if not exists public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  group_id uuid not null references public.group_buyings(id) on delete cascade,
  user_id uuid not null references public.users(id) on delete cascade,
  message text not null,
  message_type text not null default 'text' check (message_type in ('text','image','system')),
  created_at timestamptz not null default now()
);

-- RPC: increment_group_participants
create or replace function public.increment_group_participants(group_id uuid)
returns void as $$
begin
  update public.group_buyings
  set current_participants = coalesce(current_participants, 0) + 1,
      updated_at = now()
  where id = group_id;
end;
$$ language plpgsql;