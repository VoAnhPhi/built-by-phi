import React, { useEffect, useState } from "react";

const NAV = [
    { id: "quick_info", label: "Quick Info" },
    { id: "about_me", label: "About Me" },
    { id: "showcase", label: "Showcase" },
    { id: "profile", label: "Profile" },
    { id: "contact", label: "Contact Me" },
];

const Header = () => {
    const [open, setOpen] = useState(false);

    // Fallback smooth scroll nếu chưa có smoothScrollTo ở global
    const goTo = (id) => {
        try {
            if (typeof smoothScrollTo === "function") {
                smoothScrollTo(id);
                return;
            }
        } catch (_) { }
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    useEffect(() => {
        document.body.classList.toggle("no-scroll", open);
        const onEsc = (e) => e.key === "Escape" && setOpen(false);
        window.addEventListener("keydown", onEsc);
        return () => {
            window.removeEventListener("keydown", onEsc);
            document.body.classList.remove("no-scroll");
        };
    }, [open]);

    return (
        <>
            <header className="heading" role="banner" aria-label="Site Header">
                <div className="heading__nav">
                    {/* góc viền */}
                    <div className="heading__nav-corners" aria-hidden="true" />

                    {/* Logo (trái) */}
                    <div className="heading__nav-menu-left">
                        <a href="#" aria-label="Home">
                            voanhphi
                        </a>
                    </div>

                    {/* Nav (giữa) */}
                    <ul className="heading__nav-menu-right" role="menubar" aria-label="Primary Navigation">
                        {NAV.map((item) => (
                            <li key={item.id} role="none">
                                <a
                                    role="menuitem"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        goTo(item.id);
                                    }}
                                    href=""
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Toggle mobile (phải) */}
                    <button
                        className="heading__toggle"
                        aria-label={open ? "Close menu" : "Open menu"}
                        aria-expanded={open}
                        aria-controls="mobile-overlay"
                        onClick={() => setOpen((s) => !s)}
                        type="button"
                    >
                        {!open ? (
                            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M3 7h18M3 12h18M3 17h18"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        ) : (
                            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M6 6l12 12M18 6l-12 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </header>

            {/* Overlay full màn hình (mobile) — trượt từ trái vào */}
            <div
                id="mobile-overlay"
                className={`heading__overlay ${open ? "is-open" : ""}`}
                role="dialog"
                aria-modal="true"
                aria-label="Navigation Overlay"
                onClick={() => setOpen(false)}
            >
                <div className="heading__panel" onClick={(e) => e.stopPropagation()}>
                    <div className="heading__panel-header">
                        <span className="brand">voanhphi</span>
                        <button
                            className="heading__panel-close"
                            onClick={() => setOpen(false)}
                            aria-label="Close overlay"
                            type="button"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    d="M6 6l12 12M18 6l-12 12"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>

                    <ul className="heading__panel-menu" role="menu" aria-label="Mobile Navigation">
                        {NAV.map((item) => (
                            <li key={item.id} role="none">
                                <button
                                    role="menuitem"
                                    onClick={() => {
                                        setOpen(false);
                                        setTimeout(() => goTo(item.id), 50);
                                    }}
                                    type="button"
                                >
                                    {item.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Header;
