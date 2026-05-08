/**
 * Shared layout container — max-w-7xl, mx-auto, px-6.
 * Every section must wrap its content in this component so the
 * horizontal grid aligns consistently across the entire page.
 */
const Container = ({ children, className = '' }) => (
  <div className={`max-w-7xl mx-auto px-6 w-full ${className}`.trim()}>
    {children}
  </div>
);

export default Container;
