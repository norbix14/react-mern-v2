import { useEffect, useState } from 'react'

import { useAuth, useSessionDestroyer } from '../hooks'

const Session = () => {
  const {
    authData: { session },
  } = useAuth()
  const [destroySession] = useSessionDestroyer()
  const [timer, setTimer] = useState({
    minutes: 60,
    seconds: 0,
    init: false,
  })
  const [bgTimer, setBgTimer] = useState('')
  let timerInterval
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
      if ((minutes === 0 && seconds === 0) || (minutes < 0 && seconds < 0)) {
        // TODO:
        // *se podria agregar una alerta de sesion expirada
        // *se podria retrasar la destruccion de la sesion
        //console.log('sesion expirada')
        destroySession()
        clearInterval(timerInterval)
      }
    }, 1000)
    return () => {
      clearInterval(timerInterval)
    }
  }, [timer])
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
