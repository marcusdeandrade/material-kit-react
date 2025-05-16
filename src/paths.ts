export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
    simulados: {
      index: '/dashboard/simulados',
      modoPressao: '/dashboard/simulados/modo-pressao'
    }
  },
  errors: { notFound: '/errors/not-found' },
} as const;
