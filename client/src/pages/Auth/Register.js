import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Layout from "./../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { GoogleLogin } from '@react-oauth/google';

const Register = () => {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState(""); // Email state bound to input field
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [role, setRole] = useState("reader"); // Default role
  const [genres, setGenres] = useState([]); // State for selected genres

  const navigate = useNavigate();

  // Sample genres list - this could be fetched from an API or database
  const genreOptions = [
    "Science Fiction",
    "Fantasy",
    "Thriller",
    "Mystery",
    "Romance",
    "Horror",
    "Historical",
    "Biography",
    "Non-Fiction",
    "Other"
  ];

  //0Auth
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log('Login Failed:', error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json',
          },
        })
        .then((res) => {
          setProfile(res.data);
          setEmail(res.data.email); // Set the email field from the Google profile
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  // log out function to log the user out of Google and reset the profile
  const logOut = () => {
    googleLogout();
    setProfile(null);
    setEmail(""); // Clear email field upon logout
  };

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
        role, // Include role in the data sent to the server
        genres, // Include selected genres in the data sent to the server
      });
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleGenreChange = (e) => {
    const selectedGenres = Array.from(e.target.selectedOptions, (option) => option.value);
    setGenres(selectedGenres);
  };

  const responseMessage = (response) => {
    console.log(response);
  };

  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <Layout title="Register - Infinite Insight">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>

          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="name"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              value={email} // Bound to the state
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="email"
              placeholder="Enter Your Email"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="password"
              placeholder="Enter Your Password"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="phonenumber"
              placeholder="Enter Your Phone"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="address"
              placeholder="Enter Your Address"
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="sport"
              placeholder="What is Your Favorite Sport"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role" className="form-label">Select Role</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-control"
              required
            >
              <option value="reader">Reader</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="genres" className="form-label">Select Your Favorite Genres</label>
            <select
              id="genres"
              multiple
              value={genres}
              onChange={handleGenreChange}
              className="form-control"
              required
            >
              {genreOptions.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>

          <br />
          <br />
          <button onClick={() => login()}>Sign in with Google 🚀</button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
