import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

  try {

    const response = await api.post(
      "/auth/login",
      {
        email,
        password
      }
    );

    if (
      response.data === "User not found" ||
      response.data === "Invalid Password"
    ) {

      alert(response.data);

      return;
    }

    const token = response.data;

    localStorage.setItem(
      "token",
      token
    );

    const roleResponse =
      await api.get(
        `/auth/role/${email}`
      );

    const role =
      roleResponse.data;

    localStorage.setItem(
      "role",
      role
    );

    if(role === "ADMIN"){
      navigate("/admin");
    }
    else if(
      role === "THEATRE_OWNER"
    ){
      navigate("/owner");
    }
    else{
      navigate("/movies");
    }

  }
  catch(error){

    alert(
      "Login Failed"
    );

    console.log(error);
  }
};

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px"
      }}
    >
      <h1>Login</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e)=>
          setEmail(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>
          setPassword(
            e.target.value
          )
        }
      />

      <br />
      <br />

      <button
        onClick={handleLogin}
      >
        Login
      </button>

    </div>
  );
}

export default Login;