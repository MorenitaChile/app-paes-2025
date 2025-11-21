"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

export default function ClientLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Log para verificar versión en producción
    console.log("ClientLayout Version: 1.0.1 - Sidebar Fix");

    // Rutas donde NO queremos mostrar el sidebar
    const publicRoutes = ["/", "/login", "/register"];
    const isPublicRoute = publicRoutes.includes(pathname);

    return (
        <div className={styles.container}>
            {!isPublicRoute && <Sidebar />}
            <main className={isPublicRoute ? styles.mainPublic : styles.main}>
                {children}
            </main>
        </div>
    );
}
