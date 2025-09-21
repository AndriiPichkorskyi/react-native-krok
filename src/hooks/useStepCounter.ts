import { useEffect, useRef } from 'react';
import { accelerometer } from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { incrementSteps, setSteps } from '../redux/stepsSlice';
import { updateSteps } from '../api/supabaseLib';
import { stepsSelector } from '../redux/selectors';

import { setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.accelerometer, 100);

export default function useStepCounter() {
  const dispatch = useDispatch();
  const steps = useSelector(stepsSelector);
  const user = useSelector((state: RootState) => state.user);
  const lastAcceleration = useRef(0);
  const subscriptionRef = useRef<any>(null);
  const lastStepTime = useRef(0);
  const stepHistory = useRef<number[]>([]);

  // Ініціалізація кроків після того як user з'явився
  useEffect(() => {
    if (!user.id) return;
    dispatch(setSteps(user.steps)); // встановлюємо початкове значення

    subscriptionRef.current = accelerometer
      .pipe(
        map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z)),
        filter(acc => {
          const now = Date.now();
          const diff = Math.abs(acc - lastAcceleration.current);

          // Фільтрація за часом - мінімум 300мс між кроками
          if (now - lastStepTime.current < 300) {
            lastAcceleration.current = acc;
            return false;
          }

          // Фільтрація за силою прискорення - підвищуємо поріг
          if (diff < 2.5) {
            lastAcceleration.current = acc;
            return false;
          }

          // Фільтрація за історією - перевіряємо стабільність
          stepHistory.current.push(acc);
          if (stepHistory.current.length > 5) {
            stepHistory.current.shift(); // видаляємо старі значення
          }

          // Перевіряємо, чи є це справжній крок (варіація в історії)
          if (stepHistory.current.length >= 3) {
            const variance = stepHistory.current.reduce((sum, val, idx, arr) => {
              const mean = arr.reduce((a, b) => a + b) / arr.length;
              return sum + Math.pow(val - mean, 2);
            }, 0) / stepHistory.current.length;

            // Якщо варіація надто мала - ймовірно просто тремтіння
            if (variance < 1.0) {
              lastAcceleration.current = acc;
              return false;
            }
          }

          lastAcceleration.current = acc;
          lastStepTime.current = now;
          return true;
        }),
      )
      .subscribe({
        next: () => {
          dispatch(incrementSteps());
        },
        error: e => console.warn('Sensor error:', e.message),
      });

    return () => subscriptionRef.current?.unsubscribe();
  }, [user.id, user.steps, dispatch]);

  // Відправка на сервер раз на хвилину
  useEffect(() => {
    if (!user.id) return;
    const interval = setInterval(() => {
      if (steps > 0) updateSteps(steps);
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [steps, user.id]);

  return steps;
}
