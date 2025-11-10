import math
from shapely.geometry import LineString, Polygon, Point


def get_solar_alt_az(latitude, longitude, dt):
    altitude = ps.get_altitude(latitude, longitude, dt)
    azimuth = ps.get_azimuth(latitude, longitude,dt)
    return altitude, azimuth

def project_shadow(polygon, altitude_deg, azimuth_deg, height) :
    if altitude_deg <= 0:
        return None  #Sun is outside the area
    shadow_lenth = height / math.tan(math.radians(altitude_deg))
    dx = shadow_lenth * math.sin(math.radians(azimuth_deg))
    dy = shadow_lenth * math.cos(math.radians(azimuth_deg))
    return shapely.affinity.translate(polygon, xoff=dx, yoff=dy)

def compute_shadow_ratio(road_segment, buildings, dt, lat, lon):
    
    alt, az = get_solar_alt_az(lat, lon, dt)
    shadow_polygons = []

    for bldg in buildings:
        height = bldg['height']  # ?
        geom = bldg['geometry']
        shadow = project_shadow(geom, alt, az, height)
        if shadow:
            shadow_polygons.append(shadow)

    # Add all the areas
    combined_shadow = shapely.ops.unary_union(shadow_polygons)
    if not combined_shadow.intersects(road_segment):
        return 0.0

    shaded_part = combined_shadow.intersection(road_segment)
    return shaded_part.length / road_segment.length

