# PLAN.md — Novo site da CDPEMA

> Plano de implementação do novo site da **CDPEMA – Comissão de Defesa e Preservação da Espécie e do Meio Ambiente**, feito em Next.js + TypeScript, com custo zero de hospedagem.
> Fontes: `Metas.md`, conversa no WhatsApp com Carlos Arraes (dono/fundador, 05/10/2026) e análise do site atual https://www.cdpema.com.br (11/10/2026).

---

## 1. Contexto e objetivo

### 1.1 Quem é a CDPEMA
- ONG ambientalista sem fins lucrativos, fundada em **07/09/1977** em Guarulhos/SP por **Carlos Alberto Arraes do Carmo**. Atua em Presidente Prudente/SP desde 1993.
- CNPJ **02.186.158/0001-23**.
- Atua em várias frentes:
  - **meio ambiente**: fauna, flora, rios e nascentes, resíduos, clima;
  - **questões sociais**: crianças e adolescentes, juventude, mulher, idoso, pessoa com deficiência, questões humanitárias;
  - **informar e alertar** sobre economia, política, geopolítica e paz.
- Tem representantes em várias cidades, como Guarulhos, São Paulo, Manaus, Brasília e Belo Horizonte. Participa de comitês de bacia, COMDEMA, fóruns e oferece cursos. Lista mais de 60 projetos.

### 1.2 Situação atual
| Item | Situação |
|---|---|
| Tecnologia | WordPress + Elementor, montado pela empresa **Lista Mais** |
| Custo atual | Só o domínio no **Registro.br** (R$ 40/ano) |
| Conteúdo | 6 páginas (Home, Conheça, Calendário Ecológico, Publicações, Reuniões, Contato), **4 artigos** de 2020, 25 arquivos de mídia, 2 PDFs de entidades financiadoras |
| Problemas | Visual datado. Pouco conteúdo. Erros de digitação ("manciais", "ara"). Telefone desativado. Sem mapa embutido, sem busca útil, sem multimídia, sem idiomas. A página "Reuniões" está vazia. Edição limitada. |

### 1.3 O que o dono pediu (requisitos de negócio)
| # | Pedido | Origem |
|---|---|---|
| R1 | Site novo, com **visual novo**, novas formas de acesso e de consulta | WhatsApp 16:38 |
| R2 | Hospedagem **gratuita**. Só o domínio continua sendo pago. | WhatsApp 16:33–16:34 |
| R3 | **Telefones:** remover **(18) 98153-4609** (era da TIM e não existe mais). Manter só **(18) 99731-4379** e **(18) 3906-3131**. | WhatsApp 16:18 |
| R4 | Publicar **fotos, áudios, vídeos e PowerPoint** | WhatsApp 16:35 |
| R5 | Inspiração: **Greenpeace**, **SOS Mata Atlântica** e outras ONGs grandes | WhatsApp 16:36 |
| R6 | Contato online com a ONG por **e-mail, chat e mensagens** | WhatsApp 16:38 |
| R7 | Mostrar mensagens, vídeos e áudios do **Facebook, Instagram, LinkedIn, WhatsApp e X** (ex.: reels do Instagram) | WhatsApp 16:40 / Metas |
| R8 | **Acervo de PDFs** (o dono tem muitos materiais ambientais) | WhatsApp 16:04 |
| R9 | Links e **busca** na Biblioteca Nacional e em outras fontes públicas sobre fauna, flora, leis e políticas para infância, juventude, idoso, PcD e questões humanitárias | WhatsApp 16:04 |
| R10 | Subpágina de **buscas/notícias** com publicações da Secretaria de Estado do Meio Ambiente, SOS Mata Atlântica, Greenpeace e outros, com **atualização diária** da imprensa | WhatsApp 15:56–15:57 |
| R11 | Material enviado e publicado por **filiados, usuários ou consulentes** é de **inteira responsabilidade de quem enviou**, e a **fonte é obrigatória** | WhatsApp 15:59 |
| R12 | Informar e alertar sobre **economia, política, geopolítica e paz**, com conteúdo de várias fontes, inclusive internacionais | Metas |
| R13 | **Tradução**: conteúdo estrangeiro traduzido para o português, e conteúdo da CDPEMA traduzido para outras línguas | Metas |
| R14 | Recriar **todo o conteúdo que já existe** e corrigir o que está desatualizado | WhatsApp 16:33 |

---

## 2. Decisões de arquitetura (stack 100% gratuita)

| Camada | Escolha | Por quê | Limite gratuito |
|---|---|---|---|
| Framework | **Next.js 15+ (App Router) + TypeScript** | Pedido do grupo. Usa SSR/ISR, dá bom SEO e tem rotas de API. | — |
| CMS / painel admin | **Payload CMS 3** (roda *dentro* do app Next.js) | Painel em `/admin` amigável para o Sr. Carlos. Já vem com login, papéis de usuário, uploads, rascunhos, versões e **localização (pt/en/es) nativa**. Sem custo de licença. | Open source (MIT) |
| Banco de dados | **Neon Postgres** | Não pausa o projeto como o Supabase free (o banco "dorme" e acorda sozinho). Permite busca full-text. | 0,5 GB |
| Arquivos (PDF, PPT, áudio, imagens) | **Cloudflare R2** (via `@payloadcms/storage-s3`) | **Sem taxa de saída (egress)**, ideal para muitos PDFs | 10 GB armazenamento |
| Vídeos | **YouTube** (canal `youtube.com/user/cdpema` já existe), embutido no site | Vídeo pesado não pode ficar no R2. O YouTube é grátis e já faz o streaming. | ilimitado |
| Hospedagem | **Vercel (Hobby)** — alternativa: **Netlify** ou **Cloudflare Workers (OpenNext)** | Deploy automático a cada push e preview por PR. ⚠️ Os termos do Vercel Hobby dizem "uso pessoal, não comercial". Validar com o grupo; se houver dúvida, usar Netlify ou Cloudflare em produção. | — |
| E-mail transacional (contato, newsletter) | **Resend** (ou Brevo) | Formulários e confirmações | Resend 3.000/mês · Brevo 300/dia |
| Anti-spam | **Cloudflare Turnstile** | Captcha invisível e gratuito | ilimitado |
| Tradução automática | **DeepL API Free** (alternativa: LibreTranslate) | Traduz o conteúdo próprio (pt→en/es) e o externo (en/es/fr→pt) | 500 mil caracteres/mês |
| i18n da interface | **next-intl** | Rotas `/pt`, `/en`, `/es` | — |
| Chat ao vivo | **Botão flutuante de WhatsApp** + **Tawk.to** (ou Crisp free) + link do Messenger | Pedido R6. Tawk.to é grátis e tem app no celular para o atendente. | grátis |
| Estilo / UI | **Tailwind CSS v4 + shadcn/ui** (Radix) | Componentes acessíveis e rápidos de montar | — |
| Animações | **Motion (Framer Motion)** + **GSAP/ScrollTrigger** (100% gratuito desde 2025) + **Lenis** (rolagem suave) | Parallax, contadores, revelação ao rolar, transições de página | — |
| Analytics | **Umami Cloud free** ou **Vercel Analytics** | Sem cookies, de acordo com a LGPD | — |
| Acessibilidade | **VLibras** (widget do Governo Federal) | Coerente com a defesa da PcD | grátis |
| Domínio | **Registro.br** (continua sendo pago pelo dono) | Mudar só os registros DNS | R$ 40/ano |

**Custo mensal estimado: R$ 0.** O único custo é o domínio, que o dono já paga.

### 2.1 Diagrama
```
Visitante ──► Next.js (Vercel/Netlify) ──► Payload (mesmo app) ──► Neon Postgres
                │                                  └──────────────► Cloudflare R2 (PDF/PPT/áudio/img)
                ├── Feeds RSS externos (ISR, revalida a cada 1h)
                ├── APIs públicas (LexML, GBIF, Biblioteca Nacional, SciELO...)
                ├── DeepL (tradução) · Resend (e-mail) · Turnstile (anti-spam)
                └── Embeds: YouTube, Instagram, Facebook, X, LinkedIn, WhatsApp, Tawk.to
```

---

## 3. Mapa do novo site (sitemap)

```
/                         Home
/sobre                    Conheça a CDPEMA (história, missão, natureza jurídica, linha do tempo 1977→hoje)
  /sobre/atuacao          Comitês, conselhos e fóruns
  /sobre/representacoes   Mapa interativo das unidades e colaboradores no Brasil
  /sobre/transparencia    Estatuto, CNPJ, entidades financiadoras (PDFs), relatórios
/causas                   Áreas de atuação (Ambiental · Social · Informar & Alertar)
  /causas/[slug]          Página de cada causa (fauna, flora, rios, infância, idoso, PcD, paz...)
/projetos                 Os 60+ projetos com filtro por categoria
  /projetos/[slug]
/cursos                   Cursos e capacitações (com inscrição de interesse)
/noticias                 Notícias e artigos da CDPEMA (os 4 atuais migrados + novos)
  /noticias/[slug]
/radar                    "Radar CDPEMA": notícias externas com atualização automática (R10, R12)
  ?tema=meio-ambiente|social|economia|politica|geopolitica|paz
/acervo                   Biblioteca digital de PDFs, PPTs, áudios e vídeos da CDPEMA (R8, R4)
  /acervo/[slug]          Visualizador (PDF inline, PPT via Office Viewer, player de áudio/vídeo)
/pesquisa                 Busca unificada: acervo próprio + fontes públicas externas (R9)
/fontes                   Diretório curado de links (órgãos, ONGs, bibliotecas, imprensa)
/midia                    Galeria de fotos, vídeos (YouTube) e mural das redes sociais (R7)
/comunidade               Mural de envios de filiados/usuários, moderado (R11)
  /comunidade/enviar      Formulário de envio (exige login, fonte obrigatória e aceite de termos)
/calendario-ecologico     Calendário interativo (~78 datas), com "hoje é..." e exportar .ics
/reunioes                 Agenda de reuniões online (Zoom/Meet), inscrição e atas
/participe                Seja voluntário · Filie-se · Doe (PIX + dados bancários)
/contato                  Formulário, telefones, e-mails das unidades, mapa, WhatsApp e chat
/privacidade · /termos    LGPD e termos de uso/responsabilidade
/admin                    Painel Payload (somente equipe)
```

Os redirects 301 das URLs antigas ficam em `next.config.ts` (ver Fase 6).

---

## 4. Funcionalidades em detalhe

### 4.1 Recriação do conteúdo atual (R14)
- Migrar todos os textos da Home, Conheça, Calendário Ecológico, Publicações (4 artigos), Reuniões e Contato.
- **Revisar o português** (corrigir "manciais", "para a um lugar melhor ara" e trechos repetidos) e **validar com o Sr. Carlos**.
- Transformar a lista de 60+ projetos em uma **collection** `Projetos`, com categoria, imagem e status.
- Transformar a lista de cursos em uma collection `Cursos` (carga horária, formato, modalidade).
- O calendário ecológico vira dados estruturados (`dia`, `mês`, `título`, `intervalo?`), removendo as ~4 datas duplicadas.
- Baixar os 25 arquivos de mídia e os 2 PDFs pela REST API do WP (`/wp-json/wp/v2/media`) e importá-los no R2.

### 4.2 Contatos corrigidos (R3) ✅ obrigatório já no MVP
- **Remover (18) 98153-4609 de TODAS as ocorrências.** No site atual ele aparece no topo, no rodapé, na sede e em "núcleo PP".
- Telefones oficiais: **(18) 99731-4379** (também WhatsApp) e **(18) 3906-3131**.
- Guardar os telefones em um **Global do Payload** (`Configuracoes`) para que o dono mude sozinho no futuro, sem depender de desenvolvedor.
- Manter os e-mails das unidades e os endereços (Presidente Prudente e Guarulhos). **Confirmar com o dono** se os telefones de Guarulhos, SP e Manaus ainda estão ativos.

### 4.3 Multimídia (R4)
| Tipo | Como subir | Como exibir |
|---|---|---|
| Fotos | Upload no Payload. Gera WebP/AVIF e tamanhos responsivos automaticamente. | Galeria com lightbox (`yet-another-react-lightbox`) e álbuns por evento |
| Áudio (mp3/ogg/m4a) | Upload no Payload → R2 | Player próprio com onda sonora (`wavesurfer.js`) e transcrição opcional |
| Vídeo | Colar o link do YouTube (ou vídeo curto mp4 até ~50 MB no R2) | `lite-youtube-embed` (carrega rápido) |
| PowerPoint (ppt/pptx) | Upload no Payload → R2 | Iframe do **Office Online Viewer** (`view.officeapps.live.com/op/embed.aspx?src=`) + botão de download |
| PDF | Upload no Payload → R2 | Visualizador inline (`react-pdf`) + download + busca no texto |

### 4.4 Acervo digital / Biblioteca CDPEMA (R8)
- Collection `Documentos` com: título, descrição, arquivo, tipo, **temas** (fauna, flora, recursos hídricos, resíduos, clima, legislação, infância e juventude, idoso, PcD, mulher, direitos humanos, economia, política, geopolítica, paz), ano, autor/fonte e idioma.
- **Extração do texto do PDF no upload** (hook `afterChange` com `unpdf`/`pdf-parse`), salvando em coluna `tsvector` do Postgres → **busca full-text dentro dos PDFs**.
- Filtros por tema, tipo e ano. Ordenação. Contador de downloads.
- **Upload em lote** para o dono subir a pasta de PDFs de uma vez (script `scripts/import-pdfs.ts`, que lê uma pasta local e cria os documentos via Local API do Payload).

### 4.5 Busca unificada e fontes públicas (R9)
Página `/pesquisa` com **uma caixa de busca** e abas de resultado:

| Aba | Fonte | Integração |
|---|---|---|
| Acervo CDPEMA | Postgres full-text | API interna |
| Leis | **LexML Brasil** (legislação federal, estadual e municipal) | API SRU pública (XML) |
| Fauna e flora | **GBIF** (espécies, ocorrências no Brasil) · **SiBBr** · **Flora e Funga do Brasil** | API REST GBIF (JSON, sem chave) + links de busca |
| Biblioteca Nacional | **BNDigital / Hemeroteca Digital** | Link de busca com o termo pré-preenchido |
| Domínio Público | dominiopublico.gov.br | Link de busca |
| Artigos científicos | **SciELO**, **Portal de Periódicos CAPES**, BDTD | Link de busca (SciELO tem API de busca) |
| Dados | IBGE, MapBiomas, INPE (queimadas/desmatamento) | Links + painéis embutidos quando houver |

- Para fontes sem API, gerar **links de busca "deep link"** com o termo já preenchido (abre em nova aba).
- Diretório `/fontes` curado e editável no admin (collection `Fontes`: nome, URL, tema, idioma, descrição). Exemplos de conteúdo: ECA (Lei 8.069/90), Estatuto do Idoso (Lei 10.741/03), Estatuto da PcD (Lei 13.146/15), Lei Maria da Penha, Lei de Crimes Ambientais (9.605/98), Código Florestal (12.651/12), Política Nacional de Resíduos Sólidos (12.305/10), ICMBio (SALVE – fauna ameaçada), IBAMA, CONAMA, ONU Brasil, UNICEF, ACNUR, Cruz Vermelha.

### 4.6 Radar CDPEMA — notícias com atualização diária (R10, R12, R13)
- Agregador de **feeds RSS/Atom** de fontes curadas (collection `FeedsRSS` no admin, para o dono incluir ou remover fontes):
  - **Meio ambiente:** Secretaria de Meio Ambiente de SP (SEMIL), Agência Brasil – Meio Ambiente, ((o))eco, Mongabay Brasil, SOS Mata Atlântica, Greenpeace Brasil, WWF-Brasil, ISA, ONU Meio Ambiente.
  - **Social:** UNICEF Brasil, ONU News (pt), Agência Brasil – Direitos Humanos.
  - **Economia / política / geopolítica / paz:** Agência Brasil, ONU News, BBC News Brasil, Reuters/AP (en → traduzido), Al Jazeera (en → traduzido).
  - Fontes que não têm RSS: usar link direto ou scraping leve (avaliar caso a caso, respeitando robots.txt).
- **Atualização:** ISR com `revalidate: 3600` (de hora em hora). Também roda um **cron diário** (Vercel Cron, Netlify Scheduled Function ou GitHub Actions) que salva no banco para histórico e busca.
- **Tradução automática** de título e resumo de feeds em língua estrangeira via DeepL, com selo "Traduzido automaticamente – ver original". Para o texto completo, link para o Google Tradutor (`translate.google.com/translate?sl=auto&tl=pt&u=<url>`).
- O Radar exibe **só título, resumo, fonte, data e link**, sem copiar matérias inteiras (direitos autorais). A **fonte é sempre exibida**.
- Filtros por tema e por fonte. Busca. "Mais lidas da semana".

### 4.7 Redes sociais (R7)
- **Mural social** em `/midia` e na Home: o admin cola a URL do post (Instagram reel, Facebook, X, LinkedIn, YouTube, TikTok) e o site embute automaticamente (`react-social-media-embed` ou os scripts oficiais).
  - Exemplo do dono: `https://www.instagram.com/reels/DeGlPTZB3es/`.
- **Feed automático do Instagram/Facebook da CDPEMA:** requer conta Business + Meta Graph API (token de longa duração). Fica como **fase 2/opcional**, porque depende de acesso às contas da ONG.
- **Botões de compartilhar** em todas as páginas: WhatsApp, Facebook, X, LinkedIn, Telegram, e-mail e copiar link.
- **Open Graph / Twitter Cards** com imagem gerada dinamicamente (`next/og`) para os links ficarem bonitos quando compartilhados no WhatsApp.
- Links para todas as redes no rodapé. ⚠️ Pedir ao dono os links de Instagram, LinkedIn e X (hoje o site só tem Facebook e YouTube).

### 4.8 Contato online (R6)
- **Formulário de contato** (nome, e-mail, telefone, assunto, unidade de destino, mensagem):
  - salva no Payload (collection `Mensagens`, com status "nova/respondida");
  - envia e-mail via Resend para `cdpema@gmail.com` (ou para o e-mail da unidade escolhida);
  - protegido com Turnstile.
- **Botão flutuante de WhatsApp** → `wa.me/5518997314379` com mensagem pré-preenchida.
- **Chat ao vivo** Tawk.to. O Sr. Carlos ou voluntários atendem pelo app no celular. Fora do horário, vira mensagem offline por e-mail.
- **Messenger** (`m.me/www.cdpema.com.br`), já existente.
- **Mapa embutido** (OpenStreetMap via `react-leaflet`, grátis e sem chave) com as unidades e o botão "Como chegar".
- **Canal de denúncia ambiental** (`/contato?tipo=denuncia`): permite anexar foto e localização, com opção de anonimato. O site atual já descreve esse fluxo, mas não oferece uma ferramenta para ele.
- **Newsletter "Natureza Viva"** (o jornal eletrônico citado no site): cadastro com double opt-in e envio via Resend ou Brevo.

### 4.9 Comunidade — conteúdo enviado por filiados/usuários (R11)
- Cadastro/login de **filiados** (Payload Auth, com o papel `filiado`).
- Formulário `/comunidade/enviar` com: título, texto, mídia (foto/áudio/vídeo/PDF), **campo FONTE obrigatório** (URL ou referência) e **checkbox obrigatório**:
  > "Declaro que o conteúdo enviado é de minha inteira responsabilidade e que a fonte foi devidamente indicada."
- **Moderação**: tudo entra como `pendente` e só é publicado após aprovação de um admin ou moderador. O autor recebe e-mail na aprovação ou recusa.
- Toda publicação da comunidade mostra: **autor, fonte e o aviso** "Conteúdo de responsabilidade exclusiva do autor. A CDPEMA não se responsabiliza pelas opiniões aqui publicadas."
- Botão "Denunciar conteúdo". Limite de envios por dia por usuário.
- Os termos de uso (`/termos`) devem trazer a cláusula de responsabilidade com o mesmo texto.

### 4.10 Multilíngue (R13)
- Interface em **pt-BR (padrão), en e es** via next-intl. Seletor de idioma no header. `hreflang` para SEO.
- Conteúdo próprio: campos `localized: true` no Payload. Botão/hook **"Traduzir automaticamente"** (DeepL), que preenche en/es a partir do pt. O conteúdo fica marcado como "tradução automática" até alguém revisar.
- Conteúdo externo: ver 4.6 (DeepL + link do Google Tradutor).
- Para o orçamento de 500 mil caracteres/mês do DeepL: traduzir só título e resumo no Radar, e páginas completas apenas sob demanda.

### 4.11 Participe / Doações
- **Doação via PIX**: QR Code estático gerado no site (padrão BR Code, lib `pix-utils`) com a chave da ONG. ⚠️ Pedir a chave PIX ao dono.
- Dados bancários: Caixa · Ag. 4114 · Conta 013-13.994-0 (**confirmar se continuam válidos**).
- Formulários "Seja voluntário" e "Filie-se", que entram no admin.
- Contador animado de impacto (anos de atuação, projetos, cidades, cursos), editável no admin.

### 4.12 Calendário Ecológico interativo
- Visão de mês/ano, destaque de "Hoje é Dia de..." na Home, botão "adicionar ao meu calendário" (.ics), compartilhamento.
- Vincular cada data a notícias e documentos do acervo sobre o tema.

### 4.13 Reuniões
- Collection `Reunioes`: data, plataforma (Zoom/Meet), link (exibido só para inscritos ou filiados, se o dono preferir), pauta, ata em PDF e gravação (YouTube).
- Inscrição com lembrete por e-mail. Exportar .ics.

---

## 5. Design e animações (R1, R5)

### 5.1 Referências
- **Greenpeace Brasil:** hero de tela cheia com foto/vídeo, CTA "Doe" sempre visível, campanhas em cards grandes.
- **SOS Mata Atlântica:** paleta verde natural, números de impacto, seção de "causas", relatórios de transparência.
- Outras: WWF-Brasil, ISA, Instituto Terra, Amnesty, UNICEF (estrutura de causas sociais).

### 5.2 Identidade visual
- Partir do **logo atual** (árvore verde, pássaro amarelo, peixe azul). As cores do logo viram a paleta:
  - Verde floresta `#1F7A3A` (primária)
  - Azul água `#1E73BE` (secundária)
  - Amarelo sol `#F2C230` (destaque/CTA)
  - Neutros terrosos `#F6F3EC` / `#2B2B26`
- **Vetorizar o logo** em SVG. Hoje ele é um PNG pequeno.
- Tipografia: **Fraunces** ou **DM Serif** (títulos) + **Inter** (texto), via `next/font`.
- **Modo escuro** e **alto contraste**. Controle de tamanho de fonte.
- Ícones: `lucide-react`. Ilustrações: unDraw e Storyset (grátis). Fotos: acervo da ONG + Unsplash/Pexels.

### 5.3 Animações (sem atrapalhar o desempenho)
- Hero com **vídeo de fundo** curto, ou parallax em camadas (folhas, água) via GSAP ScrollTrigger.
- **Revelação ao rolar** (fade/slide) com Motion `whileInView`.
- **Contadores animados** de impacto.
- **Linha do tempo** 1977 → hoje com scroll horizontal (história da ONG).
- **Mapa do Brasil interativo** (SVG) com as cidades de atuação acendendo.
- Cards de causas com hover 3D leve (tilt) e microinterações nos botões.
- Transições de página (View Transitions API do Next/React).
- Marquee de logos de parceiros e fontes.
- **Respeitar `prefers-reduced-motion`** (desliga as animações pesadas).
- Metas Lighthouse: Performance ≥ 90, Acessibilidade ≥ 95, SEO ≥ 95, LCP < 2,5 s.

### 5.4 Acessibilidade e LGPD
- WCAG 2.2 AA: navegação por teclado, foco visível, alt em imagens, legendas em vídeos, transcrição em áudios.
- **Widget VLibras**.
- Banner de cookies (só se usar algo com cookies; Umami não usa). Política de privacidade. Consentimento explícito nos formulários. Dados mínimos.

---

## 6. Modelo de dados (Payload collections e globals)

| Collection | Campos principais |
|---|---|
| `users` | nome, e-mail, papel (`admin`, `editor`, `moderador`, `filiado`), cidade/unidade |
| `paginas` | título*, slug, blocos (layout builder: hero, texto, galeria, CTA, FAQ, embed) — *localized* |
| `noticias` | título*, slug, resumo*, conteúdo* (Lexical rich text), capa, temas, autor, fonte, publicadoEm, status |
| `projetos` | nome*, categoria, descrição*, imagens, status (ativo/concluído/permanente) |
| `cursos` | nome*, descrição*, formato, carga horária, próxima turma, inscrições |
| `causas` | nome*, slug, ícone, cor, texto*, links para notícias/documentos/fontes |
| `documentos` | título*, arquivo, tipo, temas, ano, autor/fonte, idioma, textoExtraido (tsvector), downloads |
| `midias` | upload (imagem/áudio/vídeo curto), alt*, legenda*, créditos |
| `videos` | título*, url YouTube, temas |
| `postsSociais` | rede, url, destaque, data |
| `envioComunidade` | autor (rel users), título, conteúdo, anexos, **fonte (obrigatório)**, **aceiteResponsabilidade (obrigatório)**, status (pendente/aprovado/recusado), motivo |
| `fontes` | nome, url, urlBusca (template com `{q}`), tema, idioma, descrição |
| `feedsRSS` | nome, url, tema, idioma, ativo |
| `itensRadar` | título, tituloTraduzido, resumo, url, fonte, publicadoEm, tema (preenchido pelo cron) |
| `datasEcologicas` | dia, mês, diaFim?, título*, tema |
| `reunioes` | título, data, plataforma, link, pauta, ata, gravação |
| `mensagens` | nome, e-mail, telefone, assunto, unidade, mensagem, tipo (contato/denúncia/voluntário/filiação), status |
| `inscritosNewsletter` | e-mail, confirmado, idioma |
| `unidades` | cidade, UF, endereço, telefones, e-mail, lat/lng |

| Global | Conteúdo |
|---|---|
| `configuracoes` | **telefones oficiais**, WhatsApp, e-mail, CNPJ, redes sociais, chave PIX, dados bancários |
| `home` | blocos da home e números de impacto |
| `navegacao` | menu e rodapé |

`*` = campo traduzível (localized).

---

## 7. Estrutura do repositório

```
cdpema/
├─ src/
│  ├─ app/
│  │  ├─ (frontend)/[locale]/...      # páginas públicas (next-intl)
│  │  ├─ (payload)/admin/...          # painel Payload
│  │  └─ api/                         # rotas: contato, newsletter, radar/cron, busca
│  ├─ collections/                    # definição das collections Payload
│  ├─ globals/
│  ├─ components/
│  │  ├─ ui/                          # shadcn
│  │  ├─ blocks/                      # blocos do layout builder
│  │  ├─ media/                       # PdfViewer, AudioPlayer, PptViewer, Gallery
│  │  ├─ social/                      # embeds e share
│  │  └─ motion/                      # wrappers de animação
│  ├─ lib/                            # deepl.ts, rss.ts, lexml.ts, gbif.ts, pix.ts, search.ts
│  ├─ i18n/                           # mensagens pt/en/es
│  └─ payload.config.ts
├─ scripts/
│  ├─ migrate-wordpress.ts            # importa páginas/posts/mídia da REST API do WP
│  ├─ import-pdfs.ts                  # importação em lote do acervo
│  └─ seed.ts                         # calendário, projetos, cursos, fontes, feeds
├─ public/
├─ .github/workflows/ci.yml           # lint, typecheck, test, build
├─ PLAN.md
└─ README.md
```

---

## 8. Fases, tarefas e entregas

> Estimativas pensando em um grupo de 3 a 5 pessoas com dedicação parcial. Cada fase termina com uma **demo para o Sr. Carlos**.
> Sugestão de divisão: **Front/Design** · **Back/CMS** · **Integrações (busca, RSS, tradução)** · **Conteúdo/QA**.

### Fase 0 — Preparação (semana 1)
- [ ] Criar a organização/repositório no GitHub. Proteger a branch `main` (PR + 1 review). Definir convenção de commits (Conventional Commits).
- [ ] Criar o board de tarefas (GitHub Projects) a partir deste plano.
- [ ] Criar as contas gratuitas: Vercel/Netlify, Neon, Cloudflare (R2 + Turnstile), Resend, DeepL Free e Tawk.to. **Usar um e-mail da ONG** (ex.: `cdpema@gmail.com`) como dono das contas, e não o e-mail pessoal de um aluno.
- [ ] Guardar as credenciais em um gerenciador compartilhado (Bitwarden free organization). **Nunca no repositório.**
- [ ] Levantar com o dono os pendentes da seção 10.
- [ ] Moodboard e wireframes no **Figma** (plano gratuito): Home, Sobre, Acervo, Radar, Contato.
- **Entrega:** repositório criado, contas abertas, wireframes aprovados pelo dono.

### Fase 1 — Fundação (semanas 2–3)
- [ ] `create-payload-app` com o template Next.js + Postgres. TypeScript strict, ESLint, Prettier, Husky + lint-staged.
- [ ] Tailwind v4 + shadcn/ui + tokens de design (cores, fontes, espaçamentos).
- [ ] next-intl (pt/en/es), layout base, Header (menu responsivo + seletor de idioma), Footer.
- [ ] Payload: collections `users`, `midias`, `paginas`, `noticias` e global `configuracoes`. Adapter do R2.
- [ ] CI no GitHub Actions (lint, typecheck, build). Deploy de preview por PR.
- [ ] Logo em SVG, favicon e manifest (PWA básico).
- **Entrega:** site "esqueleto" no ar em URL de preview, com o admin funcionando.

### Fase 2 — MVP: paridade com o site atual + correções (semanas 4–5)
- [ ] Script `migrate-wordpress.ts`: importa os 4 artigos, os textos das páginas e as 25 mídias + 2 PDFs.
- [ ] Páginas: Home (redesenhada), Sobre, Calendário Ecológico, Notícias (lista + detalhe), Reuniões, Contato, Participe.
- [ ] **Telefones corrigidos** (R3), vindos do global `configuracoes`.
- [ ] Formulário de contato (Resend + Turnstile), botão de WhatsApp, Messenger, mapa Leaflet.
- [ ] Collections e páginas de `projetos`, `cursos`, `causas` e `unidades`, com o seed dos dados atuais.
- [ ] Revisão ortográfica de todo o texto migrado.
- [ ] SEO: metadata, sitemap.xml, robots.txt, OG images, dados estruturados (`NGO` / `Organization` schema.org).
- [ ] Redirects 301 das URLs antigas (`/conheca-a-cdpema/` → `/sobre`, `/publicacoes/` → `/noticias`, slugs dos artigos etc.).
- **Entrega:** site novo com **tudo o que o atual tem**, melhor e corrigido. Já pode ir para o domínio (ver Fase 6), se o dono quiser.

### Fase 3 — Multimídia e acervo (semanas 6–7)
- [ ] Collection `documentos` + extração de texto do PDF + busca full-text.
- [ ] Componentes: `PdfViewer`, `PptViewer` (Office Online), `AudioPlayer` (wavesurfer), `VideoEmbed` (lite-youtube), `Gallery` (lightbox).
- [ ] Página `/acervo` com filtros por tema/tipo/ano. Página `/midia` com galeria de fotos e vídeos.
- [ ] Script `import-pdfs.ts` + sessão com o dono para subir os PDFs dele.
- **Entrega:** dono consegue publicar foto, áudio, vídeo, PPT e PDF sozinho (R4, R8).

### Fase 4 — Informação externa: busca, Radar e tradução (semanas 8–10)
- [ ] `lib/lexml.ts`, `lib/gbif.ts`, deep links (BN Digital, Domínio Público, SciELO, CAPES) → página `/pesquisa` com abas.
- [ ] Collection `fontes` + página `/fontes` (diretório curado) com seed das fontes da seção 4.5.
- [ ] `lib/rss.ts` (parser `rss-parser`) + collection `feedsRSS`/`itensRadar` + cron diário + página `/radar` com filtros por tema (meio ambiente, social, economia, política, geopolítica, paz).
- [ ] `lib/deepl.ts`: tradução dos itens estrangeiros do Radar e o botão "traduzir para en/es" no admin, com cache para não gastar a cota.
- [ ] Selo "tradução automática" + link para o original/Google Tradutor.
- **Entrega:** R9, R10, R12 e R13 funcionando.

### Fase 5 — Redes sociais, comunidade e engajamento (semanas 11–12)
- [ ] Collection `postsSociais` + mural de embeds (Instagram, Facebook, X, LinkedIn, YouTube).
- [ ] Botões de compartilhar + OG dinâmico.
- [ ] Tawk.to (chat ao vivo) + treinar o dono a usar o app.
- [ ] Cadastro/login de filiados, `/comunidade/enviar` com **fonte obrigatória + aceite de responsabilidade**, fila de moderação no admin, e-mails de aprovação/recusa (R11).
- [ ] Newsletter "Natureza Viva" (double opt-in).
- [ ] Doação via PIX (QR Code), formulários de voluntário e filiação, canal de denúncia.
- [ ] (Opcional) Feed automático do Instagram/Facebook via Graph API.
- **Entrega:** R6, R7 e R11 funcionando.

### Fase 6 — Polimento, QA e lançamento (semanas 13–14)
- [ ] Passada final de animações (GSAP/Motion) e de `prefers-reduced-motion`.
- [ ] Acessibilidade: auditoria axe/Lighthouse, teclado, leitor de tela, VLibras.
- [ ] Testes: Vitest (libs: rss, deepl, pix, busca) + Playwright (fluxos: contato, envio na comunidade, busca, troca de idioma).
- [ ] Performance: imagens otimizadas, `next/font`, lazy dos embeds, Lighthouse ≥ 90.
- [ ] Páginas `/privacidade` e `/termos` (com a cláusula de responsabilidade do R11).
- [ ] **Migração de domínio:**
  1. Dono acessa o **Registro.br** (ou passa o acesso para alguém de confiança do grupo).
  2. Adicionar o domínio na Vercel/Netlify.
  3. No Registro.br, mudar os registros DNS: `A` / `CNAME www` apontando para o host. **Não mexer em registros MX**, se existirem.
  4. Aguardar a propagação, confirmar o HTTPS automático e testar os redirects 301.
  5. **Fazer backup completo do WordPress** (export XML + pasta `uploads`) antes de desligar. Avisar a Lista Mais (Thais/Aline) que a hospedagem não será mais usada.
- [ ] Cadastrar o site no Google Search Console e enviar o sitemap.
- **Entrega:** site no ar em `www.cdpema.com.br`. 🎉

### Fase 7 — Treinamento e handover (semana 15)
- [ ] **Manual do administrador** em PDF/vídeo, em linguagem simples, para o Sr. Carlos: publicar notícia, subir PDF/áudio/vídeo/PPT, aprovar envio da comunidade, mudar telefone, responder o chat.
- [ ] Sessão de treinamento ao vivo (Meet), gravada.
- [ ] Criar usuários editores para os representantes das unidades, se o dono quiser.
- [ ] `README.md` técnico: como rodar, variáveis de ambiente, deploy, backups.
- [ ] Backup automático do Neon (GitHub Action semanal com `pg_dump` → artefato/R2).
- [ ] Definir quem do grupo fica responsável pela manutenção depois da entrega.

---

## 9. Riscos e mitigação

| Risco | Mitigação |
|---|---|
| Os planos grátis mudam ou atingem o limite | Arquitetura portável: Payload roda em qualquer host Node. Postgres e S3-compatível são padrões. Monitorar uso mensalmente. |
| Termos do Vercel Hobby (uso não comercial) | Usar Netlify ou Cloudflare em produção, se houver dúvida. Ou solicitar o programa de nonprofit/open source. |
| R2 de 10 GB enche com PDFs e áudios | Comprimir PDFs (Ghostscript), áudio em mp3 de 96 kbps, vídeos sempre no YouTube. Alertar ao chegar a 80%. |
| Cota do DeepL (500 mil caracteres/mês) | Traduzir só títulos e resumos, com cache no banco. Fallback para LibreTranslate ou para o link do Google Tradutor. |
| Conteúdo de terceiros (direitos autorais) | O Radar mostra só título, resumo e link, com fonte. Embeds usam os oficiais das redes. |
| Envios da comunidade com conteúdo impróprio ou falso | Moderação prévia obrigatória, fonte obrigatória, termo de responsabilidade, botão de denúncia, log de quem enviou. |
| Dono não conseguir usar o admin | Payload com labels em português, manual simples, treinamento, coleções enxutas. |
| Grupo se dispersa após a entrega | Documentação, contas no e-mail da ONG (não em e-mails pessoais), responsável de manutenção definido. |
| Spam nos formulários | Turnstile + rate limit + honeypot. |
| Perder acesso ao domínio | Confirmar que o titular no Registro.br é o dono/CNPJ da ONG. Nunca transferir a titularidade. |

---

## 10. Pendências com o dono (levantar na Fase 0)

- [ ] Acesso ao **Registro.br**: só para trocar o DNS, na Fase 6.
- [ ] Links de **Instagram, LinkedIn e X** da CDPEMA (hoje só há Facebook e YouTube).
- [ ] **Chave PIX** e confirmação dos dados bancários (Caixa, Ag. 4114, CC 013-13.994-0).
- [ ] Os **PDFs, PPTs, fotos, áudios e vídeos** que ele quer publicar. Combinar o envio por Google Drive.
- [ ] Confirmar se os telefones de **Guarulhos (11) 97294-2450, São Paulo (11) 9315-4002 e Manaus (92) 3877-8951** ainda funcionam.
- [ ] Endereços atualizados das unidades.
- [ ] Logo em alta resolução / arquivo original, se existir.
- [ ] Estatuto, diretoria atual e relatórios, para a página de Transparência.
- [ ] Quem vai atender o **chat** e em quais horários.
- [ ] Quais **fontes** de notícias ele mais confia (para priorizar no Radar).
- [ ] Aprovação dos wireframes e da paleta de cores.

---

## 11. Segurança — atenção imediata ⚠️

- As capturas de tela do WhatsApp nesta pasta **contêm a senha do wp-admin**. **Não versionar essas imagens.** O `.gitignore` já ignora `WhatsApp Image*`.
- Recomendar ao dono **trocar a senha do WordPress**, porque ela circulou por mensagem. Sugerir uma senha forte, e não "CDPEMA2026*".
- No novo site: senhas fortes, 2FA nas contas de serviço, variáveis de ambiente só no painel do host, dependências atualizadas (Dependabot).

---

## 12. Critérios de pronto (Definition of Done)

Uma tarefa só está pronta quando:
- passa no CI (lint, typecheck e build);
- funciona no mobile (360 px) e no desktop;
- funciona com teclado e tem textos alternativos;
- os textos aparecem em pt e as chaves existem em en/es;
- foi revisada em PR por outra pessoa do grupo;
- foi testada no preview deploy.
