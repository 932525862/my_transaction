import React from 'react';
import { Row, Col, Card, Table } from 'react-bootstrap';
import { useTransactions } from '../contexts/TransactionContext';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const { transactions } = useTransactions();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const incomeByCategory = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieChartData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
        ],
      },
    ],
  };

  return (
    <div>
      <h1 className="mb-4">Boshqaruv Paneli</h1>
      <Row>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Jami Daromad</Card.Title>
              <Card.Text className="text-success">${totalIncome.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Jami Xarajatlar</Card.Title>
              <Card.Text className="text-danger">${totalExpenses.toFixed(2)}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>To'lov Balansi</Card.Title>
              <Card.Text className={netBalance >= 0 ? 'text-success' : 'text-danger'}>
                ${netBalance.toFixed(2)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Kategoriya bo'yicha Xarajatlar</Card.Title>
              <Pie data={pieChartData} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Kategoriyalar bo'yicha Hisobot</Card.Title>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Kategoriya</th>
                    <th>Xarajatlar</th>
                    <th>Daromadlar</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(expensesByCategory).map((category) => (
                    <tr key={category}>
                      <td>{category}</td>
                      <td>${expensesByCategory[category].toFixed(2)}</td>
                      <td>${(incomeByCategory[category] || 0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
