import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Signup = () => {
  const { signup } = useContext(AuthContext)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: ''
  })
  const [errors, setErrors] = useState({})
  const [passwordHints, setPasswordHints] = useState({
    length: false,
    upper: false,
    lower: false,
    number: false,
    special: false
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })

    if (errors[name]) setErrors({ ...errors, [name]: '' })

    // Real-time password validation
    if (name === 'password') {
      setPasswordHints({
        length: value.length >= 6,
        upper: /[A-Z]/.test(value),
        lower: /[a-z]/.test(value),
        number: /[0-9]/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value)
      })
    }
  }

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = 'Name is required'
    if (!form.email.includes('@')) err.email = 'Enter a valid email'

    const { length, upper, lower, number, special } = passwordHints
    if (!length || !upper || !lower || !number || !special) {
      err.password = 'Password must include upper, lower, number, special char'
    }

    if (form.password !== form.confirm) err.confirm = 'Passwords do not match'
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      await signup({
        name: form.name,
        email: form.email,
        password: form.password
      })
      toast.success('Signup successful')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.message || 'Signup failed. Please try again.')
      console.log(err)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg border border-gray-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-2">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-600 text-sm mt-2">{errors.email}</p>}
          </div>
        
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors"
              placeholder="Create a password"
            />
            {errors.password && <p className="text-red-600 text-sm mt-2">{errors.password}</p>}

            {/* Real-time password hints */}
            <ul className="text-xs text-gray-600 mt-2 space-y-1">
              <li className={passwordHints.length ? 'text-green-600' : 'text-gray-400'}>
                • At least 6 characters
              </li>
              <li className={passwordHints.upper ? 'text-green-600' : 'text-gray-400'}>
                • At least one uppercase letter
              </li>
              <li className={passwordHints.lower ? 'text-green-600' : 'text-gray-400'}>
                • At least one lowercase letter
              </li>
              <li className={passwordHints.number ? 'text-green-600' : 'text-gray-400'}>
                • At least one number
              </li>
              <li className={passwordHints.special ? 'text-green-600' : 'text-gray-400'}>
                • At least one special character
              </li>
            </ul>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
            <input
              name="confirm"
              type="password"
              value={form.confirm}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent transition-colors"
              placeholder="Confirm your password"
            />
            {errors.confirm && <p className="text-red-600 text-sm mt-2">{errors.confirm}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-slate-600 hover:bg-slate-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup;
