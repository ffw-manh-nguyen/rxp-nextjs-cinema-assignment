"use client";

import {
  createSession,
  getRequestToken,
  validateRequestToken,
} from "@/app/api";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const Login = () => {
  const [username, setUsername] = useState("aiemmanh");
  const [password, setPassword] = useState("AKsW7amJGF2J.Po");
  const [submitError, setSubmitError] = useState("");
  const [isLoading, setLoading] = useState(false);

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;

  const handleLogin = async () => {
    setLoading(true);
    try {
      let requestToken = "";
      const tokenRequest = await getRequestToken();
      requestToken = tokenRequest.request_token;
      const validateReqToken = await validateRequestToken({
        username,
        password,
        requestToken,
      });
      if (validateReqToken.success) {
        const creatSessionReq = await createSession({ requestToken });
        const sessionId = creatSessionReq.session_id;
        const date = new Date();
        date.setTime(date.getTime() + 60 * 60);
        document.cookie = `cinema-auth=${sessionId}; path=/;`;
        window.location.href = "/";
      } else {
        setSubmitError(validateReqToken.response.data.status_message);
      }
    } catch (error) {
      console.log("[User login] error => ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="login-form-wrapper flex flex-col items-center justify-center gap-7 pt-32">
        <h2 className="mb-10 text-4xl font-medium">Log In</h2>
        <form
          className="flex w-[20rem] flex-col space-y-10"
          onSubmit={handleSubmit(handleLogin)}
          id="login-form"
        >
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-slate-500">
            <input
              {...register("username")}
              className="w-full border-none bg-transparent outline-none focus:outline-none"
              type="text"
              name="username"
              id="username"
              placeholder="Username"
              value={username}
              onInput={(e) => setUsername(e.currentTarget.value)}
            />
          </div>
          {errors.username && (
            <span className="italic text-red-400">
              {errors.username?.message}
            </span>
          )}
          <div className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-slate-500">
            <input
              {...register("password")}
              className="w-full border-none bg-transparent outline-none focus:outline-none"
              name="password"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          {errors.password && (
            <span className="italic text-red-400">
              {errors.password?.message}
            </span>
          )}
          <button
            type="submit"
            className="relative inset-0 bg-gradient-to-r from-emerald-400 to-sky-400 py-2 font-bold"
            disabled={isLoading}
            title="Login"
          >
            {isLoading ? "LOADING..." : "LOG IN"}
            <span className="absolute left-0 top-0 w-full transform rounded-sm bg-gradient-to-r from-emerald-600 to-sky-600 py-2 opacity-0 transition duration-300 hover:opacity-100">
              LOG IN
            </span>
          </button>
          <span className="italic text-red-400">{submitError}</span>
        </form>
      </div>
    </>
  );
};

export default Login;
