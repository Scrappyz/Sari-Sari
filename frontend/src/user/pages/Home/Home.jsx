import { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    useEffect(function(){
        if (localStorage.getItem("posjwt") === null) {
            navigate("/login", { replace: true })
        } else {
            document.getElementById("Home").style.display = "";
        }
    }, []);
    return (
        <div id='Home' style={
            {
                display: "none"
            }
        }>
            <Header />
        </div>
    );
}

export default Home;