# Shade Map
Implement an application that can calculate the “shadow path” in Vancouver:
Based on the Scientific Reports paper “CoolWalks for active mobility in urban street networks”, the following describes the required work and process:

1. Technical Overview and Theoretical Foundations
The paper proposes a CoolWalkability index and a path selection model. Using street network and building footprint data, it parameterizes a “sun avoidance preference” (α) to measure the degree of shading along the route and walking comfort. (Referenced sources: arXiv, IT University of Copenhagen.)

The theory indicates that in a regular grid network where building heights are uniform, the shadow effect has no impact on shade-seeking pedestrians. However, in real-world street geometries and with variations in building heights, shading advantages for certain paths are created.

2. Implementation Process and Required Data
Data Collection
Street network data: OpenStreetMap or local GIS street data.
Building footprints and height information: City of Vancouver open data, LiDAR satellite building height data.
To include tree shadows, city canopy data is needed, similar to the UBC campus LiDAR model analysis.

Shadow Calculation Module
Use a solar position model (based on latitude, longitude, and time) combined with building geometry models to compute the shading and sunlight exposure ratio for each road segment at each time interval.

Path Selection Algorithm
Construct a graph-based street network, assigning each edge a weight that combines distance, shading proportion, and user preference parameter α.
Apply Dijkstra’s or A* algorithm to search for the optimal “maximum shade/distance trade-off” path (enabling multi-scenario comparisons).

Frontend and Interface
Provide a map-based interface (Web or Mobile) where users can input start and end locations, date & time, and the α parameter.
Display multiple route options: shortest path, maximum-shade path, and compromise routes.
Visualize shading intensity, such as using color coding to indicate different degrees of shadow.


