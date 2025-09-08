// Resistance Oyunu Narrator Uygulaması

// Karakter verileri
const characters = {
  spy: [
    { id: 'spy1', name: 'Casus', description: 'Görevleri sabote etmeye çalışır', count: 4 },
    { id: 'spy2', name: 'Derin Casus', description: 'Lider, bu karakterin casus olduğunu oyunun başında öğrenmez. Bu karakter Casus takımını daha güçlü kılar.', count: 1 },
    { id: 'spy3', name: 'Yalnız Kurt', description: 'Ne kendisi diğer casusları öğrenir ne de diğer casuslar kendisini tanır. Bu karakter Direniş takımını daha güçlü kılar.', count: 1 },
    { id: 'spy4', name: 'Sabotör', description: 'Komutan olan oyuncuya Lider gibi gözükür. Bu karakter Casus takımını daha güçlü kılar.', count: 1 },
    { id: 'spy5', name: 'Suikastçi', description: 'Lider karakteri ile beraber oyuna dahil edilmelidir. Oyunun sonunda Suikastçi Lider oyuncuyu bulup öldürürse oyunu Casus takımı kazanır.', count: 1 }
  ],
  resistance: [
    { id: 'res1', name: 'Direnişçi', description: 'Özgürlük için savaşan cesur savaşçı', count: 6 },
    { id: 'res2', name: 'Lider', description: 'Suikastçi ile beraber oyuna eklenmelidir. Casusların kim olduğunu bilir ancak direnişçiler Lider gizli kalabilirse oyunu kazanır.', count: 1 },
    { id: 'res3', name: 'Komutan', description: 'Oyunun başında kimin Lider olduğunu bilir. Bu karakter direniş takımını daha güçlü kılar.', count: 1 }
  ]
};

// Seçili kartları takip etmek için
const selectedCards = new Set();

// Uygulama başlatma
function initializeApp() {
  createStyles();
  renderCards();
}

// CSS stillerini dinamik olarak oluştur
function createStyles() {
  const style = document.createElement('style');
  style.textContent = `
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      min-height: 100vh;
    }

    .game-container {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      text-align: center;
      color: white;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
      margin-bottom: 30px;
      font-size: 2.5em;
    }

    #cards-container {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      justify-content: center;
    }

    .card {
      width: 100px;
      height: 200px;
      border: 3px solid #333;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 10px;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      position: relative;
      overflow: hidden;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 16px rgba(0,0,0,0.4);
    }

    .card.selected {
      transform: scale(1.1);
      border-color: #ffd700;
      border-width: 4px;
      box-shadow: 0 0 20px rgba(255, 215, 0, 0.6);
    }

    .card.spy {
      background: linear-gradient(135deg, #ff416c, #ff4757);
      color: white;
    }

    .card.resistance {
      background: linear-gradient(135deg, #3742fa, #2f3542);
      color: white;
    }

    .card-title {
      font-weight: bold;
      font-size: 14px;
      text-align: center;
      margin-bottom: 10px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }

    .card-description {
      font-size: 10px;
      text-align: center;
      line-height: 1.3;
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
    }

    .card-count {
      position: absolute;
      top: 5px;
      right: 5px;
      background: rgba(0,0,0,0.7);
      color: white;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      font-weight: bold;
    }

    .controls-section {
      margin-top: 30px;
      text-align: center;
      padding: 20px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      backdrop-filter: blur(10px);
    }

    .controls-section label {
      display: block;
      color: white;
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 10px;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
    }

    .controls-section input[type="number"] {
      padding: 8px 12px;
      border: 2px solid #333;
      border-radius: 5px;
      font-size: 16px;
      text-align: center;
      width: 80px;
      background: white;
      transition: border-color 0.3s ease;
    }

    .controls-section input[type="number"]:focus {
      outline: none;
      border-color: #ffd700;
      box-shadow: 0 0 10px rgba(255, 215, 0, 0.3);
    }

    .controls-section button {
      margin-top: 15px;
      padding: 12px 30px;
      background: linear-gradient(135deg, #28a745, #20c997);
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

    .controls-section button:hover {
      background: linear-gradient(135deg, #218838, #1abc9c);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.3);
    }

    .controls-section button:active {
      transform: translateY(0);
      box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    .controls-section button:disabled {
      background: #6c757d;
      cursor: not-allowed;
      transform: none;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .controls-section button.pause {
      background: linear-gradient(135deg, #dc3545, #e74c3c);
    }

    .controls-section button.pause:hover {
      background: linear-gradient(135deg, #c82333, #c0392b);
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0,0,0,0.3);
    }

    @media (max-width: 768px) {
      #cards-container {
        gap: 10px;
      }

      .card {
        width: 90px;
        height: 180px;
        padding: 8px;
      }

      .controls-section {
        margin-top: 20px;
        padding: 15px;
      }
    }
  `;
  document.head.appendChild(style);
}

// Kartları oluştur ve render et
function renderCards() {
  const container = document.getElementById('cards-container');

  // Spy takımı kartları
  characters.spy.forEach(character => {
    for (let i = 0; i < character.count; i++) {
      const card = createCard(character, 'spy', i);
      container.appendChild(card);
    }
  });

  // Resistance takımı kartları
  characters.resistance.forEach(character => {
    for (let i = 0; i < character.count; i++) {
      const card = createCard(character, 'resistance', i);
      container.appendChild(card);
    }
  });
}

// Tek bir kart oluştur
function createCard(character, team, index) {
  const card = document.createElement('div');
  const cardId = `${character.id}_${index}`;

  card.className = `card ${team}`;
  card.dataset.cardId = cardId;

  card.innerHTML = `
    <div class="card-title">${character.name}</div>
    <div class="card-description">${character.description}</div>
    ${character.count > 1 ? `<div class="card-count">${index + 1}</div>` : ''}
  `;

  // Kart seçim event listener'ı
  card.addEventListener('click', () => toggleCardSelection(card, cardId));

  return card;
}

// Kart seçimini toggle et
function toggleCardSelection(cardElement, cardId) {
  if (selectedCards.has(cardId)) {
    // Seçimi kaldır
    selectedCards.delete(cardId);
    cardElement.classList.remove('selected');
  } else {
    // Seçimi ekle
    selectedCards.add(cardId);
    cardElement.classList.add('selected');
  }

  // Debug için seçili kartları konsola yazdır
  console.log('Seçili kartlar:', Array.from(selectedCards));
}

// Duraklama süresi değerini al
function getPauseDuration() {
  const input = document.getElementById('pause-duration');
  return parseInt(input.value) || 3; // Default 3 saniye
}

// Oyun durumu
let isGameRunning = false;
let currentAudioIndex = 0;
let currentAudio = null;
let pauseTimeout = null;
let audioSequence = [];

// Ses dosyalarını hazırla
function initializeAudio() {
  audioSequence = [];
  for (let i = 0; i <= 7; i++) {
    audioSequence.push(`assets/${i}.mp3`);
  }
}

// Ses çalma fonksiyonu
function playAudioSequence() {
  if (currentAudioIndex >= audioSequence.length) {
    // Tüm ses dosyaları çalındı, oyunu bitir
    stopGame();
    return;
  }

  const audioPath = audioSequence[currentAudioIndex];
  currentAudio = new Audio(audioPath);

  currentAudio.addEventListener('loadeddata', () => {
    console.log(`${audioPath} ses dosyası yüklendi`);
  });

  currentAudio.addEventListener('error', (e) => {
    console.error(`${audioPath} ses dosyası yüklenemedi:`, e);
    // Hata durumunda bir sonraki ses dosyasına geç
    nextAudio();
  });

  currentAudio.addEventListener('ended', () => {
    console.log(`${audioPath} ses dosyası tamamlandı`);
    nextAudio();
  });

  currentAudio.play().catch(error => {
    console.error('Ses çalma hatası:', error);
    nextAudio();
  });

  console.log(`Çalınan ses: ${audioPath}`);
}

// Bir sonraki ses dosyasına geç
function nextAudio() {
  currentAudioIndex++;

  if (currentAudioIndex < audioSequence.length && isGameRunning) {
    const pauseDuration = getPauseDuration() * 1000; // milisaniyeye çevir
    console.log(`${pauseDuration / 1000} saniye bekleniyor...`);

    pauseTimeout = setTimeout(() => {
      if (isGameRunning) {
        playAudioSequence();
      }
    }, pauseDuration);
  } else if (currentAudioIndex >= audioSequence.length) {
    // Tüm ses dosyaları çalındı
    stopGame();
  }
}

// Ses çalmayı durdur
function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  if (pauseTimeout) {
    clearTimeout(pauseTimeout);
    pauseTimeout = null;
  }
}

// Oyunu tamamen bitir
function stopGame() {
  const startButton = document.getElementById('start-button');

  stopAudio();
  isGameRunning = false;
  currentAudioIndex = 0;

  startButton.textContent = 'Başlat';
  startButton.classList.remove('pause');

  console.log('Oyun tamamlandı');
}

// Başlat butonu için event listener
function setupStartButton() {
  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', toggleGame);
}

// Oyunu başlat/duraklat toggle
function toggleGame() {
  const startButton = document.getElementById('start-button');

  if (!isGameRunning) {
    // Oyunu başlat
    const selectedCardIds = Array.from(selectedCards);
    const pauseDuration = getPauseDuration();

    console.log('Oyun başlatılıyor...');
    console.log('Seçili kartlar:', selectedCardIds);
    console.log('Duraklama süresi:', pauseDuration, 'saniye');
    console.log('Başlangıç ses index:', currentAudioIndex);

    // Buton durumunu değiştir
    startButton.textContent = 'Duraklat';
    startButton.classList.add('pause');
    isGameRunning = true;

    // Ses çalmaya başla
    playAudioSequence();

  } else {
    // Oyunu duraklat
    console.log('Oyun duraklatılıyor...');
    console.log('Duraklatma anındaki ses index:', currentAudioIndex);

    // Ses çalmayı durdur
    if (currentAudio) {
      currentAudio.pause();
    }

    if (pauseTimeout) {
      clearTimeout(pauseTimeout);
      pauseTimeout = null;
    }

    // Buton durumunu değiştir
    startButton.textContent = 'Başlat';
    startButton.classList.remove('pause');
    isGameRunning = false;

    console.log('Oyun duraklatıldı');
  }
}

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
  initializeAudio();
  setupStartButton();
});
