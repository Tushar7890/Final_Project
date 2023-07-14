// SignupPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./auth.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();


  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    // console.log(engine);
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // await console.log(container);
  }, []);
  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  };

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    // e.preventDefault();
    // setValues({
    //   ...values,
    //   [e.target.name]: e.target.value
    // });
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  function resetValue(){
    setValues({ name: "", email: "", password: "" });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password } = values;
    // setValues({ name: "", email: "", password: "" });
    // console.log(values)
    await axios
      .post(registerAPI, values)
      .then((res) => {
        // console.log(res.data);
        // setValues({ ...values, email: "", password: "" });
        if (res.data.success === true) {
          delete res.data.user.password;
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/");
        } else {
          // console.log("failed");
          toast.error(res.data.message, toastOptions);
        }
      })
      .catch((err) => {
        // alert("Something went wrong")
        console.log(err)
        setValues({ name: "", email: "", password: "" });
        toast.error("Please Enter Correct Details", toastOptions);
        // toast.error(err, toastOptions);
        
      });
  };

  return (
    <>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "#32174D",
              },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 200,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: "#ffcc00",
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: 0.5,
                random: true,
              },
              size: {
                value: 3,
                random: { enable: true, minimumValue: 1 },
              },
              links: {
                enable: false,
              },
              move: {
                enable: true,
                speed: 2,
              },
              life: {
                duration: {
                  sync: false,
                  value: 3,
                },
                count: 0,
                delay: {
                  random: {
                    enable: true,
                    minimumValue: 0.5,
                  },
                  value: 1,
                },
              },
            },
            detectRetina: true,
          }}
          style={{
            position: "absolute",
            zIndex: -1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        <Container
          className="mt-5"
          style={{
            position: "relative",
            zIndex: "2 !important",
            color: "white !important",
          }}
        >
          <Row>
            <h1 className="text-center">
              <AccountBalanceWalletIcon
                sx={{ fontSize: 40, color: "white" }}
                className="text-center"
              />
            </h1>
            <h1 className="text-center text-white">
              Welcome to ExpenseGo
            </h1>
            <Col md={{ span: 6, offset: 3 }}>
              <h2 className="text-white text-center mt-5">Registration</h2>
              <Form>
                <Form.Group controlId="formBasicName" className="mt-3">
                  <Form.Label className="text-white">Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Full name"
                    onChange={handleChange}
                    value={values.name}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail" className="mt-3">
                  <Form.Label className="text-white">Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </Form.Group>

                <Form.Group
                  controlId="formBasicPassword"
                  className="mt-3"
                  style={{
                    width: "100%",
                    position: "relative",
                  }}
                >
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password}
                    style={{
                      width: "100%",
                      padding: "10px",
                      boxSizing: "border-box",
                    }}
                  />
                  <i
                    className="fa-solid fa-eye"
                    id="eye"
                    style={{
                      position: "absolute",
                      top: "3rem",
                      right: "2%",
                      cursor: "pointer",
                      color: "black",
                      background: "transparent",
                    }}
                    onClick={() => {
                      var x = document.getElementById("eye");
                      if (x.className === "fa-solid fa-eye") {
                        x.className = "fa-solid fa-eye-slash";
                        document.getElementById("formBasicPassword").type =
                          "text";
                      } else {
                        x.className = "fa-solid fa-eye";
                        document.getElementById("formBasicPassword").type =
                          "password";
                      }
                    }}
                  ></i>
                </Form.Group>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                  className="mt-4"
                >
                  {/* <Link to="/forgotPassword" className="text-white lnk">
                    Forgot Password?
                  </Link> */}

                  <Button
                    className=" text-center mt-3 btnStyle"
                    onClick={handleSubmit}
                  >
                    Signup
                  </Button>

                  <p className="mt-3 text-light" color={{ color: "white" }}>
                    Already have an account?{" "}
                    <Link
                      to="/login"
                      className="text-white lnk"
                      style={{
                        fontWeight: "700",
                        color: "#FFF5EE",
                        fontSize: "1.2rem",
                      }}
                      onClick={resetValue}
                    >
                      Login
                    </Link>
                  </p>
                </div>
              </Form>
            </Col>
          </Row>
          <ToastContainer />
        </Container>
      </div>
    </>
  );
};

export default Register;
