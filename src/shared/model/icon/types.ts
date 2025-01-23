/**
 * Props for the Icon component.
 */
export interface IconProps {
  src: string;
  /** The width of the icon. */
  width?: string | number;
  alt?: string;
  /** The height of the icon. */
  height?: string | number;
  /** The fill color of the icon. */
  fill?: string;
  /** Additional CSS classes to apply to the icon. */
  className?: string;
}