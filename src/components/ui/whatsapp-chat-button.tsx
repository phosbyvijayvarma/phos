export function WhatsAppChatButton() {
  const phone = '917799558146';
  const url = `https://wa.me/${phone}?text=${encodeURIComponent('Hi! I am interested in your photography services.')}`;

  return (
    <div className="fixed right-5 bottom-5 z-50 sm:right-6 sm:bottom-6">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        title="Chat with us"
        className="group relative inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.25)] transition-transform duration-200 hover:-translate-y-1 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/25 animate-pulse" />
        <span className="pointer-events-none absolute inset-0 rounded-full bg-[#25D366]/40 blur-sm" />

        <svg
          className="relative h-7 w-7"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            fill="white"
            d="M12 0C5.373 0 0 5.373 0 12c0 2.113.548 4.087 1.5 5.814L0 24l6.418-1.685A11.946 11.946 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm5.402 16.524c-.24.675-1.426 1.305-1.937 1.386-1.016.156-1.297.213-3.464-.984-3.283-1.794-5.423-5.112-5.582-5.367-.159-.256-1.409-1.781-1.409-3.394 0-1.613.852-2.414 1.155-2.745.301-.33.655-.412.885-.412.232 0 .461.004.664.004.209 0 .494-.077.769.586.276.663.94 2.3 1.025 2.47.085.17.141.373.029.598-.113.226-.17.359-.342.560-.172.202-.365.445-.518.604-.173.172-.348.365-.154.724.193.359.856 1.403 1.838 2.261 1.266 1.091 2.324 1.344 2.683 1.498.359.154.568.131.779-.075.209-.205.902-1.048 1.134-1.407.231-.359.464-.293.767-.179.300.113 1.911.901 2.242 1.061.330.160.550.239.626.374.075.135.076.776-.164 1.451z"
          />
        </svg>

        <span className="pointer-events-none absolute -top-12 left-1/2 inline-block -translate-x-1/2 rounded-full bg-slate-950/95 px-3 py-1 text-[11px] font-light text-white opacity-0 shadow-lg transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0">
          Chat with us
        </span>
      </a>
    </div>
  );
}
