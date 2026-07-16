import React from "react";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Site Footer">
      <div className="footer__card">
        <div className="footer__corners" aria-hidden="true" />

        {/* FLEX 2 BÊN: trái (brand + tagline), phải (actions) */}
        <div className="footer__top">
          <div className="footer__brand">
            <span className="footer__logo">voanhphi</span>
            <p className="footer__tagline">Design. Build. Ship — with care.</p>
          </div>

          <div className="footer__actions">
            {/* Bạn có thể thêm nút / icon ở đây (vd: Back to top, Social, Theme...) */}
          </div>
        </div>

        {/* Bottom line */}
        <div className="footer__bottom" role="presentation">
          <p>© {new Date().getFullYear()} voanhphi • All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
