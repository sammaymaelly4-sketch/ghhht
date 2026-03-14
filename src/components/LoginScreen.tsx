import React, { useState, useEffect } from "react";
import { motion } from "motion/react";

const BOOT_SEQUENCE = [
  { t: "COMPLIANCE.DB v2.6.0 — TRT-15 INITIALIZING...", c: "" },
  { t: "CARREGANDO MODULOS DE AUDITORIA TRABALHISTA", c: "ok" },
  { t: "CONECTANDO AO REPOSITORIO VALE DO PARAIBA", c: "ok" },
  { t: "5 MUNICIPIOS CARREGADOS — 258 PROCESSOS ATIVOS", c: "ok" },
  { t: "INDICES DE RISCO: ATUALIZADO 2026-03-13", c: "ok" },
  { t: "MODULO SST COMPLIANCE: ATIVO", c: "ok" },
  { t: "CERTIFICADO TRT-15: VERIFICADO", c: "ok" },
  { t: "ACESSO NAO AUTORIZADO: 3 TENTATIVAS BLOQUEADAS", c: "warn" },
  { t: "PROTOCOLO SEGURANCA NIVEL 2 ATIVADO", c: "warn" },
  { t: "AGUARDANDO AUTENTICACAO AUTORIZADA...", c: "" },
];

export function LoginScreen({ onLogin }: { onLogin: (user: string) => void }) {
  const [bootLines, setBootLines] = useState<number>(0);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle");

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < BOOT_SEQUENCE.length) {
        setBootLines(currentLine + 1);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowForm(true), 250);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (user.trim().toLowerCase() === "bittencourt" && pass === "270191") {
      setStatus("loading");
      setTimeout(() => {
        setStatus("success");
        setTimeout(() => onLogin(user), 650);
      }, 600);
    } else {
      setStatus("error");
      setPass("");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#020409] p-6 font-mono">
      {/* Scanline effects */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,229,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-10 animate-[scanMove_8s_linear_infinite]"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,.07) 2px, rgba(0,0,0,.07) 4px)",
        }}
      />

      <div className="z-20 mb-7 w-full max-w-[500px] text-[0.7rem] leading-relaxed text-[#4a7a9b]">
        {BOOT_SEQUENCE.slice(0, bootLines).map((line, i) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            key={i}
            className="mb-1"
          >
            {"> "}
            {line.t}
            {line.c === "ok" && <span className="text-[#00ff88]"> [OK]</span>}
            {line.c === "warn" && <span className="text-[#ffb300]"> [WARN]</span>}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showForm ? 1 : 0 }}
        className="relative z-20 w-full max-w-[390px] bg-[rgba(6,13,20,0.97)] p-7"
        style={{
          border: "1px solid rgba(0,229,255,.2)",
          clipPath:
            "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
        }}
      >
        <div
          className="absolute inset-x-0 top-0 h-[2px] animate-[shimL_3s_ease-in-out_infinite]"
          style={{
            background: "linear-gradient(90deg, transparent, #00e5ff, transparent)",
          }}
        />
        <h1 className="mb-1 text-center font-['Orbitron'] text-[0.95rem] font-black tracking-[0.25em] text-[#00e5ff] drop-shadow-[0_0_20px_rgba(0,229,255,0.5)]">
          COMPLIANCE.DB
        </h1>
        <p className="mb-6 text-center text-[0.58rem] tracking-[0.12em] text-[#4a7a9b]">
          TRT-15 // VALE DO PARAÍBA // v2.6.0
        </p>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-[0.58rem] tracking-[0.12em] text-[#4a7a9b]">
              // IDENTIFICAÇÃO
            </label>
            <input
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              placeholder="usuario"
              className="w-full border-b border-[#00e5ff] bg-[#060d14] p-2 text-[0.88rem] tracking-wider text-[#00ff88] outline-none transition-colors focus:bg-[rgba(0,229,255,0.05)] placeholder:text-[#1a2e40]"
              autoComplete="off"
              spellCheck="false"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-[0.58rem] tracking-[0.12em] text-[#4a7a9b]">
              // CHAVE DE ACESSO
            </label>
            <input
              type="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="••••••"
              className="w-full border-b border-[#00e5ff] bg-[#060d14] p-2 text-[0.88rem] tracking-wider text-[#00ff88] outline-none transition-colors focus:bg-[rgba(0,229,255,0.05)] placeholder:text-[#1a2e40]"
              autoComplete="off"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="mt-3 w-full border border-[#00ff88] bg-transparent p-2.5 font-['Orbitron'] text-[0.68rem] font-bold tracking-[0.18em] text-[#00ff88] transition-all hover:bg-[rgba(0,255,136,0.08)] hover:shadow-[0_0_18px_rgba(0,255,136,0.3)]"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
              ...(status === "success"
                ? {
                    color: "#00ff88",
                    borderColor: "#00ff88",
                    boxShadow: "0 0 18px rgba(0,255,136,.4)",
                  }
                : {}),
            }}
          >
            {status === "loading"
              ? "[ AUTENTICANDO... ]"
              : status === "success"
                ? "[ ACESSO CONCEDIDO ✓ ]"
                : "[ AUTENTICAR ]"}
          </button>
          <div className="min-h-[1.1em] text-center text-[0.62rem] text-[#ff3d3d]">
            {status === "error" && "// ACESSO NEGADO — credenciais inválidas"}
          </div>
        </form>
      </motion.div>
    </div>
  );
}
