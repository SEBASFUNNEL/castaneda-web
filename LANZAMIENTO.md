# Cómo se publica la web

Web estática (Astro). Se compila en la PC y el resultado (`dist/`) se sube al hosting de GoDaddy (Web Hosting Deluxe, cPanel). Dominio principal: **grupocastaneda.com.pe**.

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
2. Con el candado activo, editar `.htaccess` en `public_html` y quitar el `#` de la regla 2 (HTTPS obligatorio).
3. Cuando `grupocastaneda.com.pe` ya cargue la web, quitar el `#` de la regla 3 (el dominio `.pro` redirige al principal).

## 5. Revisar después de publicar

- `https://grupocastaneda.com.pe`, `/servicios/`, `/nosotros/`, `/conversemos/` abren.
- `www.` redirige al dominio sin `www`.
- El formulario de `/conversemos/` llega al correo de Formspree.
- `https://grupocastaneda.com.pe/sitemap.xml` y `/robots.txt` responden.
- Al pegar el link en WhatsApp aparece la imagen de marca.

Si tras subir aparece un error 500, el primer sospechoso es `.htaccess`: renombrarlo a `htaccess.txt`, recargar y avisar.
