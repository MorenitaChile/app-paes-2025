"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut, SessionProvider } from "next-auth/react";
import styles from "./Sidebar.module.css";

const navItems = [
  { label: "Dashboard", href: "/" },
  { label: "Ensayos", href: "/ensayos" },
  { label: "Material Didáctico", href: "/material" },
  { label: "Progreso", href: "/progreso" },
];

function SidebarContent() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Menu Button - Fixed at top */}
      <button
        className={styles.menuButton}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      {/* Overlay for mobile */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.visible : ''}`}
        onClick={closeMenu}
      />

      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h1 className={styles.title}>PAES 2025</h1>
          <button
            className={styles.menuButton}
            onClick={toggleMenu}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>
        <nav className={styles.nav}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}

          <div style={{ marginTop: 'auto' }}>
            {session ? (
              <button
                onClick={() => signOut()}
                className={styles.link}
                style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}
              >
                Cerrar Sesión
              </button>
            ) : (
              <Link
                href="/login"
                className={styles.link}
                onClick={closeMenu}
              >
                Iniciar Sesión
              </Link>
            )}
          </div>
        </nav>
      </aside>
    </>
  );
}

export default function Sidebar() {
  return (
    <SessionProvider>
      <SidebarContent />
    </SessionProvider>
  );
}
