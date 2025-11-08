-- Enable RLS and add basic policies

-- users (profile) table: only owner can read/update/insert
alter table public.users enable row level security;
create policy "users select self" on public.users for select using (id = auth.uid());
create policy "users update self" on public.users for update using (id = auth.uid());
create policy "users insert self" on public.users for insert with check (id = auth.uid());

-- categories: public readable
alter table public.categories enable row level security;
create policy "categories read for all" on public.categories for select using (true);

-- travel_products: public readable
alter table public.travel_products enable row level security;
create policy "travel_products read for all" on public.travel_products for select using (true);

-- group_buyings: public readable
alter table public.group_buyings enable row level security;
create policy "group_buyings read for all" on public.group_buyings for select using (true);

-- group_participants: user self readable/insertable
alter table public.group_participants enable row level security;
create policy "participants select own" on public.group_participants for select using (user_id = auth.uid());
create policy "participants insert self" on public.group_participants for insert with check (user_id = auth.uid());

-- orders: only owner can read/insert/update
alter table public.orders enable row level security;
create policy "orders select own" on public.orders for select using (user_id = auth.uid());
create policy "orders insert self" on public.orders for insert with check (user_id = auth.uid());
create policy "orders update own" on public.orders for update using (user_id = auth.uid());

-- wallets: only owner can read/insert/update
alter table public.wallets enable row level security;
create policy "wallets select own" on public.wallets for select using (user_id = auth.uid());
create policy "wallets insert self" on public.wallets for insert with check (user_id = auth.uid());
create policy "wallets update own" on public.wallets for update using (user_id = auth.uid());

-- chat_messages: public readable, authenticated can insert
alter table public.chat_messages enable row level security;
create policy "chat_messages read for all" on public.chat_messages for select using (true);
create policy "chat_messages insert by authenticated" on public.chat_messages for insert with check (auth.uid() is not null);

-- coupons: public readable
alter table public.coupons enable row level security;
create policy "coupons read for all" on public.coupons for select using (true);

-- user_coupons: only owner
alter table public.user_coupons enable row level security;
create policy "user_coupons select own" on public.user_coupons for select using