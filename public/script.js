let wheel = null;
let options = [];
let showConfetti = false;
document
  .getElementById("optionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const input = document.getElementById("optionsInput").value;
    if (input.trim()) {
      const query = new URLSearchParams({ options: input }).toString();
      window.location.search = query;
    }
  });

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const container = document.getElementById("wheel-container");
  options = params.get("options")
    ? params.get("options").split(",")
    : ["Option 1", "Option 2", "Option 3"];
  shuffle(options);
  wheel = new spinWheel.Wheel(container, {
    items: options.map((opt) => ({ label: opt.trim() })),
    itemBackgroundColors: ["#22c55e", "#3b82f6"],
    itemLabelColors: ["#fff"],
    itemLabelFontSizeMax: 36,
    onRest: () => {
      if (showConfetti) {
        fireworks();
        showConfetti = false;
      }
    },
  });
});

document.getElementById("spinButton").addEventListener("click", () => {
  const spinDuration = Math.floor(Math.random() * (6000 - 4000 + 1)) + 4000;
  showConfetti = true;
  wheel.spin(spinDuration);
});

function fireworks() {
  const duration = 4000,
    animationEnd = Date.now() + duration,
    defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
    );
    confetti(
      Object.assign({}, defaults, {
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    );
  }, 250);
}
