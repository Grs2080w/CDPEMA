export const SITE = {
  name: "CDPEMA",
  fullName: "Comissão de Defesa e Preservação da Espécie e do Meio Ambiente",
  url: "https://www.cdpema.com.br",
  cnpj: "02.186.158/0001-23",
  founded: 1977,
  email: "cdpema@gmail.com",
  phones: [
    { label: "(18) 3906-3131", href: "tel:+551839063131" },
    { label: "(18) 99731-4379", href: "tel:+5518997314379" },
  ],
  whatsapp: "https://wa.me/5518997314379",
  messenger: "https://m.me/www.cdpema.com.br",
  facebook: "https://www.facebook.com/www.cdpema.com.br/",
  youtube: "https://www.youtube.com/user/cdpema",
  address: [
    "Rua Josino Felício dos Santos, 94",
    "Parque Residencial Mediterrâneo",
    "CEP 19065-200 · Presidente Prudente – SP",
  ],
  route: "https://maps.app.goo.gl/yKSFApB6WAHj7oss6",
  mapEmbed:
    "https://maps.google.com/maps?q=Rua%20Josino%20Fel%C3%ADcio%20dos%20Santos%2C%2094%20Parque%20Residencial%20Mediterr%C3%A2neo%20CEP%3A%2019065-200%20Presidente%20Prudente%20-%20SP&t=m&z=17&output=embed&iwloc=near",
  donation: {
    bank: "Caixa Econômica Federal",
    agency: "4114",
    account: "013-13.994-0",
  },
} as const;

export const NAV = [
  {
    label: "Conheça a CDPEMA",
    href: "/conheca-a-cdpema",
    children: [
      { label: "Quem somos", href: "/conheca-a-cdpema" },
      {
        label: "Calendário Ecológico",
        href: "/conheca-a-cdpema/calendario-ecologico",
      },
      {
        label: "Financiadoras nacionais",
        href: "/site/wp-content/uploads/2020/09/Entidades-Financiadoras-Nacionais.pdf",
        external: true,
      },
      {
        label: "Financiadoras internacionais",
        href: "/site/wp-content/uploads/2020/09/Entidades-Financiadoras-Internacionais.pdf",
        external: true,
      },
    ],
  },
  { label: "Publicações", href: "/publicacoes" },
  { label: "Reuniões", href: "/reunioes" },
  { label: "Contato", href: "/contato" },
] as const;

export const OFFICES = [
  {
    city: "Guarulhos – SP",
    note: "Sede provisória: Rua Mário Ramos, 145, Bairro Macedo, CEP 07113-070",
    phone: "(11) 97294-2450",
    email: "cdpemaguarulhos@gmail.com",
  },
  {
    city: "São Paulo – SP",
    phone: "(11) 9315-4002",
    email: "cdpemasp@gmail.com",
  },
  {
    city: "Presidente Prudente – SP",
    note: "Escritório regional",
    email: "cdpemapp@gmail.com",
  },
  { city: "Ribeirão Preto – SP", email: "cdpemarp@gmail.com" },
  {
    city: "Manaus – AM",
    phone: "(92) 3877-8951",
    email: "cdpemamanaus@gmail.com",
  },
  { city: "Brasília – DF", email: "cdpemabr@gmail.com" },
  { city: "Belo Horizonte – MG", email: "cdpemabh@gmail.com" },
] as const;
