# Shade Map
Implement an application that can calculate the “shadow path” in Vancouver:
Based on the Scientific Reports paper “CoolWalks for active mobility in urban street networks” that you provided, together with related technical research, this is entirely feasible. The following describes the required work and process:

1. Technical Overview and Theoretical Foundations
The paper proposes a CoolWalkability index and a path selection model. Using street network and building footprint data, it parameterizes a “sun avoidance preference” (α) to measure the degree of shading along the route and walking comfort. (Referenced sources: arXiv, IT University of Copenhagen.)

The theory indicates that in a regular grid network where building heights are uniform, the shadow effect has no impact on shade-seeking pedestrians. However, in real-world street geometries and with variations in building heights, shading advantages for certain paths are created.

2. Implementation Process and Required Data
Data Collection
Street network data: OpenStreetMap or local GIS street data.

Building footprints and height information: City of Vancouver open data, LiDAR satellite building height data.

To include tree shadows, city canopy data is needed, similar to the UBC campus LiDAR model analysis.
