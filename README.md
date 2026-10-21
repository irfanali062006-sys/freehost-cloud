# FreeHost Cloud — Starter Dashboard

A mobile-friendly static hosting dashboard prototype intended to be edited and published from an Android phone.

## What is included
- Responsive dashboard and sidebar navigation
- Sample Ubuntu and Windows/mock server inventory
- Demo-only “Create server” form
- Activity page and workspace settings
- No build tools or package installation required

## Important limitations
This is a **front-end prototype only**. It does not create, start, stop, or connect to real VPS instances. CPU, RAM, storage, server status, and activity shown are illustrative sample data. The Windows entry is a mock entry, not a Windows machine.

GitHub Pages can host the static site, but it cannot run a private server-side backend or safely store cloud provider credentials. Do not put cloud API keys, SSH private keys, passwords, or other secrets in these files.

## Publish from Android using GitHub Pages
1. Sign in at https://github.com/ and create a new **public** repository, for example `freehost-cloud`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root. You can upload the ZIP contents after extracting the ZIP on your phone; do not upload the ZIP itself as a replacement for the source files.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Choose branch `main` and folder `/(root)`, then press **Save**.
6. Wait for deployment and open the website URL shown in Pages settings. It will typically look like `https://YOUR-USERNAME.github.io/freehost-cloud/`.

## Next stage for real infrastructure
To provision real servers, add a backend API, database, authentication, authorization, audit logging, rate limits, and a provider integration. Keep provider credentials in backend environment secrets. Before offering hosting to other people, add quotas, abuse controls, billing/terms if relevant, backups, monitoring, and a secure server lifecycle.
