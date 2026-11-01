with open("index.css", "r", encoding="utf-8") as f:
    content = f.read()

# Let's append the CSS for 10 payment logos cards
append_css = """

/* ==========================================================================
   WOLF PC STYLE - DETAILED 10 PAYMENT LOGOS CARDS
   ========================================================================== */
.payment-logos-wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 15px;
    width: 100%;
}

.payment-logos-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    width: 100%;
}

.pay-logo-card {
    width: 58px;
    height: 26px;
    background-color: #ffffff; /* pure white background */
    border-radius: 4px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    user-select: none;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    box-sizing: border-box;
    overflow: hidden;
}

.pay-logo-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
}

/* Brand specific styling for identical match */
.logo-vnpay {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 0.72rem;
    letter-spacing: -0.2px;
}
.logo-vnpay .pay-vn {
    color: #005a9c;
}
.logo-vnpay .pay-pay {
    color: #ff3d00;
}

.logo-zalopay {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 0.72rem;
    letter-spacing: -0.3px;
}
.logo-zalopay .pay-zalo {
    color: #0084ff;
}
.logo-zalopay .pay-zpay {
    color: #4cd964;
}

.logo-napas {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 0.7rem;
    font-style: italic;
    letter-spacing: -0.2px;
}
.logo-napas .pay-na {
    color: #005a9c;
}
.logo-napas .pay-pas {
    color: #e85c2c;
}

.logo-momo {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 0.72rem;
    letter-spacing: -0.5px;
}
.logo-momo .pay-mo1 {
    color: #a50064;
}
.logo-momo .pay-mo2 {
    color: #d82d8b;
}

.logo-visa {
    font-family: 'Playfair Display', Georgia, serif;
    font-weight: 900;
    font-size: 0.8rem;
    font-style: italic;
    letter-spacing: -0.5px;
}
.logo-visa .pay-vi {
    color: #1a1f71;
}
.logo-visa .pay-sa {
    color: #f7b614;
}

.logo-mastercard {
    position: relative;
}
.logo-mastercard .master-circles {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 32px;
    height: 18px;
}
.logo-mastercard .circle-red {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #eb001b;
    opacity: 0.9;
    position: absolute;
    left: 2px;
    z-index: 1;
}
.logo-mastercard .circle-orange {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #f79e1b;
    opacity: 0.9;
    position: absolute;
    right: 2px;
    z-index: 2;
    mix-blend-mode: multiply;
}

.logo-jcb {
    background: linear-gradient(to right, #004b87 33%, #d12421 33%, #d12421 66%, #00a54f 66%);
    width: 58px;
    height: 26px;
    border-radius: 4px;
}
.logo-jcb .jcb-text {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 0.72rem;
    color: #ffffff;
    letter-spacing: 0.5px;
}

.logo-amex {
    background-color: #007bc1;
    width: 58px;
    height: 26px;
    border-radius: 4px;
}
.logo-amex .amex-text {
    font-family: 'Outfit', sans-serif;
    font-weight: 800;
    font-size: 0.65rem;
    color: #ffffff;
    letter-spacing: 0.2px;
}

.logo-applepay {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-weight: 700;
    font-size: 0.76rem;
    color: #000000;
    display: inline-flex;
    align-items: center;
    gap: 1.5px;
}
.logo-applepay i {
    font-size: 0.88rem;
    margin-top: -2px;
}
.logo-applepay .apple-pay-text {
    font-weight: 600;
}

.logo-googlepay {
    font-family: 'Outfit', sans-serif;
    font-weight: 700;
    font-size: 0.76rem;
    letter-spacing: -0.3px;
}
.logo-googlepay .gpay-g {
    color: #4285f4;
}
.logo-googlepay .gpay-pay {
    color: #5f6368; /* dark gray */
}
"""

with open("index.css", "w", encoding="utf-8") as f:
    f.write(content + append_css)

print("Append Payment Logos CSS completed successfully!")
