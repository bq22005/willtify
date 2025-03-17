# willtify

willtify は、誰に届くかわからない手紙を、送信日を指定して書くことができる web アプリケーションです。

他のユーザによって投稿された手紙が、あなたの元に届きます。

## 🚀 機能

- NextAuth によるユーザ認証
- 手紙の作成・保存
- 送信日の指定

## 🛠 技術スタック

- Next.js (App router)
- module.css
- NextAuth (v5)

## 💻 インストール

```sh
# リポジトリのクローン
git clone https://github.com/bq22005/willtify.git
cd willtify

# セットアップ
npm install
npx prisma generate
```

## 使用方法

### 1. アプリケーションの起動

```sh
npm run start
```

### 2. アカウント作成とログイン

- ユーザー登録後、ログイン

### 3. 手紙の作成

- 手紙の内容を入力
- 送信日を設定
- 他のユーザーとシェア
