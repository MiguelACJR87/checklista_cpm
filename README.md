# Sistema de Checklist de Veículos - C.P.M

## Descrição

Sistema web completo para checklist de veículos utilitários, desenvolvido especificamente para a C.P.M. O sistema permite o preenchimento digital de formulários de inspeção veicular, geração de PDFs e integração com Google Sheets para armazenamento de dados.

## Funcionalidades

### ✅ Tela de Login
- Sistema de autenticação simples
- Controle de acesso restrito a funcionários autorizados
- Credenciais padrão: usuário `admin`, senha `123456`

### ✅ Formulário de Checklist Completo
- Baseado no formulário físico original da C.P.M
- Todas as seções do documento original:
  - Tipo de operação (Chegada, Redirecionamento, Devolução, Rotina)
  - Data e hora
  - Informações do veículo e observador
  - Irregularidades (Arranhado, Amassado, Quebrado)
  - Acessórios do veículo
  - Sistema elétrico
  - Freios
  - Eixo/Suspensão traseira
  - Motor/Refrigeração
  - Documentação do veículo
  - Pneus (dianteiros, traseiros, estepe)
  - Entrega e recebimento
  - Troca de veículo
  - Anotações
  - Assinatura do condutor

### ✅ Geração de PDF
- Conversão automática do checklist preenchido em PDF
- Layout profissional idêntico ao formulário original
- Download automático com nome baseado na placa e data/hora
- Utiliza bibliotecas jsPDF e html2canvas

### ✅ Integração com Google Sheets
- Salvamento automático dos dados em planilha Google Sheets
- Interface de configuração para Google Apps Script
- Instruções completas para configuração
- Armazenamento estruturado de todos os dados do formulário

## Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **UI Components**: shadcn/ui + Tailwind CSS
- **Ícones**: Lucide React
- **PDF**: jsPDF + html2canvas
- **Integração**: Google Apps Script + Google Sheets API

## Como Usar

### 1. Acesso ao Sistema
1. Abra o navegador e acesse a URL do sistema
2. Faça login com as credenciais fornecidas
3. Você será direcionado para o formulário de checklist

### 2. Preenchimento do Checklist
1. Preencha todos os campos obrigatórios
2. Marque as opções aplicáveis usando os checkboxes
3. Adicione observações no campo de anotações se necessário
4. Assine digitalmente no campo de assinatura

### 3. Geração de PDF
1. Após preencher o formulário, clique em "Gerar PDF"
2. O arquivo será gerado automaticamente
3. O download iniciará com nome baseado na placa e timestamp

### 4. Salvamento no Google Sheets
1. Configure a integração clicando em "Configurar Sheets"
2. Siga as instruções para criar o Google Apps Script
3. Insira a URL do script e ID da planilha
4. Clique em "Salvar Checklist" para enviar os dados

## Configuração do Google Sheets

### Pré-requisitos
- Conta Google
- Acesso ao Google Sheets
- Acesso ao Google Apps Script

### Passos para Configuração

1. **Criar Planilha**
   - Acesse [Google Sheets](https://sheets.google.com)
   - Crie uma nova planilha
   - Copie o ID da planilha da URL

2. **Configurar Google Apps Script**
   - Acesse [Google Apps Script](https://script.google.com)
   - Crie um novo projeto
   - Cole o código fornecido nas instruções
   - Configure as permissões necessárias
   - Implante como aplicativo web

3. **Configurar no Sistema**
   - Clique em "Configurar Sheets" no sistema
   - Insira a URL do Google Apps Script
   - Insira o ID da planilha
   - Salve a configuração

### Cabeçalhos da Planilha
A planilha deve conter os seguintes cabeçalhos na primeira linha:

```
Timestamp | Observador | Placa | Modelo | Locadora | KM | C.C. | Localidade | Condutor | Supervisor | Telefone | Data | Hora | Chegada | Redirecionamento | Devolução | Rotina | Combustível | Arranhado | Amassado | Quebrado | Anotações | Assinatura Condutor
```

## Estrutura do Projeto

```
checklist-veiculo/
├── public/
├── src/
│   ├── components/
│   │   ├── ChecklistFormComplete.jsx
│   │   ├── GoogleSheetsConfig.jsx
│   │   └── Login.jsx
│   ├── utils/
│   │   ├── googleSheetsIntegration.js
│   │   └── pdfGenerator.js
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## Desenvolvimento Local

### Pré-requisitos
- Node.js 18+
- pnpm (gerenciador de pacotes)

### Instalação
```bash
cd checklist-veiculo
pnpm install
```

### Execução
```bash
pnpm run dev
```

O sistema estará disponível em `http://localhost:5173`

### Build para Produção
```bash
pnpm run build
```

## Segurança

- Sistema de login básico implementado
- Dados armazenados localmente no navegador (configurações)
- Integração segura com Google Sheets via Apps Script
- Não há armazenamento de dados sensíveis no frontend

## Suporte

Para suporte técnico ou dúvidas sobre o sistema:
1. Consulte esta documentação
2. Verifique as instruções de configuração do Google Sheets
3. Entre em contato com o administrador do sistema

## Versão

Versão 1.0 - Sistema completo com todas as funcionalidades implementadas

---

**Desenvolvido para C.P.M - Sistema de Checklist de Veículos Utilitários**

