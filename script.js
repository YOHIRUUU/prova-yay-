// Classe base
class ComponenteMonitor {
  constructor(id) {
      this.card = document.getElementById(id);
      this.valor = this.card.querySelector('.valor');
      this.status = this.card.querySelector('.status');
  }

  atualizarInterface(valor, tipo) {
      throw new Error("O método atualizarInterface deve ser implementado na classe filha");
  }
}

// Classe filha
class CardHardware extends ComponenteMonitor {
  atualizarInterface(valor, tipo) {
      let unidade = '';
      let limite = 0;
      let msgOk = '';
      let msgAlerta = '';

      switch(tipo) {
          case 'cpu':
              unidade = '%';
              limite = 80;
              msgOk = '✅ Normal';
              msgAlerta = '⚠️ Alto uso';
              break;
          case 'ram':
              unidade = ' GB';
              limite = 12;
              msgOk = '✅ OK';
              msgAlerta = '⚠️ Cheia';
              break;
          case 'temperatura':
              unidade = ' °C';
              limite = 75;
              msgOk = '❄️ Estável';
              msgAlerta = '🔥 Quente';
              break;
      }

      this.valor.innerText = valor + unidade;

      if(valor > limite){
          this.card.classList.add('alerta');
          this.status.innerText = msgAlerta;
      } else {
          this.card.classList.remove('alerta');
          this.status.innerText = msgOk;
      }
  }
}

// Instâncias dos cards
const cpu = new CardHardware('cpu-card');
const ram = new CardHardware('ram-card');
const temp = new CardHardware('temp-card');

// Função para gerar dados simulados
function gerarDadosSimulados() {
    return {
        cpu: Math.floor(Math.random() * 100),          // 0-99%
        ram: (Math.random() * 16).toFixed(1),          // 0-16 GB
        temperatura: Math.floor(Math.random() * 90)    // 0-90 °C
    };
}

// Função para atualizar dashboard
function atualizarDashboard() {
    const dados = gerarDadosSimulados();

    cpu.atualizarInterface(dados.cpu, 'cpu');
    ram.atualizarInterface(parseFloat(dados.ram), 'ram');
    temp.atualizarInterface(dados.temperatura, 'temperatura');
}

// Atualiza a cada 2 segundos
setInterval(atualizarDashboard, 2000);
atualizarDashboard();