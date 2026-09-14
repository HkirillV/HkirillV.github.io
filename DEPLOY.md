# Деплой

Сайт — статика. `npm run build` кладёт в `dist/` готовые файлы: пререндеренный
HTML, бандлы, шрифты, картинки, `robots.txt` и `sitemap.xml`. На проде не нужен
ни Node, ни база — только раздача файлов. Поэтому подойдёт любой статический
хостинг, и переезд с одного на другой стоит десять минут.

Целевой домен — `kirillkhlebov.ru`.

## Что уже сделано в коде

- `src/shared/config/site.ts` указывает на `https://kirillkhlebov.ru`. Это
  единственный источник правды: из него собираются `robots.txt`, `sitemap.xml`,
  canonical, og-теги и JSON-LD.
- `previews/social/og.html` и перерисованная `public/og.png` — с новым доменом.
- `.github/workflows/ci.yml` содержит job `deploy` на Cloudflare Pages. Он
  выключен условием `vars.CLOUDFLARE_PROJECT_NAME != ''` и включится сам, как
  только переменная появится.
- `public/_headers` — иммутабельный кэш для `/assets/*` и `/fonts/*` плюс
  security-заголовки. Формат понимают Cloudflare Pages и Netlify.

## Шаг 1. Домен

Регистраторы `.ru`: reg.ru, nic.ru, beget, timeweb. Физлицу понадобятся
паспортные данные — это требование правил регистрации, а не прихоть
регистратора. Стоит несколько сотен рублей в год.

Сначала проверь, свободен ли `kirillkhlebov.ru`. Если занят, разумные запасные:
`khlebov.ru`, `kkhlebov.ru`, `kirill-khlebov.ru`. При смене домена правь одну
строку и перерисовывай картинку:

```bash
# 1. поменять url в src/shared/config/site.ts
# 2. поменять подпись в previews/social/og.html
npm run images:render -- og
npm run build
```

## Шаг 2. GitHub

Репозиторий уже инициализирован, всё лежит в одном коммите на ветке `main`.

Проверь, что автор коммита — тот, кого ты хочешь видеть в истории:

```bash
git log -1 --format='%an <%ae>'
```

Сейчас там `Kirill Khlebov <khlebov79@gmail.com>`. Почта должна совпадать с той,
что привязана к аккаунту GitHub, иначе коммиты не свяжутся с твоим профилем.
Если не совпадает, поправь до пуша — коммит пока один, это безопасно:

```bash
git config user.email "почта-от-github@example.com"
git commit --amend --reset-author --no-edit
```

Дальше создай на GitHub **пустой** репозиторий — без README, без `.gitignore`,
без лицензии, иначе первый пуш упрётся в конфликт. И запушь:

```bash
git remote add origin git@github.com:<логин>/<репозиторий>.git
git push -u origin main
```

Перед пушем сработает хук `pre-push`: он прогонит `typecheck` и юнит-тесты.
Это нормально, просто подожди полминуты.

## Шаг 3. Cloudflare Pages

Заведи аккаунт на cloudflare.com, затем **Workers & Pages → Create → Pages**.

Важно: выбирай **Direct Upload**, а не «Connect to Git». Сборкой занимается
GitHub Actions, Cloudflare только принимает готовый `dist/`. Если подключить
репозиторий напрямую, Cloudflare начнёт собирать сам, и это будет конфликтовать
с job `deploy` в CI.

Имя проекта запомни — оно понадобится в следующем шаге.

Потом собери три значения:

| Что                       | Где взять                                                                                        |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| `CLOUDFLARE_API_TOKEN`    | My Profile → API Tokens → Create Token → шаблон **Edit Cloudflare Workers** (он покрывает Pages) |
| `CLOUDFLARE_ACCOUNT_ID`   | правая колонка дашборда аккаунта, либо в URL после `dash.cloudflare.com/`                        |
| `CLOUDFLARE_PROJECT_NAME` | имя проекта Pages из предыдущего пункта                                                          |

И положи их в GitHub: **Settings → Secrets and variables → Actions**.

- вкладка **Secrets** → `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`
- вкладка **Variables** → `CLOUDFLARE_PROJECT_NAME`

Токен и Account ID — секреты, имя проекта — переменная. Job в CI читает их
именно так.

После этого любой пуш в `main` сам соберёт, прогонит тесты, проверит Lighthouse
и задеплоит. Первый деплой можно запустить пустым коммитом:

```bash
git commit --allow-empty -m "chore: trigger the first deploy"
git push
```

## Шаг 4. Домен на Cloudflare

1. В Cloudflare: **Add a site** → вводишь `kirillkhlebov.ru` → план Free.
2. Cloudflare покажет два своих NS-сервера.
3. У регистратора домена меняешь NS на эти два. Для `.ru` это штатная операция,
   все регистраторы её поддерживают.
4. Ждёшь делегирования — обычно пара часов, по регламенту до суток.
5. Когда домен активен: **Workers & Pages → твой проект → Custom domains** →
   добавляешь `kirillkhlebov.ru` и `www.kirillkhlebov.ru`.
6. Сертификат выпустится сам, минут за десять.

## Шаг 5. Проверка

Обязательно — **с мобильного интернета российского оператора**, не с домашнего
вайфая, и попроси пару знакомых открыть. Аудитория сайта на российских
провайдерах, и проверять доступность нужно с их стороны.

Заодно посмотри:

- `kirillkhlebov.ru/robots.txt` и `kirillkhlebov.ru/sitemap.xml` — должны
  отдаваться и содержать правильный домен;
- превью ссылки — вставь адрес в телеграм или прогони через opengraph.xyz;
- добавь сайт в Яндекс.Вебмастер и Google Search Console, скорми им sitemap.

## План Б: российский хостинг

Если с Cloudflare из России будет туго — переезд дешёвый, потому что сайт
статический. Кандидаты: Timeweb Cloud, Beget, Selectel, Yandex Cloud Object
Storage.

Порядок: собираешь `npm run build`, заливаешь содержимое `dist/` в корень сайта,
переключаешь NS или A-запись на хостера.

Одна ловушка: `public/_headers` понимают только Cloudflare Pages и Netlify. На
обычном nginx эти правила нужно перенести в конфиг руками, иначе потеряется
кэширование шрифтов и бандлов — а это заметно на повторных заходах. Минимум:

```nginx
location ~* ^/(assets|fonts)/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

location / {
  add_header Cache-Control "public, max-age=0, must-revalidate";
  add_header X-Content-Type-Options "nosniff";
  add_header Referrer-Policy "strict-origin-when-cross-origin";
  add_header Permissions-Policy "geolocation=(), microphone=(), camera=()";
}
```

## Как обновлять сайт дальше

`git push` в `main` — и всё. CI соберёт, проверит и выложит. Ничего руками
делать не нужно.
