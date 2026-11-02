export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>© {new Date().getFullYear()} WheelHub Car Showroom. Built with React.js</p>
        <small>Prices shown are sample values for demonstration only.</small>
      </div>
    </footer>
  );
}
