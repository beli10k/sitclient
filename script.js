// ===== DADOS DOS JOGOS =====
const games = [
    {
        id: 1,
        home: { name: 'Corinthians', emoji: '⚪', record: '12V-5E-3D' },
        away: { name: 'Flamengo', emoji: '🔴', record: '14V-4E-2D' },
        date: '28/01 - 15:30',
        stadium: 'Neo Química Arena',
        odds: { home: 2.45, draw: 3.10, away: 2.90 }
    },
    {
        id: 2,
        home: { name: 'Palmeiras', emoji: '🟢', record: '16V-3E-1D' },
        away: { name: 'São Paulo', emoji: '🔴', record: '11V-6E-3D' },
        date: '28/01 - 18:00',
        stadium: 'Allianz Parque',
        odds: { home: 1.85, draw: 3.40, away: 4.20 }
    },
    {
        id: 3,
        home: { name: 'Atlético-MG', emoji: '⚫', record: '13V-5E-2D' },
        away: { name: 'Cruzeiro', emoji: '🔵', record: '10V-7E-3D' },
        date: '29/01 - 19:00',
        stadium: 'Arena MRV',
        odds: { home: 1.95, draw: 3.40, away: 4.20 }
    },
    {
        id: 4,
        home: { name: 'Grêmio', emoji: '🔵', record: '12V-5E-3D' },
        away: { name: 'Internacional', emoji: '🔴', record: '11V-6E-3D' },
        date: '29/01 - 20:00',
        stadium: 'Arena do Grêmio',
        odds: { home: 2.30, draw: 3.20, away: 3.10 }
    },
    {
        id: 5,
        home: { name: 'Botafogo', emoji: '⚪', record: '14V-4E-2D' },
        away: { name: 'Vasco da Gama', emoji: '⚫', record: '9V-6E-5D' },
        date: '30/01 - 16:00',
        stadium: 'Estádio Nilton Santos',
        odds: { home: 1.75, draw: 3.50, away: 4.50 }
    },
    {
        id: 6,
        home: { name: 'Fluminense', emoji: '🟣', record: '11V-5E-4D' },
        away: { name: 'Bahia', emoji: '🔵', record: '10V-7E-3D' },
        date: '30/01 - 18:30',
        stadium: 'Estádio de São Januário',
        odds: { home: 2.10, draw: 3.30, away: 3.40 }
    }
];

const clubes = [
    { name: 'Athletico-PR', emoji: '🔴' },
    { name: 'Atlético-MG', emoji: '⚫' },
    { name: 'Bahia', emoji: '🔵' },
    { name: 'Botafogo', emoji: '⚪' },
    { name: 'Chapecoense', emoji: '🟢' },
    { name: 'Corinthians', emoji: '⚪' },
    { name: 'Coritiba', emoji: '🟢' },
    { name: 'Cruzeiro', emoji: '🔵' },
    { name: 'Flamengo', emoji: '🔴' },
    { name: 'Fluminense', emoji: '🟣' },
    { name: 'Grêmio', emoji: '🔵' },
    { name: 'Internacional', emoji: '🔴' },
    { name: 'Mirassol', emoji: '🟡' },
    { name: 'Palmeiras', emoji: '🟢' },
    { name: 'Red Bull Bragantino', emoji: '🔴' },
    { name: 'Remo', emoji: '🔵' },
    { name: 'Santos', emoji: '⚪' },
    { name: 'São Paulo', emoji: '🔴' },
    { name: 'Vasco da Gama', emoji: '⚫' },
    { name: 'Vitória', emoji: '🔴' }
];

let currentBet = null;

// ===== RENDERIZAR JOGOS =====
function renderGames() {
    const container = document.getElementById('gamesContainer');
    container.innerHTML = games.map(game => `
        <div class="game-card">
            <div class="game-header">
                <span class="game-time">${game.date}</span>
                <span class="game-stadium">${game.stadium}</span>
            </div>

            <div class="game-teams">
                <div class="team">
                    <div class="team-badge">${game.home.emoji}</div>
                    <div class="team-info">
                        <div class="team-name">${game.home.name}</div>
                        <div class="team-record">${game.home.record}</div>
                    </div>
                </div>

                <div class="vs-divider">VS</div>

                <div class="team">
                    <div class="team-badge">${game.away.emoji}</div>
                    <div class="team-info">
                        <div class="team-name">${game.away.name}</div>
                        <div class="team-record">${game.away.record}</div>
                    </div>
                </div>
            </div>

            <div class="odds-section">
                <div class="odds-label">Escolha seu palpite:</div>
                <div class="odds-grid">
                    <button class="odd-button" onclick="selectOdd(${game.id}, 'home', ${game.odds.home})">
                        <div class="odd-button-label">Casa</div>
                        <div class="odd-button-value">${game.odds.home.toFixed(2)}</div>
                    </button>
                    <button class="odd-button" onclick="selectOdd(${game.id}, 'draw', ${game.odds.draw})">
                        <div class="odd-button-label">Empate</div>
                        <div class="odd-button-value">${game.odds.draw.toFixed(2)}</div>
                    </button>
                    <button class="odd-button" onclick="selectOdd(${game.id}, 'away', ${game.odds.away})">
                        <div class="odd-button-label">Fora</div>
                        <div class="odd-button-value">${game.odds.away.toFixed(2)}</div>
                    </button>
                </div>
            </div>

            <button class="bet-button" onclick="openBetModal(${game.id})">
                ⚡ SIMULAR APOSTA
            </button>
        </div>
    `).join('');
}

// ===== RENDERIZAR CLUBES =====
function renderClubs() {
    const container = document.getElementById('clubesContainer');
    if (!container) return;
    
    container.innerHTML = clubes.map((club, index) => `
        <div class="club-card" onclick="showClubDetails('${club.name}', '${club.emoji}')">
            <div class="club-icon">${club.emoji}</div>
            <div class="club-name">${club.name}</div>
        </div>
    `).join('');
}

// ===== SELECIONAR ODD =====
function selectOdd(gameId, type, odd) {
    const game = games.find(g => g.id === gameId);
    const typeLabel = { home: game.home.name, draw: 'Empate', away: game.away.name };
    
    currentBet = {
        gameId,
        type,
        typeLabel: typeLabel[type],
        odd,
        game
    };

    // Atualizar visual dos botões
    document.querySelectorAll(`[onclick*="selectOdd(${gameId}"]`).forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.closest('.odd-button').classList.add('selected');
}

// ===== ABRIR MODAL DE APOSTA =====
function openBetModal(gameId) {
    if (!currentBet || currentBet.gameId !== gameId) {
        alert('Selecione um palpite primeiro!');
        return;
    }

    document.getElementById('summaryMatch').textContent = `${currentBet.game.home.name} x ${currentBet.game.away.name}`;
    document.getElementById('summaryPick').textContent = currentBet.typeLabel;
    document.getElementById('summaryOdd').textContent = currentBet.odd.toFixed(2);
    
    document.getElementById('betModal').classList.add('active');
}

// ===== FECHAR MODAL =====
function closeBetModal() {
    document.getElementById('betModal').classList.remove('active');
}

// ===== ENVIAR APOSTA =====
function submitBet() {
    const name = document.getElementById('betName').value;
    const email = document.getElementById('betEmail').value;
    const amount = document.getElementById('betAmount').value;

    if (!name || !email || !amount) {
        alert('Preencha todos os campos!');
        return;
    }

    if (amount < 10) {
        alert('O valor mínimo é 10 créditos fictícios!');
        return;
    }

    // Simular envio
    const possibleResults = ['Vitória! 🎉', 'Derrota 😢', 'Empate 🤝'];
    const result = possibleResults[Math.floor(Math.random() * possibleResults.length)];
    
    const winnings = amount * currentBet.odd;

    console.log({
        name,
        email,
        match: `${currentBet.game.home.name} x ${currentBet.game.away.name}`,
        pick: currentBet.typeLabel,
        odd: currentBet.odd,
        amount,
        result,
        winnings: result === 'Vitória! 🎉' ? winnings.toFixed(2) : 0
    });

    // Mostrar mensagem de sucesso
    const successMsg = document.getElementById('successMessage');
    successMsg.innerHTML = `
        <strong>✓ Aposta Simulada com Sucesso!</strong><br>
        <strong>${name}</strong>, sua aposta de <strong>${amount} créditos</strong> foi registrada!<br>
        <strong>Resultado Simulado: ${result}</strong>
        ${result === 'Vitória! 🎉' ? `<br>Você ganhou: <strong>${winnings.toFixed(2)} créditos</strong> 🍀` : ''}
    `;
    successMsg.classList.add('show');

    setTimeout(() => {
        successMsg.classList.remove('show');
        closeBetModal();
        document.getElementById('betAmount').value = '100';
        document.getElementById('betName').value = '';
        document.getElementById('betEmail').value = '';
    }, 4000);
}

// ===== MOSTRAR DETALHES DO CLUBE =====
function showClubDetails(clubName, emoji) {
    alert(`${emoji} ${clubName}\n\nClique para ver mais detalhes (em desenvolvimento)`);
}

// ===== FECHAR MODAL AO CLICAR FORA =====
document.addEventListener('DOMContentLoaded', () => {
    const betModal = document.getElementById('betModal');
    if (betModal) {
        betModal.addEventListener('click', (e) => {
            if (e.target.id === 'betModal') {
                closeBetModal();
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
        });
    }

    // Renderizar conteúdo
    renderGames();
    renderClubs();

    // Links do footer
    document.getElementById('privacyLink')?.addEventListener('click', () => showModalPage('privacy'));
    document.getElementById('termsLink')?.addEventListener('click', () => showModalPage('terms'));
    document.getElementById('faqLink')?.addEventListener('click', () => showModalPage('faq'));
});

// ===== MODAL PAGES =====
function showModalPage(page) {
    const modal = document.getElementById('modalPage');
    const content = document.getElementById('modalPageContent');
    const title = document.getElementById('modalPageTitle');

    const pages = {
        privacy: {
            title: 'Política de Privacidade',
            content: `
                <h3>1. Coleta de Dados</h3>
                <p>A BR Aposta+ coleta apenas informações fornecidas voluntariamente pelos usuários através de formulários de contato e simulação de apostas. Não coletamos dados pessoais sensíveis.</p>
                
                <h3>2. Uso de Dados</h3>
                <p>Os dados coletados são utilizados exclusivamente para:</p>
                <ul>
                    <li>Melhorar a experiência do usuário</li>
                    <li>Responder a consultas e feedback</li>
                    <li>Análise estatística de uso da plataforma</li>
                </ul>
                
                <h3>3. Segurança</h3>
                <p>Implementamos medidas de segurança padrão da indústria para proteger seus dados. No entanto, nenhuma transmissão pela internet é 100% segura.</p>
                
                <h3>4. Cookies</h3>
                <p>Utilizamos cookies para melhorar a navegação e personalizar sua experiência. Você pode desabilitar cookies em seu navegador.</p>
                
                <h3>5. Contato</h3>
                <p>Para dúvidas sobre privacidade, entre em contato: contato@brapostaplus.com.br</p>
            `
        },
        terms: {
            title: 'Termos de Uso',
            content: `
                <h3>1. Aceitação dos Termos</h3>
                <p>Ao acessar e usar a BR Aposta+, você concorda com estes termos e condições. Se não concordar, não use a plataforma.</p>
                
                <h3>2. Natureza Fictícia</h3>
                <p>A BR Aposta+ é uma plataforma 100% fictícia e educativa. Não realizamos apostas com dinheiro real e não temos fins lucrativos.</p>
                
                <h3>3. Responsabilidade do Usuário</h3>
                <p>O usuário é responsável por manter a confidencialidade de suas credenciais e por todas as atividades realizadas em sua conta.</p>
                
                <h3>4. Limitação de Responsabilidade</h3>
                <p>A BR Aposta+ não se responsabiliza por danos indiretos, incidentais ou consequentes resultantes do uso da plataforma.</p>
                
                <h3>5. Modificações</h3>
                <p>Reservamos o direito de modificar estes termos a qualquer momento. As mudanças serão efetivas imediatamente após publicação.</p>
                
                <h3>6. Lei Aplicável</h3>
                <p>Estes termos são regidos pelas leis da República Federativa do Brasil.</p>
            `
        },
        faq: {
            title: 'Perguntas Frequentes',
            content: `
                <h3>O que é BR Aposta+?</h3>
                <p>BR Aposta+ é uma plataforma fictícia e gratuita de apostas esportivas focada no Campeonato Brasileiro Série A, criada para entretenimento e educação.</p>
                
                <h3>É necessário pagar para usar?</h3>
                <p>Não! A BR Aposta+ é 100% gratuita. Não há custos de inscrição, assinatura ou qualquer tipo de pagamento.</p>
                
                <h3>Posso ganhar dinheiro real?</h3>
                <p>Não. Todas as apostas e ganhos são fictícios e utilizados apenas para simular o ambiente de apostas esportivas.</p>
                
                <h3>Como funciona a simulação de apostas?</h3>
                <p>Você seleciona um jogo, escolhe uma odd (probabilidade), define um valor em créditos fictícios e confirma. O resultado é gerado aleatoriamente.</p>
                
                <h3>Quais clubes participam?</h3>
                <p>Todos os 20 clubes do Campeonato Brasileiro Série A 2026 estão disponíveis na plataforma.</p>
                
                <h3>Posso compartilhar meus resultados?</h3>
                <p>Sim! Você pode compartilhar seus palpites e resultados fictícios com amigos através de redes sociais.</p>
                
                <h3>Como faço para entrar em contato?</h3>
                <p>Você pode nos contatar através do email contato@brapostaplus.com.br ou pelo telefone (11) 9 9999-9999.</p>
            `
        }
    };

    const page_data = pages[page];
    title.textContent = page_data.title;
    content.innerHTML = page_data.content;
    modal.classList.add('active');
}

function closeModalPage() {
    document.getElementById('modalPage').classList.remove('active');
}

// Fechar modal ao clicar no X
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('modalPageClose');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModalPage);
    }

    // Fechar ao clicar fora
    const modal = document.getElementById('modalPage');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target.id === 'modalPage') {
                closeModalPage();
            }
        });
    }
});
