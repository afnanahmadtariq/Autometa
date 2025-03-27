import { LoginForm } from "@/components/auth/login-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function LoginPage() {
  return (
    <AuthLayout title="Login to Automata" description="Enter your credentials to access your account">
      <LoginForm />
    </AuthLayout>
  )
}

