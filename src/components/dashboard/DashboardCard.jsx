/**
 * Shared surface used by every dashboard section so spacing, borders,
 * and header typography stay identical across the page.
 */
export default function DashboardCard({ title, description, action, children, className = '', bodyClassName = '' }) {
  return (
    <section
      className={`flex flex-col rounded-2xl border border-[#dcefea] bg-white dark:border-[#1e403a] dark:bg-[#0b1e1b] ${className}`}
    >
      {(title || action) && (
        <header className="flex items-start justify-between gap-4 border-b border-[#eef7f5] px-5 py-4 dark:border-[#16332d] sm:px-6">
          <div className="min-w-0">
            <h2 className="text-[15px] font-semibold text-[#00211c] dark:text-white">{title}</h2>
            {description && (
              <p className="mt-0.5 text-xs leading-relaxed text-[#4f6f69] dark:text-[#8fb8b0]">{description}</p>
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={`flex-1 px-5 py-5 sm:px-6 ${bodyClassName}`}>{children}</div>
    </section>
  );
}

