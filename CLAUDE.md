# CLAUDE.md

Landing page da **MindSight Company** — inteligência comercial para clínicas (estética, tricologia, saúde). Single-page em pt-BR, focada em conversão: todos os CTAs levam ao formulário de diagnóstico (`#diagnostico`).

Projeto originado no Google AI Studio (ver `README.md`, `metadata.json`, `.aistudio/`).

## Comandos

Gerenciadores presentes: `bun.lock` (preferido) e `package.json` (npm funciona).

```bash
bun install        # ou npm install
bun run dev        # vite em http://localhost:3000 (--host=0.0.0.0)
bun run build      # vite build -> dist/
bun run preview    # serve o build
bun run lint       # tsc --noEmit (único "lint": checagem de tipos)
```

Não há testes automatizados. Valide mudanças com `lint` + `build` e, para UI/animação, rodando o `dev` no navegador.

## Stack

- React 19 + TypeScript + Vite 8, Tailwind CSS 4 (via `@tailwindcss/vite`, sem `tailwind.config` — tokens em `@theme` no `src/index.css`)
- Animação: **GSAP + ScrollTrigger**, **Lenis** (smooth scroll), `motion`, `canvas-confetti`
- Ícones: `lucide-react`
- Alias `@` → raiz do projeto (`vite.config.ts` / `tsconfig.json`)

`express`, `dotenv`, `tsx` e `@google/genai` estão no `package.json` por herança do template do AI Studio, mas **não são usados** pelo código atual (sem servidor, sem chamadas Gemini). Não assuma que existe backend.

## Estrutura

```
index.html                    # meta/SEO, fontes (Sora, Inter, Instrument Serif), favicon SVG inline
src/main.tsx                  # entry
src/App.tsx                   # compõe as seções, Lenis<->ScrollTrigger, CTA flutuante (>600px de scroll)
src/index.css                 # @theme (tokens), utilitários glass/glow, marquee
src/components/
  Navbar, HeroSection (foto de fundo; HeroCanvas não é mais usado), ProblemSection,
  LogicPainSection, SolutionSection, DifferentiationSection, TestimonialsSection,
  DiagnosisFormSection, Footer, Logo (imagem)
src/assets/                   # logos recortadas (logo-azul/branco, icone-*) usadas pelo Logo e pelo Footer
src/assets/depoimentos/       # vídeos dos depoimentos (patricia/camila/gastro/clinica-geral .mp4, sem áudio); ver LEIA-ME.txt
public/                       # favicon.png, favicon-32.png, apple-touch-icon.png
src/*.jpg|png|mp4             # fotos e vídeos originais enviados pelo cliente (fonte; as versões otimizadas ficam em assets/)
src/Mindsight-Company-System.html  # guia de design system / brand (consultar para cores e tokens)
```

Ordem das seções em `App.tsx`: Hero (dark, foto) → Problema "O Diagnóstico Oculto" (light, carrossel de cards) → Dor lógica "A Conta Que Ninguém Faz" (card dark arredondado sobre fundo `#F8FAFC`) → Solução (scrolltelling pinado, 4 pilares) → Diferenciação → Depoimentos (faixa em marquee com vídeo quadrado) → Diagnóstico (form, dark) → Footer (light). Cada seção que dispara conversão recebe `onCtaClick`/`onResolveClick` do `App`, que faz `scrollIntoView` em `#diagnostico`.

## Convenções

- **Componentes**: arquivo por componente em `src/components/`, export nomeado (`export const X: React.FC`), em PascalCase. Imports com extensão (`'./components/Navbar.tsx'`) — `allowImportingTsExtensions` está ligado.
- **Estilo**: classes Tailwind inline. Fontes via `font-sora` (títulos) e `font-inter` (corpo); `font-instrument` para detalhes serifados.
- **Paleta** (tokens em `@theme`; o código atual ainda usa muito os hex literais):
  - Azul marca `#0DC0E0` (hover `#0AA9D1`, soft `#E6F9FC`, tint `#B3ECF5`)
  - Dark `#020617` (fundo) / `#0F172A` (superfície); light `#FCFEFF`; texto secundário `#94A3B8`
  - Seções alternam claro/escuro; ao criar novas, use os tokens (`bg-dark-bg`, `text-mind-blue`…) em vez de novos hex.
- **GSAP**: criar animações dentro de `gsap.context(() => {...}, ref)` e dar `ctx.revert()` no cleanup do `useEffect` (padrão em `HeroSection`). `ScrollTrigger` é registrado uma vez em `App.tsx`. Preferir `transform`/`opacity`; respeitar `prefers-reduced-motion` ao adicionar animações novas.
- **Lenis** é inicializado só em `App.tsx` e alimentado pelo `gsap.ticker`; não crie outra instância.
- **Copy**: sempre em português do Brasil, tom direto e comercial ("agenda cheia", "diagnóstico comercial"). Mantenha o posicionamento anti-agência. Depoimentos/casos reais estão em `.aistudio/artifacts/brain/.../casos_reais.md` — use como fonte, não invente métricas ou nomes.

## Pontos de atenção

- **O formulário não envia dados.** `DiagnosisFormSection.handleSubmit` valida (nome, WhatsApp com ≥10 dígitos, clínica) e apenas simula o envio com `setTimeout` + confete. Antes de ir a produção é preciso integrar um destino real (webhook/CRM/WhatsApp API). O campo `faturamento` existe no estado; confira se está sendo exposto no JSX antes de depender dele.
- Máscara de telefone BR `(XX) 9XXXX-XXXX` fica em `handlePhoneChange`; reutilize se criar outros campos de telefone.
- `vite.config.ts`: o bloco `hmr`/`watch` ligado a `DISABLE_HMR` é do AI Studio — não alterar.
- `.env*` é ignorado pelo git (exceto `.env.example`). Não há variável realmente necessária hoje; `GEMINI_API_KEY`/`APP_URL` no `.env.example` são do template.
- `npm run clean` usa `rm -rf` (não funciona no PowerShell puro; use Git Bash ou apague `dist/` manualmente).
- Repositório git inicializado na branch `main`. O primeiro commit é um **checkpoint** (estado estável do site antes de novas alterações); para voltar a ele, use `git log` para achar o commit "checkpoint".
- Depoimentos de **Gastroenterologia** e **Clínica Geral** (`TestimonialsSection.tsx` e `ProblemSection.tsx`) têm falas **rascunho**, não reais: substituir por depoimentos autorizados antes de publicar.
- `package-lock.json` foi gerado só para validar o build localmente (`npm install --legacy-peer-deps`); o gerenciador do projeto é o `bun` (`bun.lock`).
