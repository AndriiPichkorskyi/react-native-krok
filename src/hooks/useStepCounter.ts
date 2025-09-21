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

  // Ініціалізація кроків після того як user з'явився
  useEffect(() => {
    if (!user.id) return;
    dispatch(setSteps(user.steps)); // встановлюємо початкове значення

    subscriptionRef.current = accelerometer
      .pipe(
        map(({ x, y, z }) => Math.sqrt(x * x + y * y + z * z)),
        filter(acc => {
          const diff = Math.abs(acc - lastAcceleration.current);
          lastAcceleration.current = acc;
          return diff > 1.2;
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
