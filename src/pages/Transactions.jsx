import React, { useState } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useTransactions } from '../contexts/TransactionContext';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const Transactions = () => {
  const { transactions, addTransaction, deleteTransaction } = useTransactions();
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [type, setType] = useState('expense');
  const [currency, setCurrency] = useState('USD');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction({
      amount: parseFloat(amount),
      category,
      date,
      note,
      type,
      currency,
    });
    setAmount('');
    setCategory('');
    setDate('');
    setNote('');
  };

  return (
    <div>
      <h1 className="mb-4">Tranzaktsiyalar</h1>
      <Row>
        {/* Chap tarafdagi forma border bilan */}
        <Col md={6}>
          <Card className="p-4 border">
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Miqdor</Form.Label>
                  <Form.Control
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Kategoriya</Form.Label>
                  <Form.Control
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sana</Form.Label>
                  <Form.Control
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Izoh</Form.Label>
                  <Form.Control
                    as="textarea"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Tur</Form.Label>
                  <Form.Select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="income">Daromad</option>
                    <option value="expense">Xarajat</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Valyuta</Form.Label>
                  <Form.Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UZS">UZS</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Tranzaksiya qo'shish
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        {/* O'ng tarafdagi tranzaktsiyalar border va skroll bilan */}
        <Col md={6}>
          <Card className="p-3 border">
            <Card.Title>Tranzaktsiyalar Tarix</Card.Title>
            <Card.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <TransitionGroup component={null}>
                {transactions.map((transaction) => (
                  <CSSTransition key={transaction.id} timeout={500} classNames="fade">
                    <div className="mb-3 p-3 border rounded">
                      <p><strong>Miqdor:</strong> {transaction.amount} {transaction.currency}</p>
                      <p><strong>Kategoriya:</strong> {transaction.category}</p>
                      <p><strong>Sana:</strong> {transaction.date}</p>
                      <p><strong>Tur:</strong> {transaction.type}</p>
                      <p><strong>Izoh:</strong> {transaction.note}</p>
                      <Button variant="danger" size="sm" onClick={() => deleteTransaction(transaction.id)}>
                        O'chirish
                      </Button>
                    </div>
                  </CSSTransition>
                ))}
              </TransitionGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Transactions;
