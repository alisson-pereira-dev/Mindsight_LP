# ---- Build: compila o site estático com Vite (usa o bun.lock do projeto) ----
FROM oven/bun:1 AS build
WORKDIR /app

COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

COPY . .
# O endereço do webhook tem valor padrão no código. Para trocar sem editar o código,
# defina VITE_CONSULTA_WEBHOOK_URL como "Build Argument" no Easypanel.
ARG VITE_CONSULTA_WEBHOOK_URL
ENV VITE_CONSULTA_WEBHOOK_URL=$VITE_CONSULTA_WEBHOOK_URL
RUN bun run build

# ---- Runtime: nginx servindo apenas a pasta dist ----
FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s CMD wget -q --spider http://127.0.0.1/ || exit 1
