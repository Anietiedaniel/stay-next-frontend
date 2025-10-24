import { useNavigate } from "react-router-dom";

const useRedirectAfterAuth = () => {
  const navigate = useNavigate();

  const redirectUser = (user, isGoogle = false) => {
    console.log("Redirecting auth user:", user, "Google:", isGoogle);

    if (!user) return;

    // ✅ Manual Registration
    if (!isGoogle) {
      if (user?.isNewUser) {
        navigate("/set-role", { replace: true });
        return;
      }
    }

    // ✅ Google Registration
    if (isGoogle) {
      if (user?.isNewUser) {
        // Google new users still need to set role
        navigate("/set-role", { replace: true });
        return;
      }
      // If Google user already exists, skip role setup → dashboard
    }

    // ✅ Role-based redirect
    switch (user?.role) {
      case "admin":
        navigate("/admin-dashboard/overview", { replace: true });
        break;
      case "agent":
        navigate("/agent-dashboard/overview", { replace: true });
        break;
      case "handyman":
        navigate("/handyman-dashboard/overview", { replace: true });
        break;
      case "visitor": // default fallback role
      default:
        navigate("/visitor-dashboard/overview", { replace: true });
        break;
    }
  };

  return redirectUser;
};

export default useRedirectAfterAuth;
