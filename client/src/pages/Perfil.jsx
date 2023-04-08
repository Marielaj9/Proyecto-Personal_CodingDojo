import axios from "axios"

function Perfil() {
    const { user, token } = useContext(AuthContext);
    const [userData, setUserData] = useState({});

    useEffect(() => {
        const getUserData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user-data', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUserData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) {
            getUserData();
        }
    }, [user, token]);

    return (
        <div className="App">
            <h1>Welcome to Your Dashboard, {userData.username}!</h1>
            <p>Your email is: {userData.email}</p>
            <p>Your balance is: {userData.balance}</p>
            <button onClick={logout}>Logout</button>
        </div>
    );
}

export default Perfil;