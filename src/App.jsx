import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import ExchangeRates from './pages/ExchangeRates';
import { TransactionProvider } from './contexts/TransactionContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <TransactionProvider>
        <Header />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/exchange-rates" element={<ExchangeRates />} />
          </Routes>
        </Container>
      </TransactionProvider>
    </Router>
  );
}

export default App;
