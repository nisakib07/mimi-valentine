// ===== DOM Elements =====
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');
const yesText = document.getElementById('yesText');
const noText = document.getElementById('noText');
const warningOverlay = document.getElementById('warningOverlay');
const warningBox = document.getElementById('warningBox');
const celebrationOverlay = document.getElementById('celebrationOverlay');
const celebTitle = document.getElementById('celebTitle');
const celebMessage = document.getElementById('celebMessage');
const loveLetterText = document.getElementById('loveLetterText');
const heartRain = document.getElementById('heartRain');
const confettiContainer = document.getElementById('confettiContainer');
const bgHearts = document.getElementById('bgHearts');
const mainContainer = document.getElementById('mainContainer');
const sparkleLayer = document.getElementById('sparkleLayer');
const titleText = document.getElementById('titleText');
const tapCounter = document.getElementById('tapCounter');
const emojiTop = document.getElementById('emojiTop');

// ===== State =====
let noTapCount = 0;
let isEscaped = false;
let yesScale = 1;

// ===== Funny No Button Messages (escalating desperation) =====
const noMessages = [
  'No',                              // 0 - confident
  'Umm... sure? 🤨',                // 1 - confused
  'Bro seriously?? 😢',             // 2 - hurt
  'My heart is cracking 💔',        // 3 - emotional (warning fires here)
  'I\'m literally crying rn 😭',    // 4 - dramatic
  'OK I\'ll stop eating 🍕❌',      // 5 - absurd threat
  'I\'ll tell your mom �',         // 6 - funny escalation
  'Fine, I\'ll date your bestie 💅', // 7 - jealousy card
  'Googling "how to move on" �',   // 8 - petty
  '*sends 100 texts* �📱📱',       // 9 - clingy
  'I\'m not crying YOU\'RE crying 😤', // 10 - denial
  'Bhai just press Yes 🙏',         // 11 - begging
  'I won\'t ask again... jk I WILL', // 12 - relentless
  'MIMISONA PLEASE �💀',           // 13 - final form
];

// ===== Funny Yes Button Messages (growing bigger & louder) =====
const yesMessages = [
  'Yes',                        // 0 - calm
  'Yes ❤️',                     // 1 - sweet
  'YES!! 💕',                   // 2 - excited
  'YESSS!!! 💖',                // 3 - very excited
  'TAP ME!! 🥰',               // 4 - begging
  'I\'M RIGHT HERE 💗',         // 5 - obvious
  'THIS ONE!! 👆�',            // 6 - pointing
  'PLEASEEE 🥺�',             // 7 - desperate
  'JUST DO IT ✅',              // 8 - nike mode
  'I\'M GETTING BIGGER 📈',    // 9 - self-aware
  '*YES BUTTON NOISES* 🔊',    // 10 - chaotic
  'HELLOOO?? 👀�',            // 11 - impatient
  'CLICK ME OR I EXPLODE �',  // 12 - threat
  'YES 💕 YES 💕 YES 💕',      // 13 - final form
];

// ===== Top Emoji Emotional Journey =====
const topEmojis = [
  '💕',  // happy
  '🥺',  // puppy eyes
  '😢',  // sad
  '💔',  // heartbreak (warning fires)
  '😭',  // crying
  '🍕',  // pizza trauma
  '📞',  // calling mom
  '💅',  // petty mode
  '�',  // googling
  '�',  // texting
  '😤',  // angry
  '�',  // praying
  '🤡',  // clown mode
  '�',  // dead
];

// ===== Typewriter Effect =====
function typeWriter(text, element, speed = 60) {
  return new Promise((resolve) => {
    element.innerHTML = '';
    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    element.appendChild(cursor);

    let i = 0;
    function type() {
      if (i < text.length) {
        if (text[i] === '\n') {
          element.insertBefore(document.createElement('br'), cursor);
        } else {
          element.insertBefore(document.createTextNode(text[i]), cursor);
        }
        i++;
        setTimeout(type, speed);
      } else {
        // Remove cursor after a moment
        setTimeout(() => cursor.remove(), 1500);
        resolve();
      }
    }
    type();
  });
}

// Start typewriter on load
typeWriter('Mimisona,\nWill You Be\nMy Valentine?', titleText, 65);

// ===== Initialize Background Hearts =====
function createBackgroundHearts() {
  const hearts = ['💕', '💗', '💖', '💘', '💝', '♥', '❤', '🩷', '🤍'];
  const count = 15;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'bg-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (10 + Math.random() * 15) + 's';
    heart.style.animationDelay = (Math.random() * 8) + 's';
    heart.style.fontSize = (0.9 + Math.random() * 1.5) + 'rem';
    bgHearts.appendChild(heart);
  }
}

createBackgroundHearts();

// ===== Tap Sparkle Effect (anywhere on screen) =====
document.body.addEventListener('touchstart', createSparkle, { passive: true });
document.body.addEventListener('click', createSparkle);

function createSparkle(e) {
  const sparkles = ['✨', '💫', '⭐', '🌟', '💖'];
  const x = e.touches ? e.touches[0].clientX : e.clientX;
  const y = e.touches ? e.touches[0].clientY : e.clientY;

  for (let i = 0; i < 3; i++) {
    const spark = document.createElement('span');
    spark.className = 'sparkle';
    spark.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    spark.style.left = (x + (Math.random() - 0.5) * 40) + 'px';
    spark.style.top = (y + (Math.random() - 0.5) * 40) + 'px';
    spark.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
    sparkleLayer.appendChild(spark);

    setTimeout(() => spark.remove(), 800);
  }
}

// ===== No Button – Escape Logic =====
function rectsOverlap(r1, r2) {
  return !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);
}

function moveNoButton() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const padding = 24;

  if (!isEscaped) {
    isEscaped = true;
    btnNo.classList.add('escaped');
  }

  // Measure after class change
  requestAnimationFrame(() => {
    const btnW = btnNo.offsetWidth;
    const btnH = btnNo.offsetHeight;
    const yesRect = btnYes.getBoundingClientRect();

    // Add a generous buffer around the Yes button to avoid overlap
    const yesZone = {
      left: yesRect.left - 30,
      right: yesRect.right + 30,
      top: yesRect.top - 30,
      bottom: yesRect.bottom + 30
    };

    const maxX = vw - btnW - padding;
    const maxY = vh - btnH - padding;

    let randomX, randomY, noRect, attempts = 0;

    // Try up to 20 positions, pick one that doesn't overlap Yes
    do {
      randomX = padding + Math.random() * Math.max(maxX - padding, 0);
      randomY = padding + Math.random() * Math.max(maxY - padding, 0);
      noRect = {
        left: randomX,
        right: randomX + btnW,
        top: randomY,
        bottom: randomY + btnH
      };
      attempts++;
    } while (rectsOverlap(noRect, yesZone) && attempts < 20);

    btnNo.style.left = randomX + 'px';
    btnNo.style.top = randomY + 'px';

    // Wiggle animation
    btnNo.classList.remove('wiggle');
    void btnNo.offsetWidth;
    btnNo.classList.add('wiggle');
  });
}

// ===== Grow Yes Button & Shrink No Button =====
function updateButtons() {
  const idx = Math.min(noTapCount, noMessages.length - 1);

  // Change No button text
  noText.textContent = noMessages[idx];

  // Change Yes button text & grow it naturally (padding + font-size, not scale)
  yesText.textContent = yesMessages[Math.min(noTapCount, yesMessages.length - 1)];

  const yesGrowth = Math.min(noTapCount, 10);
  const yesFontSize = 1.2 + yesGrowth * 0.06;  // 1.2rem → 1.8rem
  const yesPadding = 16 + yesGrowth * 2;         // 16px → 36px
  btnYes.style.fontSize = yesFontSize + 'rem';
  btnYes.style.padding = yesPadding + 'px 36px';
  btnYes.style.maxWidth = 'none';
  btnYes.style.zIndex = '20';

  if (noTapCount >= 2) {
    btnYes.classList.add('growing');
  }

  // No button gets smaller & more transparent
  const noFontSize = Math.max(0.95 - noTapCount * 0.03, 0.7);
  btnNo.style.fontSize = noFontSize + 'rem';
  btnNo.style.opacity = Math.max(1 - noTapCount * 0.04, 0.45).toString();

  // Change top emoji
  emojiTop.textContent = topEmojis[Math.min(noTapCount, topEmojis.length - 1)];

  // Update tap counter with funny hints
  if (noTapCount === 2) {
    tapCounter.textContent = '👆 The pink button looks lonely...';
  } else if (noTapCount >= 3 && noTapCount < 6) {
    tapCounter.textContent = '� You\'re really testing me right now';
  } else if (noTapCount >= 6 && noTapCount < 10) {
    tapCounter.textContent = '🤡 You look like a clown chasing that button';
  } else if (noTapCount >= 10) {
    tapCounter.textContent = '� Just give up and press YES already';
  }
}

function handleNoTap(e) {
  e.preventDefault();
  e.stopPropagation();

  noTapCount++;
  updateButtons();

  if (noTapCount < 3) {
    // First 2 taps: wiggle in place
    btnNo.classList.remove('wiggle');
    void btnNo.offsetWidth;
    btnNo.classList.add('wiggle');
  } else if (noTapCount === 3) {
    // 3rd tap: warning popup first, escape after dismiss
    showWarning();
    // Move the button after the popup auto-dismisses
    setTimeout(() => moveNoButton(), 2800);
  } else {
    // 4th+ tap: keep escaping
    moveNoButton();

    // Every few taps show the warning again
    if (noTapCount % 5 === 0) {
      showWarning();
    }
  }
}

// Touch + click (prevent double-fire)
let lastNoEvent = 0;
function onNoInteraction(e) {
  const now = Date.now();
  if (now - lastNoEvent < 300) return;
  lastNoEvent = now;
  handleNoTap(e);
}

btnNo.addEventListener('touchstart', onNoInteraction, { passive: false });
btnNo.addEventListener('click', onNoInteraction);

// ===== Warning =====
let warningShownAt = 0;

function showWarning() {
  warningShownAt = Date.now();
  warningOverlay.classList.add('active');
  warningBox.classList.remove('shake');
  void warningBox.offsetWidth;
  warningBox.classList.add('shake');

  // Vibrate if supported
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 200, 50, 100]);
  }

  // Auto-dismiss after 2.5 seconds
  setTimeout(() => {
    dismissWarning();
  }, 2500);
}

function dismissWarning() {
  warningOverlay.classList.remove('active');
  warningBox.classList.remove('shake');
}

// Dismiss warning on tap (with 500ms guard to prevent instant dismiss)
warningOverlay.addEventListener('click', (e) => {
  e.stopPropagation();
  if (Date.now() - warningShownAt > 500) {
    dismissWarning();
  }
});

warningOverlay.addEventListener('touchstart', (e) => {
  e.stopPropagation();
  if (Date.now() - warningShownAt > 500) {
    dismissWarning();
  }
}, { passive: true });

// ===== Yes Button – Celebration =====
function handleYesTap(e) {
  e.preventDefault();

  // Hide No button
  btnNo.classList.add('hidden');

  // Expand Yes animation
  btnYes.classList.add('celebrate');
  btnYes.disabled = true;

  // Start effects after expansion
  setTimeout(() => {
    mainContainer.style.display = 'none';

    triggerHeartRain();
    triggerConfetti();
    triggerHeartsBurst();

    // Show celebration with dynamic content
    celebTitle.textContent = 'Yaaay! 🎉';
    celebMessage.textContent = 'You just made me the happiest person alive! I knew you couldn\'t resist 😌';
    loveLetterText.innerHTML = 'Every moment with you<br>is a beautiful dream 💫<br><br>You are my everything,<br>Mimisona 💖 <br>Now let\'s make some mini versions of you!';

    setTimeout(() => {
      celebrationOverlay.classList.add('active');

      // Continuous heart rain on celebration screen
      setInterval(() => {
        triggerMiniHeartRain();
      }, 4000);
    }, 400);
  }, 600);
}

let lastYesEvent = 0;
function onYesInteraction(e) {
  const now = Date.now();
  if (now - lastYesEvent < 300) return;
  lastYesEvent = now;
  handleYesTap(e);
}

btnYes.addEventListener('touchstart', onYesInteraction, { passive: false });
btnYes.addEventListener('click', onYesInteraction);

// ===== Hearts Burst Effect (from center) =====
function triggerHeartsBurst() {
  const burst = document.getElementById('heartsBurst');
  const hearts = ['💖', '💕', '💗', '💘', '❤️', '💝', '💓'];
  const count = 16;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'burst-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    const angle = (360 / count) * i;
    const distance = 100 + Math.random() * 80;
    const rad = angle * Math.PI / 180;
    const tx = Math.cos(rad) * distance;
    const ty = Math.sin(rad) * distance;

    heart.style.setProperty('--tx', tx + 'px');
    heart.style.setProperty('--ty', ty + 'px');
    heart.style.animation = `burstOut 1.5s ease-out forwards`;
    heart.style.animationDelay = (Math.random() * 0.3) + 's';

    // Manually set the end position via keyframe override
    heart.animate([
      { transform: 'translate(0, 0) scale(0)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) scale(1.2)`, opacity: 1, offset: 0.4 },
      { transform: `translate(${tx * 1.3}px, ${ty * 1.3}px) scale(0.8)`, opacity: 0 }
    ], {
      duration: 1500,
      easing: 'ease-out',
      fill: 'forwards'
    });

    burst.appendChild(heart);
    setTimeout(() => heart.remove(), 1600);
  }
}

// ===== Heart Rain Effect =====
function triggerHeartRain() {
  const hearts = ['💖', '💕', '💗', '💘', '💝', '❤️', '💓', '💞', '🩷'];
  const count = 50;

  for (let i = 0; i < count; i++) {
    const heart = document.createElement('span');
    heart.className = 'rain-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (1 + Math.random() * 2.2) + 'rem';
    heart.style.animationDuration = (2.5 + Math.random() * 3.5) + 's';
    heart.style.animationDelay = (Math.random() * 3) + 's';
    heartRain.appendChild(heart);

    setTimeout(() => heart.remove(), 7000);
  }

  // Second wave
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      const heart = document.createElement('span');
      heart.className = 'rain-heart';
      heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
      heart.style.left = Math.random() * 100 + '%';
      heart.style.fontSize = (1 + Math.random() * 1.8) + 'rem';
      heart.style.animationDuration = (3 + Math.random() * 3) + 's';
      heart.style.animationDelay = (Math.random() * 2) + 's';
      heartRain.appendChild(heart);

      setTimeout(() => heart.remove(), 7000);
    }
  }, 2000);
}

// Mini heart rain for continuous effect on celebration screen
function triggerMiniHeartRain() {
  const hearts = ['💖', '💕', '💗', '❤️', '🩷'];
  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('span');
    heart.className = 'rain-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (0.8 + Math.random() * 1.2) + 'rem';
    heart.style.animationDuration = (4 + Math.random() * 4) + 's';
    heart.style.animationDelay = (Math.random() * 3) + 's';
    heartRain.appendChild(heart);

    setTimeout(() => heart.remove(), 9000);
  }
}

// ===== Confetti Effect =====
function triggerConfetti() {
  const colors = [
    '#ff6b8a', '#ff3d6e', '#ffd700', '#ff69b4',
    '#a18cd1', '#fbc2eb', '#ff9a9e', '#f093fb',
    '#ff6f91', '#c471f5', '#fad0c4', '#ffecd2',
    '#E91E63', '#9C27B0', '#FF5722'
  ];
  const shapes = ['circle', 'square', 'strip'];
  const count = 50;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    if (shape === 'circle') {
      const size = 6 + Math.random() * 8;
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.borderRadius = '50%';
    } else if (shape === 'square') {
      const size = 6 + Math.random() * 8;
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.borderRadius = '2px';
    } else {
      piece.style.width = (3 + Math.random() * 4) + 'px';
      piece.style.height = (10 + Math.random() * 16) + 'px';
      piece.style.borderRadius = '2px';
    }

    piece.style.animationDuration = (2 + Math.random() * 3.5) + 's';
    piece.style.animationDelay = (Math.random() * 2.5) + 's';
    piece.style.opacity = (0.7 + Math.random() * 0.3).toString();
    confettiContainer.appendChild(piece);

    setTimeout(() => piece.remove(), 6500);
  }

  // Second wave of confetti
  setTimeout(() => {
    for (let i = 0; i < 30; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      const size = 5 + Math.random() * 8;
      piece.style.width = size + 'px';
      piece.style.height = size + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = (2.5 + Math.random() * 3) + 's';
      piece.style.animationDelay = (Math.random() * 1.5) + 's';
      confettiContainer.appendChild(piece);

      setTimeout(() => piece.remove(), 6000);
    }
  }, 2500);
}
