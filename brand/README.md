# Kit de marca da CDPEMA

Redesenho da logo: mesma composição da marca original (pinheiro + peixe + pássaro), com cantos arredondados e cores mais vivas.
Os arquivos são gerados por `npm run brand` (`scripts/brand/`). **Não edite os SVG à mão**: ajuste o gerador e rode de novo.

## Qual versão usar

| Versão | Pasta | Quando usar |
|---|---|---|
| **2 · Suave** (colorida) | `2-suave/` | Versão principal. Cabeçalho do site, documentos, apresentações, qualquer fundo claro ou escuro liso. |
| **3 · Ícone** (quadrado arredondado) | `3-icone/` | Espaços pequenos e quadrados: favicon, avatar de redes, ícone de app, selo no rodapé. O fundo escuro já vem embutido, então funciona sobre qualquer cor. |
| **4 · Mono** (uma cor) | `4-mono/` | Quando a cor não é possível ou atrapalha: carimbo, fax/impressão P&B, marca d'água, fundo fotográfico. `escuro` em fundo claro, `branco` em fundo escuro, `verde` quando houver só uma cor da marca. |

Regra prática: **na dúvida, versão 2**. Se o fundo for uma foto ou tiver cores que brigam com a marca, use a 4. Se o espaço for um quadrado pequeno, use a 3.

## Representações

Cada pasta tem SVG (vetor, preferir sempre) e `png/` com tamanhos prontos (`-<largura>.png`).

- `marca` — só o símbolo, fundo transparente
- `horizontal` — símbolo + nome + descritor, lado a lado
- `vertical` — símbolo em cima, nome e descritor embaixo
- sufixo `-fundo-escuro` — texto branco, para fundos escuros (versões 2 e 3)
- sufixos `-escuro`, `-branco`, `-verde` — cor única (versão 4)
- `3-icone/icone-quadrado` — sem cantos arredondados (a plataforma aplica a máscara, ex.: iOS)
- `3-icone/icone-maskable` — com margem de segurança para ícones "adaptáveis" do Android

O nome "CDPEMA" e o descritor estão convertidos em curvas: os SVG não dependem de fonte instalada (Bricolage Grotesque ExtraBold e Inter Medium).

## Pastas extras

- `favicon/` — `favicon.svg`, `favicon.ico` (16/32/48), PNGs, `apple-touch-icon`, `android-chrome-192/512`, `maskable-512`. Todos derivam da versão 3; os pequenos usam a marca mais cheia para ler bem em 16 px.
- `social/` — `avatar-512.png`, `og-1200x630` (imagem de compartilhamento) e `capa-1500x500` (capa de redes).

## Cores

| Uso | Cor |
|---|---|
| Verde (pinheiro) | `#0f9d58` |
| Azul (peixe) / cauda | `#1b8fe6` / `#4aa8f0` |
| Amarelo (pássaro) | `#ffc20e` |
| Verde-floresta (fundo do ícone e texto) | `#0b2217` |
| Versão ícone (tons claros) | `#4ade80` · `#38bdf8` / `#7dd3fc` · `#facc15` |

## Uso correto

- **Área de respiro:** deixe ao redor da marca, no mínimo, a largura do olho do peixe vezes 4 (cerca de 1/6 da altura do símbolo).
- **Tamanho mínimo:** símbolo a partir de **16 px** (use a versão 3); lockup horizontal a partir de **120 px** de largura.
- **Não** estique, gire, mude as cores, adicione sombras ou contornos, nem coloque a versão 2 sobre fundos que a escondam. Use a 4.

## Onde está aplicado no site

| Local | Versão |
|---|---|
| Cabeçalho | 2 (`public/brand/cdpema-marca.svg`) |
| Rodapé | 3 (`public/brand/cdpema-icone.svg`) |
| Marca d'água nos banners internos | 4 branco (`public/brand/cdpema-marca-branco.svg`) |
| Favicon, ícone do iOS, manifest | 3 (`app/icon.svg`, `favicon.ico`, `apple-icon.png`) |
| Dados estruturados (Google) | 2 (`cdpema-marca-512.png`) |
| Imagem de compartilhamento | 2 (`app/opengraph-image.png`) |

## Regerar

```bash
npm run brand
```

Precisa de internet na primeira vez (baixa as fontes do Google Fonts para `node_modules/.cache/`).
Para mudar cores, raios dos cantos ou a geometria, edite `scripts/brand/lib.mjs`.
