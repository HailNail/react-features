import type { SVGProps } from 'react';

// Расширяем стандартные пропсы SVG-элемента в React
interface SpinnerIconProps extends SVGProps<SVGSVGElement> {
  size?: number | string; // Удобный шорткат для одновременной настройки ширины и высоты
}

const SpinnerIcon = ({
  size = 24,
  fill = 'currentColor', // Позволяет иконке краситься в цвет текста родителя
  className,
  ...props
}: SpinnerIconProps) => {
  return (
    <svg
      width={size}
      height={size}
      fill={fill}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props} // Позволяет прокидывать onClick, style, aria-атрибуты и т.д.
    >
      <path
        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
        opacity=".25"
      />
      <path d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z">
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.75s"
          values="0 12 12;360 12 12"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  );
};

export default SpinnerIcon;
