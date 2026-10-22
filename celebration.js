(function () {
  const compliments = [
    "Brilliant work!",
    "Excellent reading!",
    "You nailed it!",
    "Fantastic job!",
    "Amazing effort!"
  ];

  function addStyles() {
    if (document.getElementById("achievementStyles")) return;
    const style = document.createElement("style");
    style.id = "achievementStyles";
    style.textContent = `
      .achievement-praise{margin:12px auto;padding:12px 16px;max-width:560px;border-radius:16px;background:linear-gradient(100deg,#fff0b8,#ffe3ef,#dff7ff);color:#643d79;font-size:clamp(20px,4vw,28px);font-weight:900;box-shadow:0 4px 16px #603b7820;animation:praise-pop .55s cubic-bezier(.2,1.5,.4,1) both}
      .achievement-praise span{display:block;margin-top:4px;font-size:15px;color:#3c6376}
      .confetti-layer{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:9999}
      .confetti-piece{position:absolute;top:-18px;width:10px;height:17px;border-radius:3px;animation:confetti-fall 2.8s cubic-bezier(.2,.65,.4,1) forwards}
      @keyframes confetti-fall{to{transform:translate3d(var(--drift),110vh,0) rotate(780deg);opacity:.15}}
      @keyframes praise-pop{from{opacity:0;transform:scale(.72) translateY(10px)}to{opacity:1;transform:scale(1) translateY(0)}}
      @media(prefers-reduced-motion:reduce){.achievement-praise{animation:none}.confetti-piece{animation-duration:1ms!important}}
    `;
    document.head.appendChild(style);
  }

  function launchConfetti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.querySelector(".confetti-layer")?.remove();
    const layer = document.createElement("div");
    layer.className = "confetti-layer";
    layer.setAttribute("aria-hidden", "true");
    const colors = ["#f15b5a", "#ffbd50", "#58bd83", "#49a9dd", "#a56ad1", "#ff79aa"];
    for (let i = 0; i < 64; i++) {
      const piece = document.createElement("i");
      piece.className = "confetti-piece";
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.animationDelay = `${Math.random() * 0.65}s`;
      piece.style.setProperty("--drift", `${Math.round(Math.random() * 180 - 90)}px`);
      piece.style.width = `${6 + Math.random() * 7}px`;
      piece.style.height = `${10 + Math.random() * 12}px`;
      layer.appendChild(piece);
    }
    document.body.appendChild(layer);
    window.setTimeout(() => layer.remove(), 3800);
  }

  window.celebrateAchievement = function (score, finishElement) {
    const host = typeof finishElement === "string" ? document.querySelector(finishElement) : finishElement;
    if (!host) return;
    host.querySelector(".achievement-praise")?.remove();
    if (score <= 12) return;
    addStyles();
    const praise = document.createElement("p");
    praise.className = "achievement-praise";
    praise.setAttribute("role", "status");
    praise.setAttribute("aria-live", "polite");
    const compliment = compliments[Math.floor(Math.random() * compliments.length)];
    praise.append(document.createTextNode(compliment));
    const message = document.createElement("span");
    message.textContent = `太棒了！你答對 ${score} 題，繼續保持好奇心！`;
    praise.appendChild(message);
    host.insertBefore(praise, host.firstChild);
    launchConfetti();
  };
})();
