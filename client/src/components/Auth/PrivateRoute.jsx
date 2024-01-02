import { Route } from "react-router-dom";
import { useAuth } from "../../contexts/auth-context";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated()) {
          navigate('/')
        }

        if (roles && roles.includes("admin") && isAdmin()) {
            navigate('/unauthorized')
        }
        return <Component {...props} />;
      }}
    />
  );
};
export default PrivateRoute