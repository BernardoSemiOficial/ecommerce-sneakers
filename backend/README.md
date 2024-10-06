# Backend

# Backend do Ecommerce de Sneakers

Este é o backend do projeto de ecommerce de sneakers. Ele fornece uma API para gerenciar produtos, clientes, pedidos e pagamentos.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução para JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **Postgres**: Banco de dados.
- **Mercado Pago**: Gateway de pagamento.
- **JSON Web Token**: Gateway de pagamento.

## Como Rodar o Projeto

1. Clone o repositório:
   ```sh
   git clone <URL_DO_REPOSITORIO>
   ```
2. Navegue até o diretório do projeto:
   ```sh
   cd ecommerce-sneakers/backend
   ```
3. Instale as dependências:
   ```sh
   npm install
   ```
4. Inicie o servidor:
   ```sh
   npm start
   ```

## Endpoints Disponíveis

- **Produtos**

  - `GET /products`: Lista todos os produtos
  - `POST /products`: Cria um novo produto
  - `PUT /products/:id`: Atualiza um produto existente
  - `DELETE /products/:id`: Deleta um produto

- **Clientes**

  - `GET /customer`: Buscar por um cliente
  - `GET /customers`: Lista todos os clientes
  - `POST /customers`: Cria um novo cliente
  - `PUT /customers/:id`: Atualiza um cliente existente
  - `DELETE /customers/:id`: Deleta um cliente

- **Pedidos**

  - `GET /orders`: Lista todos os pedidos
  - `POST /orders`: Cria um novo pedido
  - `PUT /orders/:id`: Atualiza um pedido existente
  - `DELETE /orders/:id`: Deleta um pedido

- **Pagamentos**

  - `GET /payments`: Buscar pagamentos
  - `POST /payments`: Cria um novo pagamento

## Etapas do Back

- [x] Criar rotas get, post, update, delete
- [x] Poder buscar, criar, alterar e deletar produtos
- [x] Poder buscar, criar, alterar e deletar clientes
- [x] Poder buscar, criar, alterar e deletar orders
- [ ] Poder buscar e criar pagamentos
