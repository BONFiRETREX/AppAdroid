-- Huellitas Veterinaria · registro de clientes y sus mascotas.
-- Ejecuta este archivo una vez en Supabase Dashboard > SQL Editor > New query.

create table if not exists public.clientes_veterinaria (
  id bigint generated always as identity primary key,
  nombre text not null,
  correo text not null,
  telefono text not null,
  tipo_animal text not null,
  raza text not null,
  peso_kg numeric(6, 2) not null check (peso_kg > 0),
  edad text not null,
  motivo_consulta text not null,
  mascota_enferma boolean not null default false,
  created_at timestamptz not null default now()
);

-- Restricciones: solo se permite consultar e insertar desde la app.
alter table public.clientes_veterinaria enable row level security;

revoke all on table public.clientes_veterinaria from anon, authenticated;
grant usage on schema public to anon;
grant select, insert on table public.clientes_veterinaria to anon;
grant usage on sequence public.clientes_veterinaria_id_seq to anon;

drop policy if exists "permitir insertar clientes" on public.clientes_veterinaria;
drop policy if exists "permitir consultar clientes" on public.clientes_veterinaria;

create policy "permitir insertar clientes"
on public.clientes_veterinaria
for insert
to anon
with check (true);

create policy "permitir consultar clientes"
on public.clientes_veterinaria
for select
to anon
using (true);

-- Verificación: inicialmente puede devolver cero filas.
select *
from public.clientes_veterinaria
order by id desc;
