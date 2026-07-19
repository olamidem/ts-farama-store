create table if not exists suppliers (

    id uuid primary key default gen_random_uuid(),
    name text not null,
    email text,
    phone text,
    address text,
    remarks text,
    is_active boolean default true,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_suppliers_name
on suppliers(name);