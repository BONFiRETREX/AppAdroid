-- Huellitas Veterinaria: cambia el acceso de anonimo a autenticado.
-- Ejecuta este archivo UNA VEZ si clientes_veterinaria ya existia.

alter table public.clientes_veterinaria enable row level security;

revoke all on table public.clientes_veterinaria from anon, authenticated;
grant usage on schema public to authenticated;
grant select, insert on table public.clientes_veterinaria to authenticated;
grant usage, select on sequence public.clientes_veterinaria_id_seq to authenticated;

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

-- Prueba en SQL Editor: debe listar los registros para el rol de administrador.
select id, nombre, tipo_animal, tipo_atencion, created_at
from public.clientes_veterinaria
order by id desc;
