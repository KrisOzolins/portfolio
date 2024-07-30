import Icon from '@/components/common/Icon';

function Input({
  name,
  type = 'text',
  required = false,
  label,
  value,
  error = null,
  onChange,
}: {
  name: string;
  type?: React.HTMLInputTypeAttribute;
  required?: boolean;
  label: string;
  value?: string;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const className = `bg-white border-2 text-light-gray-dark dark:text-gray-dark text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:border-secondary-accent-regular hover:border-gray-regular ${error ? 'border-error-dark pe-9' : 'border-gray-light'}`;

  return (
    <>
      <label htmlFor="name" className="block mb-2 text-sm font-bold">
        {label}
      </label>
      <div className="relative">
        {type !== 'textarea' ? (
          <input type={type} id={name} name={name} required={required} onChange={onChange} className={className} value={value} />
        ) : (
          <textarea id={name} name={name} required={required} onChange={onChange} rows={5} className={className} value={value}></textarea>
        )}
        {error && <Icon name="exclamation-circle" className={`absolute right-1 top-3 text-error-dark`} />}
      </div>
      {error && <p className="text-error text-xs mt-1">{error}</p>}
    </>
  );
}

export default Input;
