import { useEffect, useState } from 'react'

import { useAuth, useSessionDestroyer } from '../hooks'

import { isValidSessionTime } from '../helpers'

import { SweetAlert } from '../pages/components'

let timerInterval
const initialStateTimer = {
  minutes: 60,
  seconds: 0,
  init: false,
}

const Session = () => {
  const {
    authData: { session },
  } = useAuth()
  const [destroySession] = useSessionDestroyer()
  const [sessionExpired, setSessionExpired] = useState(false)
  const [timer, setTimer] = useState(initialStateTimer)
  const [bgTimer, setBgTimer] = useState('')
  useEffect(() => {
    timerInterval = setInterval(() => {
      let minutes, seconds
      const currentDate = new Date().getTime()
      const diff = session.expiration - currentDate
      minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
      seconds = Math.floor((diff % (1000 * 60)) / 1000)
      setBgTimer(() => {
        if (minutes >= 30) return 'bg-sky-400'
        if (minutes < 30 && minutes >= 20) return 'bg-orange-300'
        if (minutes < 20 && minutes >= 10) return 'bg-orange-400'
        if (minutes < 10 && minutes >= 5) return 'bg-red-500'
        if (minutes < 5) return 'bg-red-700'
      })
      setTimer((prev) => {
        return {
          ...prev,
          minutes,
          seconds,
          init: true,
        }
      })
      if (!isValidSessionTime(minutes, seconds)) {
        setSessionExpired(true)
        clearInterval(timerInterval)
      }
    }, 1000)
    return () => {
      clearInterval(timerInterval)
    }
  }, [timer])
  useEffect(() => {
    if (sessionExpired) {
      SweetAlert.Expire({
        title: 'Session expired',
        text: 'Your session has expired',
      }).then((res) => {
        if (res.isConfirmed) {
          // TODO: implement session extension
          //console.log('Extend session')
        }
        if (res.isDenied || res.isDismissed) {
          destroySession()
        }
      })
    }
  }, [sessionExpired])
  return (
    <>
      {timer.init && (
        <p
          className={`
            text-center text-white
            p-4 m-4 rounded-lg
            text-xl font-bold
            lg:absolute bottom-0 left-0
            ${bgTimer}
          `}
          title="Time left to close your session"
        >
          Session time:{' '}
          {Math.abs(timer.minutes) < 10 ? `0${timer.minutes}` : timer.minutes}:
          {Math.abs(timer.seconds) < 10 ? `0${timer.seconds}` : timer.seconds}
        </p>
      )}
    </>
  )
}

export default Session
