# SORA (Specific Operations Risk Assessment) Calculations Implementation

## Overview

This document explains how the SORA formulas from Annex A are implemented in the eSORA component. The component calculates three main volumes and an intrinsic ground risk value based on flight parameters and geographic data.

## Database Parameters (ComponentProps)

The following parameters are received from the database via ComponentProps:

### Flight Parameters

- **`vO`** (m/s): Operating speed
- **`hFG`** (m): Flight geography height
- **`cd`** (m): Drone diameter (characteristic dimension)
- **`tR`** (s): Manual procedures reaction time
- **`tP`** (s): Parachute deployment time
- **`operationReactionTime`** (s): Operation reaction time (used when tR = 0)

### Aircraft Configuration

- **`multirotor`** (boolean): Whether drone is multirotor
- **`terminateWithParachute`** (boolean): Whether flight is terminated with parachute
- **`maxRollAngle`** (degrees): Maximum roll angle
- **`maxPitchAngle`** (degrees): Maximum pitch angle
- **`power`** (boolean): Whether drone has power
- **`gliding`** (boolean): Whether the drone is gliding
- **`E`** (number): Glide ratio
- **`cL`** (number): Lift coefficient

### Error and Accuracy Parameters

- **`sGPS`** (m): GNSS accuracy
- **`sPos`** (m): Position holding error
- **`sK`** (m): Map error
- **`hAM`** (m): Altitude measurement error

### Wind and Performance

- **`vWind`** (m/s): Wind speed
- **`vZ`** (m/s): Rate of descent with parachute open

### Calculation Modes

- **`simplified`** (boolean): Whether to use simplified calculation
- **`ballisticApproach`** (boolean): Whether to use ballistic approach

### Communication Latency

- **`directRadioMaxLatency`** (s): Direct radio max latency
- **`lte5GMaxLatency`** (s): LTE 5G max latency
- **`otherMaxLatency`** (s): Other max latency
- **`satelliteMaxLatency`** (s): Satellite max latency

### Ground Risk Parameters

- **`controlledGroundArea`** (boolean): Whether ground area is controlled
- **`criticalArea`** (m²): Critical area size

## Calculated Values (Not in Annex A)

### Reaction Time Calculation

The system calculates an effective reaction time by combining manual procedures reaction time with communication latency:

```typescript
if (tR === 0) {
  effectiveReactionTime = operationReactionTime;
} else {
  effectiveReactionTime =
    tR +
    Math.max(
      directRadioMaxLatency,
      lte5GMaxLatency,
      otherMaxLatency,
      satelliteMaxLatency,
    );
}
```

## SORA Formulas Implementation

### 1. Contingency Volume Calculation

#### Height Components

- **Reaction Height**: `hR = vO × 0.7 × tR`
- **Contingency Maneuver Height**:
  - For multirotor: `hCM = vO² / (2 × g)`
  - For fixed-wing: `hCM = (vO² / g) × 0.3`
  - With parachute: `hCM = vO × tP × 0.7`
- **Total Contingency Height**: `hCV = hFG + hAM + hR + hCM`

#### Width Components

- **Reaction Distance**: `sR = vO × tR`
- **Contingency Maneuver Distance**:
  - For multirotor: `sCM = vO² / (2 × g × tan(maxPitchAngle × π/180))`
  - For fixed-wing: `sCM = vO² / (g × tan(maxRollAngle × π/180))`
- **Total Contingency Width**: `sCV = sGPS + sPos + sK + sR + (terminateWithParachute ? vO × tP : sCM)`

### 2. Ground Risk Volume Calculation

#### Ground Risk Buffer Width (sGRB)

The calculation depends on several conditions:

1. **Simplified Mode**: `sGRB = hCV + cd/2`

2. **Ballistic Approach**: `sGRB = vO × √(2 × hCV / g) + cd/2`

3. **With Parachute**: `sGRB = vO × tP + vWind × (hCV / vZ)`

4. **With Glide Ratio (E > 0)**: `sGRB = E × hCV`

5. **No Power**:
   - If gliding: `sGRB = (cL / cd) × hCV`
   - Otherwise: `sGRB = hCV + cd/2`

### 3. Adjacent Area Calculation

#### Adjacent Buffer Distance

```typescript
const threeMinRange = (vO × 3) / 60;
let adjacentBufferDistance = 5000; // Default 5km

if (threeMinRange > 5000) {
  adjacentBufferDistance = threeMinRange > 35000 ? 35000 : threeMinRange;
}
```

### 4. Intrinsic Ground Risk Calculation

#### Population Density Categories

Population density is categorized into 7 levels:

- **0**: Controlled Ground Area (population density = 0)
- **1**: < 5 people/km²
- **2**: < 50 people/km²
- **3**: < 500 people/km²
- **4**: < 5,000 people/km²
- **5**: < 50,000 people/km²
- **6**: ≥ 50,000 people/km²

#### Dimension Categories

Characteristic dimension (cd) is categorized into 5 levels:

- **0**: ≤ 1m
- **1**: ≤ 3m
- **2**: ≤ 8m
- **3**: ≤ 20m
- **4**: ≤ 40m

#### Speed Categories

Operating speed (vO) is categorized into 5 levels:

- **0**: ≤ 25 m/s
- **1**: ≤ 35 m/s
- **2**: ≤ 75 m/s
- **3**: ≤ 120 m/s
- **4**: ≤ 200 m/s

#### Critical Area Categories

Critical area is categorized into 5 levels:

- **0**: ≤ 6.5 m²
- **1**: ≤ 65 m²
- **2**: ≤ 650 m²
- **3**: ≤ 6,500 m²
- **4**: ≤ 65,000 m²

#### Ground Risk Matrix

The system uses a 7×5 matrix to determine ground risk values:

```typescript
const groundRiskMatrix = [
  [1, 1, 2, 3, 3], // Controlled Ground Area
  [2, 3, 4, 5, 6], // < 5
  [3, 4, 5, 6, 7], // < 50
  [4, 5, 6, 7, 8], // < 500
  [5, 6, 7, 8, 9], // < 5,000
  [6, 7, 8, 9, 10], // < 50,000
  [7, 8, null, null, null], // ≥ 50,000
];
```

#### Final Ground Risk Calculation

The system calculates ground risk values for:

- Dimension category vs population density
- Speed category vs population density
- Critical area category vs population density

The final ground risk is determined by:

- If critical area is provided: Use critical area-based risk
- Otherwise: Use the maximum of dimension and speed-based risks
- If controlled ground area: Use row 0 (Controlled Ground Area) of the matrix

## Population Density Data Sources

### Land Use Population Density Lookup

The system uses predefined population density values for different land use types:

| Land Use Code | Description                                                | Population Density (people/km²) |
| ------------- | ---------------------------------------------------------- | ------------------------------- |
| 1111          | Continuous urban fabric                                    | 13,400                          |
| 1121          | Discontinuous dense urban fabric                           | 8,500                           |
| 1130          | Discontinuous medium density urban fabric                  | 4,000                           |
| 1210          | Discontinuous low density urban fabric                     | 6,500                           |
| 1221          | Discontinuous very low density urban fabric                | null                            |
| 1222          | Isolated structures                                        | 49,900                          |
| 1230          | Industrial, commercial, public, military and private units | 7,300                           |
| 1242          | Transport units                                            | 49,900                          |
| 1330          | Construction sites                                         | 3,500                           |
| 1410          | Green urban areas                                          | 10,000                          |
| 1421          | Sports and leisure facilities                              | 4,500                           |
| 1422          | Allotments and community gardens                           | 8,200                           |
| 3310-3318     | Beaches, dunes and sand plains                             | 49,900                          |

### Population Density Calculation Process

1. **Intersect flight volumes with land use data** to identify affected areas
2. **Calculate maximum population density** in operational ground risk area
3. **Calculate average population density** in adjacent area
4. **Apply user overrides** if corrections are provided
5. **Use the maximum density** for ground risk assessment

## Formula Selection Logic

The system selects appropriate formulas based on aircraft configuration:

1. **Multirotor vs Fixed-wing**: Different contingency maneuver calculations
2. **Parachute termination**: Overrides other contingency calculations
3. **Power availability**: Affects ground risk buffer calculation
4. **Gliding capability**: Uses glide ratio or lift coefficient
5. **Simplified mode**: Uses simplified ground risk buffer calculation
6. **Ballistic approach**: Uses ballistic trajectory calculation

## Output Values

The component calculates and returns:

- **Maximum population density in operational volume + ground risk buffer**
- **Average population density in adjacent area**
- **Intrinsic ground risk** (1-10 scale)
- **Contingency volume height and width**
- **Ground risk buffer width**
- **Adjacent area width**
- **Intersecting land use classes and geozones**

## Implementation Notes

### Constants Used

- **g** (gravity): 9.81 m/s²

### Error Handling

The system includes comprehensive error handling for:

- Invalid input parameters
- Missing flight geography data
- Calculation overflow (Infinity values)
- Invalid ground risk matrix combinations

### User Override Capability

Users can override population density values for specific land use classes when known corrections are needed (e.g., construction sites that have been developed into residential areas).

This implementation provides a comprehensive risk assessment following SORA Annex A methodology while incorporating additional calculations for reaction time and communication latency not explicitly covered in the original document.
