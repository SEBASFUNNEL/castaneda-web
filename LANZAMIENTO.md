# Cómo se publica la web

Web estática (Astro). Se compila y el resultado (`dist/`) se sube al hosting de GoDaddy (Web Hosting Deluxe, cPanel). Dominio principal: **grupocastaneda.com.pe**.

Lo normal es la **publicación automática** (sección 6): cada cambio que entra a `main` se compila y se sube solo. Las secciones 1 y 2 son la forma manual, por si la automática falla.

## 1. Compilar

Requiere Node 22.12 o superior. Desde la carpeta del proyecto:

```sh
npm ci && npm run build
```

Termina con un código de salida 0 y crea la carpeta `dist/` (6 páginas más `404.html`, `sitemap.xml`, `robots.txt` y `.htaccess`).

## 2. Subir a GoDaddy

1. GoDaddy → Mis productos → Web Hosting → Administrar → **cPanel Admin**.
2. **File Manager** → carpeta `public_html`. Activar *Settings → Show Hidden Files* para ver los archivos ocultos (`.htaccess`).
3. Comprimir el contenido de `dist/` en un `.zip` (el contenido, no la carpeta `dist`), subirlo a `public_html` y usar **Extract**.
4. Comprobar que `index.html` y `.htaccess` quedaron directamente dentro de `public_html`.

No tocar las cuentas de correo del hosting: viven fuera de `public_html`.

## 3. Dominio (grupocastaneda.com.pe)

El dominio está registrado en NIC.PE y su DNS lo administra NIC.PE (`ns.rcp.net.pe`), no GoDaddy. Para que cargue la web solo se agregan estos dos registros allí; **no** se cambian los nameservers porque el correo (Zoho) depende de los registros actuales:

| Tipo | Nombre | Valor |
|---|---|---|
| A | `@` | IP del hosting (cPanel → barra derecha → *Shared IP Address*) |
| CNAME | `www` | `grupocastaneda.com.pe` |

Registros de correo que **deben quedar intactos**: MX (`mx.zoho.com`, `mx2.zoho.com`, `mx3.zoho.com`), TXT de SPF, TXT de Brevo, `mail._domainkey` (DKIM) y `_dmarc`.

En cPanel, agregar `grupocastaneda.com.pe` en *Domains → Create A New Domain*, compartiendo la carpeta `public_html` con el dominio principal.

## 4. Candado (HTTPS) y redirecciones

1. Cuando el dominio ya apunte al hosting: cPanel → **SSL/TLS Status** → *Run AutoSSL* (o instalar el certificado del plan).
2. Con el candado activo, quitar el `#` de la regla 2 (HTTPS obligatorio) en `public/.htaccess`.
3. Cuando `grupocastaneda.com.pe` ya cargue la web, quitar el `#` de la regla 3 (el dominio `.pro` redirige al principal).

El `.htaccess` se edita **en el repo** (`public/.htaccess`) y se publica con un PR. No editarlo en cPanel: la siguiente publicación automática lo sobrescribe.

## 5. Revisar después de publicar

- `https://grupocastaneda.com.pe`, `/servicios/`, `/nosotros/`, `/conversemos/` abren.
- `www.` redirige al dominio sin `www`.
- El formulario de `/conversemos/` llega al correo de Formspree.
- `https://grupocastaneda.com.pe/sitemap.xml` y `/robots.txt` responden.
- Al pegar el link en WhatsApp aparece la imagen de marca.

Si tras subir aparece un error 500, el primer sospechoso es `.htaccess`: renombrarlo a `htaccess.txt`, recargar y avisar.

## 6. Publicación automática (GitHub → GoDaddy)

Cada cambio que entra a `main` se compila y se sube solo a `public_html` (workflow `.github/workflows/publicar-godaddy.yml`, unos 2 a 3 minutos). Solo sube lo que cambió y solo borra lo que ella misma subió antes, así que no toca `.well-known` ni el correo. No publica desde ramas ni desde PRs, solo desde `main`.

### Configuración (una sola vez)

1. cPanel → **FTP Accounts** → crear una cuenta solo para publicar (por ejemplo `publicar`), con una contraseña larga generada y **Directory = `public_html`**. Así la cuenta no alcanza nada fuera de la web.
2. En esa misma pantalla, *Configure FTP Client* muestra el nombre del servidor. Usar ese nombre, no la IP.
3. GitHub → repo → *Settings → Secrets and variables → Actions → New repository secret*. Crear tres:
   - `FTP_SERVER`: el nombre del servidor del paso 2.
   - `FTP_USERNAME`: el usuario completo, con su `@dominio`.
   - `FTP_PASSWORD`: la contraseña.
4. Probar la conexión: pestaña **Actions** → *Publicar en GoDaddy* → *Run workflow* → marcar `solo_probar`. Muestra qué subiría sin subir nada.

### Uso diario

Rama → PR → *Merge* a `main` → la web se actualiza sola. El estado se ve en la pestaña **Actions** (✓ verde = publicado). Si falla, se corrige y se usa *Re-run all jobs*; una subida cortada a la mitad se completa al repetirla.

### Reglas

- `.htaccess` se edita en `public/.htaccess` (Git), nunca en cPanel.
- Los archivos que se suban a mano a `public_html` y no estén en el repo no se borran, pero tampoco quedan versionados. Mejor ponerlos en `public/`.
- Para cambiar la contraseña FTP: cambiarla en cPanel y actualizar el secreto `FTP_PASSWORD`.
- Nunca pegar la contraseña FTP en el chat, en issues ni en el código.

### Si falla

- `530 Login incorrect`: usuario o contraseña mal en los secretos (el usuario va completo, con `@dominio`).
- Error de certificado o TLS: el nombre del servidor no coincide con el certificado. Usar el nombre que muestra cPanel (no la IP).
- Timeout o conexión rechazada: reintentar; si persiste, confirmar que el plan de hosting permite FTP.
