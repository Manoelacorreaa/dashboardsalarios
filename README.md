Dashboard Receita & Salário
Este repositório contém um dashboard interativo para análise executiva de receita, salário/comissão variável, top clientes, produtos e evolução mensal da produção comercial, alimentado automaticamente por uma planilha Google Sheets via Google Apps Script.
O objetivo é fornecer uma visão clara e completa da performance comercial ao longo do tempo, com dados atualizados em tempo real, filtragem dinâmica e métricas finais precisas para tomada de decisão. https://dashboardsalarios.lovable.app
🚀 Visão Geral
O dashboard consolida automaticamente dados brutos da planilha Receita Consolidada e entrega:
Evolução mensal de Receita e Salário
Melhor mês de salário/comissão
Ranking dos top clientes (por receita e salário)
Ranking de produtos (por receita e salário)
Indicadores principais (Receita Total, Salário Total, Volume Total)
Tabela completa de registros filtrados
Filtros avançados (Mês, Produto, Cliente, Classe SR)
Regra fundamental de negócio
Somente operações com BOLETADO = true são consideradas.
Esse é o critério chave para que os valores representem efetivamente produção realizada.
🧱 Arquitetura
Front-end: React + TypeScript (estrutura Lovable)
Interface: Tailwind + shadcn/ui
Ícones: lucide-react
Fonte de dados: Google Sheets (aba “Receita Consolidada”)
API: Google Apps Script retornando JSON estruturado
Consumo: hook useDashboardData → atualiza em tempo real via URL do Apps Script
🔌 API — Google Apps Script (Web App)
O Web App processa diretamente a planilha de dados e entrega o JSON utilizado no dashboard.
Funções do Apps Script
O script:
Abre a planilha e lê todas as linhas da aba “Receita Consolidada”
Interpreta e converte:
Valores monetários (ex.: R$ 20.000,00)
Percentuais (ex.: 1,00%)
Booleans (sim, nao, true, false, boletado)
Aplica o filtro de negócio:
Somente inclui registros em que boletado === true
Não descarta salário mesmo se receita = 0
(correção importante que garante a soma real ex: Novembro = 18k)
Retorna um objeto JSON estruturado:
{
  "updatedAt": "...",
  "totalRegistros": 42,
  "filtros": { "mes": "Novembro", "boletado": true },
  "data": [
    {
      "cliente": "Cliente X",
      "produto": "COE",
      "classeSR": "Alternativos",
      "tipoProduto": "COE",
      "boletado": true,
      "feeBrutoPercent": 0.01,
      "repasseProdutoPercent": 0.95,
      "volumeBRL": 20000,
      "salarioBRL": 76,
      "receitaBRL": 200,
      "mes": "Novembro"
    }
  ]
}
A URL pública do Web App tem formato:
https://script.google.com/macros/s/SEU_ID/exec
E aceita filtro de mês:
...?mes=Novembro
📊 Regras de cálculo do Dashboard
O front-end utiliza as funções declaradas em @/utils/calculations para gerar métricas consistentes:
Indicadores principais
Receita Total: soma de receitaBRL
Salário Total: soma de salarioBRL
Volume Total: soma de volumeBRL
Melhor mês de salário: maior SUM(salarioBRL) por mês
Rankings
Top clientes por receita
Top clientes por salário
Top produtos por receita
Top produtos por salário
Evolução mensal
Agrupa todos os registros por mês, somando receita e salário, sem excluir registros com salário > 0 mesmo com receita = 0.
🧮 Correção essencial aplicada
O sistema inicialmente descartava linhas onde a receita era zero.
Foi implementada a correção:
Uma linha só deve ser descartada se NÃO tiver receita E NÃO tiver salário.
Isso corrigiu divergências como o salário de Novembro, que na planilha era 18.068,54 mas no dashboard aparecia incompleto.
Agora os cálculos utilizam:
if (receitaVazia && salarioVazio) continue;
E não mais:
if (receita === 0) continue;
🖥️ Execução local
Para rodar localmente:
npm install
npm run dev
Configure a variável da API caso queira sobrescrever:
VITE_API_URL=https://script.google.com/macros/s/SEU_ID/exec
O hook useDashboardData automaticamente consome essa URL.
📁 Estrutura principal do projeto
src/
  components/
    KPICard.tsx
    MonthlyChart.tsx
    ProductCharts.tsx
    TopClientsCharts.tsx
    DataTable.tsx
    ExecutiveSummary.tsx
    DashboardFilters.tsx
  hooks/
    useDashboardData.ts
  utils/
    calculations.ts
    formatters.ts
  pages/
    Index.tsx
🧩 Próximos aprimoramentos
Comparação Realizado x Meta mensal
Exportação CSV de dados filtrados
Separação anual (multi-anos)
Dashboard adicional para conversão / eficiência comercial


