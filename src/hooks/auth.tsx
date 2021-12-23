import { 
  createContext, 
  useContext, 
  ReactNode, 
  useState
} from "react";
import * as AuthSession from 'expo-auth-session';

const { CLIENT_ID } = process.env;
const { REDIRECT_URL } = process.env;

interface AuthProviderProps{
  children: ReactNode;
}

interface User {
  email: string,
  family_name: string,
  given_name: string,
  id: string,
  locale: string,
  name: string,
  picture: string,
  verified_email: boolean,
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<User>()

  async function signInWithGoogle() {
    try { 
      
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
      
      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        setUser(userInfo);
      }

    } catch(error) {
      throw new Error(error);
    }
  }

  return(
    <AuthContext.Provider value={{ 
      user,
      signInWithGoogle
    }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth }