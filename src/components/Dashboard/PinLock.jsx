import { useState } from 'react'

function PinLock({ onUnlock, t }) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [isSettingPin, setIsSettingPin] = useState(!localStorage.getItem('pin'))
  const [confirmPin, setConfirmPin] = useState('')

  const handleSetPin = () => {
    if (pin.length < 4) return
    if (pin !== confirmPin) {
      setError(true)
      return
    }
    localStorage.setItem('pin', pin)
    onUnlock()
  }

  const handleUnlock = () => {
    if (pin === localStorage.getItem('pin')) {
      onUnlock()
    } else {
      setError(true)
      setPin('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl w-full max-w-sm text-center border border-gray-100 dark:border-gray-700">
        <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg">
          <span className="text-3xl">🔐</span>
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-1">
          {isSettingPin ? t.pinSet : t.pinTitle}
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          {isSettingPin ? t.pinMin : t.pinEnter}
        </p>

        <input
          type="password"
          placeholder="••••"
          value={pin}
          onChange={e => { setPin(e.target.value); setError(false) }}
          className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-center text-2xl tracking-widest bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          maxLength={8}
        />

        {isSettingPin && (
          <input
            type="password"
            placeholder="••••"
            value={confirmPin}
            onChange={e => { setConfirmPin(e.target.value); setError(false) }}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-center text-2xl tracking-widest bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            maxLength={8}
          />
        )}

        {error && (
          <p className="text-red-400 text-sm mb-3 font-medium">
            {isSettingPin ? t.pinMismatch : t.pinError}
          </p>
        )}

        <button
          onClick={isSettingPin ? handleSetPin : handleUnlock}
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold rounded-xl py-3 transition-all shadow-sm hover:shadow-md active:scale-95"
        >
          {isSettingPin ? t.pinButton : t.pinEnterButton}
        </button>
      </div>
    </div>
  )
}

export default PinLock