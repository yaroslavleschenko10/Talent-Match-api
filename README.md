# TalentMatch API

NestJS + TypeORM + PostgreSQL backend for the TalentMatch platform.

## Stack

- **NestJS 11** — REST API
- **TypeORM 0.3** — ORM
- **PostgreSQL 16** — database
- **JWT + Passport** — authentication
- **class-validator** — DTO validation

## Quick start

```bash
# 1. Start PostgreSQL
docker compose up -d

# 2. Install dependencies
npm install

# 3. Copy env (already present as .env)
# cp .env.example .env

# 4. Run API (synchronize creates tables in dev)
npm run start:dev

# 5. Seed demo data (optional)
npm run seed
```

API: `http://localhost:3001/api`  
Swagger UI: `http://localhost:3001/api/docs`

## Auth

| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/register` | Register candidate or employer |
| POST | `/api/auth/login` | Login, returns JWT |

```json
// Register
{
  "email": "user@example.com",
  "password": "password123",
  "role": "candidate",
  "firstName": "Олена",
  "lastName": "Коваленко",
  "position": "Frontend Developer",
  "location": "Київ"
}
```

Header: `Authorization: Bearer <accessToken>`

## Main endpoints

### Candidates
- `GET /api/candidates` — list (filters: position, location, minExperience, skill)
- `GET /api/candidates/:id` — profile
- `GET /api/candidates/me` — own profile (auth)
- `PATCH /api/candidates/me` — update profile (auth)

### Employers
- `GET /api/employers/me` — own company profile (auth)
- `PATCH /api/employers/me` — update (auth)
- `GET /api/employers/:id`

### Vacancies
- `GET /api/vacancies?employerId=`
- `GET /api/vacancies/:id`
- `POST /api/vacancies` (auth)
- `PATCH /api/vacancies/:id` (auth)
- `PATCH /api/vacancies/:id/status` (auth)

### Pipeline
- `GET /api/pipeline/stages?employerId=`
- `GET /api/pipeline/candidates?employerId=`
- `POST /api/pipeline/candidates` (auth)
- `PATCH /api/pipeline/candidates/:id/stage` (auth)

### Chats
- `GET /api/chats?employerId=` or `?candidateId=`
- `GET /api/chats/:id/messages`
- `POST /api/chats/:id/messages` (auth)

### Interviews
- `GET /api/interviews?employerId=` or `?candidateId=`
- `POST /api/interviews` (auth)
- `PATCH /api/interviews/:id` (auth)

### Requests / Applications / Saved / Blacklist
- `GET|POST /api/requests`
- `PATCH /api/requests/:id/status`
- `GET /api/applications?candidateId=`
- `GET|POST /api/blacklist`
- `DELETE /api/blacklist/:id`
- `GET|POST /api/saved-jobs`
- `DELETE /api/saved-jobs/:id`

## Demo accounts (after seed)

| Role | Email | Password |
|------|-------|----------|
| Candidate | olena@example.com | password123 |
| Employer | hr@techcorp.ua | password123 |

## Project structure

```
src/
  auth/           # JWT auth, User entity
  candidates/     # Profiles, work history, education, projects
  employers/      # Company profiles
  vacancies/      # Vacancies + vacancy candidates
  pipeline/       # Stages + pipeline candidates
  chats/          # Chats + messages
  interviews/     # Interview scheduling
  applications/   # Requests, applications, blacklist, saved jobs
  common/enums.ts
  main.ts
  app.module.ts
  seed.ts
```

## Production notes

- Set `NODE_ENV=production` — disables `synchronize`
- Use migrations: `npm run migration:generate` / `migration:run`
- Change `JWT_SECRET` to a long random string
- Put PostgreSQL behind a private network
