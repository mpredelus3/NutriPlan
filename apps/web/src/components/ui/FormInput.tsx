'use client'

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormInput({ label, error, ...props }: FormInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        {...props}
        className={`input-field ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
      />
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
