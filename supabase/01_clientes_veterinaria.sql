-- Huellitas Veterinaria: tabla de clientes y mascotas.
-- Para una base nueva, ejecuta este archivo en Supabase > SQL Editor > New query.

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
  tipo_atencion text not null,
  mascota_enferma boolean not null default false,
  created_at timestamptz not null default now()
);

-- Migración segura para tablas creadas antes del campo tipo_atencion.
alter table public.clientes_veterinaria
  add column if not exists tipo_atencion text;

update public.clientes_veterinaria
set tipo_atencion = 'Consulta general'
where tipo_atencion is null or btrim(tipo_atencion) = '';

alter table public.clientes_veterinaria
  alter column tipo_atencion set not null;

alter table public.clientes_veterinaria
  drop constraint if exists clientes_veterinaria_tipo_atencion_valido;

alter table public.clientes_veterinaria
  add constraint clientes_veterinaria_tipo_atencion_valido
  check (btrim(tipo_atencion) <> '');

-- Seguridad: la tabla no queda disponible para visitantes anonimos.
alter table public.clientes_veterinaria enable row level security;

revoke all on table public.clientes_veterinaria from anon, authenticated;
grant usage on schema public to authenticated;
grant select, insert on table public.clientes_veterinaria to authenticated;
grant usage, select on sequence public.clientes_veterinaria_id_seq to authenticated;

-- Elimina las politicas antiguas de la app sin login y crea las nuevas.
drop policy if exists "permitir insertar clientes" on public.clientes_veterinaria;
drop policy if exists "permitir consultar clientes" on public.clientes_veterinaria;
drop policy if exists "usuarios autenticados insertan clientes" on public.clientes_veterinaria;
drop policy if exists "usuarios autenticados consultan clientes" on public.clientes_veterinaria;

create policy "usuarios autenticados insertan clientes"
on public.clientes_veterinaria
for insert
to authenticated
with check (true);

create policy "usuarios autenticados consultan clientes"
on public.clientes_veterinaria
for select
to authenticated
using (true);

-- Verificación: se debe ejecutar con una cuenta autenticada en la app.
select *
from public.clientes_veterinaria
order by id desc;
