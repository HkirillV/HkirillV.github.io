# Деплой

Сайт — статика. `npm run build` кладёт в `dist/` готовые файлы: пререндеренный
HTML, бандлы, шрифты, картинки, `robots.txt` и `sitemap.xml`. На проде не нужен
ни Node, ни база — только раздача файлов. Поэтому подойдёт любой статический
хостинг, и переезд с одного на другой стоит десять минут.

Целевой домен — `kirillkhlebov.ru`. Хостинг российский: аудитория сайта сидит у
российских провайдеров, а Cloudflare из России последние годы то замедляют, то
режут через ТСПУ. Для портфолио, которое будут открывать работодатели, это
лишняя лотерея.

## Что уже сделано в коде

- `src/shared/config/site.ts` указывает на `https://kirillkhlebov.ru`. Это
  единственный источник правды: из него собираются `robots.txt`, `sitemap.xml`,
  canonical, og-теги и JSON-LD.
- `previews/social/og.html` и перерисованная `public/og.png` — с новым доменом.
- `public/.htaccess` — редирект на HTTPS, склейка `www` с голым доменом,
  иммутабельный кэш для бандлов и шрифтов, security-заголовки. Это рабочий
  конфиг для Timeweb, Beget и любого другого Apache-хостинга.
- `public/_headers` — то же самое в формате Cloudflare Pages и Netlify. Лежит на
  случай переезда, на Apache просто игнорируется.
- `scripts/deploy.sh` — заливка `dist/` по rsync. Сначала печатает, что
  изменится, потом льёт. С `--dry-run` только печатает.
- `.github/workflows/ci.yml`, job `deploy` — то же самое из CI. Выключен
  условием `vars.DEPLOY_HOST != ''` и включится сам, как только переменная
  появится.

## Шаг 1. Домен и хостинг

Регистраторы `.ru`: timeweb, reg.ru, nic.ru, beget. Физлицу понадобятся
паспортные данные — это требование правил регистрации домена, а не прихоть
регистратора. Стоит несколько сотен рублей в год.

Удобнее брать домен и хостинг в одном кабинете: тогда не нужно возиться с
делегированием, хостер сам пропишет свои NS и A-запись.

`kirillkhlebov.ru` свободен — проверено у реестра:

```bash
whois -h whois.tcinet.ru kirillkhlebov.ru
```

Тариф берите самый младший. Сайт — полтора мегабайта статики, ему хватит
минимума. Если домен уже занят, разумные запасные: `khlebov.ru`, `kkhlebov.ru`,
`kirill-khlebov.ru`. При смене домена правьте одну строку и перерисовывайте
картинку:

```bash
# 1. поменять url в src/shared/config/site.ts
# 2. поменять подпись в previews/social/og.html
# 3. поменять домен в public/.htaccess
npm run images:render -- og
npm run build
```

## Шаг 2. SSH-доступ

В панели хостинга включите SSH и добавьте публичный ключ для деплоя:

```bash
cat ~/.ssh/kirillkhlebov_deploy.pub
```

Приватная часть (`~/.ssh/kirillkhlebov_deploy`) нужна только двум сторонам:
вашей машине и GitHub Actions. Ключ отдельный, не личный, — если он утечёт,
отзывается он одной кнопкой в панели и никак не задевает остальное.

Запомните путь к корню сайта. На Timeweb это обычно
`/home/<логин>/kirillkhlebov.ru/public_html`, на Beget —
`/home/<логин>/kirillkhlebov.ru/public_html` либо `~/kirillkhlebov.ru/docs`.
Точный путь виден в панели в карточке сайта.

## Шаг 3. Первая заливка руками

```bash
npm run build

export DEPLOY_HOST=<хост из письма хостера>
export DEPLOY_USER=<логин>
export DEPLOY_PATH=/home/<логин>/kirillkhlebov.ru/public_html

bash scripts/deploy.sh --dry-run   # посмотреть, что поедет
bash scripts/deploy.sh             # залить
```

`--delete` в скрипте вычищает на сервере то, чего больше нет в `dist/`, — иначе
старые хешированные бандлы копятся годами. Поэтому `DEPLOY_PATH` должен
указывать строго на корень сайта: скрипт отказывается работать с `/` и `~`,
но проверить путь глазами всё равно стоит.

## Шаг 4. Сертификат

В панели хостинга: SSL → Let's Encrypt → выпустить для `kirillkhlebov.ru` и
`www.kirillkhlebov.ru`. Бесплатно, выпуск занимает минуты.

Важно: выпускайте сертификат **до** того, как включите принудительный HTTPS в
панели. Валидация Let's Encrypt ходит по HTTP на `/.well-known/acme-challenge`.
В `public/.htaccess` этот путь из редиректа исключён, но у хостера может быть
свой редирект уровнем выше, и тогда выпуск будет падать.

## Шаг 5. Автодеплой из GitHub

Создайте на GitHub **пустой** репозиторий — без README, без `.gitignore`, без
лицензии, иначе первый пуш упрётся в конфликт. И запушьте:

```bash
git remote add origin git@github.com:<логин>/<репозиторий>.git
git push -u origin main
```

Перед пушем сработает хук `pre-push`: он прогонит `typecheck` и юнит-тесты.
Это нормально, просто подождите полминуты.

Дальше в GitHub: **Settings → Secrets and variables → Actions**.

| Имя              | Вкладка   | Значение                                 |
| ---------------- | --------- | ---------------------------------------- |
| `DEPLOY_SSH_KEY` | Secrets   | содержимое `~/.ssh/kirillkhlebov_deploy` |
| `DEPLOY_HOST`    | Variables | хост хостинга                            |
| `DEPLOY_USER`    | Variables | логин SSH                                |
| `DEPLOY_PATH`    | Variables | корень сайта                             |
| `DEPLOY_PORT`    | Variables | только если порт не 22                   |

Приватный ключ — секрет, остальное — переменные. Job читает их именно так.

После этого любой пуш в `main` сам соберёт, прогонит тесты, проверит Lighthouse
и задеплоит. Первый деплой можно запустить пустым коммитом:

```bash
git commit --allow-empty -m "chore: trigger the first deploy"
git push
```

## Шаг 6. Проверка

Обязательно — **с мобильного интернета российского оператора**, не с домашнего
вайфая, и попросите пару знакомых открыть.

Заодно посмотрите:

- `kirillkhlebov.ru/robots.txt` и `kirillkhlebov.ru/sitemap.xml` — должны
  отдаваться и содержать правильный домен;
- `curl -I https://kirillkhlebov.ru/assets/` — на бандлах должен быть
  `Cache-Control: immutable`. Если его нет, значит хостер не дал `mod_headers`,
  и кэш надо включать в панели;
- `http://kirillkhlebov.ru` и `https://www.kirillkhlebov.ru` — оба должны
  редиректить на `https://kirillkhlebov.ru`;
- превью ссылки — вставьте адрес в телеграм или прогоните через opengraph.xyz;
- добавьте сайт в Яндекс.Вебмастер и Google Search Console, скормите им sitemap.

## План Б: Cloudflare Pages

Если российский хостинг разочарует, переезд дешёвый, потому что сайт
статический. `public/_headers` уже лежит в нужном формате, `.htaccess`
Cloudflare просто проигнорирует.

Порядок: **Workers & Pages → Create → Pages → Direct Upload**, затем job
`deploy` в CI меняется на `cloudflare/wrangler-action@v3` с `CLOUDFLARE_API_TOKEN`,
`CLOUDFLARE_ACCOUNT_ID` и `CLOUDFLARE_PROJECT_NAME`. Домен переезжает сменой NS
на серверы Cloudflare — для `.ru` это штатная операция.

## Как обновлять сайт дальше

`git push` в `main` — и всё. CI соберёт, проверит и выложит. Ничего руками
делать не нужно. Если CI недоступен — `npm run build && bash scripts/deploy.sh`.
