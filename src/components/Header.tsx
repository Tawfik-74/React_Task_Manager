/** App banner: product name and tagline. */
export function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="header__inner">
        <span className="header__mark" aria-hidden="true">
          ✓
        </span>
        <div className="header__text">
          <h1 className="header__title">TaskFlow</h1>
          <p className="header__subtitle">Keep the whole family on the same page.</p>
        </div>
      </div>
    </header>
  );
}
