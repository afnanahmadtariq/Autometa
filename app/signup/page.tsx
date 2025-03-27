import { SignupForm } from "@/components/auth/signup-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function SignupPage() {
  return (
    <AuthLayout title="Create an Account" description="Sign up to get started with Automata">
      <SignupForm />
    </AuthLayout>
  )
}

