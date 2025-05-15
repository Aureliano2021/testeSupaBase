"use client";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://imdlbzlbqmqvmjeslnke.supabase.co";
const supabaseKey: any = process.env.NEXT_PUBLIC_SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Page() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [perfil, setPerfil] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Buscar produtos ao carregar
  async function fetchProdutos() {
    const { data, error } = await supabase.from("teste").select("*");
    setProdutos(data || []);
    setError(error ? error.message : null);
  }

  // Buscar ao montar
  useEffect(() => {
    fetchProdutos();
  }, []);

  // Inserir novo produto
  async function handleAdd() {
    const { error } = await supabase
      .from("teste")
      .insert([{ name, perfil }]);
    if (error) {
      setError(error.message);
    } else {
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
