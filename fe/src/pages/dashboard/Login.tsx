import { useState } from "react";
import { Input, Button } from "../../components";
import { useLoginUserMutation } from "../../redux/api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box } from "../../components";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await login({ email, password }).unwrap();
      console.log("Login success:", result);

      localStorage.setItem("user", JSON.stringify(result));

      toast.success("Login berhasil!");

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login gagal. Periksa kembali email dan password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Box className="p-8 max-w-md w-full  shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-text-dark">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-4 w-full text-accent-dark"
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required //
            className=" mb-8 w-full"
          />

          <Button
            text={isLoading ? "Logging in..." : "Login"}
            type="submit"
            className="mx-auto"
          />
        </form>
      </Box>
    </div>
  );
};

export default Login;
