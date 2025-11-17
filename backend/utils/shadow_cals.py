# shadow_calc.py
import shapely
from shapely.geometry import LineString, Polygon, Point
from datetime import datetime
import pysolar.solar as ps
import math

def get_solar_alt_az(latitude, longitude, dt):
    """計算指定地點與時間的太陽高度角與方位角"""
    altitude = ps.get_altitude(latitude, longitude, dt)
    azimuth = ps.get_azimuth(latitude, longitude, dt)
    return altitude, azimuth

def project_shadow(polygon, altitude_deg, azimuth_deg, height):
    """將建築陰影從多邊形投影到地面"""
    if altitude_deg <= 0:
        return None  # 太陽在地平線下
    shadow_length = height / math.tan(math.radians(altitude_deg))
    dx = shadow_length * math.sin(math.radians(azimuth_deg))
    dy = shadow_length * math.cos(math.radians(azimuth_deg))
    return shapely.affinity.translate(polygon, xoff=dx, yoff=dy)

def compute_shadow_ratio(road_segment, buildings, dt, lat, lon):
    """計算單一路段的陰影比例"""
    alt, az = get_solar_alt_az(lat, lon, dt)
    shadow_polygons = []

    for bldg in buildings:
        height = bldg['height']
        geom = bldg['geometry']
        shadow = project_shadow(geom, alt, az, height)
        if shadow:
            shadow_polygons.append(shadow)

    # 合併所有建築陰影區塊
    combined_shadow = shapely.ops.unary_union(shadow_polygons)
    if not combined_shadow.intersects(road_segment):
        return 0.0

    shaded_part = combined_shadow.intersection(road_segment)
    return shaded_part.length / road_segment.length
