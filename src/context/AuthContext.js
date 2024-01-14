import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAlertContext } from "utils/alertUtils";
import Cookies from "js-cookie";
const AuthContext = createContext();

function useAuth() {
  return useContext(AuthContext);
}

const authConfig = {
    baseUrl: process.env.REACT_APP_BASE_URL,
    tokenEndpoint: process.env.REACT_APP_TOKEN_ENDPOINT,
    getToken: () => Cookies.get("token"),
    getUserId: () => Cookies.get('id'),
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlertContext();
  const navigate = useNavigate();
// console.log(user,'userin auth');
  useEffect(() => {
    
    fetchUser();
    
  }, []);
  async function fetchUser(userId=authConfig.getUserId(), token=authConfig.getToken(), authMethod) {

    if (token && userId) {
      try {
        setLoading(true);
        const response = await axios.get(`${authConfig.baseUrl}/User/${userId}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        setUser(data);
        return data;
      } catch (error) {
        // console.log(error);
          setUser(null);
      } finally {
          setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }
  async function saveToken(data){
      const response = await axios.post(`${authConfig.tokenEndpoint}`, {'username':data.email, 'password': data.password},{
        headers: {
          "Content-Type": "application/json",
        },   
      });
      const {token} = response.data;
      Cookies.set('token', token);
      return token;
  }
  async function getUserId(username) {
    const response = await axios.get(`${authConfig.baseUrl}/User/GetActiveByUsername/${username}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authConfig.getToken()}`,
      },
    });
    const userId = response.data['0'].id;
    Cookies.set('id',userId);
    return userId;
  }
  async function login(data){
    showAlert('loading', 'Logging in...' )
    setLoading(true);
    try{
      const token = await saveToken(data)
      const userId = await getUserId(data.email)
      const userdata = await fetchUser(userId,token);
      // navigate('/')
      showAlert('success', `Wellcome ${userdata.firstName + ' ' + userdata.lastName}` )
      return new Promise((resolve, reject) => {
        resolve('loggedIn')
      })
    }
    catch(error) {
      setUser(null);
      setLoading(false);
      showAlert('failed', `${error.message}` )
      return new Promise((resolve, reject) => {
        resolve('failed')
      })
    } 
  };

  const logout = () => {
    Cookies.remove('token')
    Cookies.remove('id')
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuth, AuthProvider };
