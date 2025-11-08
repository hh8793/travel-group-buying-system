import AuthForm from '@/components/auth/AuthForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          创建账户
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          或者{' '}
          <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            登录现有账户
          </a>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <AuthForm isLogin={false} />
        </div>
      </div>
    </div>
  )
}