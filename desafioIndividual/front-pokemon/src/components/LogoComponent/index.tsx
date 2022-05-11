export function LogoComponent() {
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <img src="./src/assets/LogoRedFox.png" style={{width: 20+"vw"}}/>
            <div style={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                <img src="./src/assets/RedFoxBranco.png"/>
                <label style={{ color: "white", fontSize: "36px" }}>fox</label>
            </div>
        </div>
    )
}