import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";


function Login() {

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await axios.post(
          "http://localhost:5000/api/auth/login",
          formData
        );

      // SAVE TOKEN
      localStorage.setItem(
        "token",
        response.data.token
      );

      toast.success(
        "Login Successful"
      );

      // REDIRECT
      window.location.href =
        "/dashboard";

    } catch (error) {

      console.log(error);

      toast.error(
        "Login Failed"
      );

    }

  };


  return (

    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gray-100
      dark:bg-gray-900
      p-4
    ">

      <form
        onSubmit={handleSubmit}
        className="
          bg-white
          dark:bg-gray-800
          p-8
          rounded-3xl
          shadow-2xl
          w-full
          max-w-md
        "
      >

        {/* TITLE */}
        <h2 className="
          text-4xl
          font-bold
          mb-8
          text-center
          dark:text-white
        ">

          Welcome Back

        </h2>


        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="
            w-full
            border
            border-gray-300
            dark:border-gray-600
            p-4
            rounded-2xl
            mb-4
            dark:bg-gray-700
            dark:text-white
            outline-none
          "
          onChange={handleChange}
        />


        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="
            w-full
            border
            border-gray-300
            dark:border-gray-600
            p-4
            rounded-2xl
            mb-6
            dark:bg-gray-700
            dark:text-white
            outline-none
          "
          onChange={handleChange}
        />


        {/* LOGIN BUTTON */}
        <button
          type="submit"
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            py-4
            rounded-2xl
            font-semibold
            transition-all
          "
        >

          Login

        </button>


        {/* REGISTER LINK */}
        <p className="
          text-center
          mt-6
          text-gray-500
          dark:text-gray-300
        ">

          Don't have an account?

          <span
            onClick={() =>
              window.location.href =
                "/register"
            }
            className="
              text-blue-600
              cursor-pointer
              ml-2
              font-semibold
            "
          >

            Register

          </span>

        </p>

      </form>

    </div>

  );

}

export default Login;