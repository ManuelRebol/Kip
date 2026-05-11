# Kip

[![Deploy to GitHub Pages](https://github.com/ManuelRebol/Kip/actions/workflows/deploy.yml/badge.svg)](https://github.com/ManuelRebol/Kip/actions/workflows/deploy.yml)

A full-stack web application with a React frontend and a Django REST backend, orchestrated with Docker Compose for local development and deployed automatically to GitHub Pages via GitHub Actions.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 · TypeScript · Vite · pnpm |
| Backend | Django · Django REST Framework · SQLite |
| Styling / UI | Lucide React · React Toastify |
| State | Zustand · TanStack Query |
| Infrastructure | Docker · Docker Compose · Nginx |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Project Structure

```
Kip/
├── client/               # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── Dockerfile        # Multi-stage build (Node → Nginx)
│   ├── nginx.conf
│   └── package.json
├── server/               # Django backend
│   ├── api/
│   ├── kip/              # Django project settings
│   ├── manage.py
│   ├── requirements.txt
│   ├── dockerfile
│   └── entrypoint.sh
├── docker-compose.yml    # Local orchestration
└── .github/
    └── workflows/
        └── deploy.yml    # CI/CD pipeline
```

---

## Getting Started (Local)

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) ≥ 24
- [Docker Compose](https://docs.docker.com/compose/install/) ≥ 2

> **Note:** No need to install Node, pnpm, or Python locally — Docker handles everything.

### Running with Docker Compose

```bash
# 1. Clone the repository
git clone https://github.com/ManuelRebol/Kip.git
cd Kip

# 2. Start all services
docker compose up --build

# 3. Access the app
#    Frontend: http://localhost:3000
#    Backend:  http://localhost:8000
```

To stop the services:

```bash
docker compose down
```

To reset the SQLite database volume:

```bash
docker compose down -v
```

### Running without Docker

<details>
<summary>Frontend (requires Node ≥ 18 and pnpm)</summary>

```bash
cd client
npm install -g pnpm
pnpm install
pnpm dev
# Available at http://localhost:5173
```

</details>

<details>
<summary>Backend (requires Python 3.12)</summary>

```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
# Available at http://localhost:8000
```

</details>

---

### Required setup (one-time)

1. Go to **Settings → Pages** in the GitHub repository.
2. Under **Source**, select **GitHub Actions**.
3. Push to `main` — the workflow handles the rest.

The workflow file is located at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

---

## Contributing

1. Fork the repository and create a feature branch: `git checkout -b feat/your-feature`
2. Make your changes and commit using [Conventional Commits](https://www.conventionalcommits.org/): `git commit -m "feat: add X"`
3. Push and open a Pull Request against `main`
4. The CI pipeline will run automatically on your PR
