import { TwoFactorSetupForm } from "@/components/auth/two-factor-setup-form"
import { AuthLayout } from "@/components/layouts/auth-layout"

export default function SetupTwoFactorPage() {
  return (
    <AuthLayout
      title="Set Up Two-Factor Authentication"
      description="Secure your account with an additional layer of protection"
    >
      <TwoFactorSetupForm />
    </AuthLayout>
  )
}

