

import { useState } from "react"
import { Palette, ArrowRight, Phone, Mail } from "lucide-react"

const LoginPage = ({ onLogin }) => {
  const [mode, setMode] = useState("") // "signup" or "login"
  const [signupMethod, setSignupMethod] = useState("") // "mobile", "google", or "email"
  const [name, setName] = useState("")
  const [selectedRole, setSelectedRole] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (mode === "login") {
      // For login, use email as the user identifier
      if (email.trim() && password.trim()) {
        // In a real app, you'd validate credentials here
        // For demo, extract name from email
        const userName = email.split("@")[0] || email
        onLogin(userName)
      }
    } else {
      // For signup, use the provided name
      if (name.trim()) {
        onLogin(name.trim())
      }
    }
  }

  const handleGoogleSignup = () => {
    // In a real app, this would integrate with Google OAuth
    const googleUserName = "Google User"
    onLogin(googleUserName)
  }

  if (!mode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 border border-border max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-3xl font-bold text-foreground">KalaConnect AI</h1>
            </div>
            <p className="text-muted-foreground">AI-Powered Marketplace for Local Artisans</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground text-center mb-6">Welcome!</h2>

            <button
              onClick={() => setMode("signup")}
              className="w-full p-4 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 flex items-center justify-center font-medium"
            >
              <span>Create New Account</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <button
              onClick={() => setMode("login")}
              className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center text-foreground hover:text-primary font-medium"
            >
              <span>I Already Have an Account</span>
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (mode === "login") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 border border-orange-200 max-w-md w-full shadow-lg">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="h-8 w-8 text-orange-500 mr-2" />
              <h1 className="text-3xl font-bold text-orange-900">KalaConnect AI</h1>
            </div>
            <p className="text-orange-600">Welcome back!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-medium text-orange-900 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="loginEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-orange-900 mb-2">
                Password
              </label>
              <input
                type="password"
                id="loginPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-orange-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-500"
                placeholder="Enter your password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={!email || !password}
              className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode("")}
                className="text-orange-600 hover:text-orange-900 text-sm"
              >
                ← Back to options
              </button>
            </div>

            <div className="text-center pt-4 border-t border-orange-200">
              <p className="text-sm text-orange-600">
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="text-orange-500 hover:underline font-medium"
                >
                  Sign up here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    )
  }

  if (mode === "signup" && !signupMethod) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 border border-border max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-3xl font-bold text-foreground">KalaConnect AI</h1>
            </div>
            <p className="text-muted-foreground">AI-Powered Marketplace for Local Artisans</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground text-center mb-6">Sign up to get started</h2>

            <button
              onClick={() => setSignupMethod("mobile")}
              className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center text-foreground hover:text-primary"
            >
              <Phone className="h-5 w-5 mr-3" />
              <span className="font-medium">Continue with Mobile Number</span>
            </button>

            <button
              onClick={() => setSignupMethod("google")}
              className="w-full p-4 rounded-lg border-2 border-border hover:border-red-300 hover:bg-red-50 transition-all duration-200 flex items-center justify-center text-foreground hover:text-red-700"
            >
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="font-medium">Continue with Google</span>
            </button>

            <button
              onClick={() => setSignupMethod("email")}
              className="w-full p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all duration-200 flex items-center justify-center text-foreground hover:text-primary"
            >
              <Mail className="h-5 w-5 mr-3" />
              <span className="font-medium">Continue with Email</span>
            </button>

            <div className="text-center pt-4">
              <button
                onClick={() => setMode("")}
                className="text-muted-foreground hover:text-foreground text-sm mb-2 block w-full"
              >
                ← Back to options
              </button>
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <button onClick={() => setMode("login")} className="text-primary hover:underline font-medium">
                  Sign in here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (signupMethod === "google") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="bg-card rounded-2xl p-8 border border-border max-w-md w-full">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Palette className="h-8 w-8 text-primary mr-2" />
              <h1 className="text-3xl font-bold text-foreground">KalaConnect AI</h1>
            </div>
            <p className="text-muted-foreground">Sign up with Google</p>
          </div>

          <div className="space-y-6">
            <button
              onClick={handleGoogleSignup}
              className="w-full p-4 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200 flex items-center justify-center"
            >
              <svg className="h-5 w-5 mr-3" viewBox="0 0 24 24" fill="white">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Sign up with Google
            </button>

            <button
              onClick={() => setSignupMethod("")}
              className="w-full text-muted-foreground hover:text-foreground text-sm"
            >
              ← Back to signup options
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-8 border border-border max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Palette className="h-8 w-8 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-foreground">KalaConnect AI</h1>
          </div>
          <p className="text-muted-foreground">
            {signupMethod === "mobile" ? "Sign up with Mobile Number" : "Sign up with Email"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
              Your Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              placeholder="Enter your name"
              required
            />
          </div>

          {signupMethod === "mobile" ? (
            <div>
              <label htmlFor="mobile" className="block text-sm font-medium text-foreground mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobile"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                placeholder="+1 (555) 123-4567"
                required
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="Create a password"
                  required
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={
              !name.trim() ||
              (signupMethod === "mobile" && !mobileNumber) ||
              (signupMethod === "email" && (!email || !password))
            }
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            Create Account
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={() => setSignupMethod("")}
            className="w-full text-muted-foreground hover:text-foreground text-sm"
          >
            ← Back to signup options
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
