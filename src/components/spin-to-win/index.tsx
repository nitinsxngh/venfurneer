import { useState, useEffect, useRef } from "react";

// Spin-to-win coupons (not shown in regular promo codes) - 5%, 7.5%, 10%, 12.5%, and 15%
const SPIN_COUPONS = [
  { code: "SPIN5", discount: 5, probability: 0.30, color: "#E8E8E8", textColor: "#1A1A1A" }, // 30% chance
  { code: "SPIN75", discount: 7.5, probability: 0.25, color: "#D3D3D3", textColor: "#1A1A1A" }, // 25% chance
  { code: "SPIN10", discount: 10, probability: 0.20, color: "#FF6B6B", textColor: "#FFFFFF" }, // 20% chance
  { code: "SPIN125", discount: 12.5, probability: 0.15, color: "#4ECDC4", textColor: "#FFFFFF" }, // 15% chance
  { code: "SPIN15", discount: 15, probability: 0.10, color: "#FFD93D", textColor: "#1A1A1A" }, // 10% chance (rare)
];

// Helper function to create SVG path for pie slice
const createPieSlice = (startAngle: number, endAngle: number, radius: number, centerX: number, centerY: number) => {
  const startAngleRad = (startAngle - 90) * (Math.PI / 180);
  const endAngleRad = (endAngle - 90) * (Math.PI / 180);

  const x1 = centerX + radius * Math.cos(startAngleRad);
  const y1 = centerY + radius * Math.sin(startAngleRad);
  const x2 = centerX + radius * Math.cos(endAngleRad);
  const y2 = centerY + radius * Math.sin(endAngleRad);

  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

  return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
};

// Helper function to get text position in segment
const getTextPosition = (angle: number, radius: number, centerX: number, centerY: number, offset: number = 0.4) => {
  const angleRad = (angle - 90) * (Math.PI / 180);
  const textRadius = radius * offset;
  return {
    x: centerX + textRadius * Math.cos(angleRad),
    y: centerY + textRadius * Math.sin(angleRad),
    rotation: angle - 90, // Rotate text to be horizontal in segment
  };
};

const SpinToWin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [wonCoupon, setWonCoupon] = useState<{ code: string; discount: number } | null>(null);
  const [showResult, setShowResult] = useState(false);
  const wheelRef = useRef<SVGSVGElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Check if user has already spun today
    const lastSpinDate = localStorage.getItem("spinLastDate");
    const today = new Date().toDateString();

    if (lastSpinDate === today) {
      const savedCoupon = localStorage.getItem("spinWonCoupon");
      if (savedCoupon) {
        try {
          const coupon = JSON.parse(savedCoupon);
          setWonCoupon(coupon);
          setHasSpun(true);
        } catch (e) {
          console.error("Error parsing saved coupon:", e);
        }
      } else {
        setHasSpun(true);
      }
    }
  }, []);

  const selectWinner = () => {
    const random = Math.random();
    let cumulative = 0;

    for (const coupon of SPIN_COUPONS) {
      cumulative += coupon.probability;
      if (random <= cumulative) {
        return coupon;
      }
    }

    // Fallback to first coupon
    return SPIN_COUPONS[0];
  };

  const handleSpin = () => {
    if (isSpinning || hasSpun) return;

    setIsSpinning(true);
    setShowResult(false);

    // Calculate random rotation (multiple full spins + final position)
    const fullSpins = 5 + Math.random() * 3; // 5-8 full spins
    const selectedCoupon = selectWinner();
    const segmentAngle = 360 / SPIN_COUPONS.length;
    const couponIndex = SPIN_COUPONS.findIndex(c => c.code === selectedCoupon.code);

    // Pointer is at top (0 degrees), calculate angle to align segment midpoint with pointer
    const segmentMidAngle = couponIndex * segmentAngle + segmentAngle / 2;
    // Rotate so that segment midpoint aligns with pointer (top = 0 degrees)
    const finalAngle = 360 - segmentMidAngle;
    const totalRotation = fullSpins * 360 + finalAngle;

    // Update rotation state - CSS transition will handle animation
    setRotation(prev => prev + totalRotation);

    // Show result after animation
    setTimeout(() => {
      setWonCoupon(selectedCoupon);
      setShowResult(true);
      setIsSpinning(false);
      setHasSpun(true);

      // Save to localStorage
      const today = new Date().toDateString();
      localStorage.setItem("spinLastDate", today);
      localStorage.setItem("spinWonCoupon", JSON.stringify(selectedCoupon));
    }, 5000);
  };

  const handleCloseResult = () => {
    setShowResult(false);
  };

  return (
    <>
      {/* Fixed Floating Button */}
      <button
        className="spin-to-win__floating-btn"
        onClick={() => setIsModalOpen(true)}
        aria-label="Spin to Win"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
            fill="currentColor"
          />
          <path
            d="M12 6v6l4 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="spin-to-win__floating-text">Spin & Win</span>
      </button>

      {/* Slide-in Modal from Left */}
      <div
        className={`spin-to-win__modal ${isModalOpen ? "spin-to-win__modal--open" : ""}`}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            setIsModalOpen(false);
          }
        }}
      >
        <div className="spin-to-win__modal-content">
          <button
            className="spin-to-win__modal-close"
            onClick={() => setIsModalOpen(false)}
            aria-label="Close"
          >
            ×
          </button>

          <div className="spin-to-win__header">
            <h2 className="spin-to-win__title">Spin to Win!</h2>
            <p className="spin-to-win__subtitle">Get exclusive discount coupons</p>
          </div>

          <div className="spin-to-win__wheel-container">
            <div className="spin-to-win__wheel-wrapper">
              {(() => {
                const centerX = 200;
                const centerY = 200;
                const radius = 190;

                return (
                  <svg
                    className="spin-to-win__wheel-svg"
                    viewBox="0 0 400 400"
                    ref={wheelRef}
                    style={{
                      transform: `rotate(${rotation}deg)`,
                    }}
                  >
                    <defs>
                      <filter id="shadow">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                      </filter>
                    </defs>
                    <g className="spin-to-win__wheel-group">
                      {SPIN_COUPONS.map((coupon, index) => {
                        const segmentAngle = 360 / SPIN_COUPONS.length;
                        const startAngle = index * segmentAngle;
                        const endAngle = (index + 1) * segmentAngle;
                        const midAngle = startAngle + segmentAngle / 2;
                        const textPos = getTextPosition(midAngle, radius, centerX, centerY);

                        return (
                          <g key={coupon.code}>
                            <path
                              d={createPieSlice(startAngle, endAngle, radius, centerX, centerY)}
                              fill={coupon.color}
                              stroke="#1a1a1a"
                              strokeWidth="3"
                              filter="url(#shadow)"
                            />
                            <text
                              x={textPos.x}
                              y={textPos.y}
                              textAnchor="middle"
                              dominantBaseline="middle"
                              fill={coupon.textColor}
                              fontSize="36"
                              fontWeight="800"
                              transform={`rotate(${textPos.rotation}, ${textPos.x}, ${textPos.y})`}
                              className="spin-to-win__segment-discount"
                            >
                              {coupon.discount}%
                            </text>
                          </g>
                        );
                      })}
                      {/* Center circle */}
                      <circle
                        cx={centerX}
                        cy={centerY}
                        r="30"
                        fill="#ffffff"
                        stroke="#1a1a1a"
                        strokeWidth="4"
                      />
                    </g>
                  </svg>
                );
              })()}
              <div className="spin-to-win__pointer"></div>
            </div>

            <button
              className={`spin-to-win__button ${isSpinning ? "spin-to-win__button--spinning" : ""} ${hasSpun ? "spin-to-win__button--disabled" : ""}`}
              onClick={handleSpin}
              disabled={isSpinning || hasSpun}
            >
              {isSpinning ? "Spinning..." : hasSpun ? "Already Spun Today" : "Spin Now!"}
            </button>

            {hasSpun && wonCoupon && !showResult && (
              <div className="spin-to-win__won-badge">
                <span>You won: {wonCoupon.code} ({wonCoupon.discount}% OFF)</span>
              </div>
            )}
          </div>

          {showResult && wonCoupon && (
            <div className="spin-to-win__result-overlay">
              <div className="spin-to-win__result-content">
                <div className="spin-to-win__result-icon">🎉</div>
                <h3 className="spin-to-win__result-title">Congratulations!</h3>
                <p className="spin-to-win__result-message">
                  You won <strong>{wonCoupon.code}</strong>
                </p>
                <p className="spin-to-win__result-discount">
                  Get <strong>{wonCoupon.discount}% OFF</strong> on your purchase!
                </p>
                <p className="spin-to-win__result-note">
                  Your coupon code has been saved. Use it at checkout!
                </p>
                <button
                  className="spin-to-win__result-close"
                  onClick={() => {
                    handleCloseResult();
                    setIsModalOpen(false);
                  }}
                >
                  Awesome!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SpinToWin;

