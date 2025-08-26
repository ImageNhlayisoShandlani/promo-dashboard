import { NavLink } from "react-router-dom";
import './Header.css';
import { useSelector } from "react-redux";

export default function Header() {
    const promotions = useSelector((state: any) => state.promotions);
    const promoTypes: string[] = Array.from(new Set(promotions.map((promo: any) => promo.category)));
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                        <h4 className="navbar-brand">Promo Dashboard React</h4>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                                <NavLink
                                    to="/"
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                >
                                    HOME
                                </NavLink>
                            </li>

                            <li className="nav-item dropdown">
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Promo Types
                                </a>
                                <ul className="dropdown-menu">

                                    {promoTypes.map((type: string, id: number) => {
                                        return <NavLink key={id} className="dropdown-item" to={`/promotion/${type}`}><li>{type}</li></NavLink>
                                    })}

                                </ul>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    to="/subscriptions"
                                    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
                                >
                                    Subscribed Promotions
                                </NavLink>
                            </li>

                        </ul>

                        <div className="d-flex" style={{flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'space-evenly'}}>
                            <a href="#"><i className="fa-brands fa-facebook"></i></a>
                            <a href=""> <i className="fa-brands fa-x-twitter"></i></a>
                            <a href=""><i className="fa-brands fa-tiktok"></i></a>
                        </div>
                    </div>
                </div>
            </nav>
        </>);
}