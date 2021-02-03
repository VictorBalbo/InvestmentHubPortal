import React, { useState, useEffect } from 'react';
import { Card, Divider, Statistic, Table } from 'antd';
import { Doughnut, Line } from 'react-chartjs-2';
import { ApiService } from './services/ApiService';
import {
  Investment,
  InvestmentType,
  PatrimonyEvolution,
  Summary,
} from './models';
import { ColorService } from './services/ColorService';
import { format } from 'date-fns';
import './Overview.scss';

export function OverviewComponent() {
  const [myEvolution, setMyEvolution] = useState<PatrimonyEvolution[]>();
  useEffect(() => {
    const getPatrimonyEvolution = async () => {
      const value = await ApiService.getPatrimonyEvolution();
      setMyEvolution(value);
    };

    if (!myEvolution) {
      getPatrimonyEvolution();
    }
  });
  const patrimonyChart = {
    labels: myEvolution?.map((p) => format(new Date(p.Date), 'dd/MM/yy')),
    datasets: [
      {
        data: myEvolution?.map((i) => i.Value),
      },
    ],
  };

  const [summary, setSummary] = useState<Summary>();
  useEffect(() => {
    const getSummary = async () => {
      const value = await ApiService.getSummaryAsync();
      setSummary(value);
    };

    if (!summary) {
      getSummary();
    }
  });

  // Group investiments by type
  const investmentsByType = summary?.Investments.reduce(
    (acc: { [key in InvestmentType]?: Investment[] }, i) => {
      acc[i.Type] = [...(acc[i.Type] || []), i];
      return acc;
    },
    {}
  );

  const walletChart = {
    labels: Object.keys(investmentsByType ?? {}),
    datasets: [
      {
        data: Object.values(investmentsByType ?? {}).map((i) =>
          i?.reduce((acc, val) => acc + val.Value, 0)
        ),
        backgroundColor: Object.keys(investmentsByType ?? {}).map((i) =>
          ColorService.getColor(i)
        ),
        borderWidth: 1,
      },
    ],
  };
  const walletTableSource = Object.entries(investmentsByType ?? {}).map(
    ([key, value]) => ({
      key: key,
      type: key,
      participacao: formatPercentage(
        (value?.reduce((acc, val) => acc + val.Value, 0) ?? 0) /
          (summary?.TotalValue ?? 1)
      ),
      value: value?.reduce((acc, val) => acc + val.Value, 0),
    })
  );

  const walletTablecolumns = [
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Participação',
      dataIndex: 'participacao',
      key: 'participacao',
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
    },
  ];

  if (!summary) {
    return <span>FALTA DE DADOS</span>;
  }

  return (
    <div id="OverviewComponent">
      <section className="CardSection">
        <Card title="My Summary" className="OverviewCard SummaryCard">
          <Statistic
            title="Net Worth"
            value={summary!.TotalValue}
            precision={2}
            prefix={'R$'}
          />
          <Divider className="Divider" />
          <Statistic
            title="Invested"
            value={summary!.TotalInvestedValue}
            precision={2}
            prefix={'R$'}
          />
          <Divider className="Divider" />
          <Statistic
            title="Gain in month"
            value={summary!.MonthGain}
            precision={2}
            prefix={'R$'}
          />
          <Divider className="Divider" />
          <Statistic
            title="Profitability in month"
            value={(summary!.MonthGain / summary!.TotalValue) * 100}
            precision={2}
            suffix={'%'}
          />
        </Card>

        <Card title="Evolution" className="OverviewCard SummaryCard">
          <Line
            data={patrimonyChart}
            height={250}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              legend: {
                display: false,
                onClick: (e) => e.stopPropagation(),
              },
            }}
          />
        </Card>
      </section>

      <section className="CardSection">
        <Card title="My Wallet" className="OverviewCard WalletCard">
          <div className="WalletWrapper">
            <div className="WalletChart">
              <Doughnut
                data={walletChart}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  legend: {
                    onClick: (e) => e.stopPropagation(),
                  },
                }}
              />
            </div>
            <div className="WalletTable">
              <Table
                dataSource={walletTableSource}
                columns={walletTablecolumns}
              />
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}

const formatPercentage = (value: number) => `${roundDecimals(value * 100)}%`;

const roundDecimals = (value: number, decimals: number = 2) =>
  Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
