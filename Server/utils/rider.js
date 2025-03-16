async function getFare(distance, duration) {
    if (!distance || !duration) {
      throw new Error("duration and destination are required");
    }
  
    const baseFare = {
      auto: 30,
      car: 50,
      moto: 20,
    };
  
    const perKmRate = {
      auto: 10,
      car: 15,
      moto: 8,
    };
  
    const perMinuteRate = {
      auto: 2,
      car: 3,
      moto: 1.5,
    };
  
    const fare = {
      auto: Math.round(
        baseFare.auto +
          (distance / 1000) * perKmRate.auto +
          (duration / 60) * perMinuteRate.auto
      ),
      car: Math.round(
        baseFare.car +
          (distance / 1000) * perKmRate.car +
          (duration / 60) * perMinuteRate.car
      ),
      moto: Math.round(
        baseFare.moto +
          (distance / 1000) * perKmRate.moto +
          (duration / 60) * perMinuteRate.moto
      ),
    };
  
    return fare;
  }
  
export default getFare;
  