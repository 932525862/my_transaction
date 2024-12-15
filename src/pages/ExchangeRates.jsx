import React, { useState } from 'react';
import { Form, Button, Card, Row, Col, Table } from 'react-bootstrap';
import { useExchangeRates } from '../hooks/useExchangeRates';
import { convertCurrency } from '../services/exchangeRateService';

const ExchangeRates = () => {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const { rates, loading, error } = useExchangeRates(baseCurrency);

  const handleConvert = async (e) => {
    e.preventDefault();
    if (amount && fromCurrency && toCurrency) {
      const result = await convertCurrency(parseFloat(amount), fromCurrency, toCurrency);
      setConvertedAmount(result);
    }
  };

  return (
    <div>
      <h1 className="mb-4">Valyuta kurslari</h1>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Joriy valyuta kurslari</Card.Title>
              <Form.Group className="mb-3">
                <Form.Label>Asosiy valyuta</Form.Label>
                <Form.Select
                  value={baseCurrency}
                  onChange={(e) => setBaseCurrency(e.target.value)}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="UZS">UZS</option>
                </Form.Select>
              </Form.Group>
              {loading && <p>Valyuta kurslari yuklanmoqda...</p>}
              {error && <p className="text-danger">{error}</p>}
              {!loading && !error && (
                <div style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr>
                        <th>Valyuta</th>
                        <th>Hozirgi kurs</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(rates).map(([currency, rate]) => (
                        <tr key={currency}>
                          <td>{currency}</td>
                          <td>{rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Valyuta konvertori</Card.Title>
              <Form onSubmit={handleConvert}>
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
                  <Form.Label>Qayerdan valyuta</Form.Label>
                  <Form.Select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UZS">UZS</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Qayerga valyuta</Form.Label>
                  <Form.Select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="UZS">UZS</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Konvertatsiya qilish
                </Button>
              </Form>
              {convertedAmount !== null && (
                <div className="mt-3" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px' }}>
                  <h5 className="text-center">
                    Konvertatsiya qilingan miqdor: <strong>{convertedAmount.toFixed(2)} {toCurrency}</strong>
                  </h5>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ExchangeRates;
