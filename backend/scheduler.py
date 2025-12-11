def estimate_daily_water(area_m2, rain_mm, eto, kc, efficiency, flow_rate_lpm):
    net_irrigation_mm = max(0, eto * kc - rain_mm * 0.7)
    volume_liters = net_irrigation_mm * area_m2 / efficiency
    duration_min = volume_liters / flow_rate_lpm
    return volume_liters, duration_min

if __name__=="__main__":
    area_m2=5000
    rain_mm=2
    eto=5
    kc=0.9
    efficiency=0.75
    flow_rate_lpm=20

    volume, duration = estimate_daily_water(area_m2, rain_mm, eto, kc, efficiency, flow_rate_lpm)
    print(f"💧 Water needed: {volume:.2f} liters")
    print(f"⏱️ Duration: {duration:.2f} minutes")