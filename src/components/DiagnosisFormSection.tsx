import React, { useState } from 'react';
import { ArrowUpRight, CheckCircle, Clock, Sparkles, Building2, User, Phone, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

// Webhook (n8n) que recebe os dados do formulário. Pode ser sobrescrito por .env.local:
// VITE_CONSULTA_WEBHOOK_URL=...
const WEBHOOK_URL =
  import.meta.env.VITE_CONSULTA_WEBHOOK_URL ??
  'https://main-n8n.1smjgn.easypanel.host/webhook/consulta-comercial-clinica';

const FATURAMENTO_OPTIONS = [
  { id: 'ate-30k', label: 'Até R$ 30k' },
  { id: '30k-60k', label: 'De R$ 30k até 60k' },
  { id: '60k-100k', label: 'R$ 60k até 100k' },
  { id: '100k+', label: 'R$ 100k +' },
];

const EMPTY_FORM = { nome: '', telefone: '', clinica: '', faturamento: '' };

export const DiagnosisFormSection: React.FC = () => {
  const [formData, setFormData] = useState(EMPTY_FORM);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Format Brazilian phone (XX) 9XXXX-XXXX
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 10) {
      value = value.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (value.length > 6) {
      value = value.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (value.length > 0) {
      value = value.replace(/^(\d*)$/, '($1');
    }

    setFormData((prev) => ({ ...prev, telefone: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMsg('');

    if (!formData.nome.trim()) {
      setErrorMsg('Por favor, informe seu nome.');
      return;
    }
    if (formData.telefone.replace(/\D/g, '').length < 10) {
      setErrorMsg('Por favor, informe um WhatsApp válido com DDD.');
      return;
    }
    if (!formData.clinica.trim()) {
      setErrorMsg('Por favor, informe o nome da clínica.');
      return;
    }

    setIsSubmitting(true);

    // Enviado como application/x-www-form-urlencoded: é uma "requisição simples" (sem preflight
    // CORS) e o n8n já entrega os campos prontos em `body`.
    const params = new URLSearchParams(window.location.search);
    const faixa = FATURAMENTO_OPTIONS.find((o) => o.id === formData.faturamento);
    const payload = new URLSearchParams({
      nome: formData.nome.trim(),
      telefone: formData.telefone,
      telefone_digitos: formData.telefone.replace(/\D/g, ''),
      clinica: formData.clinica.trim(),
      faturamento: faixa?.label ?? 'Não informado',
      origem: 'landing-page-mindsight',
      pagina: window.location.href,
      enviado_em: new Date().toISOString(),
    });
    ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].forEach((k) => {
      const v = params.get(k);
      if (v) payload.set(k, v);
    });

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: 'POST',
        body: payload,
        signal: controller.signal,
      });
      if (!res.ok) {
        // Inclui o corpo da resposta no log para facilitar o diagnóstico no console
        const detail = await res.text().catch(() => '');
        throw new Error(`Webhook respondeu ${res.status}: ${detail.slice(0, 500)}`);
      }

      setIsSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0DC0E0', '#0AA9D1', '#FFFFFF', '#10B981'],
      });
    } catch (err) {
      console.error('Falha ao enviar o formulário:', err);
      setErrorMsg('Não foi possível enviar agora. Confira sua conexão e tente novamente em instantes.');
    } finally {
      window.clearTimeout(timeout);
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="diagnostico"
      className="py-24 sm:py-32 bg-[#020617] text-white relative overflow-hidden"
    >
      {/* Subtle radial cyan glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#0DC0E0]/15 blur-[150px] pointer-events-none rounded-full" />

      {/* Grid Pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(#0DC0E0 1px, transparent 1px), radial-gradient(#0DC0E0 1px, #020617 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0DC0E0]/10 border border-[#0DC0E0]/25 text-[#0DC0E0] text-xs font-semibold uppercase tracking-wider mb-5 font-inter">
            <Sparkles className="w-3.5 h-3.5" />
            Consulta Comercial Sob Medida
          </div>

          <h2 className="font-sora font-extrabold text-3xl sm:text-4xl lg:text-[48px] text-white tracking-tight leading-[1.15]">
            Vamos olhar o comercial da sua clínica juntos
          </h2>

          <p className="mt-5 text-base sm:text-lg text-[#94A3B8] font-inter leading-relaxed">
            O primeiro passo é uma consulta comercial. Não é reunião de venda genérica, é um
            diagnóstico objetivo de onde a sua clínica está deixando faturamento na mesa hoje.
          </p>
        </div>

        {/* Minimalist Linear-Style Form Card */}
        <div className="max-w-xl mx-auto bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-[20px] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          {isSubmitted ? (
            <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-[#10B981]/20 border border-[#10B981]/40 text-[#10B981] flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9" />
              </div>
              <h3 className="font-sora font-bold text-2xl text-white">
                Solicitação Confirmada com Sucesso!
              </h3>
              <p className="text-[#94A3B8] text-sm sm:text-base font-inter max-w-md mx-auto leading-relaxed">
                Olá, <strong className="text-white">{formData.nome}</strong>. Nosso especialista
                sênior em comercial de saúde entrará em contato via WhatsApp no número{' '}
                <strong className="text-[#0DC0E0]">{formData.telefone}</strong> para alinhar a data
                do diagnóstico da <strong className="text-white">{formData.clinica}</strong>.
              </p>
              <div className="pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-xs text-[#94A3B8]">
                <Clock className="w-4 h-4 text-[#0DC0E0]" />
                <span>Tempo médio de retorno: até 30 minutos em horário comercial</span>
              </div>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData(EMPTY_FORM);
                }}
                className="mt-4 text-xs text-[#0DC0E0] hover:underline"
              >
                Enviar nova solicitação
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              {/* Field 1: Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2 font-inter">
                  Seu Nome Completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    name="nome"
                    autoComplete="name"
                    enterKeyHint="next"
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Dra. Mariana Costa"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#1E293B] border border-[#334155] focus:border-[#0DC0E0] focus:ring-1 focus:ring-[#0DC0E0] text-white placeholder-[#64748B] text-base sm:text-sm font-inter transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 2: Telefone com Máscara */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2 font-inter">
                  WhatsApp com DDD
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    required
                    name="telefone"
                    autoComplete="tel-national"
                    inputMode="tel"
                    enterKeyHint="next"
                    value={formData.telefone}
                    onChange={handlePhoneChange}
                    placeholder="(11) 98765-4321"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#1E293B] border border-[#334155] focus:border-[#0DC0E0] focus:ring-1 focus:ring-[#0DC0E0] text-white placeholder-[#64748B] text-base sm:text-sm font-inter transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 3: Nome da Clínica */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2 font-inter">
                  Nome da Clínica ou Consultório
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    required
                    name="clinica"
                    autoComplete="organization"
                    enterKeyHint="send"
                    value={formData.clinica}
                    onChange={(e) => setFormData({ ...formData, clinica: e.target.value })}
                    placeholder="Ex: Instituto Dermatológico Costa"
                    className="w-full pl-10 pr-4 py-3.5 rounded-xl bg-[#1E293B] border border-[#334155] focus:border-[#0DC0E0] focus:ring-1 focus:ring-[#0DC0E0] text-white placeholder-[#64748B] text-base sm:text-sm font-inter transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 4: Faturamento aproximado (Qualificação sutil) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#94A3B8] mb-2 font-inter">
                  Faixa de faturamento mensal atual
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {FATURAMENTO_OPTIONS.map((option) => (
                    <button
                      type="button"
                      key={option.id}
                      onClick={() => setFormData({ ...formData, faturamento: option.id })}
                      className={`min-h-[48px] py-2.5 px-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                        formData.faturamento === option.id
                          ? 'bg-[#0DC0E0]/15 border-[#0DC0E0] text-[#0DC0E0]'
                          : 'bg-[#1E293B] border-[#334155] text-[#94A3B8] hover:border-slate-500'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Width Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group inline-flex items-center justify-center gap-3 bg-[#0DC0E0] hover:bg-[#0AA9D1] text-[#020617] font-sora font-bold text-base py-4 px-6 rounded-full transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] shadow-[0_6px_22px_rgba(13,192,224,0.4)] cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#020617] border-t-transparent rounded-full animate-spin" />
                      Preparando diagnóstico...
                    </span>
                  ) : (
                    <>
                      <span>Agendar minha consulta comercial</span>
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
