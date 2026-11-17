# Huellitas Veterinaria

Aplicación móvil en Expo y React Native para registrar clientes y mascotas, consultar un catálogo veterinario en Supabase y abrir la ficha correcta al leer un código QR.

## Funcionalidades para la entrega

- Registro e historial de clientes protegidos con autenticación de Supabase.
- Catálogo de productos veterinarios consultado desde `public.catalogo`.
- Ficha de producto por código.
- Cámara real con `expo-camera` para leer códigos QR.
- Manejo de permisos, QR inválidos, productos inexistentes y errores de Supabase.

## Instalación

Usa siempre esta carpeta interna del proyecto:

```powershell
cd "C:\Users\Asus-Pc\Desktop\DubanProg\sem 6b\disp-moviles\MiApp\MiPrimeraApp\MiPrimeraApp"
npm install
npx expo start --clear
```

Instala Expo Go compatible con el SDK indicado por la dependencia `expo` de `package.json`. Para probar la cámara, usa un celular físico y concede el permiso cuando la aplicación lo solicite.

## Variables de entorno

1. Copia `.env.example` y nómbralo `.env`.
2. Conserva la URL pública de Supabase y pega únicamente la **Publishable key** en `EXPO_PUBLIC_SUPABASE_KEY`.
3. Nunca agregues una clave `service_role` al proyecto ni la subas a GitHub.

## Configuración de Supabase

En Supabase abre **SQL Editor**, crea una consulta nueva y ejecuta:

```text
supabase/03_catalogo_veterinaria_qr.sql
```

El script crea o completa `public.catalogo`, agrega cuatro productos veterinarios de prueba y aplica RLS con lectura de catálogo únicamente. No cambia `clientes_veterinaria` ni información personal.

Después verifica en **Table Editor** que los códigos existen:

| Código | Producto |
| --- | --- |
| `VET-001` | Correa para perro grande |
| `VET-002` | Alimento premium para perros |
| `VET-003` | Collar antipulgas |
| `VET-004` | Transportadora para gatos |

## QR para la demostración

Los PNG ya están listos en `docs/qr/`. Desde Catálogo usa **Ver QR de prueba** para mostrar uno por vez; así la cámara no puede leer otro QR por error. Ábrelos en otro dispositivo o imprímelos para la demostración. Cada QR contiene solamente uno de estos valores, sin URL, espacios ni claves:

- `VET-001`
- `VET-002`
- `VET-003`
- `VET-004`

El archivo `docs/qr/QR-TRAMPA.png` es la prueba inválida. La aplicación debe mostrar que ese producto no existe y permitir escanear de nuevo.

## Recorrido de prueba

1. Inicia sesión en la aplicación.
2. En Inicio abre **Catálogo interactivo** y comprueba que aparecen los registros reales de Supabase.
3. Pulsa **Ver detalles** en un producto y confirma que se muestra su mismo código, título, descripción, detalle y precio.
4. Regresa al inicio o al catálogo, abre **Escanear código QR** y concede el permiso de cámara.
5. Escanea `VET-001` y comprueba que se abre su ficha.
6. Repite con otros dos códigos válidos y con `QR-TRAMPA`.

## Verificación técnica

```powershell
npx tsc --noEmit
npm run lint
```

## Guion sugerido para el video

El video dura como máximo cinco minutos y deben participar los dos integrantes:

1. Presentar Huellitas Veterinaria y su propósito.
2. Mostrar `catalogo.tsx`, `detalle.tsx`, `escanear.tsx`, `index.tsx`, `_layout.tsx` y el archivo SQL.
3. Mostrar en Supabase la tabla `catalogo` y sus políticas de solo lectura.
4. Demostrar catálogo, detalle, tres QR válidos y `QR-TRAMPA` en la cámara real del celular.
