"use client";

export default function Imprimir() {
  return (
    <button type="button" onClick={() => window.print()} className="btn-ghost no-print">
      Imprimir o guardar en PDF
    </button>
  );
}
