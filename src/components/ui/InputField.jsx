'use client';

export default function InputField({
  id,
  label,
  type = 'text',
  multiline = false,
  rows = 4,
  className = '',
  ...rest
}) {
  const inputClasses =
    'w-full rounded-2xl border border-[#99dcd2] bg-[#ccede8]/25 px-4 py-2.5 text-sm text-[#00211c] placeholder:text-[#006455]/50 transition-colors focus:border-[#00a78e] focus:bg-white focus:outline-none';

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-[#004339] mb-1.5"
        >
          {label}
        </label>
      )}
      {multiline ? (
        <textarea id={id} rows={rows} className={inputClasses} {...rest} />
      ) : (
        <input id={id} type={type} className={inputClasses} {...rest} />
      )}
    </div>
  );
}
