import API from "./api";

/*
|--------------------------------------------------------------------------
| Authentication Service
|--------------------------------------------------------------------------
*/

const authService = {
  /*
  |--------------------------------------------------------------------------
  | Login
  |--------------------------------------------------------------------------
  | FastAPI OAuth2PasswordRequestForm
  | Requires:
  | username
  | password
  */

  async login(email, password) {
    const formData = new URLSearchParams();

    formData.append("username", email);
    formData.append("password", password);

    const response = await API.post(
      "/auth/login",
      formData,
      {
        headers: {
          "Content-Type":
            "application/x-www-form-urlencoded",
        },
      }
    );

    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | Register
  |--------------------------------------------------------------------------
  */

  async register(userData) {
    const response = await API.post(
      "/auth/register",
      userData
    );

    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | Logged In User
  |--------------------------------------------------------------------------
  */

  async getCurrentUser() {
    const response = await API.get("/auth/me");

    return response.data;
  },

  /*
  |--------------------------------------------------------------------------
  | Logout
  |--------------------------------------------------------------------------
  */

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
  },
};

export default authService;