import { TwoFactorVerifyForm } from "@/components/auth/two-factor-verify-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function VerifyTwoFactorPage() {
  return (
    <AuthLayout
      title="Verify Two-Factor Authentication"
      description="Enter the code from your authenticator app or email"
    >
      <TwoFactorVerifyForm />
    </AuthLayout>
  )
}

