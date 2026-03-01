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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg w-full max-w-sm text-center">
        <div className="text-4xl mb-4">🔐</div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          {isSettingPin ? t.pinSet : t.pinTitle}
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          {isSettingPin ? t.pinMin : t.pinEnter}
        </p>

        <input
          type="password"
          placeholder="PIN"
          value={pin}
          onChange={e => { setPin(e.target.value); setError(false) }}
          className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-center text-2xl tracking-widest bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white mb-3"
          maxLength={8}
        />

        {isSettingPin && (
          <input
            type="password"
            placeholder={t.pinConfirm}
            value={confirmPin}
            onChange={e => { setConfirmPin(e.target.value); setError(false) }}
            className="w-full border border-gray-200 dark:border-gray-600 rounded-xl px-4 py-3 text-center text-2xl tracking-widest bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white mb-3"
            maxLength={8}
          />
        )}

        {error && (
          <p className="text-red-400 text-sm mb-3">
            {isSettingPin ? t.pinMismatch : t.pinError}
          </p>
        )}

        <button
          onClick={isSettingPin ? handleSetPin : handleUnlock}
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl py-3 transition-colors"
        >
          {isSettingPin ? t.pinButton : t.pinEnterButton}
        </button>
      </div>
    </div>
  )
}

export default PinLock