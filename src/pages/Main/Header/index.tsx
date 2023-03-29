import "./styles.css";
export const Header = () => {
    return (
        <div className="header">
            <h1 className="header__title">
                <a className="header__logoLink" href="/">
                    <img className="header__logoImage" src="" alt="logo" />
                    <span className="header__logoText">Slots</span>
                </a>
            </h1>
            <ul className="header__stats">
                <li className="money__stats">
                    <span role="img">$</span>
                    <span id="money">0</span>
                </li>
                <li>
                    <span className="header__jackpot"></span>
                </li>
                <li></li>
            </ul>
            <button></button>
        </div>
    );
};
