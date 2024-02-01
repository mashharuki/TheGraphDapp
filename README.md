# 🏗 Scaffold-ETH 2

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain. It's designed to make it easier for developers to create and deploy smart contracts and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, RainbowKit, Hardhat, Wagmi, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/1171422a-0ce4-4203-bcd4-d2d1941d198b)

## Requirements

Before you begin, you need to install the following tools:

- [Node (v18 LTS)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/scaffold-eth/scaffold-eth-2.git
cd scaffold-eth-2
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the contract component or the example ui in the frontend. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contract `YourContract.sol` in `packages/hardhat/contracts`
- Edit your frontend in `packages/nextjs/pages`
- Edit your deployment scripts in `packages/hardhat/deploy`

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.

## 動かし方

以下コマンドで The Graph 用の docker コンテナを展開する。

```bash
yarn run-node
```

以下コマンドでサブグラフの作成を行う。

```bash
yarn local-create
```

以下コマンドでサブグラフのデプロイを行う

```bash
yarn local-ship
```

以下のようになれば成功

```bash
Build completed: QmYFUDNSf524ki1mSPzqTXXb6CL6AfBKRY74E72NhothU2

Deployed to http://localhost:8000/subgraphs/name/scaffold-eth/your-contract/graphql

Subgraph endpoints:
Queries (HTTP):     http://localhost:8000/subgraphs/name/scaffold-eth/your-contract
```

以下コマンドでスマートコントラクトをデプロイし直す

```bash
yarn deploy --reset
```

以下のようになっていれば成功

```bash
Successfully compiled 1 Solidity file
deploying "YourContract" (tx: 0x8f717203fa00f4bf1fc2fb78a89ee7819f21c44a6b1e2c605242693d769eb607)...: deployed at 0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9 with 605281 gas
📝 Updated TypeScript contract definition file on ../nextjs/generated/deployedContracts.ts
```

以下コマンドでサブグラフ用のファイルを更新する

```bash
yarn abi-copy && yarn codegen
```

```bash
✅  Published contracts to the subgraph package.
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
✔ Apply migrations
✔ Load subgraph from subgraph.yaml
  Load contract ABI from abis/localhost_YourContract.json
✔ Load contract ABIs
  Generate types for contract ABI: YourContract (abis/localhost_YourContract.json)
  Write types to generated/YourContract/YourContract.ts
✔ Generate types for contract ABIs
✔ Generate types for data source templates
✔ Load data source template ABIs
✔ Generate types for data source template ABIs
✔ Load GraphQL schema from src/schema.graphql
  Write types to generated/schema.ts
✔ Generate types for GraphQL schema

Types generated successfully

```

サブグラフを再度デプロイ

```bash
yarn local-ship
```

以下のようになれば成功

```bash
                .. QmepecJkQeyjpdaDQFppxqER1gvrqC19rKxMxuJ7pMXLuw
✔ Upload subgraph to IPFS

Build completed: QmVtrZDwh6TG4Nt87fGXXG81UBVLpVwQV6FjPCKKxBHgHC

Deployed to http://localhost:8000/subgraphs/name/scaffold-eth/your-contract/graphql

Subgraph endpoints:
Queries (HTTP):     http://localhost:8000/subgraphs/name/scaffold-eth/your-contract
```

以下のクエリで下記のような結果が返ってくる。

```graphql
{
  sendMessages(first: 1, orderBy: blockTimestamp, orderDirection: desc) {
    message
    _from
    _to
  }
}
```

```json
{
  "data": {
    "sendMessages": [
      {
        "message": "etetetete",
        "_from": "0x51908f598a5e0d8f1a3babfa6df76f9704dad072",
        "_to": "0x51908f598a5e0d8f1a3babfa6df76f9704dad072"
      }
    ]
  }
}
```

以下コマンドで sepolia にデプロイする

```bash
yarn deploy --network sepolia
```

```bash
Nothing to compile
No need to generate any newer typings.
deploying "YourContract" (tx: 0xcfdb578d257380afd6b492194be80a8b7eae537cbc9bf200c4d47fdda19dcda6)...: deployed at 0xf8FEf2Ab9F5AB51771f7B799D55a8DcA14CB409b with 605281 gas
📝 Updated TypeScript contract definition file on ../nextjs/generated/deployedContracts.ts
```

以下で検証

```bash
yarn verify --network sepolia
```

以下のようになれば成功

```bash
verifying YourContract (0xf8FEf2Ab9F5AB51771f7B799D55a8DcA14CB409b) ...
waiting for result...
 => contract YourContract is now verified
```

[0xf8FEf2Ab9F5AB51771f7B799D55a8DcA14CB409b](https://sepolia.etherscan.io/address/0xf8FEf2Ab9F5AB51771f7B799D55a8DcA14CB409b)

以下コマンドで Sepolia にデプロイする。

```bash
graph deploy --studio sendmessage
```

以下の用になれば OK!

```bash
Which version label to use? (e.g. "v0.0.1"): v.0.0.1
  Skip migration: Bump mapping apiVersion from 0.0.1 to 0.0.2
  Skip migration: Bump mapping apiVersion from 0.0.2 to 0.0.3
  Skip migration: Bump mapping apiVersion from 0.0.3 to 0.0.4
  Skip migration: Bump mapping apiVersion from 0.0.4 to 0.0.5
  Skip migration: Bump mapping apiVersion from 0.0.5 to 0.0.6
  Skip migration: Bump manifest specVersion from 0.0.1 to 0.0.2
  Skip migration: Bump manifest specVersion from 0.0.2 to 0.0.4
✔ Apply migrations
✔ Load subgraph from subgraph.yaml
  Compile data source: YourContract => build/YourContract/YourContract.wasm
✔ Compile subgraph
  Copy schema file build/schema.graphql
  Write subgraph file build/YourContract/abis/YourContract.json
  Write subgraph manifest build/subgraph.yaml
✔ Write compiled subgraph to build/
  Add file to IPFS build/schema.graphql
                .. QmTLSV6vUwnPYyi9oqMJ3Ds3TkgE1A8PEaYa5yhbd3y73b
  Add file to IPFS build/YourContract/abis/YourContract.json
                .. QmT5j3kGMkVjUVaW8MhMKRSnZXdTDrTSUcf5MC9hFKNHYf
  Add file to IPFS build/YourContract/YourContract.wasm
                .. QmaVcxpsRH318iWatwiMGkoLU1satajkY8r5wQQCP8r8Zv
✔ Upload subgraph to IPFS

Build completed: QmTMsFKM3PTpM2v11mpvJAr6TWnBD7jpr5XJRcRMMBGF68

Deployed to https://thegraph.com/studio/subgraph/sendmessage

Subgraph endpoints:
Queries (HTTP):     https://api.studio.thegraph.com/query/44992/sendmessage/v.0.0.1
```

[https://api.studio.thegraph.com/query/44992/sendmessage/v.0.0.1](https://api.studio.thegraph.com/query/44992/sendmessage/v.0.0.1)でクエリを実行できる。

```graphql
query MyQuery {
  sendMessages(first: 10) {
    _from
    id
    message
    _to
  }
}
```

```json
{
  "data": {
    "sendMessages": [
      {
        "_from": "0x51908f598a5e0d8f1a3babfa6df76f9704dad072",
        "id": "0xf508bf1b8b3fe65cc4b1d6a944a5805bf616e0ec02222b8011f815c13fc5dda24a000000",
        "message": "grgrgr",
        "_to": "0x51908f598a5e0d8f1a3babfa6df76f9704dad072"
      }
    ]
  }
}
```

Vercel にデプロイ

```bash
yarn vercel:yolo
```
