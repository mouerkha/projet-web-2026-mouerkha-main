# 🎬 How to Add Videos to Portfolio Projects

## Updated ProjectCard Component ✓

Your `ProjectCard.jsx` has been updated to support **video backgrounds** in project cards!

### What Changed:
1. ✅ ProjectCard now checks for `project.videoSrc` prop
2. ✅ If `videoSrc` exists, it renders a **looping, muted video**
3. ✅ If not, it falls back to the text placeholder

### Video Configuration:

**For each project, add videos with these specs:**

```
Format:     MP4 (H.264 codec)
Resolution: 1280x720 (minimum)
Duration:   15-30 seconds (looping)
Audio:      Muted (autoplay requirement)
Size:       < 10MB per file
Properties: autoPlay, loop, muted, playsInline
```

### Step-by-Step Setup:

#### 1. **Create your videos** (Choose one method):

**Option A: Screen Recording (Recommended)**
- Record your running project or gameplay
- Export as MP4
- Keep it under 10MB

**Option B: Using FFmpeg**
```bash
# Convert MOV to MP4
ffmpeg -i atlas-runner.mov -c:v libx264 -preset fast -crf 23 -c:a aac atlas-runner.mp4

# Create a video from images (if you have screenshots)
ffmpeg -framerate 24 -i frame_%03d.png -c:v libx264 -pix_fmt yuv420p atlas-runner.mp4
```

**Option C: Online Video Editors**
- Use Canva, DaVinci Resolve, or Adobe Premiere Pro
- Export as MP4

#### 2. **Place videos in correct folder:**

```
src/
└── assets/
    ├── atlas-runner.mp4          ← Place your Atlas Runner video here
    ├── delisieus-food.mp4        ← Place your E-commerce video here
    ├── hero.png
    ├── react.svg
    └── vite.svg
```

#### 3. **Update Portfolio.jsx** to import videos:

```jsx
import atlasRunnerVideo from '../assets/atlas-runner.mp4';
import delisieuseFoodVideo from '../assets/delisieus-food.mp4';

const projects = [
  {
    title: 'Atlas Runner',
    imageLabel: 'Project Image',
    description: '2D Game developed in C++ and SFML...',
    link: '#',
    videoSrc: atlasRunnerVideo,  // ← Add this line
  },
  {
    title: 'Delisieus Food',
    imageLabel: 'Project Image',
    description: 'E-commerce platform with Meta Ads...',
    link: '#',
    videoSrc: delisieuseFoodVideo,  // ← Add this line
  },
];
```

### Video Examples:

**For Atlas Runner (2D Game):**
- Show gameplay footage
- Display character running, jumping, obstacles
- Include UI/menus
- Quick cuts with transitions

**For Delisieus Food (E-commerce):**
- Show product browsing
- Shopping cart animations
- Checkout flow
- Payment interface

### CSS Already Applied ✓

The `.project-video` CSS is already in `index.css`:

```css
.project-video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
```

This ensures videos:
- Fill the entire project card
- Maintain aspect ratio
- Autoplay when page loads
- Loop continuously
- No audio (muted)

### Testing:

Once you've added the video files:

1. Run `npm run dev`
2. Navigate to Portfolio section
3. Videos should autoplay in project cards
4. They loop seamlessly

### Troubleshooting:

**Videos not playing?**
- Check file path: `src/assets/atlas-runner.mp4`
- Ensure MP4 format (not MOV, AVI, etc.)
- Check browser console for errors

**Videos are too large?**
- Use FFmpeg to compress:
```bash
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset fast output.mp4
```

**Videos stuttering?**
- Reduce resolution to 720p
- Lower bitrate with FFmpeg
- Use simpler codec settings

---

## Summary

✅ **ProjectCard is ready for videos**
✅ **CSS styling applied**
⏳ **Waiting for video files**

Just add your two video files to `src/assets/` and uncomment the video imports in `Portfolio.jsx`! 🎬
