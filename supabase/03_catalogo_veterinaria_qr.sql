-- Huellitas Veterinaria: catálogo público de productos para el lector QR.
-- Ejecuta este archivo en Supabase > SQL Editor > New query.
-- No modifica las tablas de clientes, usuarios ni mascotas.

create table if not exists public.catalogo (
  codigo text primary key,
  titulo text not null,
  descripcion text not null,
  detalle text,
  precio numeric(12, 2),
  created_at timestamptz not null default now()
);

-- Migración segura si la tabla ya existía antes de este taller.
alter table public.catalogo
  add column if not exists detalle text;

alter table public.catalogo
  add column if not exists created_at timestamptz default now();

-- Productos de prueba. ON CONFLICT conserva un registro que ya exista
-- con el mismo código, por lo que se puede ejecutar más de una vez.
insert into public.catalogo (codigo, titulo, descripcion, detalle, precio)
values
  (
    'VET-001',
    'Correa para perro grande',
    'Correa reforzada para paseos de perros grandes.',
    'Correa ajustable con mosquetón metálico y agarre acolchado para un paseo seguro.',
    65000
  ),
  (
    'VET-002',
    'Alimento premium para perros',
    'Alimento balanceado para perros adultos.',
    'Bolsa de 3 kg con proteínas, vitaminas y minerales para la alimentación diaria.',
    120000
  ),
  (
    'VET-003',
    'Collar antipulgas',
    'Collar de protección contra pulgas y garrapatas.',
    'Protección continua para mascotas según las indicaciones del empaque.',
    42000
  ),
  (
    'VET-004',
    'Transportadora para gatos',
    'Transportadora ventilada para llevar gatos de forma segura.',
    'Cuenta con puerta frontal, ventilación lateral y espacio cómodo para el traslado.',
    95000
  )
on conflict (codigo) do nothing;

-- Seguridad: el catálogo es de solo lectura para la app.
-- Las tablas de clientes permanecen protegidas por sus propias políticas.
alter table public.catalogo enable row level security;

revoke all on table public.catalogo from anon, authenticated;
grant usage on schema public to anon, authenticated;
grant select on table public.catalogo to anon, authenticated;

-- Limpia políticas de versiones anteriores de este mismo catálogo.
drop policy if exists "leer_catalogo_auth" on public.catalogo;
drop policy if exists "leer_catalogo_authenticated" on public.catalogo;
drop policy if exists "lectura_catalogo_publico" on public.catalogo;

create policy "lectura_catalogo_publico"
on public.catalogo
for select
to anon, authenticated
using (true);

-- Comprobaciones: deben verse los cuatro productos y SELECT debe ser true.
select codigo, titulo, precio
from public.catalogo
order by titulo asc;

select has_table_privilege('authenticated', 'public.catalogo', 'SELECT') as authenticated_puede_leer;
