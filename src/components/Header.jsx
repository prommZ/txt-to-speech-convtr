


const Header = () => {


    const logo = "https://voicemaker.in/img/logo.svg";

    return (

        <>
            <img src={logo} alt="logo" style={{ height: 42 }} />
            <div>
            <select className="select-btn">
                <option value="none">Choose Voice</option>
                <option value="Kajal">Kajal</option>
                <option value="Joanna">Joanna</option>
                <option value="Amy">Amy</option>
                <option value="Stephen">Stephen</option>
            </select>
            </div>
        </>
    )
}

export default Header;