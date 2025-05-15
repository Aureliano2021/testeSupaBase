"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [perfil, setPerfil] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Buscar produtos ao carregar
  async function fetchProdutos() {
    const res = await fetch("/api/teste");
    const json = await res.json();
    if (json.error) setError(json.error);
    else setProdutos(json.data || []);
  }

  useEffect(() => {
    fetchProdutos();
  }, []);

  // Inserir novo produto
  async function handleAdd() {
    setError(null);
    const res = await fetch("/api/teste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, perfil }),
    });
    const json = await res.json();
    if (json.error) setError(json.error);
    else {
      setName("");
      setPerfil("");
      fetchProdutos();
    }
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produtos</h1>
      {error && <p className="text-red-600">Erro: {error}</p>}
      <div className="mb-4 flex gap-2">
        <input
          className="border p-2"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="border p-2"
          placeholder="Perfil"
          value={perfil}
          onChange={e => setPerfil(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Adicionar
        </button>
      </div>
      <ul className="space-y-2">
        {produtos.map((t) => (
          <li key={t.id} className="p-2 bg-gray-900 text-white rounded">
            {t.name} - {t.perfil}
          </li>
        ))}
      </ul>
    </main>
  );
}