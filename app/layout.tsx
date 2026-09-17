import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  title: "Remodelación Apto — Belo Horizonte",
  description:
    "Alcance de obra, referencias visuales y cotización del apartamento en el edificio Belo Horizonte.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <header className="no-print sticky top-0 z-40 border-b border-line bg-paper/85 backdrop-blur">
          <div className="mx-auto flex h-14 max-w-content items-center justify-between px-5 sm:px-8">
            <Link href="/" className="flex items-center gap-2.5">
              <span
                aria-hidden
                className="grid h-6 w-6 place-items-center rounded-[5px] border border-ink/25"
              >
                <span className="h-2 w-2 rounded-[1px] bg-clay" />
              </span>
              <span className="text-[13px] font-medium tracking-tight">
                Remodelación Apto
                <span className="ml-2 hidden text-muted sm:inline">· Belo Horizonte</span>
              </span>
            </Link>

            <nav className="flex items-center gap-1 text-[13px]">
              <Link
                href="/#espacios"
                className="rounded-md px-2.5 py-1.5 text-muted transition-colors hover:bg-line/50 hover:text-ink"
              >
                Espacios
              </Link>
              <Link
                href="/resumen"
                className="rounded-md border border-ink/15 px-3 py-1.5 transition-colors hover:border-ink/40 hover:bg-white"
              >
                Cuentas
              </Link>
            </nav>
          </div>
        </header>

        {children}

        <footer className="no-print mt-24 border-t border-line">
          <div className="mx-auto flex max-w-content flex-col gap-2 px-5 py-10 text-[12px] text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              Edificio Belo Horizonte · Cotizaciones, pagos y avance de la obra del equipo de
              Óscar.
            </p>
            <p>El avance y las observaciones se guardan automáticamente.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
