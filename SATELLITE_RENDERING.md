# Satellite Rendering Configuration

This document explains how to configure the number of satellites rendered in the application and the performance considerations.

## Current Status

The application now renders **up to 10,000 satellites** by default (increased from the previous limit of 1,000).

Your TLE file contains **26,214 total satellites**, but rendering all of them simultaneously would cause significant performance issues in most browsers.

## Performance Modes

You can adjust the number of rendered satellites by changing the performance mode in `/src/app/main/page.tsx`:

```typescript
// Options for getSatellitePositions():
const satellitePositions = await getSatellitePositions("low"); // 1,000 satellites
const satellitePositions = await getSatellitePositions("medium"); // 5,000 satellites
const satellitePositions = await getSatellitePositions("high"); // 10,000 satellites (current)
```

## Configuration

All satellite rendering settings can be customized in `/src/app/config/satelliteConfig.ts`:

- **MAX_SATELLITES**: Base maximum number of satellites
- **Performance settings**: LOD scaling, label visibility, distance scaling
- **Visual settings**: Colors, point sizes, label formatting
- **Altitude thresholds**: Orbit classification boundaries

## Performance Considerations

### Why limit the satellites?

1. **Browser Performance**: Rendering 26K+ objects causes:

   - High memory usage (each satellite = entity + position + label)
   - Slow frame rates during camera movement
   - Potential browser crashes on lower-end devices

2. **Visual Clarity**: Too many satellites create visual clutter
3. **Interaction**: Click/selection becomes difficult with overlapping satellites

### Performance Optimizations Implemented

1. **Distance-based scaling**: Satellites appear smaller when far away
2. **Hidden labels by default**: Labels only show on selection
3. **Level-of-detail (LOD)**: Rendering quality adjusts based on distance
4. **Altitude-based coloring**: Quick visual classification

## Customization Options

### To render more satellites:

1. **Increase the limit** in `satelliteConfig.ts`:

   ```typescript
   MAX_SATELLITES: 15000, // or higher
   ```

2. **Use high-performance mode** in `main/page.tsx`:

   ```typescript
   const satellitePositions = await getSatellitePositions("high");
   ```

3. **Disable performance features** if you have a powerful device:
   ```typescript
   PERFORMANCE: {
     USE_LOD_SCALING: false,
     HIDE_LABELS_BY_DEFAULT: false,
     USE_DISTANCE_SCALING: false,
   }
   ```

### To improve performance with many satellites:

1. **Reduce point size**:

   ```typescript
   VISUAL: {
     POINT_SIZE: 4;
   }
   ```

2. **Enable aggressive LOD**:

   ```typescript
   PERFORMANCE: {
     USE_LOD_SCALING: true;
   }
   ```

3. **Use performance mode 'low'** for older devices

## Testing Recommendations

- Start with 'medium' mode (5,000 satellites)
- Monitor browser performance (frame rate, memory usage)
- Increase gradually if performance remains good
- Consider device capabilities of your target users

## Future Improvements

Potential enhancements for handling more satellites:

1. **Clustering**: Group nearby satellites at high zoom levels
2. **Culling**: Only render satellites in current view
3. **Streaming**: Load satellites dynamically based on view
4. **WebWorkers**: Offload position calculations
5. **Billboard collections**: More efficient rendering for many points
