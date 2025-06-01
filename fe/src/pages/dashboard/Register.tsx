import { useState } from "react";
import { Input, Button } from "../../components";
import { useRegisterUserMutation } from "../../redux/api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Box } from "../../components";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [register, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({ name, email, password }).unwrap();
      toast.success("Register berhasil!");
      navigate("/login");
    } catch (err) {
      console.error("Register failed:", err);
      toast.error("Register gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <Box className="p-8 max-w-md w-full  shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-center text-text-dark">
          Daftar
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-4 w-full text-accent-dark"
          />

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
            required
            className=" mb-8 w-full"
          />

          <Button
            text={isLoading ? "Tunggu.." : "Daftar"}
            type="submit"
            className="mx-auto"
          />
        </form>
      </Box>
    </div>
  );
};

export default Register;
