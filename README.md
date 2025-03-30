# Batua - Wallet System

A robust financial management system built with React, featuring real-time transaction tracking, wallet management, and
comprehensive reporting capabilities.

## :notebook: [Notion Link](https://www.notion.so/Wallet-System-Batua-1c31be495c8b80e5a6e4c648c1565d7c)

## Features

- **Wallet Management**
  - Create and manage multiple wallets
  - Transaction history with pagination
  - Export functionality (CSV)
  - Text search

- **Transaction Processing**
  - Credit/Debit operations
  - Precise decimal handling (4 decimal places)

## Tech Stack

- **Frontend**
  - React 18
  - Ant Design 5.x
  - Styled Components
  - React Router 6 (very small case)

- **Development Tools**
  - Storybook
  - Jest

## Installation

```bash
# Clone the repository
git clone git@github.com:ankur17/batua-ui.git
cd batua-ui

# Install dependencies
npm install

# Start development server
npm start-local

```

## Frontend Application

The frontend application for this API is available at:

- GitHub Repository: [Batua-Server](https://github.com/ankur17/Batua-Server)
- Live Demo: [https://batua-server.onrender.com/](https://batua-server.onrender.com/)

## Configuration

The application uses environment variables for configuration:

```env
REACT_APP_API_URL=http://localhost:8081
REACT_APP_API_VERSION=v1
```

## Testing

```bash
npm run storybook
```

## Component Documentation

Components are documented using Storybook. Available stories include:

- `Header`: Header component with wallet balance display
- `WalletForm`: Wallet creation and management
- `TransactionForm`: Transaction processing
- `TransactionsTable`: Transaction history display
- `TransactionSearch` : Transaction description Fuzzy Search

## Live Deployment

### vercel.com Deployment

The application is deployed on Render.com at [https://batua-ui.vercel.app/](https://batua-ui.vercel.app/)

## Repo Boilerplate

- The repo is forked
  from: [Versel React Router Boilerplate](https://vercel.com/templates/react-router/react-router-boilerplate)