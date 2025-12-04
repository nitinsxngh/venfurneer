const HeaderStrip = () => {
  const messages = [
    "Black Friday Sale",
    "Get 10-15% Off",
    "Get Free Delivery",
    "PAN India Shipping",
    "Limited Offer"
  ];

  // Duplicate messages for seamless loop
  const duplicatedMessages = [...messages, ...messages];

  return (
    <div className="header-strip">
      <div className="header-strip__content">
        {duplicatedMessages.map((message, index) => (
          <span key={index} className="header-strip__item">
            {message}
            <span className="header-strip__separator">•</span>
          </span>
        ))}
      </div>
    </div>
  );
};

export default HeaderStrip;

