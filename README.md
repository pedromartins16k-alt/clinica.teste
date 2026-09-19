# AURA Dental Studio — Sistema de Gestão e Agendamento Premium

Aplicação web completa desenvolvida com direção de arte editorial contemporânea (inspirada em estúdios digitais como *latelierdev.com*), projetada com foco em minimalismo sofisticado, respiro visual, tipografia expressiva e alta usabilidade funcional.

---

## ✦ Filosofia de Design & UX
- **Identidade Editorial Contemporânea:** Títulos em *Cormorant Garamond*, textos de corpo em *Plus Jakarta Sans* e dados operacionais em *JetBrains Mono*.
- **Sem clichês de IA:** Ausência de gradientes genéricos roxo/azul ou cards excessivamente arredondados; prevalência de tons orgânicos de osso (`#FBFBFA`), pedra (`#8A8680`), âmbar suave (`#C5A880`) e preto carvão (`#151515`).
- **Ritmo e Respiro Arquitetônico:** Grids assimétricos, hairlines sutis (`1px border`) e métricas clínicas em números grandes.

---

## ✦ Funcionalidades Principais

### 1. Portal do Paciente (Experiência Pública)
- **Hero Section Cinematográfica:** Apresentação da clínica, manifesto institucional e indicadores de credibilidade clínica.
- **Catálogo de Procedimentos com Filtro em Abas:** Estética, Ortodontia, Reabilitação Oral e Prevenção.
- **Apresentação do Corpo Clínico:** Mini-bios, certificações internacionais, anos de experiência e avaliações.
- **Fluxo de Agendamento Interativo (Multi-Step Wizard):**
  1. *Seleção do Procedimento* (com detalhes de duração e valor)
  2. *Escolha do Especialista*
  3. *Seletor Dinâmico de Datas e Horários* (com bloqueio em tempo real de dias indisponíveis)
  4. *Identificação do Paciente* (Nome, fone, e-mail, queixa/observações clínicas)
  5. *Voucher Clínico com Protocolo Único de Agendamento* gerado instantaneamente.

### 2. Painel de Operações da Clínica (Admin / Recepção)
- **KPIs em Tempo Real:** Consultas do dia, confirmadas, pacientes em cadeira e total de especialistas em escala.
- **Agenda Clínica:** Filtro dinâmico por especialista, status (`Confirmada`, `Pendente`, `Em Atendimento`, `Concluída`, `Cancelada`) e busca rápida.
- **Ações Imediatas:** Alteração de status com 1 clique (iniciar atendimento, concluir ou cancelar).
- **Prontuário Rápido de Pacientes:** Fichas consolidadas com histórico de consultas e contatos.
- **Trava & Bloqueio de Horários:** Ferramenta para travar dias/turnos por especialista (cirurgias externas, viagens ou férias).
- **Persistência Reativa:** Dados persistidos localmente (`localStorage`), mantendo o fluxo funcional e pronto para integração com API REST/GraphQL.

---

## ✦ Pilha Tecnológica
- **React 19 + TypeScript**
- **Vite**
- **Tailwind CSS** com paleta customizada
- **Lucide Icons**
- **Google Fonts (Cormorant Garamond, Plus Jakarta Sans, JetBrains Mono)**

---

## ✦ Execução Local

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Compilar para produção
npm run build
```
