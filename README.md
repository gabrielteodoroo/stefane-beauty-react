# 💎 Stefane Piercing - Website

Um website moderno e responsivo para a Stefane Piercing, especialista em body piercing. O projeto inclui catálogo de joias, área administrativa protegida e integração com WhatsApp e Instagram.

## 🚀 Funcionalidades

### ✨ Públicas
- **Homepage** com apresentação da profissional e serviços
- **Catálogo de Joias** com filtros por categoria e busca
- **Página de Cuidados** com orientações pós-piercing
- **Botões flutuantes** de WhatsApp e Instagram
- **Design responsivo** para mobile e desktop

### 🔐 Administrativas
- **Área admin protegida** com autenticação (email e senha)
- **Painel para adicionar, editar e remover joias e serviços**
- **Formulários de cadastro em modal**
- **Sidebar simples para navegação entre Joias e Serviços**
- **Persistência de sessão** no localStorage

## 🛠️ Tecnologias Utilizadas

### Frontend
- **React 19.1.0** - Framework JavaScript para construção de interfaces
- **TypeScript 5.8.3** - Superset do JavaScript com tipagem estática
- **Vite 7.0.0** - Build tool e dev server ultra-rápido
- **React Router DOM** - Roteamento e navegação entre páginas
- **React Query** - Gerenciamento de dados assíncronos
- **React Hook Form** + **Zod** - Formulários e validação

### Estilização
- **Tailwind CSS 4.1.11** - Framework CSS utility-first
- **PostCSS**
- **Autoprefixer**

### Ícones e UI
- **Lucide React** - Biblioteca de ícones moderna e consistente

### Desenvolvimento
- **ESLint**
- **TypeScript ESLint**
- **Prettier**

### Build e Deploy
- **Vite**
- **TypeScript Compiler**
- **Node.js**

## 📦 Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Backend API rodando e acessível (verifique a variável de ambiente)

### Passos

1. **Clone o repositório**
```bash
git clone git@github.com:gabrielteodoroo/stefane-beauty-react.git
cd stefane-piercing
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
# Crie um arquivo .env na raiz do projeto
VITE_API_BASE_URL=http://localhost:3333 # ou a URL do seu backend
```

4. **Execute o projeto**
```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 🏃‍♀️ Como usar

### Desenvolvimento
```bash
npm run dev
```
Acesse `http://localhost:5173`

### Produção
```bash
npm run build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/              # Componentes reutilizáveis
│   ├── Navigation.tsx       # Menu de navegação
│   ├── Footer.tsx           # Rodapé
│   ├── SocialButtons.tsx    # Botões de redes sociais
│   ├── ProtectedRoute.tsx   # Rota protegida
│   └── AdminSidebar.tsx     # Sidebar do admin
├── pages/                   # Páginas da aplicação
│   ├── HomePage.tsx         # Página inicial
│   ├── CatalogoPage.tsx     # Catálogo de joias
│   ├── CuidadosPage.tsx     # Cuidados pós-piercing
│   ├── LoginPage.tsx        # Página de login
│   ├── AdminPage.tsx        # Painel admin - Joias
│   └── AdminServicosPage.tsx # Painel admin - Serviços
├── hooks/                   # Hooks customizados
│   ├── useAuth.ts           # Hook de autenticação
│   ├── useJewels.ts         # Hook de gerenciamento de joias
│   └── useServices.ts       # Hook de gerenciamento de serviços
├── utils/                   # Utilitários
│   ├── whatsapp.ts          # Integração com WhatsApp
│   ├── categorias.ts        # Categorias de joias
│   └── categoriasServicos.ts # Categorias de serviços
├── schemas/                 # Schemas de validação Zod
│   ├── jewel.schema.ts      # Schema de joia
│   └── service.schema.ts    # Schema de serviço
├── types/                   # Definições de tipos TypeScript
│   └── index.ts             # Interfaces e tipos
└── assets/                  # Recursos estáticos
    └── stefane-png.png      # Imagem da profissional
```

## 🔧 Configuração

### Autenticação Admin
- **Login:** via email e senha cadastrados
- **Rota:** `/admin` (joias) e `/admin-servicos` (serviços)
- **Persistência:** localStorage
- **Backend:** É necessário rodar a API backend e garantir que a URL está correta em `VITE_API_BASE_URL`

### Redes Sociais
- **WhatsApp:** +55 75 8368-0253
- **Instagram:** [@stefanebodypiercing](https://www.instagram.com/stefanebodypiercing)

### Personalização
Para alterar informações da profissional, edite:
- `src/pages/HomePage.tsx` - Informações principais
- `src/components/Footer.tsx` - Contatos e horários
- `src/utils/whatsapp.ts` - Número do WhatsApp
- `src/components/SocialButtons.tsx` - Links das redes sociais

## 🎨 Design System

### Cores
- **Primária:** Purple (#8B5CF6)
- **Secundária:** Rose (#E11D48)
- **Verde:** WhatsApp (#22C55E)
- **Cinza:** Neutral (#6B7280)

### Componentes
- Botões com hover effects
- Cards com sombras suaves
- Gradientes modernos
- Ícones do Lucide React

## 📱 Responsividade

O site é totalmente responsivo e funciona em:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1280px+)

## 🔒 Segurança

- **Autenticação:** Email e senha (via backend)
- **Rotas protegidas:** Redirecionamento automático
- **Validação:** TypeScript e Zod para type safety
- **Sanitização:** Input validation nos formulários

## 🚀 Deploy

### Vercel (Recomendado)
```bash
npm install -g vercel
vercel
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 👤 Contato

**Stefane Piercing**
- 📱 WhatsApp: (75) 8368-0253
- 📸 Instagram: [@stefanebodypiercing](https://www.instagram.com/stefanebodypiercing)
- 📍 Localização: Paulo Afonso, BA

---

⭐ Se este projeto te ajudou, deixe uma estrela no repositório!
