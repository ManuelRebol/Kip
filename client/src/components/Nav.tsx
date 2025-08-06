import bombilla from "../../public/bombilla.png";
import Styles from "./Nav.module.css";

export const Nav = () => {
    return (
        <nav className={Styles.nav}>
            <div className={Styles.left}>
                <div className={Styles.logo}>
                    <img src={bombilla} alt="Bombilla" />
                    <h1>Kip</h1>
                </div>
                <form>
                    <input type="search" placeholder="Buscar" />
                </form>
            </div>
            <div className={Styles.left}>
                <h3>Manu Rebol</h3>
            </div>
        </nav>
    )
}
