'use client';

import Link from 'next/link';

const VARIANTS = {
  primary:
    'bg-[#00a78e] text-white hover:bg-[#008672] border border-[#00a78e] hover:border-[#008672] shadow-xs',
  secondary:
    'bg-white dark:bg-[#0b1e1b] text-[#004339] dark:text-[#ccede8] hover:bg-[#ccede8]/40 dark:hover:bg-[#132b26] border border-[#99dcd2] dark:border-[#1e403a] shadow-2xs',
  accent:
    'bg-[#006455] text-white hover:bg-[#004339] border border-[#006455] shadow-xs',
  dark:
    'bg-[#00211c] text-white hover:bg-[#004339] border border-[#00211c]',
};

export default function Button({
  href,
  variant = 'primary',
  className = '',
  children,
  type = 'button',
  ...rest
}) {
  const baseClasses = `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 ${
    VARIANTS[variant] || VARIANTS.primary
  } ${className}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} {...rest}>
      {children}
    </button>
  );
}
