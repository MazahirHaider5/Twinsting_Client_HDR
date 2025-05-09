"use client";
import { useEffect, useState } from "react";
import { HiOutlineMail, HiOutlineLockClosed } from "react-icons/hi";
import { AiFillApple } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/interceptor";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { signIn } from "next-auth/react";

const LoginPage = () => {
  const user = useSelector((state: RootState) => state.user);
  const t = useTranslations("AuthPage");
  const router = useRouter();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    if (user?._id && user?.email) {
      router.push("/");
    }
  }, [user, router]);

  const validateForm = (): boolean => {
    const newErrors: { email?: string; password?: string } = {};
  
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email) || 
      /\.\./.test(email)
    ) {
      newErrors.email = "Invalid email format";
    }
  
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
  
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.post("/auth/signin", {
        email,
        password,
        rememberMe
      });
      if (response?.data?.message === "Sign-in successful") {
        toast.success(response?.data?.message);
        const userData = response?.data?.data?.user;

        dispatch(
          login({
            _id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            token: userData?.token,
            isVerified: userData.isVerified,
            subscriptionType: userData.subscriptionType,
            profilePicture: userData.profilePicture
          })
        );

        // Store token in localStorage if rememberMe is checked
        if (rememberMe) {
          localStorage.setItem("auth_token", userData?.token);
        }

        router.push("/");
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      const errorMessage = error instanceof Error ? error.message : "Login failed. Please check your credentials.";
      setError(errorMessage);
      // toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // **Handle Social Login**
  const handleSocialLogin = async (provider: "google" | "facebook" | "apple") => {
    setLoading(true);
    setError(null);

    try {
      const response = await signIn(provider, { redirect: false });

      if (!response?.error) {
        // Call backend API to get JWT and user info
        const { data } = await apiClient.post("/auth/social-login", {
          provider
        });

        if (data.success && data.user) {
          dispatch(
            login({
              _id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              token: data.token || data.user.token,
              isVerified: data.user.isVerified,
              subscriptionType: data.user.subscriptionType,
              profilePicture: data.user.profilePicture
            })
          );

          // Store token in localStorage if rememberMe is checked
          if (rememberMe) {
            localStorage.setItem("auth_token", data.token || data.user.token);
          }

          toast.success("Logged in successfully!");
          router.push("/");
        }
      } else {
        setError("Social login failed");
        toast.error("Social login failed");
      }
    } catch (error: unknown) {
      console.error("Error during social login:", error);
      const errorMessage = error instanceof Error ? error.message : "Something went wrong!";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-6 md:p-16 md:h-[93vh] md:w-[25rem] lg:h-[90vh] lg:w-[30rem] 2xl:w-[35rem]">
      <p className=" text-sm font-semibold text-gray-600">
        {t("loginMain")}
      </p>
      <p className="mb-4 md:mb-6 text-lg font-extrabold md:text-lg lg:text-lg 2xl:text-xl text-black">{t("loginTitle")}</p>
      <form onSubmit={handleLogin} className="w-full space-y-4">
        {error && <div className="w-full rounded-lg bg-red-50 p-3 text-sm text-red-500">{error}</div>}
        {/* Email Input */}
        <div className="w-full">
          <label htmlFor="email" className="mb-3 block px-1 text-xs font-medium sm:text-xs md:text-xs lg:text-base">
            {t("email")}
          </label>
          <section className="flex w-full items-center gap-2 rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-2.5 text-base sm:text-base md:text-base lg:text-lg 2xl:text-lg">
            <HiOutlineMail className="text-sm text-gray-500 sm:text-sm md:text-sm lg:text-lg 2xl:text-lg" />
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors((prev) => ({ ...prev, email: undefined })); // Clear email error on input
              }}              
              // required
              placeholder={t("emailPlaceholder")}
              className="bg-transparent text-sm outline-none focus:ring-0 h-7"
              data-testid="email-input"
            />
          </section>
          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
        </div>
        {/* Password Input */}
        <div className="w-full">
          <label htmlFor="password" className="mb-3 block px-1 text-xs font-medium sm:text-xs md:text-xs lg:text-base">
            {t("password")}
          </label>
          <section className="flex w-full items-center gap-2 rounded-xl border-2 border-gray-200 bg-gray-100 px-4 py-2.5 text-base sm:text-base md:text-base lg:text-lg 2xl:text-lg">
            <HiOutlineLockClosed className="text-sm text-gray-500 sm:text-sm md:text-sm lg:text-lg 2xl:text-lg" />
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors((prev) => ({ ...prev, password: undefined })); // Clear password error on input
              }}
              
              // required
              placeholder={t("passwordPlaceholder")}
              className="bg-transparent text-sm outline-none focus:ring-0 h-7"
              data-testid="password-input"
            />
          </section>
          {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
        </div>
        {/* Stay Logged In and Forgot Password */}
        <div className="flex flex-col md:flex-row gap-y-2 items-center justify-between py-2">
          <label
            htmlFor="stayLoggedIn"
            className="flex items-center text-xs sm:text-xs md:text-xs lg:text-base 2xl:text-base"
          >
            <input
              id="stayLoggedIn"
              type="checkbox"
              className="mr-2 accent-black w-4 h-4"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              data-testid="remember-me-checkbox"
            />
            {t("rememberMe")}
          </label>
          <Link
            href="/forgot-password"
            className="underline flex items-center text-xs hover:underline sm:text-xs md:text-xs lg:text-base 2xl:text-base text-black"
          >
            {t("forgotPassword")}
          </Link>
        </div>
        {/* Submit Button */}
        <button
          type="submit"
          className="gradient-bg w-full cursor-pointer rounded-xl py-2.5 text-xs text-white hover:opacity-90 focus:outline-none disabled:opacity-50 sm:text-xs md:text-xs lg:text-base 2xl:text-base font-bold"
          disabled={loading}
          data-testid="login-button"
        >
          {loading ? "Logging In..." : t("loginButton")}
        </button>
        {/* Social Login Buttons */}
        <div className="pt-1">
          <p className="mb-4 text-center text-sm text-gray-600 ">
            {t("loginWith")}
          </p>
          <div className="space-y-2">
            <button
              type="button"
              className="flex w-full items-center justify-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base text-black"
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
              data-testid="google-login-button"
            >
              <FcGoogle className="size-6" />
              <span className="w-60 text-start">{t("google")}</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base text-black"
              onClick={() => handleSocialLogin("apple")}
              disabled={loading}
              data-testid="apple-login-button"
            >
              <AiFillApple className="size-7" />
              <span className="w-60 text-start">{t("apple")}</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center justify-center gap-4 rounded-xl border-2 border-gray-200 bg-gray-100 py-2.5 pl-4 text-xs hover:opacity-90 sm:text-xs md:text-xs lg:text-base 2xl:text-base text-black"
              onClick={() => handleSocialLogin("facebook")}
              disabled={loading}
              data-testid="facebook-login-button"
            >
              <FaFacebook className="size-6 text-blue-600" />
              <span className="w-60 text-start">{t("facebook")}</span>
            </button>
          </div>
        </div>
        <p className="pt-2 text-center text-gray-800 text-sm">
          {t("dontHaveAccount")}{" "}
          <Link href="/signup" className="text-[#E94A6C] underline">
            {t("register")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
