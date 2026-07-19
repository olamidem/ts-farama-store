create table if not exists purchases (
    id uuid primary key default gen_random_uuid(),
    purchase_number text not null unique,
    supplier_id uuid not null
        references suppliers(id),
    warehouse_id uuid,
    status text not null
        check (
            status in (
                'PENDING',
                'APPROVED',
                'ORDERED',
                'PARTIALLY_RECEIVED',
                'RECEIVED',
            )
        ),
    total_amount numeric(12,2) default 0,
    purchase_date date not null,
    expected_delivery_date date,
    received_percentage integer
        default 0
        check (
            received_percentage between 0 and 100
        ),
    remarks text,
    created_by uuid,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

create index if not exists idx_purchases_supplier
on purchases(supplier_id);

create index if not exists idx_purchases_status
on purchases(status);

create index if not exists idx_purchases_number
on purchases(purchase_number);