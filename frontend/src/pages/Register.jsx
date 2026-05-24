import { useState } from "react";

import axios from "axios";

import toast from "react-hot-toast";

function Register() {

  const [formData, setFormData] =
    useState({
      name: "",
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

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData
      );

      toast.success(
        "Account Created Successfully"
      );

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      toast.error(
        "Registration Failed"
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

        <h2 className="
          text-4xl
          font-bold
          mb-8
          text-center
          dark:text-white
        ">

          Create Account

        </h2>


        <input
          type="text"
          name="name"
          placeholder="Name"
          className="
            w-full
            border
            p-4
            rounded-2xl
            mb-4
            dark:bg-gray-700
            dark:text-white
          "
          onChange={handleChange}
        />


        <input
          type="email"
          name="email"
          placeholder="Email"
          className="
            w-full
            border
            p-4
            rounded-2xl
            mb-4
            dark:bg-gray-700
            dark:text-white
          "
          onChange={handleChange}
        />


        <input
          type="password"
          name="password"
          placeholder="Password"
          className="
            w-full
            border
            p-4
            rounded-2xl
            mb-6
            dark:bg-gray-700
            dark:text-white
          "
          onChange={handleChange}
        />


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

          Register

        </button>


        <p className="
          text-center
          mt-6
          text-gray-500
        ">

          Already have account?

          <span
            onClick={() =>
              window.location.href = "/"
            }
            className="
              text-blue-600
              cursor-pointer
              ml-2
            "
          >

            Login

          </span>

        </p>

      </form>

    </div>

  );

}

export default Register;