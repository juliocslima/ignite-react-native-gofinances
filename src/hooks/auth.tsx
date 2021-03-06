import { 
  createContext, 
  useContext, 
  ReactNode, 
  useState,
  useEffect
} from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';
import * as AppleAuthentication from 'expo-apple-authentication';

const { CLIENT_ID } = process.env;
const { REDIRECT_URL } = process.env;
const userStorageKey = '@gofinance:user';

interface AuthProviderProps{
  children: ReactNode;
}

interface User {
  id: string,
  email: string,
  name: string,
  photo?: string,
  isLoggedIn: boolean,
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
  signInWithApple: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<User>({} as User);
  const [isLoading, setIsLoading] = useState(false);

  async function signInWithGoogle() {
    try { 
      
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { type, params } = await AuthSession.startAsync({ authUrl }) as AuthorizationResponse;
      
      if(type === 'success') {
        const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`);
        const userInfo = await response.json();

        console.log(userInfo);

        const userLogged = {
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          photo: userInfo.picture,
          isLoggedIn: true,
        };

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }

    } catch(error) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {

      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ]
      });

      if(credential) {
        const userLogged: User = {
          id: String(credential.user),
          email: credential.email!,
          name: credential.fullName!.givenName!,
          photo: undefined,
          isLoggedIn: true,
        }

        await loginUserToStorage(userLogged, true);
      }

    } catch(error) {
      throw new Error(error);
    }
  }

  async function loginUserToStorage(user: User, isSignIn: boolean) {
    const userStoraged = await AsyncStorage.getItem(userStorageKey);

    if(userStoraged) {
      const userLogged = JSON.parse(userStoraged) as User;

      if(userLogged.id === user.id) {
        if(isSignIn) {
          userLogged.isLoggedIn = true;
        } else {
          userLogged.isLoggedIn = false;
        }
        

        setUser(userLogged);
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged));
      }
    }
    else {
      await AsyncStorage.setItem(userStorageKey, JSON.stringify(user));
      setUser(user);
    }
  }

  async function loadUserStorageData() {
    try {
      setIsLoading(true);

      const userStoraged = await AsyncStorage.getItem(userStorageKey);

      if(userStoraged) {
        const userLogged = JSON.parse(userStoraged) as User;

        setUser(userLogged);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
    }
  }

  async function signOut() {
    await loginUserToStorage(user, false);
  }

  useEffect(() => {
    loadUserStorageData();
  }, [])

  return(
    <AuthContext.Provider value={{ 
      user,
      signInWithGoogle,
      signInWithApple,
      signOut,
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