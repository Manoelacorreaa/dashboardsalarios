# Dashboard Receita & Salário (Google Sheets → Apps Script → React)

Dashboard interativo para análise de **receita**, **salário/comissão**, **clientes**, **produtos** e **evolução mensal**, alimentado automaticamente a partir de uma planilha Google Sheets via API (Google Apps Script). https://dashboardsalarios.lovable.app

A solução foi desenvolvida para consolidar a performance comercial com dados sempre atualizados e filtragem dinâmica.

---

## 🚀 Tecnologias

- **React + TypeScript**
- **Lovable** (estrutura base)
- **Tailwind + shadcn/ui**
- **Google Sheets**
- **Google Apps Script (Web App JSON)**

---

## 📊 Funcionalidades do Dashboard

- Evolução mensal de **Receita** e **Salário**
- Identificação automática do **melhor mês de salário**
- **Top 10 Clientes** (por receita e por salário)
- **Análise por Produto** (receita e salário)
- Indicadores principais:
  - Receita Total  
  - Salário Total  
  - Volume Total  
- Filtros por:
  - Mês  
  - Produto  
  - Cliente  
  - Classe SR  
- Tabela detalhada com drill-down
- Dados carregados em tempo real da API

---

## 📌 Regras de Negócio (importantíssimo)

1. **Somente registros com `BOLETADO = true`** entram na análise.  
2. Registros com **salário > 0** são considerados **mesmo que a receita seja 0**.  
3. Apenas registros totalmente vazios (sem salário e sem receita) são ignorados.  
4. Os cálculos são baseados em:
   - `receitaBRL`
   - `salarioBRL`
   - `volumeBRL`

Essas regras garantem que os valores do dashboard reflitam a produção real — exemplo: o salário de Novembro (~18k) passa a aparecer corretamente após o ajuste da API.

---

## 🔌 API – Google Apps Script (Web App)

A API lê automaticamente a aba:
Receita Consolidada

E entrega o JSON no formato:

```json
{
  "updatedAt": "...",
  "totalRegistros": 42,
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


