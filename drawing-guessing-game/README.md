# Real-Time Multiplayer Drawing & Guessing Game

A starter full-stack project with FastAPI, WebSockets, SQLAlchemy, MySQL 8, React, TypeScript, Vite, HTML Canvas, and Material UI.

## Features included
- Create a room and join by room code
- Lobby player list and ready status
- WebSocket live events and shared drawing strokes (no canvas screenshots sent)
- Brush, eraser, color, brush size, and clear canvas
- Drawer-only secret word event
- Guess validation on the backend, duplicate correct-guess prevention, points, timer, rounds and final leaderboard
- SQL persistence for rooms, players, rounds, and guesses
- REST endpoints and Swagger/OpenAPI
- Docker Compose and a basic test

## Important MVP notes
- Active room state and WebSocket connections are in process memory. This is suitable for local development with one backend process, not horizontal scaling. For production/multiple workers, move active state to Redis and use a distributed pub/sub mechanism.
- A room's live state is created in memory. Completed history endpoints and durable recovery after server restart are not implemented in this starter.
- WebSocket identity currently uses the player ID in the URL; add signed player tokens before public deployment.
- Canvas uses normalized coordinates, so clients with different screen sizes can reconstruct strokes.
- SQLAlchemy creates tables automatically for quick startup; Alembic files are included as a migration starting point.
- For a production release, add rate limiting, reconnect tokens, robust disconnect grace periods, moderation, and server-side timer scheduling.

## Run locally on Windows

### 1. MySQL
Create a database:
```sql
CREATE DATABASE drawing_game CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```
Copy `backend/.env.example` to `backend/.env`, and update the MySQL password in `DATABASE_URL`.

### 2. Backend (PowerShell)
```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
If you do not have MySQL ready yet, omit `backend/.env` and the app defaults to a local SQLite database for a quick demo.

Open Swagger: http://127.0.0.1:8000/docs

### 3. Frontend (new terminal)
```powershell
cd frontend
npm install
npm run dev
```
Open: http://localhost:5173

### 4. Docker Compose
From the project root:
```powershell
docker compose up --build
```
Open frontend at http://localhost:5173 and Swagger at http://localhost:8000/docs.

## REST API
- `GET /` health information
- `POST /api/rooms` create room (`display_name`, `total_rounds`)
- `POST /api/rooms/{room_code}/join` join lobby (`display_name`)
- `GET /api/rooms/{room_code}` get active room state (does not include secret word)
- `GET /api/leaderboard/{room_code}` current leaderboard

## WebSocket
Connect to `ws://localhost:8000/ws/{room_code}/{player_id}`. Send JSON envelopes:
```json
{"event":"ready","data":{"ready":true}}
{"event":"start_game","data":{}}
{"event":"draw_stroke","data":{"x1":0.1,"y1":0.2,"x2":0.2,"y2":0.3,"color":"#202020","width":4,"tool":"brush"}}
{"event":"guess","data":{"text":"apple"}}
{"event":"clear_canvas","data":{}}
```
Server messages use `{"event":"event_name","data":{...}}`. The `secret_word` event is sent directly to the drawer only.

## Tests
```powershell
cd backend
pytest
```

## VS Code
Open the extracted `drawing-guessing-game` folder in VS Code. Run backend and frontend in separate terminals as above.
