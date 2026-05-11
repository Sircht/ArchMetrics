#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

export NEXT_TELEMETRY_DISABLED="${NEXT_TELEMETRY_DISABLED:-1}"
export HOSTNAME="${HOSTNAME:-0.0.0.0}"
export PORT="${PORT:-3000}"

if [ ! -f .env ]; then
  cp .env.example .env
  if command -v openssl >/dev/null 2>&1; then
    SECRET="$(openssl rand -base64 32 | tr -d '\n')"
    SECRET="$SECRET" node - <<'NODE'
const fs = require('node:fs');
const path = '.env';
fs.writeFileSync(path, fs.readFileSync(path, 'utf8').replace('replace-with-a-secure-random-secret', process.env.SECRET));
NODE
  fi
  echo "Created .env from .env.example"
fi

if [ ! -d node_modules ]; then
  echo "Installing dependencies..."
  npm install
fi

if [ -n "${WAIT_FOR_POSTGRES:-}" ]; then
  node scripts/wait-for-port.mjs "${POSTGRES_HOST:-localhost}" "${POSTGRES_PORT:-5432}" "${POSTGRES_TIMEOUT_MS:-45000}"
fi

npx prisma generate

if [ "${PRISMA_DB_PUSH:-0}" = "1" ]; then
  npx prisma db push
fi

echo "ArchMetrics local preview: http://localhost:${PORT}"
echo "Flagship Stair Calculator: http://localhost:${PORT}/calculators/stair"
npm run dev -- --hostname "$HOSTNAME" --port "$PORT"
