#!/usr/bin/env bash
set -euo pipefail

: "${DEPLOY_HOST:?DEPLOY_HOST не задан}"
: "${DEPLOY_USER:?DEPLOY_USER не задан}"
: "${DEPLOY_PATH:?DEPLOY_PATH не задан}"
DEPLOY_PORT="${DEPLOY_PORT:-22}"

case "$DEPLOY_PATH" in
  "" | "/" | "~" | "~/" | "/home" | "/home/")
    echo "DEPLOY_PATH='$DEPLOY_PATH' слишком широкий: rsync --delete вычистит лишнее" >&2
    exit 1
    ;;
esac

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ ! -f "$root/dist/index.html" ]; then
  echo "dist/index.html не найден — сначала npm run build" >&2
  exit 1
fi

target="$DEPLOY_USER@$DEPLOY_HOST:$DEPLOY_PATH/"

echo "Что изменится в $target:"
rsync -az --delete --itemize-changes --dry-run \
  -e "ssh -p $DEPLOY_PORT -o StrictHostKeyChecking=accept-new" \
  "$root/dist/" "$target"

if [ "${1:-}" = "--dry-run" ]; then
  exit 0
fi

rsync -az --delete --human-readable --stats \
  -e "ssh -p $DEPLOY_PORT -o StrictHostKeyChecking=accept-new" \
  "$root/dist/" "$target"

echo "Готово: https://kirillkhlebov.ru"
