# foodexplorer-backend

## Descrição do Projeto
<p align="center">API para cadastro de usuários e cardápio.</p>

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash
# Clone este repositório
$ git clone https://github.com/betobala/foodexplorer-backend.git

# Configure as variáveis de ambiente
- Na raiz do projeto você irá encontrar um arquivo .env.example, preencha todos os campos e renomeie o arquivo deixando apenas ".env"
- Não esqueça de preencher todos os campos, a seed para o cadastro da conta admin só vai funcionar com os campos de admin preenchidos.

# Instale as dependências e rode as migrations/seeds
$ npm install
$ npx knex migrate:latest
$ npx knex seed:run

# Execute a aplicação em modo de desenvolvimento
$ npm run dev

# O servidor inciará na porta:3333 por padrão - acesse <http://localhost:3333>
```
### Observações

Sistema de pagamento não está funcionando, apenas ilustrativo. Para concluir o pedido, basta ir na opção de cartão de crédito e clicar em finalizar pagamento, espere até aparecer pagamento aprovado e o pedido vai ser direcionado para o histórico de pedidos.
