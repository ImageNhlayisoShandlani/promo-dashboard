export default function Footer() {

    return <>
    <footer className="d-flex flex-wrap align-items-center py-3 my-4 border-top" style={{background: '#f8f9fa', padding: '1.5rem'}}>
      <p className="col-md-4 mb-0 text-muted">© {new Date().getFullYear()} React Dashboard</p>

      <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      </a>
    </footer>
    </>;
}