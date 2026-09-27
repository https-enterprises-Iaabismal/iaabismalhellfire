"use client";

export default function BuyButton() {
  const handleBuy = async () => {
    try {
      const res = await fetch("/api/create-checkout", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert("Error al crear el pago");
    } catch {
      alert("Error de conexión");
    }
  };

  return (
    <button
      onClick={handleBuy}
      style={{
        background: "#ff0000",
        color: "#fff",
        fontWeight: "bold",
        padding: "16px 32px",
        border: "none",
        borderRadius: "8px",
        fontSize: "18px",
        cursor: "pointer",
        margin: "20px 0",
      }}
    >
      ACTIVAR HELLFIRE PRO
    </button>
  );
}
