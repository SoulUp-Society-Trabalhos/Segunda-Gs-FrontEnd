# 🏙️ Mini City

## 📌 Descrição do Projeto

O **Mini City** é um projeto desenvolvido pela turma 1TDSPJ, com o objetivo de apresentar uma experiência digital voltada à cidade de São Paulo.

A plataforma reúne informações sobre a cidade, incluindo mapa interativo, notícias e funcionalidades para os usuários.

## 🎯 Objetivo

Utilizar a tecnologia para aproximar os usuários das informações e serviços relacionados à cidade, por meio de uma plataforma digital.

---

## 📷 Fotos do Sistemas



---

## 🛠️ Tecnologias Utilizadas

As seguintes tecnologias foram utilizadas no desenvolvimento:

- HTML5
- CSS3
- JavaScript
- TypeScript
- React
- React Icons
- Tailwind CSS
- Vite
- Git e GitHub

---


## 🌲 Organização de pastas

```
gs-frontend/
├── public/
│   ├── geojson/
│   │   └── municipio-sao-paulo-4326.geojson   # Contorno do município de São Paulo
│   └── integrantes/
│       ├── foto-breno.jpg
│       ├── foto-christian.png
│       ├── foto-eduardo.png
│       ├── foto-eduardop.jpg
│       └── foto-gustavo.png
├── src/
│   ├── assets/
│   │   ├── imagensHero/                       # Imagens do banner (Hero)
│   │   │   ├── ceu.jpg
│   │   │   ├── cidade.jpg
│   │   │   ├── paulista.jpg
│   │   │   └── ponte.jpg
│   │   └── imagensPropostas/                  # Imagens das páginas de proposta
│   │       ├── ceu2.jpg
│   │       ├── ceuEntardecer.jpg
│   │       ├── masp.jpg
│   │       ├── noite1.jpg
│   │       ├── noite2.jpg
│   │       └── ponteCeuBonito.jpg
│   ├── components/
│   │   ├── Cabecalho.tsx                      # Menu de navegação
│   │   ├── Footer.tsx                         # Rodapé
│   │   ├── FormularioOcorrencia.tsx           # Formulário para reportar ocorrências
│   │   ├── Hero.tsx                           # Banner das páginas
│   │   ├── ModalSucesso.tsx                   # Modal de confirmação
│   │   ├── Newsletter.tsx
│   │   └── ScrollToTop.tsx                    # Volta ao topo ao trocar de rota
│   ├── routes/
│   │   ├── App/                               # Área do usuário
│   │   │   ├── AuthPage/index.tsx             # Escolha entre login e cadastro
│   │   │   ├── Cadastro/index.tsx
│   │   │   ├── HomePage/index.tsx             # Mapa, notícias e ocorrências (protegida)
│   │   │   ├── Login/index.tsx
│   │   │   └── ProtectedRoute.tsx             # Bloqueia acesso sem sessão
│   │   ├── Contatos/index.tsx
│   │   ├── ErrorPage/index.tsx
│   │   ├── Faq/index.tsx
│   │   ├── Home/index.tsx
│   │   ├── Integrantes/index.tsx
│   │   ├── Proposta/index.tsx                 # Mapa Notícias
│   │   ├── Proposta2/index.tsx                # Mapa Estabelecimentos
│   │   └── Sobre/index.tsx
│   ├── service/                               # Chamadas à API
│   │   ├── api.ts                             # Função base de requisição
│   │   ├── AuthService.ts
│   │   ├── CategoriaOcorrenciaService.ts
│   │   ├── DistritoService.ts
│   │   ├── NoticiaService.ts
│   │   └── UsuarioService.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/                                 # Tipos TypeScript
│   │   ├── Api.ts
│   │   ├── Auth.ts
│   │   ├── Cadastro.ts
│   │   ├── Mapa.ts
│   │   ├── Noticia.ts
│   │   ├── Ocorrencia.ts
│   │   └── Pessoa.ts
│   ├── App.tsx                                # Layout base (Cabeçalho + Outlet + Footer)
│   └── main.tsx                               # Configuração das rotas
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vercel.json                                # Rewrites do deploy
├── vite.config.ts                             # Proxy da API
└── README.md
```

---

## 👨‍🎓 Autores e Créditos

### Integrantes do Grupo — Turma 1TDSPJ

### Breno Elisio Leal Lobato — RM569961

![Breno](./public/integrantes/foto-breno.jpg)
- GitHub: [Brenoell](https://github.com/Brenoell)
- LinkedIn: [Perfil](https://www.linkedin.com/in/breno-elisio-2b123a405/)

### Christian Verzellesi Barbuto — RM568677

![Christian](./public/integrantes/foto-christian.png)
- GitHub: [ChrisVerBarbuto](https://github.com/ChrisVerBarbuto)
- LinkedIn: [Perfil](https://www.linkedin.com/in/christian-verzellesi-barbuto-938463382/)

### Eduardo Pizzoli Junior — RM569529

![EduardoP](./public/integrantes/foto-eduardop.jpg)
- GitHub: [dudupizzoli](https://github.com/dudupizzoli)
- LinkedIn: [dudupizzoli](https://www.linkedin.com/in/eduardo-pizzoli-junior-a2964640b)

### Eduardo Nery Kurahara — RM570916

![Eduardo](./public/integrantes/foto-eduardo.png)
- GitHub: [edu64123](https://github.com/edu64123)
- LinkedIn: [Perfil](https://www.linkedin.com/in/eduardo-kurahara-786b003b9/)

### Gustavo Lizier Pontes — RM573234

![Gustavo](./public/integrantes/foto-gustavo.png)
- GitHub: [gustavopontes1104](https://github.com/gustavopontes1104)
- LinkedIn: [Perfil](https://www.linkedin.com/in/gustavo-pontes-07aa6a3b3/)

---

## 🗺️ Rotas da aplicação

| Rota             | Descrição                        | Acesso    |
| ---------------- | -------------------------------- | --------- |
| `/`              | Home                             | Público   |
| `/proposta`      | Proposta — Mapa Notícias         | Público   |
| `/proposta2`     | Proposta — Mapa Estabelecimentos | Público   |
| `/sobre`         | Sobre nós                        | Público   |
| `/faq`           | Perguntas frequentes             | Público   |
| `/integrantes`   | Integrantes do grupo             | Público   |
| `/contatos`      | Contatos                         | Público   |
| `/app/authpage`  | Escolha entre login e cadastro   | Público   |
| `/app/login`     | Login                            | Público   |
| `/app/cadastro`  | Cadastro                         | Público   |
| `/app/home-page` | Mapa, notícias e ocorrências     | Protegido |

---

## Endpoints utilizados

| Método | Endpoint                 | Uso                      |
| ------ | ------------------------ | ------------------------ |
| POST   | `/pessoas`               | Cadastro de usuário      |
| GET    | `/pessoas/{id}`          | Dados do usuário         |
| POST   | `/auth/login`            | Login                    |
| GET    | `/auth/sessao`           | Verifica a sessão ativa  |
| POST   | `/auth/logout`           | Logout                   |
| GET    | `/noticias/sao-paulo`    | Notícias de São Paulo    |
| GET    | `/distritos`             | Lista de distritos       |
| GET    | `/categorias-ocorrencia` | Categorias de ocorrência |
| GET    | `/ocorrencias`           | Lista de ocorrências     |
| POST   | `/ocorrencias`           | Cadastro de ocorrência   |

---

## 💻 Como executar o projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) em versão compatível com o Vite (20.19+ ou 22.12+)
- npm

### Passo a passo

1. Clone o repositório:

```bash
git clone https://github.com/Brenoell/front-end-1-Challenge.git
```

2. Acesse a pasta do projeto:

```bash
cd front-end-1-Challenge/gs-frontend
```

3. Instale as dependências:

```bash
npm install
```

4. Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

5. Abra no navegador o endereço exibido no terminal (normalmente `http://localhost:5173`).

### Scripts disponíveis

| Comando           | Descrição                                      |
| ----------------- | ---------------------------------------------- |
| `npm run dev`     | Inicia o servidor de desenvolvimento           |
| `npm run build`   | Verifica os tipos (`tsc`) e gera o build final |
| `npm run preview` | Executa localmente o build gerado              |
| `npm run lint`    | Roda o ESLint no projeto                       |

## 👾 Repositório Público - FRONT

GITHUB: [https://github.com/Brenoell/front-end-1-Challenge](https://github.com/Brenoell/front-end-1-Challenge)

API PUBLICA: [https://segunda-gs-front-end-y88h-beige.vercel.app/](https://segunda-gs-front-end-y88h-beige.vercel.app/)

## ☕ Repositório Público - JAVA

GITHUB: [https://gs-2-entrega-java.onrender.com](https://gs-2-entrega-java.onrender.com)

API PUBLICA: [https://github.com/Brenoell/GS-2--Entrega-Java.git](https://github.com/Brenoell/GS-2--Entrega-Java.git)

## 📞 Contatos

- Breno: [brenobell03@gmail.com](mailto:brenobell03@gmail.com)
- Christian: [Chrisvbarbuto@gmail.com](mailto:Chrisvbarbuto@gmail.com)
- Eduardo Pizzoli: [edupizzolijr@gmail.com](mailto:edupizzolijr@gmail.com)
- Gustavo: [gulizpon@gmail.com](mailto:gulizpon@gmail.com)
